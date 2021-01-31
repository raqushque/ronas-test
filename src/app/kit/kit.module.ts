import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityInputFieldComponent } from './city-input-field/city-input-field.component';
import {FormsModule} from '@angular/forms';
import { CountdownComponent } from './countdown/countdown.component';
import { TempUnitsSelectComponent } from './temp-units-select/temp-units-select.component';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
    declarations: [CityInputFieldComponent, CountdownComponent, TempUnitsSelectComponent, SpinnerComponent],
  exports: [
    CityInputFieldComponent,
    CountdownComponent,
    TempUnitsSelectComponent,
    SpinnerComponent
  ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class KitModule { }
