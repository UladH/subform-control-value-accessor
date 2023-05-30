import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomComponent } from './custom.component';
import { FormsModule } from '@angular/forms'; // add FormsModule for ngModel



@NgModule({
  declarations: [
    CustomComponent
  ],
  imports: [
    CommonModule,
    FormsModule // add FormsModule for ngModel
  ],
  exports: [
    CustomComponent //this component is used in the next examples
  ]
})
export class CustomModule { }
