import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler';

export default function Create() {

  //Definimos los Hooks de Estado
  const [productName, setProductName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Productos!</Text>
      <TextInput
      style={styles.input}
      onChange={(value) => setProductName=(value)}
      value={productName}
      placeholder="Nombre del Producto"
      />
       <TextInput
      style={styles.textArea}
      onChange={(value) => setDescription=(value)}
      value={description}
      placeholder="Descripción"
      multiline
      numberOfLines={3}
      />
      <TextInput
      style={styles.input}
      onChange={(value) => setPrice=(value)}
      value={price}
      placeholder="Precio"
      keyboardType='decimal-pad'
      />
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
    fontSize:20,
    fontWeight: "bold",
  },
  input:{
    marginTop:10,
    borderWidth:2,
    width:340,
    height:50,
    borderRadius:5,
    borderColor: '#02CCFF',
    padding:10
  },
  textArea:{
    marginTop:10,
    borderWidth:2,
    width:340,
    height:100,
    borderRadius:5,
    borderColor: '#02CCFF',
    padding:10
  }
});