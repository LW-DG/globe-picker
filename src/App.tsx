import Globe from 'react-globe.gl'
import './App.css'
import { useCountries } from './hooks/useCountries'
import { useWindowDimensions } from './hooks/useWindowDimensions'
import { mockETFs } from './data/mockETFs'
import { useMemo, useState } from 'react'
import { CountryInfoCard } from './components/CountryInfoCard'
import { ETFSelector } from './components/ETFSelector'
import type { ETF, HoveredCountry } from './types'

const GLOBE_IMG_URL = "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
const GLOBE_BACKGROUND_IMG_URL = "//unpkg.com/three-globe/example/img/night-sky.png"

function App() {
  const { countries, isLoading } = useCountries()
  const { width, height } = useWindowDimensions()
  const [selectedETF, setSelectedETF] = useState<ETF>(mockETFs[0]) // Default to SPY
  const [comparedETF, setComparedETF] = useState<ETF | null>(mockETFs[0])
  const [isCompareMode, setIsCompareMode] = useState(false)
  const [isCompact, setIsCompact] = useState(false)
  const [hoveredCountry, setHoveredCountry] = useState<HoveredCountry | null>(null)

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
  }, [selectedETF, comparedETF, isCompareMode]);

  const isShowingCompareETFSelector = isCompareMode && comparedETF;

  const isShowingCountryInfo = hoveredCountry && (highlightedCountries.has(hoveredCountry.countryCode) || comparedCountries.has(hoveredCountry.countryCode));

  const handleToggleCompare = () => {
    setIsCompareMode(prev => !prev)
    setComparedETF(mockETFs[0])
  }

  const handleToggleCompact = () => {
    setIsCompact(prev => !prev)
  }

  const getPolygonColor = (d: { properties: { ISO_A2: string } }, highlightedCountries: Set<string>, comparedCountries: Set<string>) => {
    const countryCode = d.properties.ISO_A2
    const inPrimary = highlightedCountries.has(countryCode)
    const inCompared = comparedCountries.has(countryCode)

    if (inPrimary && inCompared) {
      return 'rgba(255, 255, 255, 0.7)' // White for overlap
    }
    if (inPrimary) {
      return 'rgba(139, 92, 246, 0.6)' // Violet for primary ETF
    }
    if (inCompared) {
      return 'rgba(251, 146, 60, 0.6)' // Orange for compared ETF
    }
    return 'rgba(0, 0, 0, 0)' // Transparent for others
  }

  const getPolygonSideColor = () => '#111';

  const getPolygonStrokeColor = () => '#111'

  const handlePolygonHover = (polygon: object | null) => {
    if (polygon && 'properties' in polygon) {
      const props = polygon.properties as { ISO_A2: string }
      const countryCode = props.ISO_A2
      const allocation = allocationMap.get(countryCode)

      if (allocation) {
        const isInPrimary = highlightedCountries.has(countryCode)
        const isInCompared = comparedCountries.has(countryCode)

        const hoveredData: HoveredCountry = {
          countryName: allocation.country,
          countryCode: countryCode,
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

  return (
    <div className="globe-container">
      {isLoading ? <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', color: 'white', zIndex: 1 }}>Loading countries...</div> : null}

      <ETFSelector
        etfs={mockETFs}
        selectedETF={selectedETF}
        onSelectETF={setSelectedETF}
        title="Primary ETF"
        highlightColor="rgba(139, 92, 246, 0.8)"
        isCompareMode={isCompareMode}
        onToggleCompare={handleToggleCompare}
        showCompareButton
        left="20px"
        isCompact={isCompact}
        onToggleCompact={handleToggleCompact}
      />

      {isShowingCompareETFSelector ? (
        <ETFSelector
          etfs={mockETFs}
          selectedETF={comparedETF}
          onSelectETF={setComparedETF}
          title="Compare ETF"
          highlightColor="rgba(251, 146, 60, 0.8)"
          right="20px"
          isCompact={isCompact}
          onToggleCompact={handleToggleCompact}
        />
      ) : null}

      {/* Country Info Modal */}
      {isShowingCountryInfo ? (
        <CountryInfoCard hoveredCountry={hoveredCountry} />
      ) : null}

      <Globe
        globeImageUrl={GLOBE_IMG_URL}
        backgroundImageUrl={GLOBE_BACKGROUND_IMG_URL}
        polygonsData={countries.features}
        polygonCapColor={(d) => getPolygonColor(d as { properties: { ISO_A2: string } }, highlightedCountries, comparedCountries)}
        polygonSideColor={getPolygonSideColor}
        polygonStrokeColor={getPolygonStrokeColor}
        polygonAltitude={0.01}
        atmosphereColor="lightskyblue"
        atmosphereAltitude={0.3}
        onPolygonHover={handlePolygonHover}
        width={width}
        height={height}
      />
    </div>
  )
}

export default App
