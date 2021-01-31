export interface GeocodingResponse {
    name: string;
    local_names: any;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}
export interface LocationData {
    name?: string;
    country?: string;
    lat: number;
    lon: number;
    state?: string;
}
export interface WeatherResponse {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    };
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    clouds: {
        all: number;
    };
    rain: any;
    show: any;
    dt: number;
    sys: any;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}
