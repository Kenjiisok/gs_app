import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./src/Views/Screens/LoginScreen"
import HomeScreen from "./src/Views/Screens/HomeScreen";
import Loader from "./src/Views/Components/CustomLoader";
import RegisterScreen from "./src/Views/Screens/RegisterScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ForgotPass } from "./src/Views/Screens/ForgotPass";

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = useState("");

  useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 1000);
  }, []);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName("HomeScreen");
        } else {
          setInitialRouteName("LoginScreen");
        }
      }
    } catch (error) {
      setInitialRouteName("LoginScreen");
    }
  };

  return (
    <NavigationContainer>
      {!initialRouteName ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ForgotPass" component={ForgotPass} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default App;
