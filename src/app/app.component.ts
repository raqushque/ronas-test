import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocationData, WeatherResponse} from './types/geocoding-response';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import {OpenweathermapService} from '@services/openweathermap.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
    tempUnits$: BehaviorSubject<string>;
    locationData$: BehaviorSubject<LocationData> = new BehaviorSubject<LocationData>(null);
    sub: Subscription;
    weatherData: WeatherResponse;
    defaultCityName: string = '';
    constructor(private weatherService: OpenweathermapService) {
    }
    citySelected(cityData: LocationData) {
        this.locationData$.next(cityData);
        localStorage.setItem('ronastest-selected-city', JSON.stringify(cityData));
    }
    unitsSelected(units) {
        this.tempUnits$.next(units);
        localStorage.setItem('ronastest-temp-units', units);
    }
    ngOnInit(): void {
        const tempunits = localStorage.getItem('ronastest-temp-units');
        if (tempunits !== 'metric' && tempunits !== 'imperial') {
            localStorage.setItem('ronastest-temp-units', 'metric');
        }
        const city: LocationData = JSON.parse(localStorage.getItem('ronastest-selected-city'));
        if (city && city.lat && city.lon) {
            this.defaultCityName = city.name;
            this.locationData$ = new BehaviorSubject<LocationData>(city);
        }
        this.tempUnits$ = new BehaviorSubject<string>(localStorage.getItem('ronastest-temp-units'));
        this.sub = combineLatest([this.tempUnits$, this.locationData$]).subscribe(([units, location]: [string, LocationData]) => {
            if (location !== null) {
                this.weatherService.requestWeather(location, units).subscribe(resp => {
                    console.log(resp);
                    this.weatherData = resp;
                });
            }
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
