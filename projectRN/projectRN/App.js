import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Home} from './screen/home';
import {SignIn} from './screen/signIn';
import {SignUp} from './screen/signUp';

const Stack = createNativeStackNavigator();
// const [shift, SetShift] = React.useState();

function App() {
  const ui = (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignIn'>
        <Stack.Screen name="Sign In" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="Sign Up" component={SignUp} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  return ui;
  
}

export default App;
