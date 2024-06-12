import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, updateTask } from '../features/taskSice';

const Task = () => {
  const [task, setTask] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const tasks = useSelector(state => state.task.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask(task));
      setTask('');
    }
  };

  const handleEditTask = (task) => {
    setEditMode(true);
    setTask(task.name);
    setCurrentTask(task);
  };

  const handleUpdateTask = () => {
    if (task.trim()) {
      dispatch(updateTask({ ...currentTask, name: task }));
      setTask('');
      setEditMode(false);
      setCurrentTask(null);
      setUpdateModalVisible(false);
    }
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(taskToDelete));
    setDeleteModalVisible(false);
  };

  const confirmDeleteTask = (taskId) => {
    setTaskToDelete(taskId);
    setDeleteModalVisible(true);
  };

  const confirmUpdateTask = () => {
    setUpdateModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Administrador de Tareas</Text>
      <TextInput
        style={styles.input}
        placeholder="Nueva tarea"
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={editMode ? confirmUpdateTask : handleAddTask}
      >
        <Text style={styles.buttonText}>{editMode ? 'Actualizar Tarea' : 'Agregar Tarea'}</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.name}</Text>
            <View style={styles.taskButtons}>
              <TouchableOpacity onPress={() => handleEditTask(item)}>
                <Text style={styles.editButton}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmDeleteTask(item.id)}>
                <Text style={styles.deleteButton}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Modal de Confirmación de Eliminación */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar Eliminación</Text>
            <Text style={styles.modalText}>¿Confirma la eliminación de la tarea?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleDeleteTask}
              >
                <Text style={styles.modalButtonText}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Confirmación de Actualización */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={updateModalVisible}
        onRequestClose={() => setUpdateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar Actualización</Text>
            <Text style={styles.modalText}>¿Confirma la actualización de la tarea?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleUpdateTask}
              >
                <Text style={styles.modalButtonText}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setUpdateModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  taskText: {
    fontSize: 18,
  },
  taskButtons: {
    flexDirection: 'row',
  },
  editButton: {
    color: '#4A90E2',
    marginRight: 10,
  },
  deleteButton: {
    color: '#E94E77',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  modalCancelButton: {
    backgroundColor: '#E94E77',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Task;