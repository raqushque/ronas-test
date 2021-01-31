import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {CountdownComponent} from '../../kit/countdown/countdown.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {OpenweathermapService} from '@services/openweathermap.service';
import {GeocodingResponse, LocationData} from '../../types/geocoding-response';
import {uniqWith} from 'lodash';

@Component({
    selector: 'app-city-select',
    templateUrl: './city-select.component.html',
    styleUrls: ['./city-select.component.scss']
})
export class CitySelectComponent implements OnInit, OnDestroy {
    @ViewChild('countdown') countdownComponent: CountdownComponent;
    @Output() cityData: EventEmitter<LocationData> = new EventEmitter<LocationData>();
    @Input() set cityName(val) {
        if (val === '') {
            this._cityName = 'Город не выбран';
        } else {
            this.form.controls['city'].setValue(val, { emitEvent: false });
            this._cityName = val;
        }
    }
    get cityName() {
        return this._cityName;
    }
    private _cityName: string;
    private cityInputTimeout: any;
    errors: string = '';
    citiesList: LocationData[];
    form: FormGroup;
    display: boolean = true;
    isNowProcessing: boolean = false;
    geolocationProcessing: boolean = false;
    geolocationError: boolean = false;
    constructor(private fb: FormBuilder,
                private weatherService: OpenweathermapService) {
        this.form = fb.group({
            city: ['']
        });
        this.form.controls['city'].valueChanges.pipe(debounceTime(0), distinctUntilChanged())
            .subscribe(value => this.handleInputChange(value));
    }
    get cityNamePresent() {
        return this.form.controls['city'].value.length > 0;
    }
    ngOnDestroy(): void {
        clearTimeout(this.cityInputTimeout);
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
    handleOKClick() {
        clearTimeout(this.cityInputTimeout);
        this.countdownComponent.disableCountdown();
        this.getCitiesList(this.form.controls['city'].value);
    }
    selectCity(city: LocationData) {
        this.cityData.emit(city);
        this.display = true;
        this.citiesList = [];
    }
    getCitiesList(cityName: string) {
        this.isNowProcessing = true;
        this.errors = '';
        this.weatherService.geocode(cityName).subscribe((res: GeocodingResponse[]) => {
            if (res.length === 0) {
                this.errors = 'Город не найден';
            } else {
                this.citiesList = res.map(el => {
                    return {country: el.country, name: el.local_names.ru ?? el.local_names.feature_name,
                        lat: el.lat, lon: el.lon, state: el.state};
                });
                this.citiesList = uniqWith(this.citiesList, (a: LocationData, b: LocationData) => {
                    return a.country === b.country && a.name === b.name && a.state === b.state;
                });
            }
            this.isNowProcessing = false;
        }, error => {
            console.error(error);
            this.errors = 'Город не найден';
            this.isNowProcessing = false;
        });
    }
    geolocate() {
        this.geolocationProcessing = true;
        navigator.geolocation.getCurrentPosition(
            (f) => {
                this.cityData.emit({lat: f.coords.latitude, lon: f.coords.longitude});
                this.geolocationError = false;
                this.geolocationProcessing = false;
            }, (err) => {
                this.geolocationError = true;
                this.geolocationProcessing = false;
            });
    }
}
