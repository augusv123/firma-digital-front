import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {


  headers = new HttpHeaders();
  options = { headers: this.headers, withCredintials: false };

  constructor(private http: HttpClient) {}


  
  requestVacations(data) {
    const url = "http://localhost/tcpdf/public/api/saveForm" ;
    
    return this.http.post(url,data,{} );
  }
  getForm(filename){
    const url = "http://localhost/tcpdf/public/api/getForm?filename="+filename ;
    
    return this.http.get(url,{} );
  }
  getAllFiles(){
    const url = "http://localhost/tcpdf/public/api/getAllFiles" ;
    
    return this.http.get(url,{} );
  }
  sendHtmlTest(htmlform){
    const url = "http://localhost/tcpdf/public/api/sendHtmlTest" ;
    
    return this.http.post(url,htmlform,{} );
  }

}
