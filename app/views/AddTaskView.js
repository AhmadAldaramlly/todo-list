import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, Pressable, View, TextInput} from 'react-native';
import {themeColor} from '../utils/styles';
import Button from '../components/Button';

const AddTaskView = ({isVisible=false, title, description, onPressClose, onPressAdd, onChangeTitle, onChangeDescription}) => {
  const [isNewTask, setIsNewTask] = useState(true);

  useEffect(() => setIsNewTask(title === ''), [isVisible]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={false}
        visible={isVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Button title='X' buttonStyle={styles.closeButton} onPress={onPressClose} />
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.textInput} value={title} placeholder='fill the tank e.g.' onChangeText={onChangeTitle} />
            <Text style={styles.label}>Description</Text>
            <TextInput style={[styles.textInput, styles.descriptionInput]} value={description} placeholder='take the bowl... e.g.' onChangeText={onChangeDescription} multiline={true} />
            <Button title={isNewTask ? 'Add' : 'Edit'} onPress={onPressAdd}/>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    width: '80%',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 30,
    elevation: 5,
    position: 'relative',
  },
  label: {
    color: themeColor,
  },
  closeButton: {
    backgroundColor: themeColor,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
  },
  textInput: {
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: themeColor,
  },
  descriptionInput: {
    height: 180,
    textAlignVertical: 'top',
  },
});

export default AddTaskView;