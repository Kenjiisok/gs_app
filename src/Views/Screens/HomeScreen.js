import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import Button from "../Components/CustomButton"
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../../FirebaseAuth"
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserDetails({ uid: currentUser.uid, ...userDocSnap.data() });
        } else {
          console.log('Documento não existente');
        }
      }
    });
    return unsubscribe;
  }, []);

  const logOut = async () => {
    try {
      await signOut(auth); 
      navigation.replace('LoginScreen');  
    } catch (error) {
      console.error("Logout falhou", error);
    }
  };
  

  return (
    <>
    <StatusBar/>
     <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 40,
    }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Bem vindo(a) {userDetails?.fullname || ''}
      </Text>
      <Button title="Logout" onPress={logOut} />
    </View>
    </>
  );
};

export default HomeScreen;
