export interface CoinMarketData {
    id: string;
    symbol: string;
    name: string;
    image: string;
    currentPrice: number;
    marketCap: number;
    marketCapRank: number;
    fullyDilutedValuation: number;
    totalVolume: number;
    high24h: number;
    low24h: number;
    priceChange24h: number;
    priceChangePercentage24h: number;
    marketCapChange24h: number;
    marketCapChangePercentage24h: number;
    circulatingSupply: number;
    totalSupply: number;
    maxSupply: number;
    ath: number;
    athChangePercentage: number;
    athDate: string;
    atl: number;
    atlChangePercentage: number;
    atlDate: string;
    roi: null;
    lastUpdated: string;
    sparklineIn7d: {
        price: number[];
    };
    priceChangePercentage1hInCurrency: number;
    priceChangePercentage24hInCurrency: number;
    priceChangePercentage7dInCurrency: number;
}