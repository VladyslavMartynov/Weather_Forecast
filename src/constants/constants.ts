export const API_LINK = 'https://www.7timer.info/bin/civil.php?'
export type RootStackParamList = {
    Home: undefined;
    Information: undefined;
    About: undefined;
}

interface IWeatherCondition {
    [key: string] :string
}

export const WeatherConditions: IWeatherCondition = {
    "clearday" : "Clear",
    "clearnight" : "Clear",
    "pcloudyday" : "Partly Cloudy",
    "pcloudynight" : "Partly Cloudy",
    "mcloudyday" : "Mildly Cloudy",
    "mcloudynight" : "Mildly Cloudy",
    "cloudyday" : "Cloudy",
    "cloudynight" : "Cloudy",
    "humidday" : "Humid",
    "humidnight" : "Humid",
    "lightrainday" : "Light Rain",
    "lightrainnight" : "Light Rain",
    "oshowerday" : "Occasion Shower",
    "oshowernight" : "Occasion Shower",
    "ishowerday" : "Isolated Shower",
    "ishowernight" : "Isolated Shower",
    "lightsnowday" : "Light Snow",
    "lightsnownight" : "Light Snow",
    "rainday": "Rainy",
    "rainnight": "Rainy ",
    "snowday": "Snowy",
    "snownight": "Snowy",
    "rainsnowday": "Rain with Snow",
    "rainsnownight": "Rain with Snow",
    "tsday": "Light Thunderstorm",
    "tsnight": "Light Thunderstorm",
    "tsrainday": "Thunderstorm",
    "tsrainnight": "Thunderstorm"
}