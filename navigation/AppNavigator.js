import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Attendance from '../screens/Attendance';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import { getAuth, signOut } from 'firebase/auth';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const handleLogout = async (navigation) => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#525FE1' }
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: 'Home',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#525FE1' },
            gestureEnabled: false,
            headerLeft:null,
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout(navigation)} style={{ marginRight: 10 }}>
                <Icon name="logout" size={24} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Attendance"
          component={Attendance}
          options={{
            title: 'Asistencia',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#525FE1' }
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Perfil',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#525FE1' }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
