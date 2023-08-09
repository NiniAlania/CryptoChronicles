export interface CoinChartFilter {
    id: string;
    vsCurrency: string;
    days: string;
    interval: string;
    precision: string;
}

export function defaultCoinChartFilter(id: string | undefined, currency: string){
    return {
        id: id ?? '',
        vsCurrency: currency,
        days: '7',
        interval: 'daily',
        precision: '2'
    }
} 