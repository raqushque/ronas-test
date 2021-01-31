import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityInputFieldComponent } from './city-input-field/city-input-field.component';
import {FormsModule} from '@angular/forms';
import { CountdownComponent } from './countdown/countdown.component';
import { TempUnitsSelectComponent } from './temp-units-select/temp-units-select.component';



@NgModule({
    declarations: [CityInputFieldComponent, CountdownComponent, TempUnitsSelectComponent],
    exports: [
        CityInputFieldComponent,
        CountdownComponent,
        TempUnitsSelectComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class KitModule { }
