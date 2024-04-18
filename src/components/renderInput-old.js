// @flow
import React from 'react'
import { View,Text, TouchableOpacity, Image, Icon} from 'react-native';

import globalStyles, {POPPINSREGULAR} from '../assets/css/styles';
import { TextField } from 'native-base'; 

import { responsiveHeight, responsiveWidth, responsiveFontSize} from 'react-native-responsive-dimensions';

// Returns Text Filds For Components

export function renderTextField({ input,errorStyle, heightStyle, label, dark, inputStyle, placeholderTextColor, keyboardType,secureTextEntry, meta: { touched, error } }) {
    let hasError = false;

    if (touched && error !== undefined) {
        hasError = true;
    }

    let textColor           =   '#999'
    let tintColor           =   "#999"
    let baseColor           =   "#999"
    let labelTextStyle      =   [globalStyles.lableText]
    let style               =   [globalStyles.text,{color:'#999',paddingHorizontal:7,marginBottom:3,fontSize:responsiveFontSize(1.8)}]
    let containerStyle	    =   [globalStyles.textInputContainer, inputStyle]
    let inputContainerStyle =   [{borderColor:'#C5C7D8'}]

    errorStyle              =   (errorStyle) ? errorStyle :{};

    if(typeof dark != 'undefined'){
        textColor           =   '#999'
        tintColor           =   "#999"
        baseColor           =   "#999"
        labelTextStyle      =   [globalStyles.lableTextDark]
        style               =   [globalStyles.text,{color:'#999'}]
        containerStyle	    =   [globalStyles.textInputContainerDark ,inputStyle]
        //errorStyle          =   globalStyles.errorMsgDark
    }

    heightStyle  = (heightStyle) ? heightStyle : {};

    return (
        <View >
            <TextField
                {...input}
                keyboardType={keyboardType}
                label={""}
                placeholder={label}
                textColor={textColor}
                labelHeight={10}
                activeLineWidth={0.6}
                baseColor={baseColor}
                fontSize={responsiveFontSize(1.8)}
                labelFontSize={responsiveFontSize(1.5)}
                labelTextStyle={labelTextStyle}
                inputContainerPadding={responsiveHeight(2)}   
                backgroundColor={'white'}
                borderRadius={30}
                marginTop={2}
                // style={[style,{height:responsiveHeight(5), marginTop : responsiveHeight(1)}]}
                containerStyle = {[containerStyle]}
                inputContainerStyle = {[globalStyles.AuthTextInput]}
                // style={{backgroundColor:'white'}}
                value={input.value}  
                secureTextEntry = {secureTextEntry}             
            />
            {touched && hasError && (
                <Text style={[globalStyles.AuthErrorMsg]}>
                    {error}{' '}
                </Text>
            )}
        </View>
    )
}

