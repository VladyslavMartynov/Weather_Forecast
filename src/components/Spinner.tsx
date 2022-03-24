import React, { FC } from 'react';
import { ActivityIndicator, StyleSheet } from "react-native";

type spinnerSize = number | "small" | "large" | undefined

interface ISpinnerProps {
    color: string;
    size: spinnerSize;
}

const Spinner: FC<ISpinnerProps> = ({ color, size }): JSX.Element =>
    (<ActivityIndicator style={styles.container} size={size} color={color} />)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Spinner;