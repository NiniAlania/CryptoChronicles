import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment.development";
import { map, Observable } from "rxjs";
import { CoinMarketData } from "src/app/coins/models/coin-market-date.model";
import { CoinMarketFilter } from "src/app/coins/models";

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
}