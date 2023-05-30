import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'parent',
  templateUrl: './parent.component.html'
})
export class ParentComponent {
  //for example 2.1. Using ngModel
  public data: string = 'non-form data';

  //for example 2.2. Component as form control
  constructor(private formBuilder: FormBuilder){}

  public form!: FormGroup;

  /**
   * Error messages object for custom control
   */
  public errorMessages = {
    'required': 'Field is required',
    'minlength': (control: AbstractControl) => 'Min length is 4 characters'
  };

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      custom: ['custom control value', [Validators.required, Validators.minLength(4)]],
      default: ['default control value', [Validators.required, Validators.minLength(4)]]
    });
  }
}
