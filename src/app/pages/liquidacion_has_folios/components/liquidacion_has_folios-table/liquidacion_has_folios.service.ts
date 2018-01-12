import { AuthService } from './../../../../shared/auth.service';
import { Liquidacion_has_foliosResponseInterface } from './liquidacion_has_folios-response.interface';
import { Observable } from 'rxjs/Observable';
import { Liquidacion_has_foliosInterface } from './liquidacion_has_folios.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class Liquidacion_has_foliosService {
    private actionUrl: string;
    private headers: Headers;
    private options: RequestOptions;
    private endPoint: string;
    constructor(
        private _http: Http,
        private _configuration: Configuration,
        private authService: AuthService) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
        this.headers.append('Authorization', 'JWT ' + this.authService.token);
        this.options = new RequestOptions({ headers: this.headers });
        this.endPoint = `${this._configuration.ServerWithApiUrl}liquidacion_has_folio`;
       }
       all = () : Observable<Liquidacion_has_foliosResponseInterface> => {
           return this._http.get(this.endPoint, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id ) : Observable<Liquidacion_has_foliosResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( liquidacion_has_folio: Liquidacion_has_foliosInterface ) : Observable<Liquidacion_has_foliosResponseInterface> => {
           return this._http.patch(this.endPoint, liquidacion_has_folio, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<Liquidacion_has_foliosResponseInterface> => {
           return this._http.delete(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<Liquidacion_has_foliosResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<Liquidacion_has_foliosResponseInterface> => {
           return this._http.get(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( liquidacion_has_folio: Liquidacion_has_foliosInterface ) : Observable<Liquidacion_has_foliosResponseInterface> => {
           return this._http.post(this.endPoint, liquidacion_has_folio, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
