import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  headers = new HttpHeaders();
  token: string = 'U2FsdGVkX1+KmaqHOTGL8GHJ4+S90lOrryWjHceVlqkjizo3+Z5+D69TCuILcIrqwzHrDPrnZ3hhY+0OtSEDhfnIu4EhUL/SBkCryKRVK8m5MwZXRqTQYKuk2UDwXIDHLjlgIfFgtXkPc8vDrSgvhTDUPJ9qrCOg2eDQuqgTzRzk7guYDBbpyrW2boeEEPLUYjgrDFLIf4wPrZB3am3q6MiPrMmzswi57Z08pymksHMzMoevJhCItVc391DVnsgs';
  options: any = {};

  constructor(private httpClient: HttpClient) {
    const headers = new HttpHeaders(
      {
        'Content-Type':'application/json; charset=utf-8',
        'X-Auth': 'App'
      });
    this.options = { headers: headers }
  }

  public get(url: string): Observable<any> {
    return this.httpClient.get(url, this.options);
  }

  public post(url: string, payload: any): Observable<any> {
    return this.httpClient.post(url, payload, this.options);
  }

  public put(url: string, payload: any): Observable<any> {
    return this.httpClient.put(url, payload, this.options);
  }

}
