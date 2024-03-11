import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterServicesService } from '../../services/registerServices/register-services.service';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-guia-transporte',
  standalone: true,
  imports: [FormsModule,HttpClientModule,ReactiveFormsModule,CommonModule],
  templateUrl: './guia-transporte.component.html',
  styleUrl: './guia-transporte.component.css'
})
export class GuiaTransporteComponent {
  FormGuia!: FormGroup;
  clientes: any[] = []; // Arreglo para almacenar los clientes
  selectedClienteId: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private userService:RegisterServicesService,
    private router: Router,
    private http: HttpClient,
    private clienteS:ClienteService
    ){
  }
  ngOnInit():void{
    this.clienteS.getClientes().subscribe(res => {
      this.clientes = res;
      // Establecer el primer cliente como seleccionado por defecto
      if (this.clientes.length > 0) {
        this.selectedClienteId = this.clientes[0].ClienteID;
      }
    });
    this.FormGuia = this.formBuilder.group({
     TransportadoraID: [''],
     Destino: [''],
     ClienteID: ['']
   });


 }


 onClienteSeleccionado(): void {
  const clienteSeleccionado = this.FormGuia.value;
  console.log('Cliente seleccionado:', clienteSeleccionado);
}


 insertaguia(){

  this.userService.registerGuia(this.FormGuia.getRawValue()).subscribe(res=>{
    console.log(res)
  })
}
}
