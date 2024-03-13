import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterServicesService } from '../../services/registerServices/register-services.service';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { CommonModule } from '@angular/common';
import { PedidosService } from '../../services/pedidos/pedidos.service';
@Component({
  selector: 'app-portal-transporte',
  standalone: true,
  imports: [FormsModule,HttpClientModule,ReactiveFormsModule,CommonModule],
  templateUrl: './portal-transporte.component.html',
  styleUrl: './portal-transporte.component.css'
})
export class PortalTransporteComponent {
  formPODs!: FormGroup;
  formLogin!: FormGroup;
  pedidos: any[] = []; // Arreglo para almacenar los clientes
  pedidosLinea: any[] = []; // Arreglo para almacenar los clientes


  constructor(
    private formBuilder: FormBuilder,
    private userService:RegisterServicesService,
    private router: Router,
    private http: HttpClient,
    private pedidosService: PedidosService
    ){
  }

  pods: any[] = [];
  correoDestino: string = '';
  pedidoSeleccionado: any; // Variable para almacenar el ID del pedido seleccionado
  


  downloadImage(imageUrl: string): void {
    // Obtener el nombre del archivo de la URL
    const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);

    // Crear un elemento 'a' para la descarga
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = fileName;
    link.click();
    
  }
  loadPODs(): void {
    this.userService.getPODs()
      .subscribe(data => {
        this.pods = data;
      });
  }
  capturarIdPedido(event: any) {
    this.pedidoSeleccionado = true;

    const idPedidoSeleccionado = event.target.value;
    console.log('ID del pedido seleccionado:', idPedidoSeleccionado);

    this.pedidosService.getPedidoLinea(idPedidoSeleccionado).subscribe(res => {
      this.pedidosLinea = res;
      console.log(res)
      // Establecer el primer cliente como seleccionado por defecto
      if (this.pedidosLinea.length > 0) {
        this.selectedPedidoID = this.pedidosLinea[0].PedidoID;
      }
    });


    // Puedes hacer lo que necesites con el ID capturado aquí
  }
  enviarCorreo(): void {
    // Aquí puedes enviar el correo utilizando el servicio correspondiente, por ejemplo:
    // this.correoService.enviarCorreo(this.correoDestino, this.pods.map(pod => pod.Foto_POD));
  }
  selectedPedidoID: number | undefined;

 

  ngOnInit():void{


    

    this.pedidosService.getPedidos().subscribe(res => {
      this.pedidos = res;
      console.log(res)
      // Establecer el primer cliente como seleccionado por defecto
      if (this.pedidos.length > 0) {
        this.selectedPedidoID = this.pedidos[0].PedidoID;
      }
    });

      this.loadPODs()
    this.formPODs = this.formBuilder.group({
     GuiaTransporteID: [''],
     Foto_POD: [''], 
     Observaciones: ['']
   });

   this.formLogin = this.formBuilder.group({
     email: '', 
     password: ''
   });
   
 }


 onSubmit() {
  const datosPOD = this.formPODs.value;
  this.userService.registerPod(datosPOD).subscribe(response => {
    console.log(response);
  });
}


insertarPOD(event: Event): void {
  event.preventDefault();
  const formData = new FormData();
  const form = event.target as HTMLFormElement;

  // Agregar los datos del formulario al objeto FormData
  formData.append('Foto_POD', form['Foto_POD'].files[0]);
  formData.append('fotoDocumentosTansporte', form['fotoDocumentosTansporte'].files[0]);
  formData.append('Observaciones', form['Observaciones'].value);
  formData.append('NumPedido', form['NumPedido'].value);

  // Obtener el valor seleccionado del select
  const numPedido = form['NumPedidoLinea'].value;
  formData.append('NumPedidoLinea', numPedido);
  console.log(formData)
  // Enviar los datos al backend mediante una solicitud HTTP
  this.http.post<any>('http://localhost:8000/api/pods', formData)
    .subscribe(response => {
      console.log(response); // Manejar la respuesta del backend
    });
}




 
}
