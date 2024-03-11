import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegisterServicesService } from '../../services/registerServices/register-services.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { emitterLoggin } from '../../emitters/emitterLoggin';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,MatProgressSpinnerModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})


export class HeaderComponent {
  authenticated = false;

  constructor(private userService:RegisterServicesService){

  }

autenticacion:any
ngOnInit():void{

this.autenticacion = localStorage.getItem('log');
console.log(this.autenticacion,"this")

  emitterLoggin.authemitter.subscribe((auth:boolean)=>{
    this.authenticated = auth;
  })
}

logout():void{
  
  
}
  
}
