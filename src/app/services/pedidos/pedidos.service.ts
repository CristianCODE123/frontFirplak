import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  url:string = "http://localhost:8000"

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  registerPedido(pedido:any): Observable<any>{
    return this.http.post<any>(this.url+'/api/pedidos',pedido,this.httpOptions)
  }

  registerLineaPedido(pedidoId: number, lineaPedido: any): Observable<any> {
    return this.http.post<any>(this.url + '/api/crearPedido/' + pedidoId, lineaPedido, this.httpOptions);
  }

  getPedidosLinea(){
    return this.http.get<any>(this.url+'/api/PedidosConLineas',this.httpOptions)

  }

  getDocumentosEntregaLinea(pedidoId:any): Observable<any>{
    return this.http.post<any>(this.url+'/api/DocumentosEntrega',pedidoId,this.httpOptions)
  }


 uploadDocumentoEntrega(documentoId: number, file: File): Observable<any> {
    const formData: FormData = new FormData(); // Crear un objeto FormData
    formData.append('file', file, file.name); // Agregar el archivo al FormData

    // Hacer la solicitud HTTP con el FormData
    return this.http.post<any>(`${this.url}/api/subirDocEntrega/${documentoId}`, formData);
    
}


  
}
