import {createStackNavigator} from '@react-navigation/stack';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Share from 'react-native-share';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Menu from '../assets/images/logo.jpeg';
import Profile from '../assets/images/Pic.png';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View, Text, SafeAreaView, ScrollView,Alert,TouchableOpacity, Pressable, Dimensions} from 'react-native';
import globalStyles from '../assets/css/styles';
import MoreScreen from '../containers/More/MoreScreen';
import ContactUs from '../containers/ContactUs/ContactUs';
import ProfileDetail from '../containers/Profile/Detail/ProfileDetail';
import FAQScreen from '../containers/FAQ/FAQScreen';
import KnowledgeBank from '../containers/KnowledgeBank/KnowledgeBank';

import TrackComplaint from '../containers/Complaint/TrackComplaint/TrackComplaint';
import FileComplaint from '../containers/Complaint/FileComplaint/FileComplaint';
import CmsScreen from '../containers/Cms/CmsScreen';
import {COLOR, globalConstants} from '../constants/GlobalConstants';
import AboutUs from '../containers/About-us/AboutUs';
import Terms from '../containers/Cms/Terms';
import DashboardScreen from '../containers/Dashboard/Dashboard/DashboardScreen';
import en from '../../locales/en.json';
import hi from '../../locales/hi.json';
import { useDispatch } from 'react-redux';

import PrivacyPolicy from '../containers/Cms/PrivacyPolicy';
import Confidentiality from '../containers/Cms/Confidentiality';
import HowItWorks from '../containers/Cms/HowItWorks';
import {OTPActions, OTPConstants} from '../containers/Auth/OTP/OTP.actions';
import CustomButton from '../components/CustomButton';
import drawerHeaderStyle from './DrawerHeaderStyle';
import DrawerFooterStyle from './DrawerFooterStyle';
import ShareScreen from '../containers/Share/ShareScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StartScreen from '../containers/App-Intro/StartScreen';
import VideosScreen from '../containers/KnowledgeBank/Videos/VideosScreen';
import ArticlesScreen from '../containers/KnowledgeBank/Articles/ArticlesScreen';
import BlogsScreen, { BlogDetailScreen } from '../containers/KnowledgeBank/Blogs/BlogsScreen';
import LawsScreen from '../containers/KnowledgeBank/Laws/LawsScreen';
import LearningDocumentsScreen from '../containers/KnowledgeBank/LearningDocuments/LearningDocumentsScreen';
import ResearchScreen from '../containers/KnowledgeBank/Research/ResearchScreen';
import { useSelector } from 'react-redux';
import { getLanguage } from '../translations/languageSelector';
import LanguageSelectionModal from '../translations/LanguageSelectionModal ';
import LanguageSelectionMenu from '../translations/LanguageSelectionMenu';
import { CommonActionsCreator } from '../actions/CommonActionCreators';
import DrawerHeader from './DrawerHeader';
import DrawerFooter from './DrawerFooter';
import { useState } from 'react';
const { width } = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

performLogout = (props) => {
  //const dispatch = useDispatch()

 
 // dispatch(OTPActions.logout());

  AsyncStorage.clear();
  //props.navigation.dispatch(CommonActionsCreator.success(OTPConstants.LOGOUT_SUCCESS));
    
};

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

const testheader = props => {
  return (
    <View>
      <View style={drawerHeaderStyle.imageContainer}>
        <Image style={drawerHeaderStyle.imageStyle} source={Logo} />
      </View>
      <View style={drawerHeaderStyle.detailsContainer}>
        <Text style={drawerHeaderStyle.nameTextStyle}>Adivid Tech </Text>
      </View>
    </View>
  );
};

const testFooter = props => {
  return (
    <View style={DrawerFooterStyle.component}>
      <View style={{paddingHorizontal: 20}}>
        <CustomButton
          text={'Logout'}
          onPress={() =>
            Alert.alert(
              'Log out',
              'Do you want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    props.navigation.dispatch(DrawerActions.closeDrawer());
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => performLogout(props),
                },
              ],
              {cancelable: false},
            )
          }
        />
      </View>
      <Text style={DrawerFooterStyle.RightsTextStyle}>
        © All rights are reserved with My Ambar Suraksha Chakra
      </Text>
    </View>
  );
};

