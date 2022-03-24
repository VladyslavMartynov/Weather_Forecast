import React, { FC } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/constants/constants";
import Information from "./src/components/Information";
import Home from "./src/components/Home";


const Stack = createNativeStackNavigator<RootStackParamList>()

const App: FC = (): JSX.Element => {
    return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={"Home"} screenOptions={{header: () => null}} >
                    <Stack.Screen name={"Home"} component={Home}/>
                    <Stack.Screen name={"Information"} component={Information}/>
                </Stack.Navigator>
            </NavigationContainer>
    );
};

export default App;
