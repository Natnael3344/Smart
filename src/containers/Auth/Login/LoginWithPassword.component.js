// @ flow

import React, { Component } from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback,ScrollView, View, Text, StatusBar, Image, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { loginActions } from './Login.actions';

import { renderTextField } from '../../../components/renderInput';
import {globalImagePaths} from '../../../constants/GlobalImagePaths';
import validate from '../../../config/Validator';

import globalStyles from '../../../assets/css/styles';

import FBSDK, { LoginManager, LoginButton, AccessToken,GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import Ripple from 'react-native-material-ripple';
import { ErrorToaster } from '../../../helpers';
import ActivityLoader from '../../../components/loader/ActivityLoader'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

class LoginWithPassword extends Component {

    static navigationOptions = {
        header: null
    };
    
    constructor(props) {
        super(props);
        this.state = { loading : false }
        this._fbAuth = this._fbAuth.bind(this);
    }

    navigateToRegisterScreen = () => {
        this.props.navigation.navigate("Register");
    }
    
    _onSubmit = (values) => {
        Keyboard.dismiss()
        this.props.login(values)
    }

    _responseInfoCallback = (error, result) => {
        if (error) {
            ErrorToaster(error);
        } else {
            data = {
                social_id	: result.id,
                social_type	: "facebook",
            }
            additionalData =  { socialData :{
                    name        : result.first_name,
                    last_name   : result.last_name,
                    email       : result.email,
                    social_id   : result.id,
                    social_type	: "facebook"
                }
            }
            this._socialSignIn(data,additionalData);
        }
    }

    
    _fbAuth = async () => {
        this.setState({loading:true})
        LoginManager.logInWithReadPermissions(['email','public_profile'])
            .then(
                (result) => {
                    this.setState({loading:false})
                    if (result.isCancelled) {
                        ErrorToaster('Whoops!', 'You cancelled the sign in.');
                    } else {
                        AccessToken.getCurrentAccessToken()
                        .then((data) => {
                            const { accessToken } = data
                            const profileRequestParams = {
                                fields: {
                                    string: 'id, name, email, first_name, last_name, gender'
                                }
                            }
                            const profileRequest = new GraphRequest('/me',{
                                    httpMethod: 'GET',
                                    version: 'v2.5',
                                    parameters: profileRequestParams,
                                    accessToken: accessToken.toString()
                                },this._responseInfoCallback)
                            new GraphRequestManager().addRequest(profileRequest).start();
                        });
                    }
                },
                (error) => {
                    this.setState({loading:false});
                    ErrorToaster('Sign in error', error);
                },
            );
    }
      
  
    _socialSignIn(data,additionalData){
        this.props.socialLogin(data,additionalData);
    }
    
  
    render() {        
      
        const { handleSubmit, reset, submitting } = this.props;

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ImageBackground
                source={globalImagePaths.loginSignBg}
                style={[globalStyles.appImgBackGround, {paddingTop : StatusBar.currentHeight}]}    >
               
                <KeyboardAvoidingView  style={{flex:1}} behavior="height" enabled={false}>
                <StatusBar translucent={true}  backgroundColor='transparent' barStyle='light-content' />
                <ScrollView keyboardDismissMode="interactive" keyboardShouldPersistTaps={'handled'}>
                     <View style={globalStyles.AuthLogoContainer}>
                        <View>
                            <Image resizeMode={"contain"} style={globalStyles.AuthLogoSignUp} source={globalImagePaths.logo2} />
                        </View>
                        <View style={globalStyles.AuthMainText}>
                            <Text style={[globalStyles.heading]}>Login</Text>
                        </View>
                    </View>
                    <View>
                        <View  style={globalStyles.AuthInputConatainerHeight}> 
                            <Field
                                name="user_name"
                                label="Mobile Number/Email *"                                
                                inputStyle={[globalStyles.AuthTextInput]}
                                component={renderTextField}
                            />
                        </View>
                        <View style={globalStyles.AuthInputConatainerHeight}>
                            <Field
                                name="password"
                                label="Password *"
                                inputStyle={[globalStyles.AuthTextInput]}
                                component={renderTextField}
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={globalStyles.AuthMarginTop}>   
                            <Ripple  block 
                                style={globalStyles.AuthRippleBtn} 
                                rippleContainerBorderRadius={30}
                                onPress={handleSubmit(this._onSubmit)}
                            >
                                 <View style={{flexDirection : "row", justifyContent  : "center", alignItems : "center"}}>                                   
                                    <Text style={[globalStyles.AuthSubmitBtnText,{paddingHorizontal : responsiveWidth(2)}]}>SIGN IN </Text>
                                    {   (this.props.loading || this.state.loading) &&
                                       <View style={{left : responsiveWidth(25),justifyContent  : "flex-end", alignItems : "flex-end"}}>   
                                             <ActivityIndicator color={"#fff"} style={[{ alignItems : "flex-end",}]}/>
                                        </View>   
                                    }    
                                </View>
                            </Ripple>
                        </View>
                    </View>
                  
                    <View style={{marginTop:responsiveHeight(3)}}>
                        <TouchableOpacity 
                            onPress={ () => this.props.navigation.navigate('Login')}
                            style={globalStyles.AuthCommonContainer}>
                            <Text style={[globalStyles.AuthSubText]}>Login with OTP! </Text>
                        </TouchableOpacity>
                    </View>    
                    <View style={globalStyles.AuthSocialLoginIconContainer}>
                        <View style={globalStyles.AuthCommonContainer}>
                            <Text style={globalStyles.AuthTextOr}>OR</Text>
                        </View>
                        <View style={globalStyles.AuthCommonContainer}>
                             <Ripple onPress={this._fbAuth}>                          
                                <Image
                                    resizeMode={"contain"}
                                    style={globalStyles.socialAlignment}
                                    source={globalImagePaths.facebook}
                                />
                            </Ripple>
                        </View>
                        <View style={globalStyles.AuthCommonContainer}>
                            <Text adjustsFontSizeToFit style={globalStyles.AuthFooterText}>Don't have an account yet?</Text>
                            <TouchableOpacity onPress={this.navigateToRegisterScreen}>
                                <Text style={globalStyles.AuthSubText}> Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </ScrollView>
                </KeyboardAvoidingView>    
            </ImageBackground>
            </TouchableWithoutFeedback>
        )
    }
}

const mapStateToPros = (state) => {
    return ({ 
        user: state.login,
        loading : state.login.loading 
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (values) => dispatch(loginActions.loginWithPassword(values)),
        socialLogin : (socialData,data) => dispatch(loginActions.socialLogin(socialData,data))
    }
}

LoginWithPassword = connect(
    mapStateToPros,
    mapDispatchToProps
)(LoginWithPassword)

export default reduxForm({
    form: 'LoginWithPassword',
    validate
})(LoginWithPassword);