const BottomTabsFirstStack = ({navigation}) => {
  
  const language = useSelector(getLanguage);
  let translations;
  if (language.language === 'en') {
    translations = en;
  } else {
    translations = hi;
  }
  return (
    <Stack.Navigator
      initialRouteName="bottom"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white',
        },
        headerLeft: () => (
          <Ionicons
            name="ios-arrow-back"
            size={30}
            color="white"
            onPress={() => navigation.goBack()}
            style={{marginLeft: 15}}
          />
        ),
        headerTintColor: 'white',
        headerBackgroundContainerStyle:{backgroundColor:'white'},
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="bottom"
        component={BottomTabStack}
        options={{
          headerShown: false,
          title: 'Home', //Set Header Title
        }}
      />
      <Stack.Screen
        name="fileComplaint"
        component={FileComplaint}
        options={{
          title: translations.file, //Set Header Title
        }}
      />
      <Stack.Screen
        name="faq"
        component={FAQScreen}
        options={{
          title: translations.faq, //Set Header Title
        }}
      />

      <Stack.Screen
        name="trackComplaint"
        component={TrackComplaint}
        options={{
          title: translations.track, //Set Header Title
        }}
      />
      <Stack.Screen
        name="BlogDetail"
        component={BlogDetailScreen}
        options={{
          title: translations.blogs, //Set Header Title
        }}
      />
         <Stack.Screen name="StartScreen" component={StartScreen} />
         <Stack.Screen
        name="languageMenu"
        component={LanguageSelectionMenu}
        options={{
          headerShown: false,
          title: 'Language', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const LogoTitle = props => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(true)
  const onPress = () => {
    setVisible(true);
    navigation.navigate('languageMenu', { visible, setVisible }); // Pass the props to the languageMenu screen
  };
  return (
    <View style={globalStyles.dashBoardAppBar}>
      <View style={{flex: 1, alignItems: 'flex-start',flexDirection:'row'}}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.dispatch(DrawerActions.toggleDrawer())
          }>
          <Image
            source={Profile}
            resizeMode="contain"
            style={{width: 0.05*windowHeight, height: 0.05*windowHeight}}
          />
        </TouchableOpacity>
        <View style={{marginLeft:0.019*windowHeight}}>
        <Text style={globalStyles.headerLargeText2}>Willy Wonka</Text>
        <Text style={globalStyles.headerSmalltext2}>SUB Inspector</Text>
        </View>
      </View>
      
      
      <Pressable style={{alignSelf: 'center',justifyContent:'center',alignItems:'center',width:0.045*windowHeight,height:0.045*windowHeight,borderRadius:0.045*windowHeight,borderColor:'rgba(181, 183, 192, 1)',borderWidth:0.5}} onPress={onPress}>
        <Ionicons name={'notifications'} size={0.03*windowHeight} color={'rgba(0, 117, 255, 1)'} style={{alignSelf:'center'}}/>
      </Pressable>
    </View>
  );
};
const BackHeader = props => {
  return (
    <View style={globalStyles.dashBoardAppBar}>
      <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 5}}>
        <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
          <Image source={Menu} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <View style={{flex: 5}}>
        <Text>{props.title}</Text>
      </View>
    </View>
  );
};

function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 1}}>
        <DrawerHeader />
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <DrawerItemList {...props} />
        </ScrollView>
        <DrawerFooter {...props} />
      </View>
    </SafeAreaView>
  );
}

const CustomDrawerContentold = props => (
  <ScrollView>
    <SafeAreaView
      style={{flex: 1}}
      forceInset={{top: 'always', horizontal: 'never'}}>
      <DrawerItemList {...props} />
    </SafeAreaView>
  </ScrollView>
);

