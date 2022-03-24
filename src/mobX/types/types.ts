export interface IWeatherData {
    "timepoint": number;
    "cloudcover": number;
    "lifted_index": number;
    "prec_type": string,
    "prec_amount": number,
    "temp2m" : number,
    "rh2m" : string,
    "wind10m" : {
        "direction" : string,
        "speed" : number
    },
    "weather": string
}

export type IWeatherDataSelected = Omit<IWeatherData, "timepoint" | "prec_type" | "prec_amount" >

export interface IWeatherForecastState {
    longitude: number | null;
    latitude: number | null;
    weatherInfo: IWeatherData [];
    isLoading: boolean;
    isError: string;
    weatherDaySelected: IWeatherDataSelected;
}
