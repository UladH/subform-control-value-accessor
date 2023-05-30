import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomComponentComponent } from './custom-component.component';
import { FormsModule } from '@angular/forms'; // add FormsModule for ngModel



@NgModule({
  declarations: [
    CustomComponentComponent
  ],
  imports: [
    CommonModule,
    FormsModule // add FormsModule for ngModel
  ],
  exports: [
    CustomComponentComponent //this component is used in the next examples
  ]
})
export class CustomComponentModule { }
