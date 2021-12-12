import * as React from 'react';
import {StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// };

// function LoginScreen(){
//   return(
//     <View Style={{ flex:1, alignItems:'center',justifyContent:'center'}}>
//       <Text>LoginScreen</Text>
//     </View>
//   );
// };

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
         {/* <Stack.Screen options={{ headerShown:false}} name="Home" component={HomeScreen} />  */}
         <Stack.Screen name="Login" component={LoginScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});