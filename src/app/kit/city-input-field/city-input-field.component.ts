import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-city-input-field',
    templateUrl: './city-input-field.component.html',
    styleUrls: ['./city-input-field.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CityInputFieldComponent),
        multi: true
    }]
})
export class CityInputFieldComponent implements OnInit, ControlValueAccessor {
    private _value;
    constructor() {
    }
    set value(val) {
        this._value = val;
    }
    get value() {
        return this._value;
    }
    ngOnInit(): void {
    }
    propagateChange: any = () => {};
    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }
    onChange(value) {
        this.propagateChange(value);
    }
    registerOnTouched(fn: any): void {
    }

    writeValue(obj: any): void {
        this._value = obj;
    }

}
