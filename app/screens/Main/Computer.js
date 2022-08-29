import { Text, StyleSheet, View, Image, SafeAreaView, FlatList, Pressable, Alert, Modal, TextInput, NativeModules } from 'react-native'
import React from 'react'
import { db } from '../../config/firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { doc, updateDoc, deleteDoc, collection, getDocs } from "firebase/firestore";


export default function Computer() {

  const [productList, setProductList] = React.useState([]);
  const [modalEdit, setModalEdit] = React.useState(false);
  const [id, setId] = React.useState("");
  const [productName, setProductName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("");
  const [price, setPrice] = React.useState("");


  React.useEffect(() => {
    let list = [];

    async function getProducts() {
      const querySnapshot = await getDocs(collection(db, "products"));

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        list.push(doc.data());
        console.log(doc.id, " => ", doc.data());
      });
      setProductList(list);
    }

    getProducts();
  }, []);

  const editProduct = async () => {
    if (!productName || !description || !price) {
      Alert.alert("Todos los datos son obligatorios");
    } else {
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, {
        productName: productName,
        description: description,
        price: price
      });
      NativeModules.DevSettings.reload();
    }
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item} key={item.id}>

        <View style={styles.img}>
          <Image
            style={styles.imageProduct}
            source={require('../../../assets/item.png')}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.textName}>{item.productName}</Text>
          <Text style={styles.textDescription}>{item.description}</Text>
          <Text style={styles.textPrice}>${item.price}</Text>
        </View>

        <View style={styles.iconView}>
          <Ionicons name={"create"} size={30} style={styles.icon}
            onPress={function openEditModal() {
              setModalEdit(true);
              setId(item.id);
              setProductName(item.productName);
              setDescription(item.description);
              setPrice(item.price);
            }}
          />
          <Ionicons name="trash" size={30} style={styles.iconDelete}
            onPress={async () => {
              try {
                await deleteDoc(doc(db, 'products', item.id));
                console.log('El producto se ha eliminado correctamente');
                NativeModules.DevSettings.reload();
              } catch (error) {
                console.log(error);
              }
            }}
          />
        </View>
      </View>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      {
        productList.length > 0 ? (
          <FlatList
            data={productList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        ) : (
          <Text style={styles.textNoProducts}>No existen productos!!</Text>
        )
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEdit}
        onRequestClose={() => {
          setModalEdit(!modalEdit);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Editar Producto</Text>
            <Text style={styles.modalText}>Id:{id}</Text>
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
              placeholder="$ Precio"
              keyboardType='decimal-pad'
            />
            <View style={styles.modalButtons}>
              {/* Boton para cerrar la modal */}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalEdit(!modalEdit)}
              >
                <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
              {/* Boton para editar el producto */}
              <Pressable
                style={[styles.button, styles.buttonEdit]}
                onPress={editProduct}
              >
                <Text style={styles.textStyle}>Editar Producto</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C2C2C2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
    width: 360,
    height: 100,
    borderRadius: 5
  },
  img: {
    width: "30%"
  },
  imageProduct: {
    width: 80,
    height: 70
  },
  info: {
    width: "50%"
  },
  textName: {
    fontSize: 18,
    fontWeight: "bold"
  },
  textDescription: {
    fontSize: 10
  },
  textPrice: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    color: "#02CCFF"
  },
  textNoProducts: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold"
  },
  icon: {
    color: "#02CCFF",
    marginLeft: 20,
    padding: 1
  },
  iconDelete: {
    color: "#02CCFF",
    marginLeft: 18,
    padding: 2
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 10
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonEdit: {
    backgroundColor: "#02CCFF",
    marginLeft: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
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
  modalButtons: {
    flexDirection: "row",
    marginTop: 5
  }

});