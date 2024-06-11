import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { setCameraImage } from '../store/userReducer';
import {useGetDatosUserQuery} from '../services/userInformation'

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const {data: datosuser} = useGetDatosUserQuery();

    useEffect(() => {
        if (datosuser != undefined) {
            console.log("mi data ==========>",datosuser)
        }
        
        // dispatch(fetchDataUserRequest());
    }, [dispatch,datosuser]);

    const verifyCameraPermissions = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync()
        return granted
    }

    const pickImage = async () => {

        try {
            const permissionCamera = await verifyCameraPermissions()

            if (permissionCamera) {
                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [1, 1],
                    base64: true,
                    quality: 0.2
                })
                // console.log(result);
                // console.log(result.assets[0].base64.length);
                if (!result.canceled) {
                    const image = `data:image/jpeg;base64,${result.assets[0].base64}`
                    setImage(image)
                }
            }

        } catch (error) {
            console.log(error);
        }


    };

    const confirmImage = async () => {
        try {
            dispatch(setCameraImage(image))
            triggerPostImage({image, localId})
            navigation.goBack()
        } catch (error) {
            console.log(error);
        }
        /* try {
            dispatch(setCameraImage(image));
            triggerSaveImage({image, localId})
        } catch (error) {
            console.log(error);
        }
        navigation.goBack(); */
    };

    const handleShowData = () => {
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            {image ? (
                <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>Sin Foto</Text>
                </View>
            )}
            {datosuser ? (
                <>
                    <Text style={styles.name}>{datosuser.name}</Text>
                    <Text style={styles.email}>{datosuser.email}</Text>
                </>
            ) : (
                <Text style={styles.loading}></Text>
            )}
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Seleccionar Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleShowData}>
                <Text style={styles.buttonText}>Ver mis datos</Text>
            </TouchableOpacity>
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Mis Datos</Text>
                        {image && <Image source={{ uri: image }} style={styles.modalImage} />}
                        {datosuser && (
                            <>
                                <Text style={styles.modalText}><Text style={styles.label}>Nombre:</Text> {datosuser.name}</Text>
                                <Text style={styles.modalText}><Text style={styles.label}>Email:</Text> {datosuser.email}</Text>
                                <Text style={styles.modalText}><Text style={styles.label}>RUT:</Text> {datosuser.rut}</Text>
                            </>
                        )}
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        padding: 20,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    email: {
        fontSize: 18,
        color: '#555',
        marginBottom: 30,
    },
    loading: {
        fontSize: 18,
        color: '#999',
    },
    button: {
        backgroundColor: '#4A90E2',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginBottom: 20,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    emptyState: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#d4edda',
    },
    emptyStateText: {
        color: '#155724',
        fontSize: 18,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    modalText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
        textAlign: 'center',
    },
    label: {
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ProfileScreen;
