import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers = new HttpHeaders();
  options = { headers: this.headers, withCredintials: false };

  constructor(private http: HttpClient) {}

  getUnsignedFiles() {
    // const url = environment.apiUrl + serviceName;
    return this.http.get("url", this.options);
  }
  
  sign() {
    const url = environment.apiUrl ;
    const data = environment.apiUrl ;
    
    return this.http.post(url,data, this.options);
  }
}
