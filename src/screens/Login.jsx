import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useSignInMutation } from "../services/authService";
import { setUser } from "../features/authSlice";
import { isValidEmail, isValidPassword } from '../utils/regex';
import { insertSession } from '../persistence';

const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [triggerSignIn, result] = useSignInMutation();

    useEffect(() => {
        if (result?.data && result.isSuccess) {
            insertSession({
                email: result.data.email,
                token: result.data.idToken,
            }).then(() => {
                dispatch(
                    setUser({
                        email: result.data.email,
                        idToken: result.data.idToken,
                    })
                );

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            })
                .catch((error) => {
                    console.log("🕵🏻 ~ useEffect ~ error insertSession:", error);
                });
        }
    }, [result, dispatch, navigation]);

    const userLogin = async () => {
        try {
            if (!email || !password) {
                setErrorMessage('Por favor, ingrese el email y la contraseña');
                return;
            }
            if (!isValidEmail(email)) {
                setErrorMessage('El formato del email es incorrecto');
                return;
            }
            if (!isValidPassword(password)) {
                setErrorMessage('La contraseña debe tener máximo 8 caracteres');
                return;
            }
            triggerSignIn({ email, password });
            Alert.alert('Iniciando sesión', 'Accediendo...');
        } catch (error) {
            console.log(error);
            handleAuthError(error);
        }
    };

    const handleAuthError = (error) => {
        switch (error.code) {
            case 'auth/invalid-email':
                setErrorMessage('El formato del email es incorrecto');
                break;
            case 'auth/user-disabled':
                setErrorMessage('El usuario está deshabilitado');
                break;
            case 'auth/user-not-found':
                setErrorMessage('Usuario no encontrado');
                break;
            case 'auth/wrong-password':
                setErrorMessage('Contraseña incorrecta');
                break;
            default:
                setErrorMessage('Error al iniciar sesión');
                break;
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Image
                    source={require('../../assets/rrhh.png')}
                    style={styles.profile}
                />
            </View>
            <View style={styles.card}>
                <View style={styles.boxText}>
                    <TextInput
                        placeholder='email@gmail.com'
                        style={{ paddingHorizontal: 15 }}
                        onChangeText={(email) => setEmail(email)}
                        value={email}
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />
                </View>
                <View style={styles.boxText}>
                    <TextInput
                        placeholder='password'
                        onChangeText={(password) => setPassword(password)}
                        style={{ paddingHorizontal: 15 }}
                        secureTextEntry={true}
                        value={password}
                    />
                </View>
                {errorMessage ? (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                ) : null}
                <View style={styles.containerBtn}>
                    <TouchableOpacity style={styles.boxBtn} onPress={userLogin}>
                        <Text style={styles.textBtn}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    profile: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: 'white'
    },
    card: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    boxText: {
        paddingVertical: 20,
        backgroundColor: '#cccccc40',
        borderRadius: 30,
        marginVertical: 10
    },
    containerBtn: {
        alignItems: 'center'
    },
    boxBtn: {
        backgroundColor: '#525FE1',
        borderRadius: 30,
        paddingVertical: 20,
        width: 150,
        marginTop: 20
    },
    textBtn: {
        textAlign: 'center',
        color: 'white',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginVertical: 10,
    },
});