import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarvelService } from '../services/marvel.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(private apiMarvel: MarvelService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const timestamp = this.apiMarvel.generateTimeStamp();
        const authUrl = '&ts=' + timestamp + '&apikey=' + this.apiMarvel.getPublicKey() + '&hash=' + this.apiMarvel.generateHash(timestamp);
        const apiReq = req.clone({ url: req.url + authUrl });
        return next.handle(apiReq);
    }
}
