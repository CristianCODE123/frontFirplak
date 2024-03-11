import { Component, ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterServicesService } from '../../services/registerServices/register-services.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,HttpClientModule,NgxLoadingModule,MatProgressSpinnerModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  constructor(
    private formBuilder: FormBuilder,
    private userService:RegisterServicesService,
    private router: Router,
    private http: HttpClient
    ){
  }

  @ViewChild('form') form: ElementRef | undefined; // Accede al formulario
  activeTab: string = 'signup'; // Inicialmente mostramos el formulario de registro

  formRegister!: FormGroup;
  formLogin!: FormGroup;
  

  ngOnInit():void{

this.userService.loginUser({}).subscribe(
      (response) => {
        console.log('Datos del servidor:', response);
        // Aquí puedes manejar los datos recibidos del servidor
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  
     this.formRegister = this.formBuilder.group({
      name: '',
      email: '', 
      password: ''
    });

    this.formLogin = this.formBuilder.group({
      email: '', 
      password: ''
    });
    
  }

 


  


  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }
  
  ngAfterViewInit() {
    // Accede a los elementos del formulario
    
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const label = input.previousElementSibling as HTMLLabelElement;

    if (event.type === 'keyup') {
      if (input.value === '') {
        label.classList.remove('active', 'highlight');
      } else {
        label.classList.add('active', 'highlight');
      }
    } else if (event.type === 'blur') {
      if (input.value === '') {
        label.classList.remove('active', 'highlight');
      } else {
        label.classList.remove('highlight');
      }
    } else if (event.type === 'focus') {
      if (input.value === '') {
        label.classList.remove('highlight');
      } else {
        label.classList.add('highlight');
      }
    }
  }


}
