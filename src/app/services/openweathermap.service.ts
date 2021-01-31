import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GeocodingResponse, LocationData, WeatherResponse} from '../types/geocoding-response';

@Injectable({
    providedIn: 'root'
})
export class OpenweathermapService {
    private APIKey = environment.OWMAPIKey;
    private geocodingLimit: number = 10;
    private geocodingBaseURL: string = 'http://api.openweathermap.org/geo/1.0/direct?q=';
    private weatherBaseURL: string = 'http://api.openweathermap.org/data/2.5/weather?';

    constructor(private http: HttpClient) {
    }
    geocode(location: string): Observable<GeocodingResponse[]> {
        return this.http.get<GeocodingResponse[]>(
            `${this.geocodingBaseURL}${location}&limit=${this.geocodingLimit}&appid=${this.APIKey}`);
    }
    requestWeather(location: LocationData, units): Observable<WeatherResponse> {
        return this.http.get<WeatherResponse>(
            `${this.weatherBaseURL}lat=${location.lat}&lon=${location.lon}&appid=${this.APIKey}&units=${units}&lang=ru`);
    }
}
