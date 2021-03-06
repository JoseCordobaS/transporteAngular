import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RutaModelo } from '../modelos/ruta.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  url = "https://apiloopback-transporte.herokuapp.com/"
  token: string = ''

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) {
    this.token = this.seguridadService.getToken();
  }

  getAll(): Observable<RutaModelo[]> {
    return this.http.get<RutaModelo[]>(`${this.url}/rutas`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  store(ruta: RutaModelo): Observable<RutaModelo> {
    return this.http.post<RutaModelo>(`${this.url}/rutas`, {
      origen: ruta.origen,
      destino: ruta.destino,
      tiempo_estimado: ruta.tiempo_estimado,
    },{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  update(ruta: RutaModelo): Observable<RutaModelo> {
    //console.log("ACA LLEGA\n"+ruta.tiempo_estimado +"\n"+ruta.destino+"\n"+ruta.origen+"\n"+ruta.id)
    // console.log("PETICION: "+`${this.url}/rutas/${ruta.id}`)
    return this.http.patch<RutaModelo>(`${this.url}/rutas/${ruta.id}`, {
      origen: ruta.origen,
      destino: ruta.destino,
      tiempo_estimado: ruta.tiempo_estimado
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
    
  }

  delete(id: string): Observable<RutaModelo[]> {
    return this.http.delete<RutaModelo[]>(`${this.url}/rutas/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<RutaModelo> {
    return this.http.get<RutaModelo>(`${this.url}/rutas/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }
}

