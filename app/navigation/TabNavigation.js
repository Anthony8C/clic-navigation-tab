import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Compras from '../screens/Main/Compras';
import Search from '../screens/Main/Search';
import Favoritos from '../screens/Main/Favoritos';
import Opciones from '../screens/Main/Opciones';
import User from '../screens/Main/User';
import Computer from '../screens/Main/Computer';

/* function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
} */

/* function ComputerScreen(){
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Articulos!</Text>
        </View>
    )
}
function SearchScreen(){
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Buscar!</Text>
        </View>
    )
}
function FavoritosScreen(){
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Favoritos!</Text>
        </View>
    )
}

function ComprasScreen(){
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Tus Artículos Comprados!</Text>
        </View>
    )
}
function OpcionesScreen(){
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Más Opciones!</Text>
        </View>
    )
}

function UserScreen(){
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Estas en tu Perfil!</Text>
        </View>
    )
}
 */
const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator 
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Computer') {
                        iconName = focused ? 'laptop' : 'laptop-outline';
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'search' : 'search-outline';
                    }else if (route.name === 'Favorito'){
                        iconName = focused ? 'heart' : 'heart-outline' ;
                    }else if (route.name === 'Compras'){
                        iconName = focused ? 'cart' : 'cart-outline' ;
                    }else if (route.name === 'Opciones'){
                        iconName = focused ? 'add-circle' : 'add-circle-outline' ;
                    }else if (route.name === 'User'){
                        iconName = focused ? 'person' : 'person-outline' ;
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#02CCFF',
                tabBarInactiveTintColor: 'black',
            })}
        >
            {/* <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} /> */}
            <Tab.Screen name="Computer" component={Computer} options={{headerShown: false}} />
            <Tab.Screen name="Search" component={Search} options={{headerShown: false}}/>
            <Tab.Screen name="Favorito" component={Favoritos} options={{headerShown: false}}/>
            <Tab.Screen name="Compras" component={Compras} options={{headerShown: false}}/>
            <Tab.Screen name="Opciones" component={Opciones} options={{headerShown: false}}/>
            <Tab.Screen name="User" component={User} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
}