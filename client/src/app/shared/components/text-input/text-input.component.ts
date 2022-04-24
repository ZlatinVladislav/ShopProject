/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, ElementRef, Input, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input', { static: true }) public input: ElementRef;
  @Input() public type = 'text';
  @Input() public label: string;

  public constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  public ngOnInit(): void {
    const control = this.controlDir.control;
    const validators = control.validator ? [control.validator] : [];
    const asyncValidator = control.asyncValidator ? [control.asyncValidator] : [];

    control.setValidators(validators);
    control.setAsyncValidators(asyncValidator);
    control.updateValueAndValidity();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange(event): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched(): void {}

  public writeValue(obj: any): void {
    this.input.nativeElement.value = obj || '';
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
