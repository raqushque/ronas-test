import {Component, OnInit, ViewChild} from '@angular/core';
import {CountdownComponent} from '../../kit/countdown/countdown.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {OpenweathermapService} from '@services/openweathermap.service';
import {GeocodingResponse, LocationsList} from '../../types/geocoding-response';
import {uniqWith} from 'lodash';

@Component({
    selector: 'app-city-select',
    templateUrl: './city-select.component.html',
    styleUrls: ['./city-select.component.scss']
})
export class CitySelectComponent implements OnInit {
    @ViewChild('countdown') countdownComponent: CountdownComponent;
    private cityInputTimeout: any;
    citiesList: LocationsList[];
    form: FormGroup;
    constructor(private fb: FormBuilder,
                private weatherService: OpenweathermapService) {
        this.form = fb.group({
            city: ['']
        });
        this.form.controls['city'].valueChanges.pipe(debounceTime(0), distinctUntilChanged())
            .subscribe(value => this.handleInputChange(value));
    }

    ngOnInit(): void {
    }
    resetCountdown() {
        this.countdownComponent.resetCountdown();
    }
    handleInputChange(value: string) {
        clearTimeout(this.cityInputTimeout);
        if (value !== '') {
            this.resetCountdown();
            this.cityInputTimeout = setTimeout((_ => {
                this.getCitiesList(value);
            }), 2000);
        } else {
            this.countdownComponent.disableCountdown();
        }
    }
    getCitiesList(cityName: string) {
        this.weatherService.geocode(cityName).subscribe((res: GeocodingResponse[]) => {
            console.log(res);
            this.citiesList = res.map(el => {
                return {country: el.country, name: el.local_names.ru ?? el.local_names.feature_name,
                    lat: el.lat, lon: el.lon, state: el.state};
            });
            this.citiesList = uniqWith(this.citiesList, (a: LocationsList, b: LocationsList) => {
                return a.country === b.country && a.name === b.name && a.state === b.state;
            });
            console.log(this.citiesList);
        }, error => {

        });
    }
}
