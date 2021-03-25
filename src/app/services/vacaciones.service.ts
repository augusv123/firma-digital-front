import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacacionesService {


  headers = new HttpHeaders();
  options = { headers: this.headers, withCredintials: false };

  constructor(private http: HttpClient) {}


  
  requestVacations(form) {
    const url = "http://localhost/tcpdf/public/api/createSignedPDF" ;
    return this.http.post(url,{form },{
      responseType: 'arraybuffer'} );
  }
  getPDF(){
    const url = "http://localhost/tcpdf/public/api/test" ;
    
    return this.http.post(url,{},{
      responseType: 'arraybuffer'} );
  }
}
