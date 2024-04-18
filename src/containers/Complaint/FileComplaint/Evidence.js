import {View, Text, Pressable, FlatList} from 'react-native';
import {useState,useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import globalStyles from '../../../assets/css/styles';
import CustomModal from '../../../components/CustomModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getLanguage } from '../../../translations/languageSelector';
import { connect, useSelector } from 'react-redux';
import en from '../../../../locales/en.json';
import hi from '../../../../locales/hi.json';
import {Field, reduxForm, SubmissionError, reset,formValueSelector,change  } from 'redux-form';
import {fileComplaintValidation} from '../../../components/Validations/Validation';

const validate = (values, props) => {
  const errors = {};
  const evidenceDescription = values?.evidence_description;

  console.log('evidenceDescription:', evidenceDescription); // Check the value

  if (!evidenceDescription || !evidenceDescription.match(fileComplaintValidation.evidence_description.validation)) {
    errors.evidence_description = fileComplaintValidation.evidence_description.inValid;
  }

  return errors;
};


export const Evidence =  props => {
  const errors = validate(props.values, props);
  let hasErrors ;
  const language = useSelector(getLanguage);
  let translations;
  if (language.language === 'en') {
    translations = en;
  } else {
    translations = hi;
  }
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const checkError =() =>{

    // hasErrors = Object.keys(errors).length > 0;
    // props.dispatch({
    //   type: 'redux-form/SET_SUBMIT_FAILED',
    //   meta: { form: 'evidenceForm' },
    //   error: hasErrors,
    // });
    // console.log("Errors",hasErrors);
    // console.log("Evidence",props.values?.evidence_description);
  }
  const toggleModal = type => {
    // props.dispatch(change('evidenceForm', 'evidence_description', ''));
    // props.invalid=true;
    setModalVisible(!isModalVisible);
    setModalType(type);
    // console.log("Invalid",props.invalid)
  };

  const handleAddFile = event => {
    props.addEvidenceFileContent(event, modalType);
  };

  const deleteEvidence = () => {
    props.deleteEvidence();
  };

  const addEvidence = () => {
    console.log("comeaddEvidence");
    setModalVisible(!isModalVisible);
    props.addEvidence();
  };
  
  console.log("Errors",hasErrors);
  console.log(props.evidenceList);
  return (
    
    <>
      <View style={globalStyles.evidenceContainer}>
        {props.evidenceList && (
          <View style={{flex: 1}}>
            <FlatList
              data={props.evidenceList}
              renderItem={({item, index}) => (
                <View
                  style={{
                    marginBottom: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontWeight: 'bold', color: 'black'}}>
                    {index + 1}.
                  </Text>
                  <Text style={{fontWeight: 'bold', color: 'black'}}>
                    {item.evidenceType}
                  </Text>
                  <Text style={{fontWeight: 'bold', color: 'black'}}>
                    {item.evidenceDescription}
                  </Text>

                  <Pressable
                    style={{alignSelf: 'center'}}
                    onPress={() => props.deleteEvidence(index)}>
                    <MaterialIcons name="delete" size={27} />
                  </Pressable>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>
      <View style={globalStyles.evidenceContainer}>
        <Pressable
          style={{alignItems: 'center'}}
          onPress={() => toggleModal('image')}>
          <MaterialCommunityIcons
            name={'image-plus'}
            size={40}
            color="#6491d2"
            style={{marginBottom: 10}}
          />
          <Text style={globalStyles.complaintText}>{translations.addPhoto}</Text>
        </Pressable>
        <Pressable
          style={{alignItems: 'center'}}
          onPress={() => toggleModal('video')}>
          <MaterialCommunityIcons
            name={'video-plus-outline'}
            size={40}
            color="#6491d2"
            style={{marginBottom: 10}}
          />
          <Text style={globalStyles.complaintText}>{translations.addVideo}</Text>
        </Pressable>
        <Pressable
          style={{alignItems: 'center'}}
          onPress={() => toggleModal('audio')}>
          <MaterialCommunityIcons
            name={'microphone-plus'}
            size={40}
            color="#6491d2"
            style={{marginBottom: 10}}
          />
          <Text style={globalStyles.complaintText}>{translations.addAudio}</Text>
        </Pressable>
        <Pressable
          style={{alignItems: 'center'}}
          onPress={() => toggleModal('file')}>
          <AntDesign
            name={'addfile'}
            size={40}
            color="#6491d2"
            style={{marginBottom: 10}}
          />
          <Text style={globalStyles.complaintText}>{translations.addFile}</Text>
        </Pressable>
        <CustomModal
          isModalVisible={isModalVisible}
          handleAddFile={handleAddFile}
          toggleModal={toggleModal}
          modalType={modalType}
          addEvidence={addEvidence}
          // invalid={hasErrors}
          dispatch={props.dispatch}
          // values={props.values}
          // checkError={checkError}
        />
      </View>
    </>
  );
}

export default Evidence;
