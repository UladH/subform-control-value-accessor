# SubformControlValueAccessor

SubformControlValueAccessor is ControlValueAccessor interface implementation project for Angular Framework.
Current project contains realized 2 abstract classes: **ControlValueAccessorComponent<T>** for simple custom controls and **FormControlValueAccessorComponent<T>** for subforms

## Install

You can run this command in your terminal

```bash
$ npm install subform-control-value-accessor
```

## Usage

### ControlValueAccessorComponent<T>

ControlValueAccessorComponent<T> is abstract class for simple **(not subform)** custom form controls.
This implementation support not only ControlValueAccessor interface functions but error managment too

#### Properties

<table>
    <tr>
        <th>Property</th>
        <th>Decorator, Modificator</th>
        <th>Type</th>
        <th>Default Value</th>
        <th>Example</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>errorMessages</td>
        <td>@Input() public</td>
        <td>[key: string]: string | ((control: AbstractControl) => string)</td>
        <td>{}</td>
        <td style="display: block; white-space: pre">
{
    'required': 'Field is required',
    'minlength': (control: AbstractControl) 
        => 'Min length is 4 characters'
}
        </td>        
        <td>Error messages object. <b>ControlValueAccessorComponent</b> support displaying errors managment. Current realization check all active errors and sort all messages to showing it in component html. <b>key</b> is error message</td>
    </tr>
    <tr>
        <td>formControlName</td>
        <td>@Input() public</td>
        <td>string | null</td>
        <td>null</td>
        <td>"login"</td>        
        <td>This property is used in form for getting correct control object</td>
    </tr>
    <tr>
        <td>disabled</td>
        <td>@Input() public</td>
        <td>boolean</td>
        <td>false</td>
        <td> false </td>        
        <td>This property is part of ControlValueAccessor implementation. Developer should realize this functionallity in custom control html for correct realization, but this property doesn't affect the basic functionality </td>
    </tr>
    <tr>
        <td>value</td>
        <td>@Input() public set/get</td>
        <td>T | null</td>
        <td></td>
        <td></td>        
        <td>This property is <b>PUBLIC</b> getters and setter for linked data. Setter sets value to <b>data</b> property and triggers <b>onChange</b> event </td>
    </tr>
    <tr>
        <td>isValid</td>
        <td>public get</td>
        <td>booleen</td>
        <td></td>
        <td>true</td>        
        <td>Returns valid status of control. Works only inside form </td>
    </tr>
    <tr>
        <td>activeErrorMessages</td>
        <td>public get</td>
        <td>string[]</td>
        <td></td>
        <td>['Field is required', 'Min length is 4 characters']</td>        
        <td>Returns array of messages for active errors</td>
    </tr>
    <tr>
        <td>control</td>
        <td>protected</td>
        <td>AbstractControl | null</td>
        <td>null</td>
        <td></td>        
        <td>Internal property. This is set in the <b>ngOnInit</b> method if custom control is used in form. Property is used in the error messages manangment</td>
    </tr>
    <tr>
        <td>data</td>
        <td>protected abstract set/get</td>
        <td>T | null</td>
        <td></td>
        <td></td>        
        <td>This property is <b>INTERNAL</b> getters and setter for linked data. Setter doesn't trigger <b>onChange</b> event </td>
    </tr>
    <tr>
        <td>onChangeCallback</td>
        <td>protected</td>
        <td>(_: T | null) => void</td>
        <td>() => {}</td>
        <td></td>        
        <td>This property is part of ControlValueAccessor implementation. This is set in <b>registerOnChange</b> method. Calling this method trigger <b>onChange</b> event</td>
    </tr>
    <tr>
        <td>onTouchedCallback</td>
        <td>protected</td>
        <td>() => void</td>
        <td>() => {}</td>
        <td></td>        
        <td>This property is part of ControlValueAccessor implementation. This is set in <b>registerOnTouched</b> method. Calling of this method trigger <b>blur</b> event</td>
    </tr>
</table>

### Methods

<table>
    <tr>
        <th>Method</th>
        <th>Modificator</th>
        <th>Arguments</th>
        <th>Return type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>ngOnInit</td>
        <td>public</td>
        <td></td>
        <td>void</td>
        <td>OnInit interface implementation. This method set control object to <b>control</b> property if current control inside form</td>
    </tr>
    <tr>
        <td>writeValue</td>
        <td>public</td>
        <td>value: T (generic)</td>
        <td>void</td>
        <td>ControlValueAccessor interface implementation. This method set value to <b>data</b> setter</td>
    </tr>
    <tr>
        <td>registerOnChange</td>
        <td>public</td>
        <td>callback: (_: T | null) => void</td>
        <td>void</td>
        <td>ControlValueAccessor interface implementation. This method set callback to <b>onChangeCallback</b> property</td>
    </tr>
    <tr>
        <td>registerOnTouched</td>
        <td>public</td>
        <td>callback: () => void</td>
        <td>void</td>
        <td>ControlValueAccessor interface implementation. This method set callback to <b>onTouchedCallback</b> property</td>
    </tr>
    <tr>
        <td>setDisabledState</td>
        <td>public</td>
        <td>isDisabled: boolean</td>
        <td>void</td>
        <td>ControlValueAccessor interface implementation. This method set isDisabled to <b>disabled</b> property</td>
    </tr>    
    <tr>
        <td>getErrorsMessages</td>
        <td>protected</td>
        <td></td>
        <td>string[]</td>
        <td>This method filters error messages from <b>errorMessages</b> property by active <b>control</b> errors and returns this array</td>
    </tr>
