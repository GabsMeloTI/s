import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './components/dataUser/App.jsx';
import Home from './pages/home/App.jsx';
import SingIn from './pages/singIn/App.jsx';
import SingUp from './pages/singUp/App.jsx';
import Consumption from './pages/consumption/App.jsx';
import Production from './pages/production/App.jsx';
import HousingUnits from './pages/housingUnits/App.jsx';
import EditUser from './pages/editUser/App.jsx';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SingIn" component={SingIn} />
          <Stack.Screen name="SingUp" component={SingUp} />
          <Stack.Screen name="Consumption" component={Consumption} />
          <Stack.Screen name="Production" component={Production} />
          <Stack.Screen name="HousingUnits" component={HousingUnits} />
          <Stack.Screen name="EditUser" component={EditUser} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
