import { Component, Host, Optional, SkipSelf, forwardRef } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { FormControlValueAccessorComponent } from 'subform-control-value-accessor';

/**
 * Component data structure
 */
interface FormModel {
  firstName: string;
  lastName: string
}

/**
 * NG_VALUE_ACCESSOR provider for custom control
 */
const CUSTOM_FORM_VALUE_ACCESSOR = {       
  provide: NG_VALUE_ACCESSOR, 
  useExisting: forwardRef(() => CustomFormComponent),
  multi: true     
};

/**
 * NG_VALIDATORS provider for custom control
 */
const CUSTOM_FORM_VALIDATORS = {
  provide: NG_VALIDATORS, 
  useExisting: forwardRef(() => CustomFormComponent), 
  multi: true
};

@Component({
  selector: 'custom-form',
  templateUrl: './custom-form.component.html',
  providers: [ CUSTOM_FORM_VALUE_ACCESSOR, CUSTOM_FORM_VALIDATORS ] // Add providers to component decorator
})
export class CustomFormComponent extends FormControlValueAccessorComponent<FormModel> { // extend FormControlValueAccessorComponent and set your data type
  private _form!: FormGroup;
  
  constructor(
    @Optional() @Host() @SkipSelf() controlContainer: ControlContainer,
    private formBuilder: FormBuilder) {
    super(controlContainer);
  }

  /**
   * Implememt form getter
   */
  public get form(): FormGroup {
    return this._form;  
  }

  /**
   * Implement form initialization method
   */
  protected initForm(): void {
    this._form = this.formBuilder.group({
      firstName: ['John', [Validators.required]], //default form data
      lastName: ['Doe', [Validators.required]] //default form data
    });
  }

  /**
   * Implement for patching method
   */
  protected patchForm(value: FormModel | null): void {
    value && this.form.patchValue(value);
  }
}
