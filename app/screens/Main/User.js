import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import React from 'react'
import { getAuth, signOut } from "firebase/auth";

export default function User() {

  const cerrar = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      Alert.alert('Cerrando Sesión');
    }).catch((error) => {
      // An error happened.
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert.alert("Error: " + errorCode + "Message: " + errorMessage);
    });
  }


  return (
    <View style={styles.container}>
      <Pressable
        onPress={cerrar}
        style={styles.button}
      >
        <Text style={styles.textButton}>Cerrar Sesión</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    marginBottom: 30,
    padding: 10,
    backgroundColor: "#02CCFF",
    borderRadius: 7,
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  }
});