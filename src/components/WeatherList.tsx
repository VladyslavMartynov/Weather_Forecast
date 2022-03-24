import React, { FC } from 'react';
import { FlatList, ListRenderItem } from "react-native";
import { observer } from "mobx-react";
import weatherForecastStore from "../mobX/store/WeatherForecastStore";
import { IWeatherData } from "../mobX/types/types";
import WeatherItem from "./WeatherItem";


const WeatherList: FC = observer((): JSX.Element => {
    const { weatherInfo } = weatherForecastStore

    const renderItem: ListRenderItem<IWeatherData> = ({ item}) => {
        return <WeatherItem item={item}/>
    }

    return (
            <FlatList
                data={weatherInfo}
                keyExtractor={(_, index) => index.toString()}
                onEndReachedThreshold={0.5}
                renderItem={renderItem}
            />
    );
});

export default WeatherList;