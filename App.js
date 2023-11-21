import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./src/Views/Screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./src/Views/Screens/RegisterScreen";
import HomeScreen from "./src/Views/Screens/HomeScreen";
import ForgotPass from "./src/Views/Screens/ForgotPass";

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = useState("");


  return (
    <NavigationContainer>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ForgotPass" component={ForgotPass} />
          </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
