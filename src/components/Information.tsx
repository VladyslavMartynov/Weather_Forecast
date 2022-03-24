import React, { FC } from 'react';
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from '@react-navigation/core';
import { RootStackParamList } from "../constants/constants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import weatherForecastStore from "../mobX/store/WeatherForecastStore";

const Information: FC = observer((): JSX.Element => {
    const { weatherDaySelected: { lifted_index, wind10m: { speed, direction }, weather, temp2m, rh2m, cloudcover }} = weatherForecastStore
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const configuredTemperature = temp2m > 0 ? `+${temp2m}\u2103` : `${temp2m}\u2103`

    const returnBack = (): void => {
        navigation.popToTop()
    }

    return (
        <View>
            <View style={styles.wrapper}>
                <Text style={styles.slogan}>WeatherDay Information</Text>
                <Button title={"back"} accessibilityLabel={"Press"} onPress={returnBack}/>
            </View>
         <Text style={styles.descriptionText}>Lifted index:{lifted_index}</Text>
            <View>
                <Text style={styles.descriptionText}>Wind: {speed}km/h {direction}</Text>
            </View>
            <Text style={styles.descriptionText}>Weather type: {weather}</Text>
            <Text style={styles.descriptionText}>Temperature: {configuredTemperature}</Text>
            <Text style={styles.descriptionText}>Relative Humidity: {rh2m}</Text>
            <Text style={styles.descriptionText}>CloudCover: {cloudcover}</Text>
        </View>
    );
});


const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: 'blue',
        padding: 10,
    },
    slogan: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    descriptionText: {
        fontSize: 18,
        fontWeight: "bold",
        fontStyle: "normal",
        color: "black"
    }
})

export default Information;