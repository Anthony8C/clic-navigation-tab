import React from 'react'
import { View, Text, StyleSheet, Image, Pressable,TextInput, Alert } from 'react-native'
import { doc, setDoc } from "firebase/firestore";
import { idGenerator } from '../../../utils/idGenerator';
import { db } from '../../config/firebase';

export default function Create() {

  //Definimos los Hooks de Estado
  const [productName, setProductName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState(null);

  const createProduct = async () => {
    if (!productName) {
      Alert.alert("Todos los datos son obligatorios");
    } else if (!description) {
      Alert.alert("Todos los datos son obligatorios");
    } else if (!price) {
      Alert.alert("Todos los datos son obligatorios");
    } else {
      const id = idGenerator(10);
      await setDoc(doc(db, "products", id), {
        id: id,
        productName: productName,
        description: description,
        price: price
      });
      Alert.alert("Producto Agregado");
      setProductName(null);
      setDescription(null);
      setPrice(null);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Productos!</Text>
      <TextInput
        style={styles.input}
        onChangeText={setProductName}
        value={productName}
        placeholder="Nombre del Producto"
      />
      <TextInput
        style={styles.textArea}
        onChangeText={setDescription}
        value={description}
        placeholder="Descripción"
        multiline
        numberOfLines={3}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPrice}
        value={price}
        placeholder="Precio"
        keyboardType='decimal-pad'
      />
      <Text style={styles.title}>Selecciona una imágen</Text>
      <Image
        style={styles.tinyLogo}
        source={require('../../../assets/noImage.png')}
      />
      <Pressable
        onPress={createProduct}
        style={styles.button}
      >
        <Text style={styles.textButton}>Crear Producto</Text>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    marginTop: 10,
    borderWidth: 2,
    width: 340,
    height: 50,
    borderRadius: 5,
    borderColor: '#02CCFF',
    padding: 10
  },
  textArea: {
    marginTop: 10,
    borderWidth: 2,
    width: 340,
    height: 100,
    borderRadius: 5,
    borderColor: '#02CCFF',
    padding: 10
  },
  tinyLogo: {
    width: 250,
    height: 215,
    marginTop: 25,
    marginBottom: 30,
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