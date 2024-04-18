import React,{ useState } from 'react'
import { Field } from 'redux-form'


import {View, Text, Pressable, StyleSheet, FlatList} from 'react-native';
import globalStyles from '../../../assets/css/styles';
import {renderTextField} from '../../../components/renderInput';

import CheckBox from '@react-native-community/checkbox';
import { Input } from 'native-base';



const required = value => (value ? undefined : 'This field value is required.');

export const Declaration = props => {
 
  const [toggleCheckBox, setToggleCheckBox] = useState(false);;

  const toggleCheckBoxValue = (newValue) => {
    setToggleCheckBox(newValue)
    props.submitConfirmFinalSubmission(newValue)
  }


  return (
    <View style={{marginTop: 20}}>
      <Text style={globalStyles.complaintText}>
        Make sure you are fully prepared to submit your complaint by providing
        all the necessary details.
      </Text>
      <View style={{marginVertical : 10}}></View>
      <View style={{flex:1, flexDirection:'row'}}>
    
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => toggleCheckBoxValue(newValue)}
        />

        <Text>
          By clicking on this, you acknowledge and agree to share all the
          necessary details of your complaint on this platform.
        </Text>
    
     
      </View>
      <View style={{marginVertical : 20}}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  witnessItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  witnessName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  witnessPhone: {
    flex: 1,
    fontSize: 16,
    color: 'white',
  },
});
