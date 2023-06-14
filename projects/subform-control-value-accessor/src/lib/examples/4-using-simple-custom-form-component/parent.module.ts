import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentComponent } from './parent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormModule } from '../3-simple-custom-form-component/custom-form.module';



@NgModule({
  declarations: [
    ParentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormModule
  ]
})
export class ParentModule { }
