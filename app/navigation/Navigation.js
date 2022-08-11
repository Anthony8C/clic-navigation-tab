import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import TabNavigation from '../navigation/TabNavigation';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from '../config/firebase';

const Stack = createNativeStackNavigator();

export default function Navigation() {

  const [isSession, setIsSession] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (user) => {
      if (user) {
        const uid = user.uid;
        setIsSession(true);
      } else {
        setIsSession(false);
      }
    });

    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {(!isSession) ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <Stack.Screen name="Main" component={TabNavigation} />
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}