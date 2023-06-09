import { Component, Host, Optional, SkipSelf, forwardRef } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorComponent } from 'subform-control-value-accessor'; //import abstract class

//create provider for ControlValueAccessor
const CUSTOM_VALUE_ACCESSOR = {       
  provide: NG_VALUE_ACCESSOR, 
  useExisting: forwardRef(() => CustomComponent),
  multi: true     
};

@Component({
  selector: 'custom-component',
  templateUrl: './custom.component.html',
  providers: [CUSTOM_VALUE_ACCESSOR] //set provider
})
export class CustomComponent extends ControlValueAccessorComponent<string>  { //extend class with ControlValueAccessorComponent<T>. 
  //ControlValueAccessorComponent<T> is generic class. Set your parameter type.

  /**
   * ControlValueAccessorComponent<T> uses ControlContainer parameter in constructor
   */
  constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer){
    super(controlContainer);
  }

  /**
   * implement abstraction properties
   * 
   * ControlValueAccessorComponent<T> has 2 getters and setters for linked data: "value" and "data"
   * "data" is internal property without "onChange" event. This property is used by "writeValue" method ("ControlValueAccessor" interface)
   * "value" is public property with "onChange" event. 
   * "value" === "data" + "onChange" event
   */
  private _data: string | null = null;

  protected get data(): string | null { //data: T | null
    return this._data;
  }

  protected set data(value : string | null){ //data: T | null
    this._data = value;
  }
}
