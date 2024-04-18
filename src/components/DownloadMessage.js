import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,Image, Linking, PermissionsAndroid
  } from 'react-native';
  import {useState} from 'react';
  import Modal from 'react-native-modal';
  // import Success from '../assets/images/success.png'; 
  // import Arrow from '../assets/images/right-arrow.png'; 
import { COLOR, globalConstants } from '../constants/GlobalConstants';
import FileViewer from 'react-native-file-viewer';
// import RNFetchBlob from 'rn-fetch-blob';
// const android = RNFetchBlob.android
const DownloadMessage = ({toggleModal,fileName,isModalVisible}) => {
  const pdfOpen=()=>{
    toggleModal();
    FileViewer.open(fileName)
    .then(() => {
      console.log('Success');
    })
    .catch(_err => {
      console.log(_err);
    });
    
}
  return (
    <Modal isVisible={isModalVisible} >
    <View style={styles.container}>
    <Image source={Success} style={{height:110,width:110,alignSelf:'center',marginTop:-60}}/>
      <Text style={{fontSize:22, fontWeight:'bold', color:COLOR.BACKGROUND_COLOR,alignSelf:'center',marginTop:20,marginBottom:20}}>Successfully Downloaded!!</Text>
      <Text style={{fontWeight:'bold', alignSelf:'center',color:'black'}}>File saved in :</Text>
      <Text style={{alignSelf:'center',color:'black'}}>{fileName}</Text>
      <TouchableOpacity onPress={pdfOpen}>
      <Text style={{fontSize:20, fontWeight:'bold', color:COLOR.BACKGROUND_COLOR,alignSelf:'center',marginTop:20}}>Ok</Text>
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
export default DownloadMessage