import React from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';

import { connect } from 'react-redux';

import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import { navigationRef } from './RootNavigation';


function Router(props) {
  let token;
 if(props.user?.data !== undefined)
  {
    token = props.user?.data[0]?.token;
  }

  return (
    <NavigationContainer ref={navigationRef}>
     {/* { token ? <AppStack /> : <AuthStack loadingSignOut={props.loadingSignOut} />   }  */}
    {   <AppStack /> }  
    </NavigationContainer>
  );
}

const mapStateToProps = function(state) {
 
  return {
     user : state.otp.user,
     loadingSignOut : state.otp.loadingSignOut,
  }
}

export default connect(mapStateToProps)(Router);