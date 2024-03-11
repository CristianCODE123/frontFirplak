import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { SkeletonComponent } from '../../layout/skeleton/skeleton.component';
import { RegisterServicesService } from '../../services/registerServices/register-services.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { emitterLoggin } from '../../emitters/emitterLoggin';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-pages-home',
  standalone: true,
  imports: [MatProgressSpinner, RouterOutlet,FooterComponent,HeaderComponent,SkeletonComponent,RouterLink],
  templateUrl: './pages-home.component.html',
  styleUrl: './pages-home.component.css'
})
export class PagesHomeComponent {

 
   
}
