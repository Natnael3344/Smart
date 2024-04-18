import {View, TextInput, StyleSheet} from 'react-native';
import React from 'react';

const CustomInput = ({
  value,
  setValue,
  height,
  keyboardType,
  maxLength,
  ref,
  editable,
}) => {
  return (
    <View style={[styles.container, height && {height}]}>
      <TextInput
        onChangeText={setValue}
        style={styles.input}
        keyboardType={keyboardType}
        value={value}
        maxLength={maxLength}
        ref={ref}
        editable={editable}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#cacdcd',
    borderWidth: 1,
    borderRadius: 30,
    alignSelf: 'center',
    height: 45,
    marginTop: 20,
  },
  input: {
    fontWeight: 'bold',
    marginLeft: 20,
    color: 'black',
  },
});
export default CustomInput;