</table>

### Creating simple custom control

#### Module

Add **FormModule** to your module for ngModel

```ts
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
    CustomComponent
  ]
})
export class CustomModule { }

```

#### Component class

Extend your class component from **ControlValueAccessorComponent<T>** and set your control data type

```ts

export class CustomComponent extends ControlValueAccessorComponent<string> 

```

Provide **ControlContainer** object to constructor

```ts

constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer){
    super(controlContainer);
}

```

Implement abstract property **data**. 
**ControlValueAccessorComponent<T>** has 2 getters and setters for linked data: **"value"** and **"data"**
**"data"** is internal property without **"onChange"** event. This property is used by **"writeValue"** method (**"ControlValueAccessor"** interface)
**"value"** is public property with **"onChange"** event. 
**"value"** === **"data"** + **"onChange"** event

```ts

private _data: string | null = null;

  protected get data(): string | null { // data: T | null
    return this._data;
  }

  protected set data(value : string | null){ // data: T | null
    this._data = value;
  }

```

Set provider

```ts

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

```

Full component code. You can find this code in examples.

```ts

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
export class CustomComponent extends ControlValueAccessorComponent<string>  { // extend class with ControlValueAccessorComponent<T>. 
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

```

#### Component html

Create component template and link **ngModel** to **PUBLIC "value"** property

```html

<input [(ngModel)]="value">
<p *ngFor="let error of activeErrorMessages">{{ error }}</p> 

```

### Using custom control in parent component with ngModel without form

#### Component class

Set data property for ngModel linking

```ts

export class ParentComponent {
  public data: string = 'non-form data';
}

```

#### Component html

Create component template and link **data** property to ngModel

```html

<custom-component [(ngModel)]="data"></custom-component>

<p>{{ data }}</p>


```

### Using custom control in parent component with form

#### Component class

Set and initalize **form** property and object with custom error messages

```ts

export class ParentComponent {
  constructor(private formBuilder: FormBuilder){}

  public form!: FormGroup;

  public errorMessages = {
    'required': 'Field is required',
    'minlength': (control: AbstractControl) => 'Min length is 4 characters'
  };

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      custom: ['custom control value', [Validators.required, Validators.minLength(4)]]
    });
  }
}

```

#### Component html

Create component template and link control to form

```html

<form [formGroup]="form">

    <label for="custom">Custom Control</label>
    <custom-component
        formControlName="custom" 
        name="custom"
        style="display: block;"
        [errorMessages]="errorMessages">
    </custom-component>
</form>

<p>Form valid: {{ form.valid }}</p>
<p>Form value: {{ form.value | json }}</p>

```

### FormControlValueAccessorComponent<T>

FormControlValueAccessorComponent<T> is abstract class for custom subform controls.
This class extends ControlValueAccessorComponent<T> and adds new functionality for subform controls.

#### Properties
Only new or overided properties are described here

<table>
  <tr>
    <th>Property</th>
    <th>Decorator, Modificator</th>
    <th>Type</th>
    <th>Default Value</th>
    <th>Example</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>componentSubscriptions</td>
    <td>protected</td>
    <td>Subscription</td>
    <td></td>
    <td></td>        
    <td>Object contains all component subscriptions</td>
  </tr>
  <tr>
    <td>form</td>
    <td>public abstract get</td>
    <td>FormGroup</td>
    <td></td>
    <td></td>        
    <td>Component form getter</td>
  </tr>
  <tr>
    <td>data</td>
    <td>protected set/get</td>
    <td>T | null</td>
    <td></td>
    <td></td>        
    <td>ControlValueAccessorComponent data property implementation. Setter calls <b>patchForm</b> method. Getter returns <b>form</b>.value</td>
  </tr>
<table>

### Methods

Only new or overided methods are described here

