import React, { useState } from "react";
import { View, Text, SafeAreaView, Keyboard, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../FirebaseAuth";
import { StatusBar } from "expo-status-bar";
import Button from "../Components/CustomButton";
import Loader from "../Components/CustomLoader";
import Input from "../Components/CustomInput";
import COLORS from "../../Const/colors";

const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  //Validar se o usuario colocou algum input
  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError("Por favor insira o email", "email");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Por favor insira sua senha", "password");
      isValid = false;
    }
    if (isValid) {
      login(); //Caso tudo ok, segue para o login
    }
  };

  //Login pelo metodo do firebase
  const login = async () => {
    setLoading(true); // Indica o carregamento
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      console.log(user);
      navigation.replace("HomeScreen");
    } catch (error) {
      Alert.alert("Dados inválidos. Por favor, tente novamente."); // Exibe mensagem de erro
      setLoading(false);
      console.log(error);
    }
  };

  //Funcao para manipular alterações
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  //Função para manipular os erros
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView>
        <Loader visible={loading} />
        <View style={{ paddingTop: 100, paddingHorizontal: 25 }}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 45,
              fontWeight: "300",
              fontStyle: "italic",
            }}
          >
            IncluStep
          </Text>
        </View>

        <View style={{ marginVertical: 60, paddingHorizontal: 25 }}>
          <Input
            onChangeText={(text) => handleOnChange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            keyboardType="email-address"
            placeholder="Seu email de cadastro"
            autoCapitalize="none"
            error={errors.email}
          />

          <Input
            onChangeText={(text) => handleOnChange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            label="Password"
            placeholder="Senha"
            password
            error={errors.password}
          />

            {/* Botão para redefinição de senha */}
          <Text
            onPress={() => navigation.navigate("ForgotPass")}
            style={{
              color: COLORS.blue,
              fontWeight: "bold",
              textAlign: "right",
              fontSize: 13,
              padding: 10,
              marginHorizontal: 15,
            }}
          >
            Esqueci minha senha
          </Text>

            {/* Botão que realiza o login */}
          <Button title="Entrar" onPress={validate} />

            {/* Botão para criar uma nova conta */}
          <Text
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Não tem uma conta?
            <Text
              onPress={() => navigation.navigate("RegisterScreen")}
              style={{ color: COLORS.blue }}> Registre-se
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};
