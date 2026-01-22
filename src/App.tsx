import Globe from 'react-globe.gl'
import './App.css'
import { useCountries } from './hooks/useCountries'
import { mockETFs } from './data/mockETFs'
import { useMemo, useState, useEffect } from 'react'
import { CountryInfoCard } from './components/CountryInfoCard'
import { ETFSelector } from './components/ETFSelector'

interface HoveredCountry {
  name: string
  code: string
  percentage: number
  etfSymbol: string
  etfName: string
  comparedPercentage?: number
  comparedETFSymbol?: string
  comparedETFName?: string
  isInPrimary: boolean
  isInCompared: boolean
}

function App() {
  const { countries, isLoading } = useCountries()
  const [selectedETF, setSelectedETF] = useState(mockETFs[2]) // Default to EFA
  const [comparedETF, setComparedETF] = useState<typeof mockETFs[0] | null>(null)
  const [isCompareMode, setIsCompareMode] = useState(false)
  const [isCompact, setIsCompact] = useState(false)
  const [hoveredCountry, setHoveredCountry] = useState<HoveredCountry | null>(null)
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Create a set of country codes that should be highlighted
  const highlightedCountries = useMemo(() => {
    if (!selectedETF) return new Set<string>()
    return new Set(selectedETF.countryAllocations.map(allocation => allocation.countryCode))
  }, [selectedETF])

  // Create a set for compared ETF countries
  const comparedCountries = useMemo(() => {
    if (!comparedETF || !isCompareMode) return new Set<string>()
    return new Set(comparedETF.countryAllocations.map(allocation => allocation.countryCode))
  }, [comparedETF, isCompareMode])

  // Create allocation map for quick lookup
  const allocationMap = useMemo(() => {
    const map = new Map()
    selectedETF?.countryAllocations.forEach(allocation => {
      map.set(allocation.countryCode, { ...allocation, etf: selectedETF })
    })
    if (isCompareMode && comparedETF) {
      comparedETF.countryAllocations.forEach(allocation => {
        const existing = map.get(allocation.countryCode)
        if (existing) {
          map.set(allocation.countryCode, { ...existing, compared: allocation, comparedETF })
        } else {
          map.set(allocation.countryCode, { ...allocation, etf: comparedETF })
        }
      })
    }
    return map
  }, [selectedETF, comparedETF, isCompareMode])

  const handlePolygonHover = (polygon: object | null) => {
    if (polygon && 'properties' in polygon) {
      const props = polygon.properties as { ISO_A2: string }
      const countryCode = props.ISO_A2
      const allocation = allocationMap.get(countryCode)
      
      if (allocation) {
        const isInPrimary = highlightedCountries.has(countryCode)
        const isInCompared = comparedCountries.has(countryCode)
        
        const hoveredData: HoveredCountry = {
          name: allocation.country,
          code: countryCode,
          percentage: allocation.percentage,
          etfSymbol: allocation.etf?.symbol || selectedETF.symbol,
          etfName: allocation.etf?.name || selectedETF.name,
          isInPrimary,
          isInCompared
        }
        
        if ('compared' in allocation && allocation.compared) {
          hoveredData.comparedPercentage = allocation.compared.percentage
          hoveredData.comparedETFSymbol = allocation.comparedETF?.symbol
          hoveredData.comparedETFName = allocation.comparedETF?.name
        }
        
        setHoveredCountry(hoveredData)
      } else {
        setHoveredCountry(null)
      }
    } else {
      setHoveredCountry(null)
    }
  }

  const getPolygonColor = (d: { properties: { ISO_A2: string } }, highlightedCountries: Set<string>, comparedCountries: Set<string>) => {
    const countryCode = d.properties.ISO_A2
    const inPrimary = highlightedCountries.has(countryCode)
    const inCompared = comparedCountries.has(countryCode)
    
    if (inPrimary && inCompared) {
      return 'rgba(255, 200, 100, 0.6)' // Orange for overlap
    }
    if (inPrimary) {
      return 'rgba(100, 200, 255, 0.6)' // Blue for primary ETF
    }
    if (inCompared) {
      return 'rgba(255, 100, 200, 0.6)' // Pink for compared ETF
    }
    return 'rgba(0, 0, 0, 0)' // Transparent for others
  }

  const isShowingCountryInfo = hoveredCountry && (highlightedCountries.has(hoveredCountry.code) || comparedCountries.has(hoveredCountry.code))

  const handleToggleCompare = () => {
    setIsCompareMode(!isCompareMode)
    if (isCompareMode) {
      setComparedETF(null)
    } else {
      setComparedETF(mockETFs[0])
    }
  }

  const handleToggleCompact = () => {
    setIsCompact(!isCompact)
  }

  return (
    <div className="globe-container">
      {isLoading && <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', color: 'white', zIndex: 1 }}>Loading countries...</div>}
      
      <ETFSelector 
        etfs={mockETFs}
        selectedETF={selectedETF}
        onSelectETF={setSelectedETF}
        title="Primary ETF"
        highlightColor="rgba(100, 200, 255, 0.8)"
        isCompareMode={isCompareMode}
        onToggleCompare={handleToggleCompare}
        showCompareButton={true}
        left="20px"
        isCompact={isCompact}
        onToggleCompact={handleToggleCompact}
      />

      {isCompareMode && comparedETF && (
        <ETFSelector 
          etfs={mockETFs}
          selectedETF={comparedETF}
          onSelectETF={setComparedETF}
          title="Compare ETF"
          highlightColor="rgba(255, 100, 200, 0.8)"
          right="20px"
          isCompact={isCompact}
          onToggleCompact={handleToggleCompact}
        />
      )}

      {/* Country Info Modal */}
      {isShowingCountryInfo && (
        <CountryInfoCard 
          countryName={hoveredCountry.name}
          countryCode={hoveredCountry.code}
          percentage={hoveredCountry.percentage}
          etfSymbol={hoveredCountry.etfSymbol}
          etfName={hoveredCountry.etfName}
          comparedPercentage={hoveredCountry.comparedPercentage}
          comparedETFSymbol={hoveredCountry.comparedETFSymbol}
          comparedETFName={hoveredCountry.comparedETFName}
          isInPrimary={hoveredCountry.isInPrimary}
          isInCompared={hoveredCountry.isInCompared}
        />
      )}
      
      <Globe 
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        polygonsData={countries.features}
        polygonCapColor={(d) => getPolygonColor(d as { properties: { ISO_A2: string } }, highlightedCountries, comparedCountries)}
        polygonSideColor={() => 'rgba(100, 200, 255, 0.3)'}
        polygonStrokeColor={() => '#111'}
        polygonAltitude={0.01}
        atmosphereColor="lightskyblue"
        atmosphereAltitude={0.3}
        onPolygonHover={handlePolygonHover}
        width={dimensions.width}
        height={dimensions.height}
      />
    </div>
  )
}

export default App
