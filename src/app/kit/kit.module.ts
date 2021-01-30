import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityInputFieldComponent } from './city-input-field/city-input-field.component';
import {FormsModule} from '@angular/forms';
import { CountdownComponent } from './countdown/countdown.component';



@NgModule({
    declarations: [CityInputFieldComponent, CountdownComponent],
    exports: [
        CityInputFieldComponent,
        CountdownComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class KitModule { }
