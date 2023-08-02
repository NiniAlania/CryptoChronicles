import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { map, Observable } from "rxjs";
import { Coin, CoinMarketData, CoinMarketFilter } from "src/app/coins/models";

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
}