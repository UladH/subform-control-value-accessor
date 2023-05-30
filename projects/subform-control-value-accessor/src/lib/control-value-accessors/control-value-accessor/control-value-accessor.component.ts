import { Component, Host, Input, OnInit, Optional, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor } from '@angular/forms';

/**
 * ControlValueAccessor interface implementation
 * Support in-form and out-of-form realizations, error message managment
 */
@Component({
  template: ''
})
export abstract class ControlValueAccessorComponent<T> implements OnInit, ControlValueAccessor {
  /**
   * An object contains messages or functions for generating strings for error types
   * 
   * @public
   * @param key is error type 
   * @defaultValue {}
   */
  @Input() public errorMessages: { [key: string]: string | ((control: AbstractControl) => string) } = {};

  /**
   * Form control name.
   * 
   * @public
   * @defaultValue null
   */
  @Input() public formControlName: string | null = null;

  /**
   * Control disable flag
   * 
   * @public
   * @defaultValue false
   */
  @Input() public disabled: boolean = false;

  /**
   * AbstractControl object. It's set in the 'ngOnInit' method if the element is part of the form
   * 
   * @protected
   * @defaultValue null
   */
  protected control: AbstractControl | null = null;

  /**
   * onChange callback
   * 
   * @protected
   * @defaultValue () => {}
   */
  protected onChangeCallback: (_: T | null) => void = () => {};

   /**
   * onTouched callback
   * 
   * @protected
   * @defaultValue () => {}
   */
  protected onTouchedCallback: () => void = () => {};

  //#region constructor

  constructor(@Optional() @Host() @SkipSelf() protected controlContainer: ControlContainer) {}

  //#endregion

  //#region lifecycle hooks

  /**
   * ngOnInit implementation
   * 
   * @remarks
   * 
   * It's set contol property if component is a form part
   * 
   * @public 
   */
  public ngOnInit(): void {
    if (this.controlContainer?.control && this.formControlName) {
      this.control = this.controlContainer.control.get(this.formControlName);
    }
  }

  //#endregion

  //#region implements ControlValueAccessor

  public writeValue(value: T): void {
    if (value !== this.data) {
      this.data = value;
    }
  }

  public registerOnChange(callback: (_: T | null) => void): void {
    this.onChangeCallback = callback;
  }

  public registerOnTouched(callback: () => void): void {
    this.onTouchedCallback = callback;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  //#endregion

  //#region getters setters

  /**
   * Public value getter and setter
   * 
   * @public
   */
  public get value(): T | null {
    return this.data;
  }

  @Input() public set value(newValue: T | null) {
    this.data = newValue;
    this.onChangeCallback(this.data);
  }

  /**
   * Component validation flag
   * 
   * @public
   * @readonly
   */
  public get isValid(): boolean {
    return !this.control?.errors || !Object.keys(this.control.errors).length;
  }

  /**
   * Getter is used for displaying all active errors inside component 
   * 
   * @public
   * @readonly
   */
  public get activeErrorMessages(): string[] {
    return this.getErrorsMessages();
  }
  
  /**
   * Internal getter and setter for control value. Method "writeValue" doesn't use public getter/setter,
   * because component doesn't trigger onChange event and it needs additional getter/setter for overriding
   * 
   * @protected
   */
  protected abstract get data(): T | null;

  protected abstract set data(value : T | null);

  //#endregion

  //#region protected

  /**
   * Return error messages by control errors and "errorMessages" property
   * @protected
   * @returns error messages list
   */  
  protected getErrorsMessages(): string[] {
    const errors: string[] = [];

    if (this.isValid) {
      return errors;
    }

    Object.keys(this.control!.errors!).forEach((errorName: string) => {
      const error = this.errorMessages[errorName];

      if (!error) {
        return;
      }

      if(typeof error === 'function'){ 
        const errorFunc = error as (control: AbstractControl) => string;       
        errors.push(errorFunc(this.control!));
        return;
      }
      
      errors.push(error as string);
    });

    return errors;
  }

  //#endregion
}
