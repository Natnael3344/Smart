import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const ConsentPopup = ({modalVisible,onPress,onCancel}) => {
  
  const [radioChecked, setRadioChecked] = useState(false);

  const handleRadioPress = () => {
    setRadioChecked(!radioChecked);
  };

//   const handleSubmit = () => {
//     if (radioChecked) {
//       // Submit the form
//       setModalVisible(false);
//     } else {
//       // Show an error or validation message
//     }
//   };

  return (
    <View style={{alignContent:'center'}}>
      <Modal visible={modalVisible} transparent >
        <View style={styles.container}>
          
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={handleRadioPress}>
              <Text style={{fontSize:20,marginRight:10, color:'black'}}>{radioChecked ? '◉' : '◯'}</Text>
            </TouchableOpacity>
            <Text style={{color:'black',fontSize:18}}>By submitting this form, I agree to the terms and conditions.</Text>
            </View>        
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              
              <TouchableOpacity onPress={onCancel}>
                <Text style={{color:'black',fontSize:18}}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onPress} disabled={!radioChecked}>
                <Text style={{color:'black',fontSize:18}}>Submit</Text>
              </TouchableOpacity>
            </View>
          
        </View>
      </Modal>
      </View>
  );
};

export default ConsentPopup;
const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderRadius: 40,
      paddingHorizontal: 30,
      paddingVertical: 30,
      height:'40%', 
      marginTop:150,
      marginHorizontal:20,
      justifyContent:'space-around'
    },
  });