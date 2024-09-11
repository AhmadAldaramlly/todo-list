import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {themeColor} from '../utils/styles';

export default function Button({
    title,
    buttonStyle,
    textStyle,
    onPress
}) {
  return (
    <Pressable style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColor,
    cursor: 'pointer',
    padding: 10,
  },
  text: {
    color: 'white',
  },
});