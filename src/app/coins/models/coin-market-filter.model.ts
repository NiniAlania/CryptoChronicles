export interface CoinMarketFilter {
    vsCurrency: string;
    order: string;
    perPage: number;
    ids?: string;
    page: number;
    sparkline: boolean;
    priceChangePercentage: string;
    locale: string;
    precision: number;
}

export function defaultCoinMarketFilter(): CoinMarketFilter {
    return {
        vsCurrency: 'usd',
        order: 'market_cap_desc',
        perPage: 100,
        page: 1,
        sparkline: true,
        priceChangePercentage: '1h,24h,7d',
        locale: 'en',
        precision: 2
    };
}