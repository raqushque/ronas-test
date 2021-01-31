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
    activeCityName: string = '';
    windDirectionNames: string[] =
        ['Северный', 'Северо-восточный', 'Восточный', 'Юго-восточный', 'Южный', 'Юго-западный', 'Западный', 'Северо-западный'];
    constructor(private weatherService: OpenweathermapService) {
    }
    citySelected(cityData: LocationData) {
        this.locationData$.next(cityData);
        this.activeCityName = cityData.name;
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
            this.activeCityName = city.name;
            this.locationData$ = new BehaviorSubject<LocationData>(city);
        }
        this.tempUnits$ = new BehaviorSubject<string>(localStorage.getItem('ronastest-temp-units'));
        this.sub = combineLatest([this.tempUnits$, this.locationData$]).subscribe(([units, location]: [string, LocationData]) => {
            this.weatherData = null;
            if (location !== null) {
                this.weatherService.requestWeather(location, units).subscribe(resp => {
                    console.log(resp);
                    this.activeCityName = resp.name;
                    this.weatherData = resp;
                });
            }
        });
    }
    interpretWeather(code): string {
        const floor = Math.floor(code / 100);
        const mod = code % 100;
        switch (floor) {
            case 2: {
                return './assets/storm.svg';
            }
            case 3:
            case 5:
            case 6: {
                return './assets/rain.svg';
            }
            case 7: {
                return './assets/cloud.svg';
            }
            case 8: {
                switch (mod) {
                    case 0: {
                        return './assets/sun.svg';
                    }
                    case 1:
                    case 2: {
                        return './assets/partly_cloudy.svg';
                    }
                    default: {
                        return './assets/cloud.svg';
                    }
                }
            }
            default: {
                return './assets/cloud.svg';
            }
        }
    }
    floorTemperature(temp): number {
        return Math.floor(temp);
    }
    interpretWind(windDeg: number): string {
        const windDirectionCode = Math.floor((windDeg + 22.5) / 45);
        return this.windDirectionNames[windDirectionCode];
    }
    interpretPressure(pressure: number): number {
        return Math.floor(pressure / 1.333);
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
