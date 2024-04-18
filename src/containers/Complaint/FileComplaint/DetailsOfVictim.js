import {View, Text, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Field} from 'redux-form';

import React, {useState, useRef, useEffect} from 'react';
import globalStyles from '../../../assets/css/styles';
import {
  renderTextField,
  renderTextInput,
} from '../../../components/renderInput';
import { useSelector } from 'react-redux';
import { getLanguage } from '../../../translations/languageSelector';
import en from '../../../../locales/en.json';
import hi from '../../../../locales/hi.json';
export const DetailsOfVictim = props => {
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const language = useSelector(getLanguage);
  let translations;
  if (language.language === 'en') {
    translations = en;
  } else {
    translations = hi;
  }
  handleOnBlur = value => {
    props.onPincodeChange(value);
  };

  useEffect(() => {
    if (props.validPincode) {
      // Automatically fill district and state fields
      setDistrict(props.district);
      setState(props.state);
    } else {
      // Clear district and state fields
      setDistrict('');
      setState('');
    }
  }, [props.validPincode, props.district, props.state]);

  return (
    <>
      <Text style={globalStyles.complaintText}>{translations.fullName}</Text>
      <Field
        key={'full_name'}
        id={'full_name'}
        name={'full_name'}
        label={'Enter Name*'}
        component={renderTextField}
      />
      <Text style={globalStyles.complaintText}>{translations.phoneNumber}</Text>
      <Field
        key={'phone_number'}
        id={'phone_number'}
        name={'phone_number'}
        label={'Enter Phone Number*'}
        component={renderTextField}
        keyboardType={'phone-pad'}
      />
      <Text style={globalStyles.complaintText}>{translations.age}</Text>
      <Field
        key={'age'}
        id={'age'}
        name={'age'}
        label={'Age *'}
        component={renderTextField}
        keyboardType={'numeric'}
      />
      <Text style={globalStyles.complaintText}>{translations.occupation}</Text>
      <Field
        key={'occupation'}
        id={'occupation'}
        name={'occupation'}
        label={'Enter Occupation'}
        component={renderTextField}
        value={""}
      />
      <Text style={globalStyles.complaintText}>{translations.pincode}</Text>
      <Field
        key={'pincode'}
        id={'pincode'}
        name={'pincode'}
        label={'Enter Pincode*'}
        component={renderTextInput}
        onEndEditing={handleOnBlur}
        keyboardType={'numeric'}
        
      />
      {props.pincodeError.length > 0 && (
        <Text style={{color: 'red', paddingLeft: 10, top: -10}}>
          {props.pincodeError}
        </Text>
      )}
      <Text style={globalStyles.complaintText}>{translations.district}</Text>
      
      <Field
        key={'district'}
        id={'district'}
        name={'district'}
        label={'Enter District'}
        component={renderTextField}
        value={district}
      />
      <Text style={globalStyles.complaintText}>{translations.state}</Text>
      
      <Field
        key={'state'}
        id={'state'}
        name={'state'}
        label={'Enter State'}
        value={state}
        component={renderTextField}
      />
      <View style={{paddingBottom:10}} />
    </>
    
  );
};
