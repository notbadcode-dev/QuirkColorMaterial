import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import globalData from '../shared/global.data';
import { HttpService } from '../services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpService) {}
  // ...
  public isAuthenticated(): boolean {
    let auth: boolean = false;
    this.httpService.post(environment.api + '/app/getToken', { id: 1 })
      .subscribe(response => {
        globalData.token = response;
      }, () => {
        auth = true;
      })

      return auth;
  }
}
