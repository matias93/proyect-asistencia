import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useGetDatosUserQuery } from '../services/userInformation'


const AttendanceScreen = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const { data: datosuser } = useGetDatosUserQuery();

  /**
   * 
   * @param {*} action 
   */
  const handleAddRecord = async (action) => {
    const data = {
      action,
      name: datosuser.name,
      rut: datosuser.rut,
      message: action === 'Entrada' ? datosuser.ms1 : datosuser.ms2,
    };

    setModalData(data);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Asistencias</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.entryButton} onPress={() => handleAddRecord('Entrada')}>
          <Icon name="sign-in" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Entrada</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exitButton} onPress={() => handleAddRecord('Salida')}>
          <Icon name="sign-out" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Salida</Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{modalData.action}</Text>
            <Text style={styles.modalText}><Text style={styles.label}>Trabajador:</Text> {modalData.name}</Text>
            <Text style={styles.modalText}><Text style={styles.label}>RUT:</Text> {modalData.rut}</Text>
            <Text style={styles.modalText}><Text style={styles.label}>Mensaje:</Text> {modalData.message}</Text>
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
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  record: {
    fontSize: 16,
    color: '#555',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  entryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  exitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E74C3C',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
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

export default AttendanceScreen;
