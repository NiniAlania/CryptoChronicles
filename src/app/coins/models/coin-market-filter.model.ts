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

export function defaultCoinMarketFilter(page: number | undefined, currency: "usd" | "eur", pageSize?: number | undefined, favorites?: string[] | undefined): CoinMarketFilter {
    let filter = {
        vsCurrency: currency,
        order: 'market_cap_desc',
        perPage: pageSize ?? 100,
        page: page ? page : 1,
        sparkline: true,
        priceChangePercentage: '1h,24h,7d',
        locale: 'en',
        precision: 2,
        
    } as CoinMarketFilter;

    if (favorites) {
        filter.ids = favorites?.join(',') 
    }

    return filter;
}