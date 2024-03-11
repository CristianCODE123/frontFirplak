import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { pods } from './Pod';

@Injectable({
  providedIn: 'root'
})
export class RegisterServicesService {

  // URL base para las solicitudes HTTP
  url:string = "http://localhost:8000"

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }


  getPODs(): Observable<any> {
    return this.http.get<any>(this.url+'/api/pods',this.httpOptions)
  }

  
  registerPod(Pod:any): Observable<any>{
    return this.http.post<any>(this.url+'/api/pods',Pod,this.httpOptions)
  }

  registerGuia(guia:any): Observable<any>{
    return this.http.post<any>(this.url+'/api/guiastransporte',guia,this.httpOptions)
  }

  registerUser(user:any): Observable<any>{
    return this.http.post<any>(this.url+'/api/register',user,this.httpOptions)
  }

  data:any;
  loginUser(user: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/data');
  }

  authUser(): Observable<any>{
    return this.http.get<any>(this.url+'/api/user',{
      withCredentials: true
    })
 
  }


  logout(): Observable<any>{

    return this.http.post<any>(this.url+'/api/logout',{},{withCredentials: true})

  }
  
}
