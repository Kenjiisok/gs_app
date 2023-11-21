import React, { useState } from 'react';
import { Text, SafeAreaView, View, Alert } from 'react-native';
import { auth } from '../../../FirebaseAuth'; 
import { sendPasswordResetEmail } from 'firebase/auth'; 
import { StatusBar } from 'expo-status-bar';
import Loader from "../Components/CustomLoader";
import COLORS from '../../Const/colors'
import Input from "../Components/CustomInput"
import Button from "../Components/CustomButton"

//Armazena o email e seta o loading
export const ForgotPass = () => {
  const [email, setEmail] = useState(''); 
  const [loading, setLoading] = useState(false); 


  //Funcao para resetar a senha com o firebase
  const resetPassword = () => {
    setLoading(true);
    sendPasswordResetEmail(auth, email) //Solicita o envio do email para redefinição
      .then(() => {
        Alert.alert('Sucesso', 'Email de redefinição enviado! Verifique sua caixa de entrada.');
        setLoading(false); 
      })
      .catch(error => {
        Alert.alert('Erro', error.message);
        setLoading(false); 
      });
  };

  return (
    <>
    <StatusBar/>
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <Loader visible={loading} />
      <View style={{paddingTop: 90, paddingHorizontal: 25}}>
        <Text style={{color: COLORS.black, fontSize: 60, fontWeight: '200'}}>
          Recuperação de senha
        </Text>
      </View>

      <View style={{marginTop: 60, marginHorizontal: 30}}>
        <Input
          iconName="email-outline"
          placeholder="Email"
          label="Email de recuperação"
          keyboardType="email-address" 
          value={email} 
          autoCapitalize="none"
          onChangeText={setEmail} 
        />
      </View>

    {/* Botão para realizar a solicitação*/}
      <View style={{marginHorizontal: 30, marginTop: 10}}>
        <Button title="Enviar" onPress={resetPassword} />
      </View>
    </SafeAreaView>
    </>
  );
};

export default ForgotPass;