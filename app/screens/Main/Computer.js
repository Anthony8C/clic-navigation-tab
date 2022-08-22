import { Text, StyleSheet, View, Image, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/firebase';

export default function Computer() {

  const [productList, setProductList] = React.useState([]);
  /*  const [id, setId] = React.useState("");
   const [productName, setProductName] = React.useState("");
   const [description, setDescription] = React.useState("");
   const [image, setImage] = React.useState("");
   const [price, setPrice] = React.useState(""); */


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
  }
});