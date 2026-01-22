export interface CountryAllocation {
  country: string
  countryCode: string
  percentage: number
}

export interface ETF {
  symbol: string
  name: string
  currentValue: number
  change: number
  changePercent: number
  countryAllocations: CountryAllocation[]
}

export const mockETFs: ETF[] = [
  {
    symbol: 'SPY',
    name: 'SPDR S&P 500 ETF',
    currentValue: 478.32,
    change: 5.23,
    changePercent: 1.10,
    countryAllocations: [
      { country: 'United States', countryCode: 'US', percentage: 100 }
    ]
  },
  {
    symbol: 'VTI',
    name: 'Vanguard Total Stock Market ETF',
    currentValue: 245.67,
    change: 2.84,
    changePercent: 1.17,
    countryAllocations: [
      { country: 'United States', countryCode: 'US', percentage: 100 }
    ]
  },
  {
    symbol: 'EFA',
    name: 'iShares MSCI EAFE ETF',
    currentValue: 78.45,
    change: -0.32,
    changePercent: -0.41,
    countryAllocations: [
      { country: 'Japan', countryCode: 'JP', percentage: 23.5 },
      { country: 'United Kingdom', countryCode: 'GB', percentage: 15.2 },
      { country: 'France', countryCode: 'FR', percentage: 11.8 },
      { country: 'Switzerland', countryCode: 'CH', percentage: 9.4 },
      { country: 'Germany', countryCode: 'DE', percentage: 8.9 },
      { country: 'Australia', countryCode: 'AU', percentage: 7.3 },
      { country: 'Netherlands', countryCode: 'NL', percentage: 4.2 },
      { country: 'Sweden', countryCode: 'SE', percentage: 3.8 },
      { country: 'Spain', countryCode: 'ES', percentage: 3.1 },
      { country: 'Italy', countryCode: 'IT', percentage: 2.9 },
      { country: 'Other', countryCode: 'OT', percentage: 9.9 }
    ]
  },
  {
    symbol: 'EEM',
    name: 'iShares MSCI Emerging Markets ETF',
    currentValue: 42.18,
    change: 0.67,
    changePercent: 1.61,
    countryAllocations: [
      { country: 'China', countryCode: 'CN', percentage: 28.4 },
      { country: 'India', countryCode: 'IN', percentage: 18.6 },
      { country: 'Taiwan', countryCode: 'TW', percentage: 16.3 },
      { country: 'South Korea', countryCode: 'KR', percentage: 12.8 },
      { country: 'Brazil', countryCode: 'BR', percentage: 5.9 },
      { country: 'Saudi Arabia', countryCode: 'SA', percentage: 4.2 },
      { country: 'South Africa', countryCode: 'ZA', percentage: 3.5 },
      { country: 'Mexico', countryCode: 'MX', percentage: 2.8 },
      { country: 'Thailand', countryCode: 'TH', percentage: 2.1 },
      { country: 'Other', countryCode: 'OT', percentage: 5.4 }
    ]
  },
  {
    symbol: 'VGK',
    name: 'Vanguard FTSE Europe ETF',
    currentValue: 66.38,
    change: -0.45,
    changePercent: -0.67,
    countryAllocations: [
      { country: 'United Kingdom', countryCode: 'GB', percentage: 24.1 },
      { country: 'France', countryCode: 'FR', percentage: 18.6 },
      { country: 'Germany', countryCode: 'DE', percentage: 16.4 },
      { country: 'Switzerland', countryCode: 'CH', percentage: 14.8 },
      { country: 'Netherlands', countryCode: 'NL', percentage: 7.3 },
      { country: 'Sweden', countryCode: 'SE', percentage: 6.2 },
      { country: 'Spain', countryCode: 'ES', percentage: 4.9 },
      { country: 'Italy', countryCode: 'IT', percentage: 4.2 },
      { country: 'Denmark', countryCode: 'DK', percentage: 2.8 },
      { country: 'Other', countryCode: 'OT', percentage: 0.7 }
    ]
  },
  {
    symbol: 'VEA',
    name: 'Vanguard FTSE Developed Markets ETF',
    currentValue: 51.23,
    change: 0.38,
    changePercent: 0.75,
    countryAllocations: [
      { country: 'Japan', countryCode: 'JP', percentage: 22.8 },
      { country: 'United Kingdom', countryCode: 'GB', percentage: 13.9 },
      { country: 'France', countryCode: 'FR', percentage: 10.4 },
      { country: 'Canada', countryCode: 'CA', percentage: 9.8 },
      { country: 'Switzerland', countryCode: 'CH', percentage: 8.7 },
      { country: 'Germany', countryCode: 'DE', percentage: 7.9 },
      { country: 'Australia', countryCode: 'AU', percentage: 6.6 },
      { country: 'Netherlands', countryCode: 'NL', percentage: 3.8 },
      { country: 'Sweden', countryCode: 'SE', percentage: 3.2 },
      { country: 'Other', countryCode: 'OT', percentage: 12.9 }
    ]
  },
  {
    symbol: 'VT',
    name: 'Vanguard Total World Stock ETF',
    currentValue: 108.95,
    change: 1.24,
    changePercent: 1.15,
    countryAllocations: [
      { country: 'United States', countryCode: 'US', percentage: 61.2 },
      { country: 'Japan', countryCode: 'JP', percentage: 5.8 },
      { country: 'United Kingdom', countryCode: 'GB', percentage: 3.6 },
      { country: 'China', countryCode: 'CN', percentage: 2.8 },
      { country: 'France', countryCode: 'FR', percentage: 2.7 },
      { country: 'Canada', countryCode: 'CA', percentage: 2.6 },
      { country: 'Switzerland', countryCode: 'CH', percentage: 2.4 },
      { country: 'Germany', countryCode: 'DE', percentage: 2.1 },
      { country: 'India', countryCode: 'IN', percentage: 1.9 },
      { country: 'Australia', countryCode: 'AU', percentage: 1.7 },
      { country: 'Taiwan', countryCode: 'TW', percentage: 1.6 },
      { country: 'Other', countryCode: 'OT', percentage: 11.6 }
    ]
  },
  {
    symbol: 'ACWI',
    name: 'iShares MSCI ACWI ETF',
    currentValue: 105.83,
    change: 0.92,
    changePercent: 0.88,
    countryAllocations: [
      { country: 'United States', countryCode: 'US', percentage: 63.4 },
      { country: 'Japan', countryCode: 'JP', percentage: 5.4 },
      { country: 'United Kingdom', countryCode: 'GB', percentage: 3.4 },
      { country: 'China', countryCode: 'CN', percentage: 2.6 },
      { country: 'France', countryCode: 'FR', percentage: 2.5 },
      { country: 'Canada', countryCode: 'CA', percentage: 2.3 },
      { country: 'Switzerland', countryCode: 'CH', percentage: 2.2 },
      { country: 'Germany', countryCode: 'DE', percentage: 1.9 },
      { country: 'India', countryCode: 'IN', percentage: 1.8 },
      { country: 'Taiwan', countryCode: 'TW', percentage: 1.5 },
      { country: 'Other', countryCode: 'OT', percentage: 13.0 }
    ]
  }
]
