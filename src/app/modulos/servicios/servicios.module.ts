import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { GetComponent } from './get/get.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GetComponent,
    EditComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class ServiciosModule { }
