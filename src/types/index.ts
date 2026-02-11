export type HoveredCountry = {
    countryName: string
    countryCode: string
    percentage: number
    etfSymbol: string
    etfName: string
    comparedPercentage?: number
    comparedETFSymbol?: string
    comparedETFName?: string
    isInPrimary: boolean
    isInCompared: boolean
}

type CountryAllocation = {
    country: string
    countryCode: string
    percentage: number
}

export type ETF = {
    symbol: string
    name: string
    currentValue: number
    change: number
    changePercent: number
    countryAllocations: Array<CountryAllocation>
}