import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import Home from '../screens/Home';
import Attendance from '../screens/Attendance';
import Profile from '../screens/Profile';
import Task from '../screens/Task';
import Login from '../screens/Login';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { clearUser, setUser } from '../features/authSlice'; 
import { getSession, truncateSessionsTable } from '../persistence';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.value.user);

  useEffect(() => {
    (async () => {
      try {
        const response = await getSession();
        console.log('getSession =====>', response);
        if (response.rows._array.length) {
          const user = response.rows._array[0];
          console.log({ user });
          dispatch(setUser({
            email: user.email,
            idToken: user.token
          }));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  const handleLogout = async (navigation) => {
    try {
      dispatch(clearUser());
      const response = await truncateSessionsTable()
      console.log('trunk eliminar response=====>',response)
      console.log(response);
      dispatch(clearUser())
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log({ errorSignOutDB: error });
    }

  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Home" : "Login"}>
        {!user ? (
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
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={({ navigation }) => ({
                title: 'Home',
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#525FE1' },
                gestureEnabled: false,
                headerLeft: null,
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
             <Stack.Screen
              name="Task"
              component={Task}
              options={{
                title: 'Task',
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#525FE1' }
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;