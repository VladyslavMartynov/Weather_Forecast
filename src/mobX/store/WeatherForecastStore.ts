import {IWeatherData, IWeatherDataSelected, IWeatherForecastState} from "../types/types";
import { makeAutoObservable } from "mobx";
import GetLocation from "react-native-get-location";
import axios from "axios";
import { API_LINK } from "../../constants/constants";

const defaultWeatherSelected = {
    lifted_index: 0,
    cloudcover: 0,
    temp2m: 0,
    rh2m: '',
    wind10m : {
        direction: '',
        speed: 0
    },
    weather: '',
}

class WeatherForecastStore implements IWeatherForecastState {
    longitude = 0;
    latitude = 0;
    weatherInfo: IWeatherData[] = [];
    isLoading = false;
    isError = '';
    weatherDaySelected = defaultWeatherSelected;

    constructor() {
        makeAutoObservable(this)
    }

    setLoading(loadingValue: boolean): void {
        this.isLoading = loadingValue
    }

    setError(error: string): void {
        this.isError = error
    }

    setLongitude(longitudeVal: number): void {
        this.longitude = longitudeVal
    }

    setLatitude(value: number): void {
        this.latitude = value
    }

    setWeatherData(weatherData: IWeatherData[]): void {
        this.weatherInfo = weatherData
    }

    setWeatherDaySelected({ lifted_index, cloudcover, rh2m, temp2m, weather, wind10m: { direction, speed } }: IWeatherDataSelected): void {
        this.weatherDaySelected = {
            lifted_index: lifted_index,
            cloudcover: cloudcover,
            temp2m: temp2m,
            rh2m: rh2m,
            wind10m : {
                direction: direction,
                speed: speed
            },
            weather: weather,
        }
    }


    async fetchUserLocation(): Promise<void> {
        try {
            this.setLoading(true);
            const fetchedData = await GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 1500
            });

            const { longitude, latitude } = fetchedData;
            this.setLatitude(latitude)
            this.setLongitude(longitude)

        } catch (e) {
            this.setError('Failed to connect to location!');
        } finally {
            this.setLoading(false);
        }
    }

    async fetchWeatherData(): Promise<void> {
        try {
            this.setLoading(true);
            const fetchedData = await axios.get(`${API_LINK}lon=${this.longitude}&lat=${this.latitude}&ac=0&unit=metric&output=json&tzshift=0`);
            const { data: { dataseries } } = fetchedData;
            this.setWeatherData(dataseries);
        } catch (e) {
            this.setError('Failed to connect to weatherData!');
        } finally {
            this.setLoading(false);
        }
    }

    async fetchEvents(): Promise<void> {
        try {
            this.setLoading(true);
            await this.fetchUserLocation();
            await this.fetchWeatherData();
        } catch (e) {
            this.setError('Failed to call fetchEvent function!');
        } finally {
            this.setLoading(false);
        }
    }
}

const weatherForecastStore = new WeatherForecastStore();
export default weatherForecastStore;