import {
  View,
  Text,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState, useRef} from 'react';
import { Field } from 'redux-form';
import {useNavigation} from '@react-navigation/native';
import { renderTextField } from '../../../components/renderInput';
import globalStyles from '../../../assets/css/styles';
import { getLanguage } from '../../../translations/languageSelector';
import { useSelector } from 'react-redux';
import en from '../../../../locales/en.json';
import hi from '../../../../locales/hi.json';
export const AccusedInformation = () => {
  const language = useSelector(getLanguage);
  let translations;
  if (language.language === 'en') {
    translations = en;
  } else {
    translations = hi;
  }
  const navigation = useNavigation();

  const [reName, setReName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [know, setKnow] = useState('');
  const [reNameWarning, setReNameWarning] = useState('');
  const [phoneWarning, setPhoneWarning] = useState('');
  const [addressWarning, setAddressWarning] = useState('');
  const [knowWarning, setKnowWarning] = useState('');

  const handleRespondentNext = () => {
    if (!reName) {
      setReNameWarning('Please enter respondent name');
    } else {
      setReNameWarning('');
    }

    if (!phone) {
      setPhoneWarning('Please enter valid phone number');
    } else {
      setPhoneWarning('');
    }

    if (phone.length < 10) {
      setPhoneWarning('Please enter valid phone number');
    } else {
      setPhoneWarning('');
    }
    if (!address) {
      setAddressWarning('Please enter address');
    } else {
      setAddressWarning('');
    }
    if (!know) {
      setKnowWarning('Please enter this field');
    } else {
      setKnowWarning('');
    }
    if (reName && address && know && phone.length == 10) {
      navigation.navigate('description');
    } else {
    }
  };
  return (<>
            <Text style={globalStyles.complaintText}>{translations.resName}</Text>
            <Field key={'respondent_full_name'} id={'respondent_full_name'} name={'respondent_full_name'} label={'Enter Respondent Name*'} component={renderTextField}  />
            <Text style={globalStyles.warningText}>{reNameWarning}</Text>
            <Text style={globalStyles.complaintText}>{translations.resPhone}</Text>
            <Field key={'respondent_mobile'} id={'respondent_mobile'} name={'respondent_mobile'} label={'Enter Respondent mobile*'} component={renderTextField}  keyboardType={'numeric'} />
            <Text style={globalStyles.warningText}>{phoneWarning}</Text>
            <Text style={globalStyles.complaintText}>{translations.email}</Text>
            <Field key={'respondent_email'} id={'respondent_email'} name={'respondent_email'} label={'Enter Respondent Email'} component={renderTextField} />
            <Text style={globalStyles.complaintText}>{translations.resAdd}</Text>
            <Field key={'respondent_address'} id={'respondent_address'} name={'respondent_address'} label={'Enter Respondent Address*'} component={renderTextField}  />
            <Text style={globalStyles.warningText}>{addressWarning}</Text>
            <Text style={globalStyles.complaintText}>{translations.resKnow}</Text>
            <Field key={'respondent_relation'} id={'respondent_relation'} name={'respondent_relation'} label={'Enter Respondent Relation'} component={renderTextField}  />
            <Text style={globalStyles.warningText}>{knowWarning}</Text>
            <Text style={globalStyles.complaintText}>{translations.physical}</Text>
            <Field key={'respondent_physical_appearance'} id={'respondent_physical_appearance'} name={'respondent_physical_appearance'} label={'Enter Physical Appearance'} component={renderTextField} />
           </>
  );
};

