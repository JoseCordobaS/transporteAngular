import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioModelo } from 'src/app/modelos/servicio.model';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private servicioService: ServiciosService,
    private router: Router,
    private route: ActivatedRoute) { }

    fgValidacion = this.fb.group({
      id: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],
      placa_vehiculo: ['', [Validators.required]],
      nombre_conductor: ['', [Validators.required]],
      dinero_recogido: ['', [Validators.required]],
      ruta: ['', [Validators.required]],
    });

  id: string = ''


  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
  }

  buscarRegistro(id: string) {
    this.servicioService.getWithId(id).subscribe((data: ServicioModelo) => {
      console.log("ID...:" +this.fgValidacion.controls["id"])
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["fecha"].setValue(data.fecha);
      this.fgValidacion.controls["hora_inicio"].setValue(data.hora_inicio);
      this.fgValidacion.controls["hora_fin"].setValue(data.hora_fin);
      this.fgValidacion.controls["placa_vehiculo"].setValue(data.placa_vehiculo);
      this.fgValidacion.controls["nombre_conductor"].setValue(data.nombre_conductor);
      this.fgValidacion.controls["dinero_recogido"].setValue(data.dinero_recogido);
      this.fgValidacion.controls["ruta"].setValue(data.ruta);      
    })
  }

  edit() {
    let servicio = new ServicioModelo();
    servicio.id = this.fgValidacion.controls["id"].value;
    servicio.fecha= new Date(this.fgValidacion.controls["fecha"].value).toISOString();
    servicio.hora_inicio = this.fgValidacion.controls["hora_inicio"].value;
    servicio.hora_fin = this.fgValidacion.controls["hora_fin"].value;
    servicio.placa_vehiculo = this.fgValidacion.controls["placa_vehiculo"].value;
    servicio.nombre_conductor = this.fgValidacion.controls["nombre_conductor"].value;
    servicio.dinero_recogido = this.fgValidacion.controls["dinero_recogido"].value;
    servicio.ruta = this.fgValidacion.controls["ruta"].value;


    this.servicioService.update(servicio).subscribe((data: ServicioModelo) => {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/servicios/get']);
    },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
  }


}
