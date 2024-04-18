import {
  View,
  ScrollView,
  Text,
  Pressable,
  Button,
  StyleSheet,
  TouchableOpacity,KeyboardAvoidingView,
  TextInput,
} from 'react-native';

import {Field, reduxForm, SubmissionError, reset,touch, submit,change,useFormState  } from 'redux-form';
import LinearGradient from 'react-native-linear-gradient';
import React, { useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import globalStyles from '../assets/css/styles';
import {LargeButton, SmallButton} from './renderButton';
import {Icon} from 'native-base';
import {renderTextArea} from './renderInput';
import DocumentPicker from 'react-native-document-picker';
import { useSelector } from 'react-redux';
import { getLanguage } from '../translations/languageSelector';
import en from '../../locales/en.json';
import hi from '../../locales/hi.json';
import { connect } from 'react-redux';
import { fileComplaintValidation } from './Validations/Validation';
import { ActivityIndicator } from 'react-native-paper';
import { COLOR } from '../constants/GlobalConstants';

const validate = values => {
  const errors = {};
  if (!values?.evidence_description ) {
    errors.evidence_description  = ' ';
  } else if (
    !fileComplaintValidation.evidence_description.validation.test(
      values.evidence_description ,
    )
  ) {
    errors.evidence_description  =
      fileComplaintValidation.evidence_description.inValid;
  }
console.log("=====errors====",errors);
  return errors;
};
 let CustomModal = ({
  isModalVisible,
  addEvidence,
  handleAddFile,
  toggleModal,
  modalType,
  // invalid,
  dispatch,
  // values,
  // checkError
}) => {
  const [isValid, setIsValid] = useState(false);

  const validateField = (value) => {
    // Perform your validation logic here
    // Update the isValid state variable based on the validation result

    // Example validation: Check if the value is empty
    const isValid = value.trim() !== '';
    setIsValid(isValid);
  };
  
  const language = useSelector(getLanguage);
  let translations;
  if (language.language === 'en') {
    translations = en;
  } else {
    translations = hi;
  }
  const [evidenceFileName, setEvidenceFileName] = useState(translations.noFile);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsFileSelected(selectedFile !== null);
  }, [selectedFile]);
  
  docPicker = async () => {
    let fileTypeArray;

    if (modalType === 'video') {
      fileTypeArray = [DocumentPicker.types.video];
    } else if (modalType === 'audio') {
      fileTypeArray = [DocumentPicker.types.audio];
    } else if (modalType === 'file') {
      fileTypeArray = [
        DocumentPicker.types.pdf,
        DocumentPicker.types.doc,
        DocumentPicker.types.docx,
      ];
    } else {
      fileTypeArray = [DocumentPicker.types.images];
    }

    // Pick a single file
    try {
      setIsLoading(true);
      const res = await DocumentPicker.pick({
        
        type: fileTypeArray,
      });
      console.log('---------------------res------------------', res);
      setSelectedFile(res[0]);
      let selectedFileName = res.length > 0 ? res[0]['name'] : '';
      setEvidenceFileName(selectedFileName);
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
      
      handleAddFile(res[0]);
      // this.uploadAPICall(res);//here you can call your API and send the data to that API
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('error -----', err);
      } else {
        throw err;
      }
    }
    finally {
      setIsLoading(false); // Set isLoading to false when the file upload is completed or failed
    }
  };
  const clearText=()=>{
    console.log("come here")
    // console.log(validate())
    if (!isFileSelected) {
      return;
    }
    
  
      addEvidence();
      setSelectedFile(null);
      setEvidenceFileName(translations.noFile)
      // dispatch(reset('evidenceForm'));

  }
  return (
    <Modal isVisible={isModalVisible} >
      <ScrollView keyboardShouldPersistTaps='always'>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{translations.attach}</Text>
          <TouchableOpacity onPress={() => toggleModal(modalType)}>
            <Text style={styles.closeButtonText}>
              {' '}
              <MaterialCommunityIcons
                name={'close'}
                size={30}
                color="#6491d2"
                style={{marginBottom: 10}}
              />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={docPicker}>
      {isLoading ? (
       <View style={styles.loaderContainer}>
       <ActivityIndicator size="large" color={COLOR.BACKGROUND_COLOR} />
       <Text style={styles.loaderText}>Uploading...</Text>
     </View> // Display the activity loader while isLoading is true
      ) : (
        <View
          style={{
            backgroundColor: '#f8f9fa',
            borderRightWidth: 1,
            borderRightColor: '#CCCCCC',
            marginRight: 20,
            paddingRight: 10,
          }}>
          <Text style={styles.buttonText}>{translations.choose}</Text>
        </View>
      )}

{!isLoading && ( <Text style={{ flexShrink: 1 }}>{evidenceFileName}</Text>)}
    </TouchableOpacity>
          {!isLoading && !isFileSelected && (
              <Text style={{ color: 'red' }}>Please choose a file</Text>
            )}
          <Text style={styles.label}>{translations.evidenceDescription}</Text>
          <Field
            key={'evidence_description'}
            id={'evidence_description'}
            name={'evidence_description'}
            component={ renderTextArea}
          />
           {/* {!isValid && (
              <Text style={{ color: 'red' }}>Evidence description is required</Text>
            )} */}
        </View>
        <TouchableOpacity
      onPress={() => clearText()}
      disabled={evidenceFileName==translations.noFile  }
      style={styles.button1}
      activeOpacity={0.7}>
      <LinearGradient
        colors={['#6491d2', '#4bb9ae']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[styles.gradient, {opacity:  1}]}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>{translations.add}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
        {/* <Button title="Add Evidence" onPress={() => clearText()} disabled={evidenceFileName=='No File chosen' && invalid}/>
        */}
      </View>
      </ScrollView>
    </Modal>
  );
};






export default CustomModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 0.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  content: {
    flex: 1,
  },
  button: {
    // backgroundColor: '#007AFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  buttonText: {
    color: '#CCCCCC',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  button1: {
    borderRadius: 30,
    height: 45,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    display: 'flex',
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black'
  },
});
// export default CustomModal;
