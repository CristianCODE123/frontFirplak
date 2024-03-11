import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterServicesService } from '../../services/registerServices/register-services.service';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { CommonModule } from '@angular/common';
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
  
  constructor(
    private formBuilder: FormBuilder,
    private userService:RegisterServicesService,
    private router: Router,
    private http: HttpClient
    ){
  }

  pods: any[] = [];
  correoDestino: string = '';

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

  enviarCorreo(): void {
    // Aquí puedes enviar el correo utilizando el servicio correspondiente, por ejemplo:
    // this.correoService.enviarCorreo(this.correoDestino, this.pods.map(pod => pod.Foto_POD));
  }

  ngOnInit():void{


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

  // Enviar los datos al backend mediante una solicitud HTTP
  this.http.post<any>('http://localhost:8000/api/pods', formData)
    .subscribe(response => {
      console.log(response); // Manejar la respuesta del backend
    });
}




 
}
