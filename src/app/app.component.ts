import {Component, OnInit} from '@angular/core';
import {WeatherResponse} from './types/geocoding-response';
import {Observable} from 'rxjs';
import {WeatherSettingsService} from '@services/weather-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    windDirectionNames: string[] =
        ['Северный', 'Северо-восточный', 'Восточный', 'Юго-восточный', 'Южный', 'Юго-западный', 'Западный', 'Северо-западный'];
    get displayMode$(): Observable<string> {
        return this.weatherStorage.displayMode$;
    }
    get weatherData$(): Observable<WeatherResponse> {
        return this.weatherStorage.weatherData$;
    }
    constructor(private weatherStorage: WeatherSettingsService) {
    }
    ngOnInit(): void {
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
}
