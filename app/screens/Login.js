import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Pressable, Alert,navigation,navigate} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../config/firebase";

export default function Login({ navigation }) {
    // Hooks de estado 
    // Funciones que nos permiten recuperar el valor de esa variable 
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const login = () => {
        if (!email) {
            Alert.alert("Correo electrónico es requerido");
        } else if (!password) {
            Alert.alert("Contraseña es requerida");
        } else {
            signInWithEmailAndPassword(authentication, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    Alert.alert("Usuario " + user.email + " iniciado correctamente");
                    // ...
                    navigation.navigate("Main");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;            
                    Alert.alert("Error: " + errorCode + "Message: " + errorMessage);
                    setEmail(null);
                    setPassword(null);
                });
        }     
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.tinyLogo}
                source={require('../../assets/logo.png')}
            />
            <Text style={styles.title}>Compra Fácil y Rápido</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                onChangeText={(value) => setEmail(value)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                onChangeText={(value) => setPassword(value)}
                secureTextEntry={true}
                value={password}
            />
            <Pressable
                onPress={login}
                style={styles.button}
            >
                <Text style={styles.textButton}>Iniciar Sesión</Text>
            </Pressable>
            <Text onPress={() => navigation.navigate("Register")}
                style={styles.link}>¿No tienes una cuenta?</Text>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'center',
    },
    tinyLogo: {
        width: 250,
        height: 125,
        marginTop: 100,
        marginBottom: 30,
    },
    title: {
        marginBottom: 50,
    },
    input: {
        marginTop: 20,
        borderWidth: 1,
        width: 300,
        height: 40,
        borderRadius: 20,
        borderColor: "#02CCFF",
        padding: 10,
    },
    button: {
        marginTop: 30,
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
    },
    link: {
        marginTop: 20,
        color: "#02CCFF",
        fontWeight: "bold",
    }
});