// @flow

import React, { Component } from 'react';
import { View, ActivityIndicator, StatusBar, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import instance from '../config/Axios.interceptor';
import {checkObj} from '../helpers/Obj.Check';


class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._boot();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _boot = () => {

    let  user_token = undefined;

    if(!checkObj.isEmpty(this.props.user))
    {
        if(!checkObj.isEmpty(this.props.user.user))
        {
            let userData    = this.props.user.user;

            if(!checkObj.isEmpty(userData.data))
            { 
                let status    =    userData.data.status;

                if(status === 'success')
                {
                  user_token    = userData.data.result.token;
                }    
            }
        }
    }
   
    const userToken = user_token;
    instance.defaults.headers.common['x-access-token'] = userToken;

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <StatusBar  backgroundColor="#117BCF" barStyle="light-content" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {  
    return ({ user : state.otp});
}
export default connect(mapStateToProps)(AuthLoadingScreen); 