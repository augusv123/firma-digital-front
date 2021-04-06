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
    const url = environment.apiUrl + "createSignedPDF" ;
    return this.http.post(url,{form },{
      responseType: 'arraybuffer'} );
  }
  getPDF(){
    const url = environment.apiUrl + "test" ;
    
    return this.http.post(url,{},{
      responseType: 'arraybuffer'} );
  }
  sendMail(mail,filename){
    const url = environment.apiUrl + "sendMail?mail="+mail+"&filename="+filename ;

    return this.http.get(url,{ } );
  }
  getAllSignedFiles(id,directory){
    const url = environment.apiUrl + "getAllSignedFiles?id="+id+"&directory="+directory ;

    return this.http.get(url,{ } );
  }
  getAllDirectories(id){
    const url = environment.apiUrl + "getAllDirectories?id="+id ;

    return this.http.get(url,{ } );
  }
  getSignedForm(filename){
    const url = environment.apiUrl + "getSignedForm?filename="+filename ;
    
    return this.http.get(url,{
      responseType: 'arraybuffer'} );
  }
}
