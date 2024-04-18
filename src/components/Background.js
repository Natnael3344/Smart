import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView,StatusBar,View, Image, Dimensions } from 'react-native'
import { globalImagePaths } from '../constants';
import globalStyles from '../assets/css/styles';
const windowHeight = Dimensions.get('window').height;
// import { theme } from '../core/theme'

export default function Background(props) {
  return (


<ImageBackground
source={globalImagePaths.loginSignBg}
style={[globalStyles.appImgBackGround, {paddingTop : StatusBar.currentHeight}]}  
>
<StatusBar translucent={true}  backgroundColor='transparent' barStyle='dark-content' />
<KeyboardAvoidingView  style={{flex:1}} behavior="height" enabled={false}>
    
    <View style={{flex:1,paddingTop:0.15*windowHeight,}}>
      {props.children}
    </View>
    </KeyboardAvoidingView>
    </ImageBackground>
      

  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  //  backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    
    width: '100%',
   
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
