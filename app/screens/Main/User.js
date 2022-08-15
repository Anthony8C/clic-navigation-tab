import { View, Text, StyleSheet,Pressable } from 'react-native'
import React from 'react'

export default function User() {
  return (
    <View style={styles.container}>
       <Pressable
        /* onPress={} */
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