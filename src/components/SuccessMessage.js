import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,Image
  } from 'react-native';
  import {useState} from 'react';
  import Modal from 'react-native-modal';
  // import Success from '../assets/images/success.png'; 
  // import Arrow from '../assets/images/right-arrow.png'; 
import { COLOR, globalConstants } from '../constants/GlobalConstants';
const SuccessMessage = ({toggleModal,caseNumber,isModalVisible}) => {
  return (
    <Modal isVisible={isModalVisible} >
    <View style={styles.container}>
    <Image source={Success} style={{height:110,width:110,alignSelf:'center',marginTop:-60}}/>
      <Text style={{fontSize:22, fontWeight:'bold', color:COLOR.BACKGROUND_COLOR,alignSelf:'center',marginTop:20,marginBottom:20}}>Submitted Successfully!!</Text>
      <Text style={{fontSize:19,fontWeight:'bold',alignSelf:'center',color:'black'}}>Case No. :</Text>
      <Text style={{fontSize:19,fontWeight:'bold',alignSelf:'center',color:'black'}}>{caseNumber}</Text>
      <TouchableOpacity onPress={toggleModal}>
      <Image source={Arrow} style={{height:30,width:60,alignSelf:'center',marginTop:30}}/>
        </TouchableOpacity>
    </View>
  </Modal>
  )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderRadius: 40,
      paddingHorizontal: 20,
      paddingVertical: 30,
      
    },
  });
export default SuccessMessage