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
    const url = "http://bpm.backend.com:8080/api/createSignedPDF" ;
    return this.http.post(url,{form },{
      responseType: 'arraybuffer'} );
  }
  getPDF(){
    const url = "http://bpm.backend.com:8080/api/test" ;
    
    return this.http.post(url,{},{
      responseType: 'arraybuffer'} );
  }
  sendMail(mail,filename){
    const url = "http://bpm.backend.com:8080/api/sendMail?mail="+mail+"&filename="+filename ;

    return this.http.get(url,{ } );
  }
  getAllSignedFiles(){
    const url = "http://bpm.backend.com:8080/api/getAllSignedFiles" ;

    return this.http.get(url,{ } );
  }
  getSignedForm(filename){
    const url = "http://bpm.backend.com:8080/api/getSignedForm?filename="+filename ;
    
    return this.http.get(url,{
      responseType: 'arraybuffer'} );
  }
}
