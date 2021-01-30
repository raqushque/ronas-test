export interface GeocodingResponse {
    name: string;
    local_names: any;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}
export interface LocationsList {
    name: string;
    country: string;
    lat: number;
    lon: number;
    state?: string;
}
