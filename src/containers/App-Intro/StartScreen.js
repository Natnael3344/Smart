// React Native App Intro Slider using AppIntroSlider
// https://aboutreact.com/react-native-app-intro-slider/
// Simple Intro Slider

// import React in our code
import React, {useState, useEffect} from 'react';
// import Image1 from '../../assets/images/hero.png'
// import Image2 from '../../assets/images/hero2.png'
// import Image3 from '../../assets/images/hero3.png'
// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';
import SplashScreen from "react-native-splash-screen"; //import SplashScreen
//import AppIntroSlider to use it
import AppIntroSlider from 'react-native-app-intro-slider';
import Background from '../../components/Background';
import LinearGradient from 'react-native-linear-gradient';
import { LargeButton } from '../../components/renderButton';
import globalStyles from '../../assets/css/styles';
import en from '../../../locales/en.json';
import hi from '../../../locales/hi.json';
import { getLanguage } from '../../translations/languageSelector';
import { useSelector,useDispatch } from 'react-redux';
import { setLanguage } from '../../translations/languageActions';

const StartScreen = ({ navigation, screenName }) => {
  const [showRealApp, setShowRealApp] = useState(false);
  const dispatch = useDispatch();

  

  const onDone = () => {
    navigation.navigate('Login')
    //setShowRealApp(true);
  };
  const onSkip = () => {
    navigation.navigate('Login')
    //setShowRealApp(true);
  };
  const language = useSelector(getLanguage);
  let translations;
  if (language.language === 'en') {
    translations = en;
  } else {
    translations = hi;
  }
  
  console.log(language);
 
   const RenderItem = ({item}) => {
   
    onFinish = () => {
      navigation.navigate('Login')
    }
   
    return (
      
      <Background>
            <View style={globalStyles.appIntrocontainer}>
       
        <Text style={globalStyles.appIntroTitle}>{translations[item.key]?.title}</Text>
        <LinearGradient 
        colors={item.colors}
        start={{x: 0, y: 0}} 
        end={{x: 1, y: 0}}  
        style={globalStyles.appIntrocontainer1}>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <View style={{paddingLeft:10}}>
          <Text style={{fontWeight:'bold',fontSize:25,color:'#272262',width:200}}>{translations[item.key]?.text}</Text>
          <Text style={{color:'#272262',width:150}}>{translations[item.key]?.text1}</Text>
          </View>
            <Image source={item.image} resizeMode='contain' style={{width:'50%'}}>

            </Image>
            
          </View>
          {/* <Text style={globalStyles.appIntroBody}>{item.text}</Text> */}
         
        { item.key=== 's3' &&  <LargeButton title={translations.file} style={globalStyles.gradientButton} onPressEvent={()=> navigation.navigate('Login')} /> }
        </LinearGradient>
        </View>
     </Background>
    );
  };
  
  return (
    <>
      {showRealApp ? (
        <SafeAreaView style={globalStyles.appIntrocontainer}>
          <View style={globalStyles.appIntrocontainer}>
            {/* <Text style={styles.titleStyle}>
              React Native App Intro Slider using AppIntroSlider
            </Text>
            <Text style={styles.paragraphStyle}>
              This will be your screen when you click Skip
              from any slide or Done button at last
            </Text> */}
            <Button
              title="Show Intro Slider again"
              onPress={() => setShowRealApp(false)}
            />
          </View>
        </SafeAreaView>
      ) : (
        <AppIntroSlider
          data={slides}
          renderItem={({ item }) => <RenderItem item={item} translations={translations}/>}
          showDoneButton={false}
          showSkipButton={false}
          showNextButton={false}
          onDone={onDone}
          onSkip={onSkip}
          dotStyle={{backgroundColor:'#4bb9ac'}}
          activeDotStyle={{backgroundColor:'gray'}}	
        />
      )}
    </>
  );
};

export default StartScreen;





const slides = [
  {
    key: 's1',
    // image: Image1
    
    backgroundColor: '#20d2bb',
    colors:['#fdf1f1', '#fdf1f3', '#fdf1f3'],
    colorText:'#272262'
  },
  {
    key: 's2',
    // image: Image2
       
    colors:['#fed46a', '#fee9b0', '#ffd889'],
    backgroundColor: '#febe29',
  },
  {
    key: 's3',
    // image: Image3,
    backgroundColor: '#22bcb5',
    colors:['#4eb888', '#d6ecd7', '#a7d8bc']
  },
 
];