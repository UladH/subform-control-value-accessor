import { AfterViewInit, Component, Host, OnDestroy, Optional, SkipSelf } from '@angular/core';
import { ControlValueAccessorComponent } from './control-value-accessor.component';
import { AbstractControl, ControlContainer, FormGroup, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';

/**
 * ControlValueAccessor interface implementation
 * Extends ControlValueAccessorComponent<T> class
 * Current class implements subform controls
 */
@Component({
  template: ''
})
export abstract class FormControlValueAccessorComponent<T> extends ControlValueAccessorComponent<T> implements AfterViewInit, OnDestroy, Validator {
  /**
   * Object with all component subscriptions
   * 
   * @protected
   */
  protected componentSubscriptions: Subscription = new Subscription();

  //#region constructor

  constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer){
    super(controlContainer);
  }
  
  //#endregion

  //#region lifecycle hooks

  /**
   * OnInit interface implementation. It overirides ControlValueAccessorComponent<T> ngOnInit().
   * This method call original ngOnInit then initialized component form and add basic subscription to component
   * 
   * @public
   * @returns void
   */
  public override ngOnInit(): void {
    super.ngOnInit();

    this.initForm();
    this.addSubscriptions();
  }

  /**
   * OnDestroy interface implementation. It removes basic subscription from component
   * 
   * @public
   * @returns void
   */
  public ngOnDestroy(): void {
    this.removeSubscriptions();
  }

  /**
   * AfterViewInit interface implementation. Current method realize hook for updating parent form value after creating.
   * If parent form doesn't have init value for this component and this subform has default value then this hook update parent form value for this control
   * 
   * @public
   * @returns void
   */
  public ngAfterViewInit() {
    setTimeout(() => {
      this.onChangeCallback(this.value);
    })
  }

  //#endregion

  //#region implements Validator

  /**
   * Validator interface implementation.
   * Parent form doesn't know about subform validation. If current subform isn't valid then this method returns { form: true } else null
   * 
   * @param control 
   * @returns { form: true } | null
   */  
  public validate(control?: AbstractControl): ValidationErrors | null {
    return this.form.valid ? null : { form: true };
  }

  //#endregion

  //#region getters setters  
  
  /**
   * Abstract property for getting form object
   * @public
   * @abstract
   */
  public abstract get form(): FormGroup;

  /**
   * ControlValueAccessorComponent abstract property implementation.
   * Setter patches and getter returns form value
   * 
   * @public
   */
  public set data(value: T | null) {
    this.patchForm(value);
  }

  public get data(): T | null {
    return this.form.value;
  }

  //#endregion

  //#region protected
  
  /**
   * Abstract method for form initialization
   * @protected
   * @abstract
   * @returns void
   */
  protected abstract initForm(): void;

   /**
   * Abstract method for form patching
   * @protected
   * @abstract
   * @returns void
   */
  protected abstract patchForm(value: T | null): void;

  /**
   * Form value change callback. It triggers control onChange event
   * @protected
   * @returns void
   */
  protected onFormValueChangedHandler(value: T | null): void {
    this.onChangeCallback(value);
  }

  /**
   * Method adds subscriptions for component
   * 
   * @protected
   * @returns void
   */
  protected addSubscriptions(): void {
    this.componentSubscriptions.add(
      this.form.valueChanges.subscribe(this.onFormValueChangedHandler.bind(this))
    );
  }

  /**
   * Method removes subscriptions for component
   * 
   * @protected
   * @returns void
   */
  protected removeSubscriptions(): void {
    this.componentSubscriptions.unsubscribe();
  }

  //#endregion
}
