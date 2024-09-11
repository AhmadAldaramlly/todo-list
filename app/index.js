import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import AddTaskView from './views/AddTaskView';
import Button from './components/Button';
import Item from './components/Item';
import { themeColor } from './utils/styles';
import { setItem, getItem, mergeItem } from './utils/CustomAsyncStorage';

export default function App() {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAddTaskViewVisible, setIsAddTaskViewVisible] = useState(false);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    (async function fetchData() {
      const items = await getItem('items').then((items) => items ? Object.values(items) : []);
      setData(items);
    })();
  }, [isAddTaskViewVisible]);
  

  function handleOnPressClose() {
    setId(0);
    setTitle('');
    setDescription('');
    setIsCompleted(false);
    setIsAddTaskViewVisible(false);
  }

  async function handleOnPressAdd() {
    const itemId = id ? id
        : await getItem('lastId')
        .then(async (val) => await setItem('lastId', val + 1)
        .then(() => val + 1));
    await mergeItem('items', {[itemId]: {'id': itemId, title, description, isCompleted}});
    handleOnPressClose();
  }

  function triggerEffect() {
    setIsAddTaskViewVisible(true);
    setIsAddTaskViewVisible(false);
  }
  
  async function handleOnDelete(id) {
    await getItem('items')
        .then(async (items) => {delete items[id]; return items;})
        .then(async (items) => await setItem('items', items));
    triggerEffect();
  }

  function handleOnItemPress(id, title, description, isCompleted) {
    setId(id);
    setTitle(title);
    setDescription(description);
    setIsCompleted(isCompleted);
    setIsAddTaskViewVisible(true);
  }

  async function handleOnCheck(id, isCompleted) {
    await getItem('items')
        .then((items) => {items[id].isCompleted = isCompleted; return items;})
        .then(async (items) => await setItem('items', items));
    triggerEffect();
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.flatListTitle}>Todo</Text>
      <FlatList
        data={data.filter(item => !item.isCompleted)}
        renderItem={({item}) =>
          <Item id={item.id} title={item.title} onPress={() => handleOnItemPress(item.id, item.title, item.description, item.isCompleted)} onDelete={() => handleOnDelete(item.id)} onCheck={handleOnCheck} />}
        keyExtractor={item => item.id}
      />
      <Text style={styles.flatListTitle}>Done</Text>
      <FlatList
        data={data.filter(item => item.isCompleted)}
        renderItem={({item}) =>
          <Item id={item.id} title={item.title} isCompleted={true} itemTextStyle={styles.doneItemText} onPress={() => handleOnItemPress(item.id, item.title, item.description, item.isCompleted)} onDelete={() => handleOnDelete(item.id)} onCheck={handleOnCheck} />}
        keyExtractor={item => item.id}
      />
      <AddTaskView isVisible={isAddTaskViewVisible} title={title} description={description} onPressClose={handleOnPressClose} onPressAdd={handleOnPressAdd} onChangeTitle={setTitle} onChangeDescription={setDescription} />
      <Button title='+' buttonStyle={styles.toggleAddTaskViewButton} textStyle={styles.toggleAddTaskViewButtonText} onPress={() => setIsAddTaskViewVisible(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    margin: 15,
  },
  toggleAddTaskViewButton: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  toggleAddTaskViewButtonText: {
    fontSize: 25,
  },
  flatListTitle: {
    color: themeColor,
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  doneItemText: {
    textDecorationLine: 'line-through',
  },
});