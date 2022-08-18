import { Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, query, where, getDocs } from "firebase/firestore";
import { FlatList } from 'react-native-gesture-handler';
import { View } from 'react-native-web';


export default function Computer() {
  const [productList, setProductList] = React.useState("");
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

  const renderItem = ({ item }) => {
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
        <Text style={styles.textPrice}>{item.price}</Text>
      </View>
      <View>
      </View>
    </View>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});