<table>
    <tr>
        <th>Method</th>
        <th>Modificator</th>
        <th>Arguments</th>
        <th>Return type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>ngOnInit</td>
        <td>public override</td>
        <td></td>
        <td>void</td>
        <td>This method extends ControlValueAccessorComponent ngOnInit method. Calls <b>initForm</b> and <b>addSubscriptions</b> methods</td>
    </tr>
    <tr>
        <td>ngOnDestroy</td>
        <td>public</td>
        <td></td>
        <td>void</td>
        <td>OnDestroy interface implementation. This method calls <b>removeSubscriptions</b> method</td>
    </tr>
    <tr>
        <td>ngAfterViewInit</td>
        <td>public</td>
        <td></td>
        <td>void</td>
        <td>AfterViewInit interface implementation. This method realize parent form value update hook for control default values</td>
    </tr>
    <tr>
        <td>validate</td>
        <td>public</td>
        <td>control?: AbstractControl</td>
        <td>ValidationErrors | null</td>
        <td>Validator interface implementation. This method returns <b>form</b> error to parent form when component has internal validation errors</td>
    </tr>
    <tr>
        <td>initForm</td>
        <td>protected abstract</td>
        <td>value: T | null</td>
        <td>void</td>
        <td>Abstract form initialization method</td>
    </tr>
    <tr>
        <td>patchForm</td>
        <td>protected abstract</td>
        <td>value: T | null</td>
        <td>void</td>
        <td>Abstract form patching method</td>
    </tr>
    <tr>
        <td>onFormValueChangedHandler</td>
        <td>protected</td>
        <td>value: T | null</td>
        <td>void</td>
        <td><b>form.valueChanges</b> event handler. Triggers component <b>onChangeCallback</b> event</td>
    </tr>
    <tr>
        <td>addSubscriptions</td>
        <td>protected</td>
        <td></td>
        <td>void</td>
        <td>Method adds component subscriptions to <b>componentSubscriptions</b> property</td>
    </tr>
    <tr>
        <td>removeSubscriptions</td>
        <td>protected</td>
        <td></td>
        <td>void</td>
        <td>Method removes component subscriptions from <b>componentSubscriptions</b> property</td>
    </tr>
</table>

### Creating simple custom form control

#### Module

Add **ReactiveFormsModule** to your module

```ts

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CustomFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomFormModule { }

```

#### Component class

Extend your class component from **FormControlValueAccessorComponent<T>** and set your control data type

```ts

export class CustomFormComponent extends FormControlValueAccessorComponent<FormModel>

```

Provide **ControlContainer** and **FormBuilder** objects to constructor

```ts

constructor(
    @Optional() @Host() @SkipSelf() controlContainer: ControlContainer,
    private formBuilder: FormBuilder) {
    super(controlContainer);
  }

```

Implement **form** abstract getter

```ts

private _form!: FormGroup;

public get form(): FormGroup {
  return this._form;  
}

```

Implement **initForm** and **patchForm** methods

```ts

protected initForm(): void {
    this._form = this.formBuilder.group({
      firstName: ['John', [Validators.required]], //default form data
      lastName: ['Doe', [Validators.required]] //default form data
    });
}

protected patchForm(value: FormModel | null): void {
    value && this.form.patchValue(value);
}

```

Create providers for **NG_VALUE_ACCESSOR** and **NG_VALIDATORS** and your component

```ts

const CUSTOM_FORM_VALUE_ACCESSOR = {       
  provide: NG_VALUE_ACCESSOR, 
  useExisting: forwardRef(() => CustomFormComponent),
  multi: true     
};

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

```

Full component code. You can find this code in examples.

```ts

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

```

#### Component html

Create component template and link **formGroup** to **"form"** property

```html

<form [formGroup]="form">

    <label for="firstName">First Name</label>
    <input formControlName="firstName" name="default" style="display: block;"/>
    <ng-container *ngIf="this.form.controls['firstName'].invalid">
        <p style="color:red" *ngIf="this.form.controls['firstName'].errors?.['required']">Field is required</p>
    </ng-container>
    
    <label for="lastName">Last Name</label>
    <input formControlName="lastName" name="default" style="display: block;"/>
    <ng-container *ngIf="this.form.controls['lastName'].invalid">
        <p style="color:red" *ngIf="this.form.controls['lastName'].errors?.['required']">Field is required</p>
    </ng-container>
</form>

```

### Using custom control in parent component

#### Parent component class

Create and initialize FormGroup object

```ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'parent',
  templateUrl: './parent.component.html'
})
export class ParentComponent implements OnInit {
  constructor(private formBuilder: FormBuilder){}

  public form!: FormGroup;

  /**
   * Initialize form. You can set default value to custom component. If you set null then component uses component default value
   */
  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      custom: [{firstName: 'Jane', lastName: 'Doe'}],
    });
  }
}

```

#### Parent component html

Create form template and provide custom component as form control

```html

<form [formGroup]="form">
    <custom-form formControlName="custom"></custom-form>
</form>

<p>Form Valid: {{ form.valid }}</p>
<p>Form Value: {{ form.value | json }}</p>

```

# Summary

All examples you can find in [git project page](https://github.com/UladH/subform-control-value-accessor)
Good luck!


