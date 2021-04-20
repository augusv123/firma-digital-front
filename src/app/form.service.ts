import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {
 
  headers = new HttpHeaders();
  options = { headers: this.headers, withCredintials: false };

  constructor(private http: HttpClient) {}


  
  requestVacations(data) {
    const url = environment.apiUrl + "saveForm" ;
    
    return this.http.post(url,data,{} );
  }
  getForm(filename){
    const url = environment.apiUrl + "getForm?filename="+filename ;
    
    return this.http.get(url,{} );
  }
  getAllFiles(){
    const url = environment.apiUrl + "getAllFiles" ;
    
    return this.http.get(url,{} );
  }
  sendHtmlTest(htmlform){
    const url = environment.apiUrl + "sendHtmlTest" ;
    
    return this.http.post(url,htmlform,{} );
  }
  delete(filename){
    const url = environment.apiUrl + "delete?filename="+filename ;
    
    return this.http.post(url,{filename} );
  }
  toggleFormVisibility(id){
    const url = environment.apiUrl + "toggleFormVisibility" ;
    
    return this.http.post(url,{id} );
  }
  getCompletionForm(id){
    const url = environment.apiUrl + "getCompletionForm?fileId="+id ;
    
    return this.http.get(url );
  }
  

}
