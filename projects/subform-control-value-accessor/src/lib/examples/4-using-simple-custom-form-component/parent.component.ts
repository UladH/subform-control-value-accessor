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
      custom: [{firstName: 'azaza', lastName: 'ahaha'}],
    });
  }
}
