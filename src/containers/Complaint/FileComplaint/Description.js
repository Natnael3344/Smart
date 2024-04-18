import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native'; 
import React, {useState} from 'react';
import { Field } from 'redux-form';
import CustomInput from '../../../components/CustomInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StepIndicator from '../../../components/stepIndicator';
import CustomButton from '../../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import Background from '../../../components/Background';
import globalStyles from '../../../assets/css/styles';
import { renderTextArea } from '../../../components/renderInput';
import RecordingModal from '../../../components/RecordingModal';
import AudioRecorder from '../../../components/AudioRecorder';
import { useSelector } from 'react-redux';
import { getLanguage } from '../../../translations/languageSelector';
import en from '../../../../locales/en.json';
import hi from '../../../../locales/hi.json';


export const Description = (props) => {

  const language = useSelector(getLanguage);
  let translations;
  if (language.language === 'en') {
    translations = en;
  } else {
    translations = hi;
  }
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [descriptionWarning, setDescriptionWarning] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleDescriptionNext = () => {
    if (!description) {
      setDescriptionWarning('Please enter description');
    } else {
      setDescriptionWarning('');
    }
    if (description) {
      navigation.navigate('witness');
    } else {
    }
  };

  
  


  return (
          <>
            <Text style={globalStyles.complaintText}>{translations.descriptionInfo}</Text>
            <Field key={'description_of_camplaint'} id={'description_of_camplaint'} name={'description_of_camplaint'}  component={renderTextArea}  value={props.description}/>
            <Text style={globalStyles.warningText}>{descriptionWarning}</Text>
            <View style={globalStyles.descriptionContainer}>
              <View style={globalStyles.line} />
              <Text style={globalStyles.descriptionText}>{translations.or}</Text>
              <View style={globalStyles.line} />
            </View>

            <Pressable onPress={toggleModal}
              style={{
                borderRadius: 50,
                borderColor: '#4bb9ac',
                borderWidth: 1,
                padding: 10,
                width: 200,
                alignSelf: 'center',
                marginTop: 30,
                marginBottom: 20,
              }}>
               

                <AudioRecorder {...props} />

              </Pressable>
           </>
  );
};