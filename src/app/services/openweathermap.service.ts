import {Injectable} from '@angular/core';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GeocodingResponse} from '../types/geocoding-response';

@Injectable({
    providedIn: 'root'
})
export class OpenweathermapService {
    private APIKey = environment.OWMAPIKey;
    private geocodingLimit: number = 10;
    private geocodingBaseURL: string = 'http://api.openweathermap.org/geo/1.0/direct?q=';
    constructor(private http: HttpClient) {
    }
    geocode(location: string): Observable<GeocodingResponse[]> {
        return this.http.get<GeocodingResponse[]>(
            `${this.geocodingBaseURL}${location}&limit=${this.geocodingLimit}&appid=${this.APIKey}`);
    }
}
