import {View, Text, Pressable, ImageBackground, Image,Linking, Button, FlatList,StyleSheet, Dimensions} from 'react-native';
import CustomCard from '../../../components/CustomCard';
// import Risk from '../../../assets/images/risk-icon.png';
// import Map from '../../../assets/images/near-help.png';
// import Police from '../../../assets/images/helpline-icon.png';
// import Contact from '../../../assets/images/emergency-icon.png';
import globalStyles from '../../../assets/css/styles';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Background from '../../../components/Background';
import { useSelector,useDispatch } from 'react-redux';
import { getLanguage } from '../../../translations/languageSelector';
import en from '../../../../locales/en.json';
import hi from '../../../../locales/hi.json';
const windowHeight = Dimensions.get('window').height;
const DashboardScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  onPressEvent = (type) => {
    
    if(type === 'fileComplaint')
    {
      navigation.navigate('fileComplaint');
    }
    else if(type === 'trackComplaint'){
      navigation.navigate('trackComplaint');
    }
    
    else if(type === 'faq'){
      navigation.navigate('faq');
    }

  }
  const emailAddress = 'surakshachakra@myambar.org';
  handleEmailPress = () => {
    Linking.openURL(`mailto:${emailAddress}`);
  };
  const language = useSelector(getLanguage);
  let translations;
  if (language.language === 'en') {
    translations = en;
  } else {
    translations = hi;
  }
  
    // Get current date
    const currentDate = new Date();
    // Get today's day index (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const todayIndex = currentDate.getDay();
    // Get today's date
    const todayDate = currentDate.getDate();
  
    // Array of day names
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
    // Generate data for FlatList
    const data = [];
    for (let i = 0; i < 7; i++) {
      // Calculate the date for each day in the week
      const date = new Date();
      date.setDate(currentDate.getDate() + i);
  
      data.push({
        key: i.toString(),
        day: date.getDate(),
        name: dayNames[date.getDay()],
        isToday: i === todayIndex,
      });
    }
    const renderItem = ({ item }) => (
      <View style={[styles.dateFrame, item.isToday && styles.todayFrame]}>
        <Text style={[styles.dateText,item.isToday && styles.todateText]}>{item.day}</Text>
        <Text style={[styles.dayText,item.isToday && styles.todayText]}>{item.name}</Text>
      </View>
    );
  
  return (
    <View style={{backgroundColor:'white',paddingHorizontal:0.034*windowHeight}}>
       <FlatList
      data={data}
      renderItem={renderItem}
      horizontal={true}
      scrollEnabled={false}
      style={{alignSelf:'center'}}
      contentContainerStyle={styles.container}
    />
    <Text style={globalStyles.headerSmalltext3}>Today Attendance</Text>
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <CustomCard name={'login'} text={'Check In'} text1={'09:00 am'} text2={'On Time'} onCustomPress={() => onPressEvent('trackComplaint')} />
    <CustomCard name={'logout'} text={'Check Out'} text1={'05:00 pm'} text2={'On Time'} onCustomPress={() => onPressEvent('trackComplaint')} />
    </View>
      {/* <View style={globalStyles.dashboardBigContainer}>
        <Text style={globalStyles.dashboardSmallTextHeading}>{translations.started}</Text>
        <Text style={globalStyles.dashboardLargeText}>{translations.help}</Text>
        <Text style={globalStyles.dashboardSmallText}>{translations.description}</Text>
        <View style={globalStyles.dashboardSmallContainer}>
          <View style={globalStyles.listCard}> */}
            {/* <CustomCard source={Risk} text={translations.complaint} onCustomPress={ () => onPressEvent('fileComplaint')}/>
            <CustomCard source={Map} text={translations.view} onCustomPress={() => onPressEvent('trackComplaint')} />
            <CustomCard source={Police} text={translations.support}  onCustomPress={handleEmailPress}/>
            <CustomCard source={Contact} text={translations.faq}  onCustomPress={() => onPressEvent('faq')}/> */}
       
      
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 0.038*windowHeight,
    paddingBottom: 0.022*windowHeight,
    justifyContent:'center',
    backgroundColor:'white'
  },
  dateFrame: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 0.06*windowHeight,
    height: 0.09*windowHeight,
    marginLeft: 0.0031*windowHeight,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  todayFrame: {
    backgroundColor: 'rgba(0, 117, 255, 1)',
  },
  todayText: {
    fontSize: 0.014*windowHeight,
    color: 'white',
    fontWeight:'400'
  },
  todateText: {
    fontSize: 0.02*windowHeight,
    fontWeight: '600',
    color: 'white',
  },
  dateText: {
    fontSize: 0.02*windowHeight,
    fontWeight: '600',
    color: 'black',
  },
  dayText: {
    fontSize: 0.014*windowHeight,
    color: 'rgba(148, 163, 184, 1)',
    fontWeight:'400'
  },
});
export default DashboardScreen;
