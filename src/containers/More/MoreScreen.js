import { View, Text,StyleSheet,Dimensions } from 'react-native'
import React from 'react'
import CustomPressable from '../../components/CustomPressable'
import { useNavigation } from '@react-navigation/native';
import Background from '../../components/Background';
import { LargeButton } from '../../components/renderButton';
import { Button } from 'react-native';


const MoreScreen = () => {
    const navigation = useNavigation(); 
  return (
    <Background showlogo={false}>
    <View style={styles.container}>
    <Button title="Hello"  onPress={() => {navigation.navigate("faq");}}/>
    { /* <CustomPressable text={'Track a complaint'} text1={'Find out your complint status.'} name={'track-changes'}
     onPress={() => {navigation.navigate("tracAComplaint");}}/>
     <CustomPressable text={'Knowledge Bank'} text1={'Find out more about sexual harassment.'} name={'saved-search'}
     onPress={() => {navigation.navigate("KnowledgeBank");}}/>
      <CustomPressable text={'FAQ'} text1={'Frequently asked questions.'} name={'contact-support'} 
      onPress={() => {navigation.navigate("faq");}}/> */ }
     </View>
    </Background>
  )
}
const styles = StyleSheet.create({
    container: {
      
      flex: 1,
      alignContent:'center',
      alignItems:'center',

     
    },
  });
export default MoreScreen