function CustomDrawerContentOld(props) {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: COLOR.BACKGROUND_COLOR,
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
          paddingVertical: 40,
          paddingHorizontal: 10,
        }}>
        <View style={{alignItems: 'center'}}>
          {/* <Image
            source={Avatar}
            resizeMode="contain"
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              borderWidth: 3,
              borderColor: '#ccc',
            }}
          /> */}
        </View>
        <Text
          style={{
            marginLeft: 10,
            color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          John Doe
        </Text>
      </View>
      <DrawerContentScrollView {...props} style={{marginTop: -50}}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        style={{
          backgroundColor: COLOR.BACKGROUND_COLOR,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={logout}>
          <Text style={{color: 'white', fontSize: 16}}>Logout</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const DrawerNavigator = props => {
  const navigation = useNavigation();
  const language = useSelector(getLanguage);
  let translations;
  if (language.language === 'en') {
    translations = en;
  } else {
    translations = hi;
  }
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerItemStyle: {marginVertical: 0},
        drawerActiveTintColor: '#000000',
        drawerActiveBackgroundColor: 'transparent',
        inactiveTintColor: '#000000',
        inactiveBackgroundColor: '',
        backBehavior: 'history',
        // header : ({ navigation, route, options }) => { return <BackHeader title={route.name} navigation={navigation} />}
        headerStyle: {
          backgroundColor: COLOR.BACKGROUND_COLOR,
        },
        headerLeft: () => (
          <Ionicons
            name="ios-arrow-back"
            size={30}
            color="white"
            onPress={() => navigation.goBack()}
            style={{marginLeft: 15}}
          />
        ),
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}>
      <Drawer.Screen
        name="home"
        component={BottomTabsFirstStack}
        options={{
          title: translations.home,
          headerShown: false,
          headerBackgroundContainerStyle:{backgroundColor:'white'}
        }}
      />
      <Drawer.Screen
        name="about-us"
        component={AboutUs}
        options={{
          title: translations.about,
        }}
      />
     
      <Drawer.Screen
        name="how"
        component={HowItWorks}
        options={{
          title: translations.how, //Set Header Title
        }}
      />
      <Drawer.Screen
        name="laws"
        component={LawsScreen}
        options={{
          title: translations.laws,
        }}
      />
      <Drawer.Screen
        name="research"
        component={ResearchScreen}
        options={{
          title: translations.research,
        }}
      />
      <Drawer.Screen
        name="learning"
        component={LearningDocumentsScreen}
        options={{
          title: translations.docs,
        }}
      />
      <Drawer.Screen
        name="videos"
        component={VideosScreen}
        options={{
          title: translations.videos,
        }}
      />
      <Drawer.Screen
        name="blogs"
        component={BlogsScreen}
        options={{
          title: translations.blogs,
        }}
      />
      <Drawer.Screen
        name="articles"
        component={ArticlesScreen}
        options={{
          title: translations.articles,
        }}
      />
       <Drawer.Screen
        name="terms-conditions"
        component={Terms}
        options={{
          title: translations.terms, //Set Header Title
        }}
      />
      <Drawer.Screen
        name="privacy"
        component={PrivacyPolicy}
        options={{
          title: translations.privacy,
        }}
      />
      <Drawer.Screen
        name="confidentiality"
        component={Confidentiality}
        options={{
          title: translations.confidentiality,
        }}
      />
     {/* <Drawer.Screen
        name="changeLanguage"
        component={LanguageSelectionMenu}
        options={{
          title: translations.language,
        }}
      /> */}
    </Drawer.Navigator>
  );
};

const BottomTabStack = ({navigation}) => {

  const language = useSelector(getLanguage);
  let translations;
  if (language.language === 'en') {
    translations = en;
  } else {
    translations = hi;
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Tab.Navigator
        initialRouteName="dashboard"
        screenOptions={{
          tabBarStyle: globalStyles.dashBoardBottomBar,
          headerStyle: {
            backgroundColor: COLOR.BACKGROUND_COLOR,
          },
          headerLeft: () => (
            <Ionicons
              name="ios-arrow-back"
              size={30}
              color="white"
              onPress={() => navigation.goBack()}
              style={{marginLeft: 15}}
            />
          ),
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerBackgroundContainerStyle:{backgroundColor:'white'}
        }}>
        <Tab.Screen
          name="dashboard"
          component={DashboardScreen}
          options={{
            header: ({navigation, route, options}) => {
              return <LogoTitle title={route.name} navigation={navigation} />;
            },
            title: '',
            tabBarIcon: () => <Image source={Menu} resizeMode="contain" style={{height: Math.round((40 * width) / 400) }}/>,
          }}
        />
        <Tab.Screen
          name="Screen2"
          component={ProfileDetail}
          options={{
            title: translations.profile,
            tabBarLabel: '',
            tabBarIcon: () => <Image source={Menu} resizeMode="contain" style={{height: Math.round((40 * width) / 400) }}/>,
          }}
        />

        <Tab.Screen
          name="Screen3"
          component={ContactUs}
          options={{
            title: translations.contact,
            tabBarLabel: '',
            tabBarIcon: () => <Image source={Menu} resizeMode="contain" style={{height: Math.round((40 * width) / 400) }}/>,
          }}
        />
        <Tab.Screen
          name="Screen4"
          component={ShareScreen}
          options={{
            title: translations.share,
            tabBarLabel: '',
            tabBarIcon: () => 
            
            <Image source={Menu} resizeMode="contain" style={{height: Math.round((40 * width) / 400) }}/>
            
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault();
             // alert('Default behavior prevented');
              // Do something with the `navigation` object
              //navigation.navigate('AnotherPlace');
              shareAPK();
              return false;
            },
            tabLongPress: (e) => {
              // Prevent default action
              e.preventDefault();
             // alert('Default behavior prevented');
              // Do something with the `navigation` object
              //navigation.navigate('AnotherPlace');
              shareAPK(); 
              return false;
            },
          })}
        />
      </Tab.Navigator>
    </View>
  );
};

export const AppStack = () => {
  return <DrawerNavigator />;
};
