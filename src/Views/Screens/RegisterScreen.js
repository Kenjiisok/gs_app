import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Keyboard,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import COLORS from "../../Const/colors";
import Input from "../Components/CustomInput"
import Button from "../Components/CustomButton"
import Loader from "../Components/CustomLoader";
import { auth } from "../../../FirebaseAuth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";


//Estados para gerenciar os inputs do usuario
const RegisterScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    email: "",
    fullname: "",
    password: "",
  });

  //Erros e carregamento 
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  //Função para validar o input de nome
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.fullname) {
      handleError("Por favor coloque seu nome completo", "fullname");
      isValid = false;
    } else if (inputs.password.length < 7) {
      handleError("Seu nome deve conter no minimo 7 caracteres");
    }

    if (isValid) {
      register(); //Caso tudo esteja correto, procede para o registro
    }
  };

  //Metodo de registro pelo firebase com senha e email
  const register = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      const db = getFirestore();
      await setDoc(doc(db, "users", userCredential.user.uid), {
        fullname: inputs.fullname,
        email: inputs.email,
      });
      setLoading(false);
      navigation.navigate("LoginScreen");
    } catch (error) {
      setLoading(false);
      Alert.alert("Erro", error.message);
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

  //UI
  return (
    <>
      <StatusBar />
      <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
        <Loader visible={loading} />
        <ScrollView
          contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
        >
          <Text
            style={{
              color: COLORS.black,
              fontSize: 50,
              fontWeight: "300",
              fontStyle: "italic",
            }}
          >
            Registre-se
          </Text>

          <Text style={{
            color: COLORS.black,
            fontSize: 20,
            fontStyle: 'italic',
            fontWeight: '200',
            marginTop: 10
          }}>
            Notes App.
          </Text>

          <View style={{ marginVertical: 20 }}>
            <Input
              onChangeText={(text) => handleOnChange(text, "fullname")}
              onFocus={() => handleError(null, "fullname")}
              iconName="account-outline"
              label="Nome Completo"
              placeholder="Coloque seu nome completo"
              error={errors.fullname}
            />

            <Input
              onChangeText={(text) => handleOnChange(text, "email")}
              onFocus={() => handleError(null, "email")}
              iconName="email-outline"
              label="Email"
              keyboardType="email-address"
              placeholder="Endereço de email"
              error={errors.email}
              autoCapitalize="none"
            />

            <Input
              onChangeText={(text) => handleOnChange(text, "password")}
              onFocus={() => handleError(null, "password")}
              iconName="lock-outline"
              label="Senha"
              placeholder="Crie uma senha"
              error={errors.password}
              password
            />

          {/* Botão para confirmar o registro*/}
            <Button title="Registrar-se" onPress={validate} />

          {/* Caso ja tenha uma conta basta ir para o login*/}
            <Text
              style={{
                color: COLORS.black,
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Já tem uma conta?
              <Text
                onPress={() => navigation.navigate("LoginScreen")}
                style={{ color: COLORS.blue }}
              > Login
              </Text>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default RegisterScreen;
