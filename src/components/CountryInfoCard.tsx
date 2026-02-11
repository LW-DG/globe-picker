import type { HoveredCountry } from "../types"

export interface CountryInfoCardProps { hoveredCountry: HoveredCountry }

export function CountryInfoCard({
  hoveredCountry
}: CountryInfoCardProps) {
  const {
    countryName,
    countryCode,
    percentage,
    etfSymbol,
    etfName,
    comparedPercentage,
    comparedETFSymbol,
    comparedETFName,
    isInPrimary,
    isInCompared
  } = hoveredCountry;

  const hasComparison = comparedPercentage !== undefined && comparedETFSymbol && comparedETFName

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0, 0, 0, 0.9)',
      padding: '30px 40px',
      borderRadius: '12px',
      border: '2px solid rgba(139, 92, 246, 0.6)',
      color: 'white',
      zIndex: 1000,
      pointerEvents: 'none',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
      minWidth: '300px',
      animation: 'fadeIn 0.3s ease-in-out'
    }}>
      <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px', color: '#8b5cf6' }}>
        {countryName}
      </div>
      <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '20px' }}>
        Country Code: {countryCode}
      </div>

      <div style={{ marginBottom: hasComparison ? '20px' : '0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          {isInPrimary ? (
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'rgba(139, 92, 246, 0.8)',
              boxShadow: '0 0 8px rgba(139, 92, 246, 0.6)'
            }} />
          ) : null}
          {isInCompared && !isInPrimary ? (
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'rgba(251, 146, 60, 0.8)',
              boxShadow: '0 0 8px rgba(251, 146, 60, 0.6)'
            }} />
          ) : null}
          <div style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: isInPrimary ? '#8b5cf6' : '#fb923c'
          }}>
            {percentage}%
          </div>
        </div>
        <div style={{ fontSize: '14px', opacity: 0.8 }}>
          Allocation in {etfSymbol}
        </div>
        <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '4px' }}>
          {etfName}
        </div>
      </div>

      {hasComparison ? (
        <>
          <div style={{
            height: '1px',
            background: 'rgba(255, 255, 255, 0.2)',
            marginBottom: '20px'
          }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: 'rgba(255, 100, 200, 0.8)',
                boxShadow: '0 0 8px rgba(255, 100, 200, 0.6)'
              }} />
              <div style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#ff64c8'
              }}>
                {comparedPercentage}%
              </div>
            </div>
            <div style={{ fontSize: '14px', opacity: 0.8 }}>
              Allocation in {comparedETFSymbol}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '4px' }}>
              {comparedETFName}
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
