import React, { FC } from 'react';
import { Button, Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/core';
import { RootStackParamList } from "../constants/constants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IWeatherData } from "../mobX/types/types";
import { WeatherConditions } from "../constants/constants";
import { observer } from "mobx-react";
import weatherForecastStore from "../mobX/store/WeatherForecastStore";

interface IWeatherItemProps {
    item: IWeatherData;
}

interface IWeatherValues {
    [key: string]: {
        types: string []
        imgUrl: ImageSourcePropType
    }
}

const WeatherItem: FC<IWeatherItemProps> = observer((
        {
            item: {
                lifted_index,
                cloudcover,
                timepoint,
                weather,
                rh2m,
                temp2m,
                wind10m: {
                    direction,
                    speed
                }
            }
        }
    ) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentMonthValue = currentMonth < 10 ? `${currentMonth}`.padStart(2,'0.') : `${currentMonth}`
    const currentYear = today.getFullYear();

    const example: IWeatherValues = {
        clearDay: {
            types: ['clearday', 'clearnight'],
            imgUrl: require('../assets/weatherConditions/about_two_clear.png')
        },
        cloudyDay: {
            types: ['cloudyday', 'cloudynight'],
            imgUrl: require('../assets/weatherConditions/about_two_cloudy.png')
        },
        pCloudyDay: {
            types: ['pcloudyday', 'pcloudynight', 'mcloudyday', 'mcloudynight', 'humidday', 'humidnight'],
            imgUrl: require('../assets/weatherConditions/about_two_pcloudy.png')
        },
        rainyDay: {
            types: ['oshowerday', 'oshowernight', 'ishowerday', 'ishowernight', 'rainday', 'rainnight','lightrainday','lightrainnight'],
            imgUrl: require('../assets/weatherConditions/about_two_rain.png')
        },
        snowDay: {
            types: ['snowday', 'snownight', 'lightsnowday', 'lightsnownight'],
            imgUrl: require('../assets/weatherConditions/about_two_snow.png')
        },
        mixedDay: {
            types: ['rainsnowday', 'rainsnownight'],
            imgUrl: require('../assets/weatherConditions/about_two_snow.png')
        },
        tsDay: {
            types: ['tsday', 'tsnight'],
            imgUrl: require('../assets/weatherConditions/about_two_ts.png')
        },
        tsRainDay: {
            types: ['tsrainday','tsrainnight'],
            imgUrl: require('../assets/weatherConditions/about_two_tsrain.png')
        }
    }

    const handleDateChange = (timePoint: number): JSX.Element => {
        let dayCount = 0;
        while (timePoint > 24 ) {
            dayCount += 1
            timePoint -= 24;
        }

        return <Text>{`${today.getDate() + dayCount}.${currentMonthValue}.${currentYear}`}</Text>
    }

    const configureImage = (type: string): JSX.Element => {
        const hasType = Object.keys(example).find((imageType) => {
            return example[imageType]?.types.includes(type)
        })

        if (!hasType) return <Image source={require('../assets/weatherConditions/about_two_clear.png')}/>

        const { imgUrl } = example[hasType]
        if (example[hasType]?.imgUrl) {
            return <Image source={imgUrl}/>
        } else {
            return <Image source={require('../assets/weatherConditions/about_two_clear.png')}/>
        }
    }

    const selectDayWeather = (): void => {
        weatherForecastStore.setWeatherDaySelected({
            lifted_index: lifted_index,
            cloudcover: cloudcover,
            weather : WeatherConditions[weather],
            rh2m: rh2m,
            temp2m: temp2m,
            wind10m: {
                direction: direction,
                speed: speed
            }
        })
    }

    const redirectToInformation = (): void => {
        selectDayWeather()
        navigation.navigate('Information')
    }

    return (
        <View style={styles.container}>
            <View>
                {configureImage(weather)}
            </View>
            <Button title={"Details"} onPress={redirectToInformation} accessibilityLabel={"Press"}/>
            <View>
                <Text style={styles.date}>Date: {handleDateChange(timepoint)}</Text>
                <Text>{WeatherConditions[weather]}</Text>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "grey",
        padding: 10,
    },
    img: {
        alignSelf: "flex-start"
    },
    date: {
        color: "black",
        fontStyle: "normal",
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default WeatherItem;