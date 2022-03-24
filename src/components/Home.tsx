import React, { FC, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react";
import weatherForecastStore from "../mobX/store/WeatherForecastStore";
import WeatherList from "./WeatherList";
import Spinner from "./Spinner";

const Home: FC = observer((): JSX.Element => {
    const { latitude, longitude, isError, isLoading } = weatherForecastStore


    const fetchRequiredData = (): void => {
        weatherForecastStore.fetchEvents()
    }

    useEffect(() => {
        fetchRequiredData()
    },[])


    if (isError) {
        return (
            <>
                <Text>Can`t find your location!</Text>
                <Button title={"Allow GPS"} onPress={fetchRequiredData}/>
            </>

        )
    }

    if (isLoading) {
        return <Spinner color={"grey"} size={"large"}/>
    }

    const handleGpsStart = (): void => {
        weatherForecastStore.fetchEvents()
    }

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.text}>Weather App</Text>
                <Button title={"GPS"} onPress={handleGpsStart}/>
                <Text style={styles.text}>lat:{latitude.toFixed(1)}</Text>
                <Text style={styles.text}>long:{longitude.toFixed(1)}</Text>
            </View>
            <WeatherList/>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: "blue",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white"
    }
})

export default Home;