import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  
  constructor(private http: HttpClient) { }
  url:string = "http://localhost:8000"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })


    
  }


  getProductos(){
    return this.http.get<any>(this.url+'/api/productos',this.httpOptions)
  }

  
}
