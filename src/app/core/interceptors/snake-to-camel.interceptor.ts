import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse,
    HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SnakeToCamelInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const modifiedRequest = this.convertKeysToSnakeCase(request);
        return next.handle(modifiedRequest).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    return event.clone({ body: this.convertKeysToCamelCase(event.body) });
                }
                return event;
            })
        );
    }

    private convertKeysToCamelCase(data: any): any {
        if (data === null || data === undefined) {
            return data;
        }
        if (Array.isArray(data)) {
            return data.map((item) => this.convertKeysToCamelCase(item));
        }
        if (typeof data === 'object') {
            const camelCasedObject: Record<string, any> = {};
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const camelCaseKey = this.snakeToCamelCase(key);
                    camelCasedObject[camelCaseKey] = this.convertKeysToCamelCase(data[key]);
                }
            }
            return camelCasedObject;
        }
        return data;
    }

    private convertKeysToSnakeCase(request: HttpRequest<any>): HttpRequest<any> {
        if (request.params.keys().length === 0) {
            return request;
        }

        let convertedParams = new HttpParams();
        request.params.keys().forEach((key) => {
            const snakeCaseKey = this.camelToSnakeCase(key);
            const value = request.params.get(key);
            if (value !== null && value !== undefined) {
                convertedParams = convertedParams.set(snakeCaseKey, value);
            }
        });

        return request.clone({ params: convertedParams });
    }

    private snakeToCamelCase(key: string): string {
        return key.replace(/(_\w)/g, (m) => m[1].toUpperCase());
    }

    private camelToSnakeCase(key: string): string {
        // return key.replace(/([A-Z])/g, (m) => '_' + m.toLowerCase());
        return key.replace(/([a-z])([A-Z0-9])/g, '$1_$2').toLowerCase();
    }
}
