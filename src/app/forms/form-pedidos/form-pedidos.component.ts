import { Component } from '@angular/core';
import { RegisterServicesService } from '../../services/registerServices/register-services.service';
import { ClienteService } from '../../services/cliente.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ProductosService } from '../../services/productos/productos.service';
import { PedidosService } from '../../services/pedidos/pedidos.service';

interface ProductoSeleccionado {
  ClienteId: number;
  fechaEntrega: string;
  fechaPedido: string;
  fechaDespacho: string;
  GuiaTransporteID: number;
  CantidadProducto: number;
  Tipolinea: string;
  ProductoID: number;
  NombreProducto: string;
  Precio: string;
  Descripcion: string;
}




@Component({
  selector: 'app-form-pedidos',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule ],
  templateUrl: './form-pedidos.component.html',
  styleUrl: './form-pedidos.component.css'
})


export class FormPedidosComponent {
clienteSeleccionado: any;
selectedClienteId: number | undefined;
selectedProductoId: number | undefined;




  constructor(private pedidosService: PedidosService, private productoss:ProductosService,  private userService:RegisterServicesService, private clienteS:ClienteService,private formBuilder: FormBuilder){

  }
  miFormulario!: FormGroup;
  isloading:boolean = false;
  clientes: any[] = []; // Arreglo para almacenar los clientes
  productosData: any[] = []; // Arreglo para almacenar los productos
  productosSeleccionados: any[] = [];



  ngOnInit(): void {

    this.miFormulario = this.formBuilder.group({
      ClienteId: ['', Validators.required],
      fechaEntrega: ['', Validators.required],
      fechaPedido: ['', Validators.required],
      fechaDespacho: ['', Validators.required],
      GuiaTransporteID:[''],
      CantidadProducto:['', Validators.required],
      Tipolinea:['', Validators.required]
    });
 

    this.clienteS.getClientes().subscribe(res => {
      this.clientes = res;
      // Establecer el primer cliente como seleccionado por defecto
      if (this.clientes.length > 0) {
        this.selectedClienteId = this.clientes[0].ClienteID;
      }
    });

    this.productoss.getProductos().subscribe(res=>{
      this.productosData = res;
      if (this.productosData.length > 0) {
        this.selectedProductoId = this.productosData[0].ProductoID;
      }
    })
   
  }
  selectedProduct: any | undefined;

   onProductoSeleccionado(): void {
    // Aquí puedes poner la lógica específica que necesitas para agregar una línea de pedido
  const productId =  parseInt(this.miFormulario.get('GuiaTransporteID')?.value) 
  const selectedProduct = this.productosData.find(producto => producto.ProductoID === productId);
 
 

    if (this.miFormulario.valid) {
      if (selectedProduct) { 
        const nuevoProductoSeleccionado: ProductoSeleccionado = {
          ClienteId: this.miFormulario.get('ClienteId')?.value,
          fechaEntrega: this.miFormulario.get('fechaEntrega')?.value,
          fechaPedido: this.miFormulario.get('fechaPedido')?.value,
          fechaDespacho: this.miFormulario.get('fechaDespacho')?.value,
          GuiaTransporteID: this.miFormulario.get('GuiaTransporteID')?.value,
          CantidadProducto: this.miFormulario.get('CantidadProducto')?.value,
          Tipolinea: this.miFormulario.get('Tipolinea')?.value,
          ProductoID: selectedProduct.ProductoID,
          NombreProducto: selectedProduct.NombreProducto,
          Precio: selectedProduct.Precio,
          Descripcion: selectedProduct.Descripcion
        };
        this.productosSeleccionados.push(nuevoProductoSeleccionado);
      }
    } else {
      alert('Faltan campos por completar en el formulario.');

    }

  
  }

  onClienteSeleccionado(): void {
    const clienteSeleccionado = this.miFormulario.value;
    console.log('Cliente seleccionado:', clienteSeleccionado);
  }

  InsertarPedido() {
    if (this.miFormulario.valid) {
      this.pedidosService.registerPedido(this.miFormulario.getRawValue()).subscribe(
        (response: any) => {
          console.log(response)
          const pedidoId = response.pedido_id; // Suponiendo que el servidor devuelve el ID del pedido creado
  
          // Luego de obtener el ID del pedido, registra las líneas de pedido
          this.pedidosService.registerLineaPedido(pedidoId, this.productosSeleccionados).subscribe(
            (res: any) => {
              console.log(res);
              // Aquí puedes realizar cualquier acción adicional después de crear las líneas de pedido
            },
            error => {
              console.error('Error al registrar las líneas de pedido:', error);
            }
          );
        },
        error => {
          console.error('Error al registrar el pedido:', error);
        }
      );
    } else {
      alert('Faltan campos por completar en el formulario.');
    }
  }

  lineasPedido: any[] = [];

 
}
