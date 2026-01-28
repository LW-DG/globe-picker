type ETF = {
  symbol: string
  name: string
  currentValue: number
  change: number
  changePercent: number
  countryAllocations: Array<{
    country: string
    countryCode: string
    percentage: number
  }>
}

interface ETFSelectorProps {
  etfs: ETF[]
  selectedETF: ETF
  onSelectETF: (etf: ETF) => void
  title?: string
  highlightColor?: string
  isCompareMode?: boolean
  showCompareButton?: boolean
  top?: string
  left?: string
  right?: string
  isCompact?: boolean
  onToggleCompare?: () => void
  onToggleCompact?: () => void
}

export function ETFSelector({
  etfs,
  selectedETF,
  onSelectETF,
  title = 'Select ETF',
  highlightColor = 'rgba(100, 200, 255, 0.8)',
  isCompareMode = false,
  showCompareButton = false,
  top = '20px',
  left,
  right,
  isCompact = false,
  onToggleCompare,
  onToggleCompact
}: ETFSelectorProps) {
  return (
    <div style={{
      position: 'absolute',
      ...(left !== undefined && { left }),
      ...(right !== undefined && { right }),
      top,
      background: 'rgba(0, 0, 0, 0.8)',
      padding: '20px',
      borderRadius: '8px',
      color: 'white',
      zIndex: 1,
      maxWidth: '300px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, fontSize: '18px' }}>{title}</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          {onToggleCompact && (
            <button
              onClick={onToggleCompact}
              style={{
                padding: '6px 12px',
                background: isCompact ? 'rgba(100, 200, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                border: isCompact ? '1px solid rgba(100, 200, 255, 0.8)' : '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '12px',
                transition: 'all 0.2s'
              }}
            >
              {isCompact ? '⊟' : '⊞'}
            </button>
          )}
          {showCompareButton && onToggleCompare && (
            <button
              onClick={onToggleCompare}
              style={{
                padding: '6px 12px',
                background: isCompareMode ? 'rgba(100, 200, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                border: isCompareMode ? '1px solid rgba(100, 200, 255, 0.8)' : '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '12px',
                transition: 'all 0.2s'
              }}
            >
              {isCompareMode ? 'Exit Compare' : 'Compare'}
            </button>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: isCompact ? '6px' : '10px' }}>
        {etfs.map(etf => (
          <button
            key={etf.symbol}
            onClick={() => onSelectETF(etf)}
            style={{
              padding: isCompact ? '8px 10px' : '12px',
              background: selectedETF.symbol === etf.symbol ? `${highlightColor.replace('0.8', '0.3')}` : 'rgba(255, 255, 255, 0.1)',
              border: selectedETF.symbol === etf.symbol ? `2px solid ${highlightColor}` : '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
              width: '100%',
              minWidth: '260px'
            }}
          >
            {isCompact ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{etf.symbol}</div>
                <div style={{ fontSize: '12px' }}>
                  <span style={{
                    color: etf.change >= 0 ? '#4ade80' : '#f87171'
                  }}>
                    {etf.change >= 0 ? '+' : ''}{etf.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{etf.symbol}</div>
                <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '4px' }}>{etf.name}</div>
                <div style={{ fontSize: '14px', marginTop: '6px' }}>
                  ${etf.currentValue.toFixed(2)}
                  <span style={{
                    marginLeft: '8px',
                    color: etf.change >= 0 ? '#4ade80' : '#f87171'
                  }}>
                    {etf.change >= 0 ? '+' : ''}{etf.changePercent.toFixed(2)}%
                  </span>
                </div>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
