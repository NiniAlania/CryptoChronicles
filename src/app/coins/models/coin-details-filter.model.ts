export interface CoinDetailFilter {
    ids: string;
    vsCurrencies: string;
    includeMarketCap: string;
    include24hrVol: string;
    include24hrChange: string;
    includeLastUpdatedAt: string;
    precision: string;
}

export function defaultCoinDetailFilter(id: string | undefined, currency:  "usd" | "eur") {

    return {
        ids: id ?? '',
        vsCurrencies: currency,
        includeMarketCap: "true",
        include24hrVol: "true",
        include24hrChange: "true",
        includeLastUpdatedAt: "true",
        precision: "2",
    }
}