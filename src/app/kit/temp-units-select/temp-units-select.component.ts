import {Component, OnInit} from '@angular/core';
import {WeatherSettingsService} from '@services/weather-settings.service';

@Component({
    selector: 'app-temp-units-select',
    templateUrl: './temp-units-select.component.html',
    styleUrls: ['./temp-units-select.component.scss']
})
export class TempUnitsSelectComponent implements OnInit {
    constructor(private weatherStorage: WeatherSettingsService) {
    }
    get defaultUnit() {
        return localStorage.getItem('ronastest-temp-units');
    }
    radioChanged(event) {
        this.weatherStorage.setDisplayMode(event.target.value);
    }
    ngOnInit(): void {
    }

}
