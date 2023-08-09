import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { map, Observable } from "rxjs";
import { Coin, CoinDetails, CoinInfo, CoinMarketData, CoinMarketFilter, SearchedCoin } from "src/app/coins/models";
import { CoinDetailFilter } from "../models/coin-details-filter.model";
import { CoinChartFilter } from "../models/coin-chart-filter-.model";
import { CoinPrice } from "../models/coin-chart.model";

@Injectable({
    providedIn: 'root'
})
export class CoinGeckoService {
    constructor(private readonly http: HttpClient) {

    }

    private _getURL(path: string) {
        return `${environment.COINGECKO_API_URL}${path}`
    }

    getCoinMarkets(filter: CoinMarketFilter): Observable<CoinMarketData[]> {
        const params = new HttpParams({ fromObject: filter as any});

        return this.http.get<CoinMarketData[]>(this._getURL('/coins/markets'), { params });
    }


    getCoinList(): Observable<Coin[]> {
        return this.http.get<Coin[]>(this._getURL('/coins/list'));
    }

    getCoinDetails(filter: CoinDetailFilter): Observable<CoinDetails> {

        const params = new HttpParams({ fromObject: filter as any});

        return this.http.get<any>(this._getURL('/simple/price'), {params}).pipe(map((data)=> {
            const priceData = data[filter.ids];
            return { 
                price: priceData[filter.vsCurrencies],
                marketCap: priceData[filter.vsCurrencies+"MarketCap"],
                volume: priceData[filter.vsCurrencies+"24hVol"],
                priceChange: priceData[filter.vsCurrencies+"24hChange"],
                lastUpdate: priceData['lastUpdateAt'],
            }
        }));
    }

    getCoinChart(filter: CoinChartFilter): Observable<CoinPrice[]> {

        const params = new HttpParams({ fromObject: filter as any});
        params.delete('id');

        return this.http.get<any>(this._getURL(`/coins/${filter.id}/market_chart`), {params}).pipe(map(
            (data)=> {
                const priceData = data["prices"];

                return priceData.map((x: Array<number>) => ({time: x[0], value: x[1]}));
            }
        ));
    }

    getCoinInfo(id: string | undefined): Observable<CoinInfo>{

        return this.http.get<CoinInfo>(this._getURL(`/coins/${id}`));
    }

    getSearchedCoinInfo(id: string  | undefined): Observable<SearchedCoin[]> {

        const params = new HttpParams( {fromObject: { query: id} as any});

        return this.http.get<{ coins: SearchedCoin[] }>(this._getURL('/search'), {params}).pipe(map(
            response => response.coins
        ))
    }

}