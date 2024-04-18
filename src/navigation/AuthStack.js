import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../containers/Auth/Login/LoginScreen';
import StartScreen from '../containers/App-Intro/StartScreen';
import OtpScreen from '../containers/Auth/OTP/OtpScreen';
import RegistrationScreen from '../containers/Auth/Registration/RegistrationScreen';
import LanguageSelectionModal from '../translations/LanguageSelectionModal ';
import RegistrationNameScreen from '../containers/Auth/Name/RegistrationNameScreen';

const Stack = createStackNavigator();

export const AuthStack = (props) => {

  
  return (
    <Stack.Navigator initialRouteName={props.loadingSignOut ? "Login" : "Login"} screenOptions={{
      headerShown: false
    }}>
      
      {/* <Stack.Screen name="Otp" component={OtpScreen} /> */}
      <Stack.Screen name="Register" component={RegistrationScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* <Stack.Screen name="StartScreen" component={StartScreen} /> */}
      {/* <Stack.Screen name="language" component={LanguageSelectionModal} />
      <Stack.Screen name="RegisterName" component={RegistrationNameScreen} /> */}
      
    </Stack.Navigator>
  );
};