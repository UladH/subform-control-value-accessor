import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentComponent } from './parent.component';
import { CustomModule } from '../1-simple-custom-component/custom.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // add FormsModule for ngModel



@NgModule({
  declarations: [
    ParentComponent
  ],
  imports: [
    CommonModule,
    CustomModule, // custom ControlValueAccessor component from 1st example,
    FormsModule,  // add FormsModule for ngModel
    ReactiveFormsModule //for form
  ]
})
export class ParentModule { }
