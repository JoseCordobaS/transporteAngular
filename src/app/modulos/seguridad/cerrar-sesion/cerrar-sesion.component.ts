import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css']
})
export class CerrarSesionComponent implements OnInit {

  constructor(private seguridadService: SeguridadService,
    private router: Router) { }

  ngOnInit(): void {
    this.seguridadService.eliminarSesion();
    Swal.fire({
      icon: 'success',
      title: 'Ha cerrado sesión, que está bien',
      showConfirmButton: false,
      timer: 2500
    }) 
    this.router.navigate(['/seguridad/login']);
  }

}
