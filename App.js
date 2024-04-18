import React, { useEffect, createRef } from 'react';

import {
	  Platform,
	  BackHandler,
	  ToastAndroid,
	StatusBar
	} from "react-native";


import { extendTheme, NativeBaseProvider } from "native-base";



import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './src/config/Store';
import { Provider } from 'react-redux';

import { AlertHelper } from './src/helpers/AlertHelper';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
 import Router from './src/navigation/RouteNavigation';
import SplashScreen from "react-native-splash-screen"; //import SplashScreen
import store from './src/config/Store';
import ActivityLoader from './src/components/loader/ActivityLoader';
// 2. Extend the theme to include custom colors, fonts, etc
const newColorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
  },
};
const theme = extendTheme({ colors: newColorTheme });
// 3. Pass the `theme` prop to the `NativeBaseProvider`

let backHandlerClickCount = 0;
const navigationRef = createRef()
const nav = () => navigationRef.current

const App = () => {

	
	useEffect(() => {
		SplashScreen.hide(); //hides the splash screen on app load.
		this.backHandler = BackHandler.addEventListener("hardwareBackPress", () =>
		      this.onBackButtonPressAndroid()
		    );
	  }, []);


	onBackButtonPressAndroid = () => {
		    const shortToast = message => {
		      ToastAndroid.showWithGravityAndOffset(
		        message,
		        ToastAndroid.SHORT,
		        ToastAndroid.BOTTOM,
		        25,
		        50
		      );
		    };
		    // const { clickedPosition } = this.state;
		    backHandlerClickCount += 1;
		    
		      if (backHandlerClickCount < 2) {
		        shortToast("Press again to quit the application!");
		      } else {
		        BackHandler.exitApp();
		      }
		    
		    // timeout for fade and exit
		    setTimeout(() => {
		      backHandlerClickCount = 0;
		    }, 2000);
		    return true;
		  };


  return (
    <Provider store={store}>
						<PersistGate loading={<ActivityLoader />} persistor={persistor}>
            <NativeBaseProvider theme={theme}>
<Router />
			
									{/* GLOBAL FLASH MESSAGE COMPONENT INSTANCE */}
									{/* <DropdownAlert
										updateStatusBar={true}
										defaultContainer={{ 
										paddingTop: StatusBar.currentHeight,
										paddingBottom: responsiveHeight(2),
										paddingHorizontal:responsiveWidth(2),               
										}}
										contentContainerStyle={{
										flexDirection:'column',              
										}}
										ref={ref => AlertHelper.setDropDown(ref)}
										imageStyle={{display:'none'}}
										onClose={() => AlertHelper.invokeOnClose()}
										closeInterval={4000}
										translucent={true}
										successColor={'#0AD561'}
										errorColor={"#DC3545"}
										activeStatusBarBackgroundColor={"transparent"}
										inactiveStatusBarBackgroundColor={"transparent"}
										inactiveStatusBarStyle={"dark-content"}
									/> */}
								</NativeBaseProvider>
						</PersistGate>
					</Provider>

    
  );
}

export default App;