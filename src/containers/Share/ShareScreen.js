import React from 'react';
import {Text,TouchableOpacity,View,Image} from 'react-native';
import Background from '../../components/Background';
import Share from 'react-native-share';
// import Shared from '../../assets/images/share-icon.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
const ShareScreen = ({navigation}) => {

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      // Prevent default behavior
      e.preventDefault();
      shareAPK();

    //  alert('Default behavior prevented');
      // Do something manually
      // ...
    });

    const unsubscribe1 = navigation.addListener('tabLongPress', (e) => {
      // Prevent default behavior
      e.preventDefault();
      shareAPK();

    //  alert('Default behavior prevented');
      // Do something manually
      // ...
    });

    return unsubscribe;
  }, [navigation]);

  const shareAPK = async () => {
    try {
      const googleDriveLink = 'https://drive.google.com/file/d/1LDe3WVh-yeoGUbI5P6N2Fg9Ty44ujFRM/view?usp=share_link'; 
      const options = {
        url: googleDriveLink,
      };

      await Share.open(options);
    } catch (error) {
      console.log('Error sharing APK:', error);
    }
    
  };
  return <View style={{ flex: 1, alignItems: 'center', justifyContent:'center' }}>
   <Text style={{color:'black', fontSize:20,marginBottom:20,alignSelf:'center',fontWeight:'bold'}}>Share the app</Text>
    <TouchableOpacity onPress={shareAPK} style={{alignSelf:'center'}}>
      
      <AntDesign name='sharealt' color={'black'} size={50}/>
      
    </TouchableOpacity>
   </View>;
};

export default ShareScreen;