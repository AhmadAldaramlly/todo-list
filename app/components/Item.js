import { useState } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { themeColor } from "../utils/styles";
import CheckBox from "react-native-check-box";
import Button from "./Button";

export default function Item({id, title, isCompleted=false, itemStyle, itemTextStyle, onCheck, onPress, onDelete}) {
  return (
    <Pressable style={[styles.item, itemStyle]} onPress={onPress}>
      <CheckBox
        style={styles.checkBox}
        isChecked={isCompleted}
        onClick={() => onCheck(id, !isCompleted)}
      />
      <Text style={[styles.title, itemTextStyle]} numberOfLines={1}>{title}</Text>
      <Button title='X' buttonStyle={styles.deleteButton} textStyle={styles.deleteButtonText} onPress={onDelete} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: themeColor,
    marginVertical: 5,
  },
  checkBox: {
    width: '10%',
    padding: 10,
  },
  title: {
    fontSize: 16,
    color: themeColor,
    textAlign: 'left',
    width: '75%',
  },
  deleteButton: {
    width: '10%',
    backgroundColor: '#fff',
  },
  deleteButtonText: {
    color: '#f20',
    fontSize: 15,
    fontWeight: 'bold',
  },
});