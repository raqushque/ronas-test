import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import {LocationData, WeatherResponse} from '../types/geocoding-response';
import {OpenweathermapService} from '@services/openweathermap.service';

@Injectable({
    providedIn: 'root'
})
export class WeatherSettingsService implements OnDestroy{
    displayMode$: BehaviorSubject<string>;
    locationData$: BehaviorSubject<LocationData> = new BehaviorSubject<LocationData>(null);
    weatherData$: BehaviorSubject<WeatherResponse> = new BehaviorSubject(null);
    activeCityName$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    sub: Subscription;
    constructor(private weatherService: OpenweathermapService) {
        const tempunits = localStorage.getItem('ronastest-temp-units');
        if (tempunits !== 'metric' && tempunits !== 'imperial') {
            localStorage.setItem('ronastest-temp-units', 'metric');
        }
        this.displayMode$ = new BehaviorSubject<string>(localStorage.getItem('ronastest-temp-units'));
        const city: LocationData = JSON.parse(localStorage.getItem('ronastest-selected-city'));
        if (city && city.lat && city.lon) {
            this.activeCityName$.next(city.name);
            this.locationData$ = new BehaviorSubject<LocationData>(city);
        }
        this.sub = combineLatest([this.displayMode$, this.locationData$]).subscribe(([units, location]: [string, LocationData]) => {
            this.weatherData$.next(null);
            if (location !== null) {
                this.weatherService.requestWeather(location, units).subscribe(resp => {
                    this.activeCityName$.next(resp.name);
                    this.weatherData$.next(resp);
                });
            }
        });
    }
    setDisplayMode(mode: string) {
        localStorage.setItem('ronastest-temp-units', mode);
        this.displayMode$.next(mode);
    }
    setLocationData(locationData: LocationData) {
        localStorage.setItem('ronastest-selected-city', JSON.stringify(locationData));
        this.locationData$.next(locationData);
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
