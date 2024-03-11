import { Component } from '@angular/core';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.css'
})
export class SkeletonComponent {
  guias: any[] = []; // Arreglo para almacenar los clientes


  pedidos: any[] = [];
  documentosEntrega: any[] = [];

  constructor(private pedidosLineaService: PedidosService) { }

  ngOnInit(): void {
    this.pedidosLineaService.getPedidosLinea().subscribe((res: any) => {
      this.pedidos = res;
    });
  }

  abrirDetalle(idPedido: number) {
    console.log('Se presionó el botón Abrir en el pedido con ID:', idPedido);

    const request:any =  {
      pedidoId: idPedido
    }

    this.pedidosLineaService.getDocumentosEntregaLinea(request).subscribe(res=>{
      console.log(res)
      this.documentosEntrega = res;
    })

  }

  downloadImage(imageUrl: string): void {
    // Obtener el nombre del archivo de la URL
    const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
  
    // Crear un elemento 'a' para la descarga
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = fileName;
    link.click();
  }


  onFileSelected(event: any, documentoId: number): void {
    const file: File = event.target.files[0]; // Obtener el archivo del evento
    this.pedidosLineaService.uploadDocumentoEntrega(documentoId, file)
    .subscribe(response => {
console.log(response)    

});}

}
