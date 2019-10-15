import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

function Button({title, style, ...rest}) {
  return (
    <TouchableOpacity style={[styles.button, style]} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    height: 50,
    backgroundColor: '#FFBB00',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Button;
