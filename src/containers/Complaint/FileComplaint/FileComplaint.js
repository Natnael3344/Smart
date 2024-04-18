import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  Text,
  ScrollView,
  View,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {getLanguage} from '../../../translations/languageSelector';
import en from '../../../../locales/en.json';
import hi from '../../../../locales/hi.json';
import {useDispatch, useSelector} from 'react-redux';
import {validateForm} from '../../../components/Validations/ValidationActions';
import {Field, reduxForm, change,stopSubmit,touch,setSubmitFailed,initialize} from 'redux-form';
import {connect} from 'react-redux';
import {DetailsOfVictim} from './DetailsOfVictim';
import {Description} from './Description';
import {Evidence} from './Evidence';
import {Witness} from './Witness';
import {AccusedInformation} from './AccusedInformation';
import Background from '../../../components/Background';
import {fileComplaintActions} from './FileComplaint.actions';
import globalStyles from '../../../assets/css/styles';
import StepIndicator from '../../../components/stepIndicator';
import CustomButton from '../../../components/CustomButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ErrorToaster} from '../../../helpers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SuccessMessage from '../../../components/SuccessMessage';
import {fileComplaintValidation} from '../../../components/Validations/Validation';
import {isEmptyObj} from 'native-base';
import {COLOR} from '../../../constants/GlobalConstants';
import TableHeader from '../../../components/TableHeader';
import CustomRadioButton from '../../../components/CustomRadioButton';
import axios from 'axios';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS, {stat,} from 'react-native-fs';
import ConsentPopup from '../../../components/ConsentPopup';
import {Declaration} from './Declaration';
import { ActivityIndicator } from 'react-native-paper';
const stepPages = [
  DetailsOfVictim,
  Description,
  AccusedInformation,
  Evidence,
  Witness,
];


const validate = (values,step)  => {
  console.log('====validate===', validate);

  const errors = {};
  if(step==0)
  {if (!values?.full_name) {
    errors.full_name = 'Full name is required';
  } else if (
    !fileComplaintValidation.full_name.validation.test(values.full_name)
  ) {
    errors.full_name = fileComplaintValidation.full_name.inValid;
  }

  if (!values?.phone_number) {
    errors.phone_number = 'Phone number is required';
  } else if (
    !fileComplaintValidation.phone_number.validation.test(values.phone_number)
  ) {
    errors.phone_number = fileComplaintValidation.phone_number.inValid;
  }

  if (!values?.age) {
    errors.age = 'Age is required';
  } else if (!fileComplaintValidation.age.validation.test(values.age)) {
    errors.age = fileComplaintValidation.age.inValid;
  }

//comment

  // if (!values.occupation) {
  //   errors.occupation = 'Occupation is required';
  // } else if (
  //   !fileComplaintValidation.occupation.validation.test(values.occupation)
  // ) {
  //   errors.occupation = fileComplaintValidation.occupation.inValid;
  // }
//end
  
  if (!values?.state && !values?.district) {
    errors.pincode = 'Either enter pincode or district and state';
  } else if (!fileComplaintValidation.pincode.validation.test(values.pincode)) {
    errors.pincode = fileComplaintValidation.pincode.inValid;
  }}
 if(step==1)
 { if(!values?.description_of_camplaint)
  {
    errors.description_of_camplaint = 'Either enter description of complaint or record audio';
  }
  else  if (
    !fileComplaintValidation.description_of_camplaint.validation.test(
      values.description_of_camplaint,
    )
  ) {
    errors.description_of_camplaint =
      fileComplaintValidation.description_of_camplaint.inValid;
  }}


if(step==2)
  {if (!values?.respondent_full_name) {
    errors.respondent_full_name = 'Respondent name is required';
  } else if (
    !fileComplaintValidation.respondent_full_name.validation.test(
      values.respondent_full_name,
    )
  ) {
    errors.respondent_full_name =
      fileComplaintValidation.respondent_full_name.inValid;
  }

  if (!values?.respondent_mobile && !values?.respondent_address) {
    errors.respondent_mobile = 'Either Respondent Phone or Address is Required';
  } else if (values?.respondent_mobile) {
    if (
      !fileComplaintValidation.respondent_mobile.validation.test(
        values.respondent_mobile,
      )
    ) {
      errors.respondent_mobile =
        fileComplaintValidation.respondent_mobile.inValid;
    }
  } else if (values?.respondent_address) {
    if (
      !fileComplaintValidation.respondent_address.validation.test(
        values.respondent_address,
      )
    ) {
      errors.respondent_address =
        fileComplaintValidation.respondent_address.inValid;
    }
  }

//comment

  // if (!values.respondent_relation) {
  //   errors.respondent_relation = 'Respondent relation is required';
  // } else if (
  //   !fileComplaintValidation.respondent_relation.validation.test(
  //     values.respondent_relation,
  //   )
  // ) {
  //   errors.respondent_relation =
  //     fileComplaintValidation.respondent_relation.inValid;
  // }

  // end 
}

  // if (!values?.evidence_description) {
  //   errors.evidence_description = 'Respondent relation is required';
  // } else if (
  //   !fileComplaintValidation.evidence_description.validation.test(
  //     values.evidence_description,
  //   )
  // ) {
  //   errors.evidence_description =
  //     fileComplaintValidation.evidence_description.inValid;
  // }
  console.log('=====errors1223====', errors);
  return errors;
};

let FileComplaint = props => {
  const language = useSelector(getLanguage);
  let translations;
  if (language.language === 'en') {
    translations = en;
  } else {
    translations = hi;
  }
  const dispatch = useDispatch();

  const { handleSubmit} = props;

  const [step, setStep] = useState(0);
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [formState, setFormState] = useState({});
  const [witnessList, setWitnessList] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [updatewitnessID, setUpdateWitnessID] = useState('');
  const [evidenceList, setEvidenceList] = useState([]);
  const [evidenceFileContent, setEvidenceFileContent] = useState(undefined);
  const [evidenceFileType, setEvidenceFileType] = useState('');
  const [error, setError] = useState(fileComplaintValidation);
  const [isSwitchOn, setSwitchOn] = useState(false);
  const [isSwitchOnW, setSwitchOnW] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [audioDuration, setAudioDuration] = useState('00:00:00');
  const [pincodeError, setPincodeError] = useState('');
  const [validPincode, setValidPincode] = useState(false);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [loading, setLoading] = useState(null);
  const [modalVisibleConsent, setModalVisibleConsent] = useState(false);
  const [confirmFinalSubmission, setConfirmFinalSubmission] = useState(false);
  const [recorded, setRecorded]=useState(false);
  const [finish, setFinish]=useState(false);
  const recorder = useRef(null);
  const chunks = useRef([]);
  
  const handleStart = async () => {
    const maxRecordingTime = 2 * 60;
    setRecording(true);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const audioRecorderPlayer = new AudioRecorderPlayer();
        const audioPath = `${RNFS.ExternalDirectoryPath}/audio.wav`;

        audioRecorderPlayer.addRecordBackListener(e => {
          if (e.currentPosition >= maxRecordingTime) {
            setRecording(false);
            audioRecorderPlayer.stopRecorder();
            setRecorded(true);
          }
        });

        audioRecorderPlayer.startRecorder(audioPath);
        
          // formState.description_of_camplaint = 'Audio Description is provided';
        
        setAudioURL(audioPath);
        setRecorded(true);
        setTimeout(async () => {
          if (audioRecorderPlayer.isRecording) {
            await audioRecorderPlayer.stopRecorder();
            
              // formState.description_of_camplaint = 'Audio Description is provided';
            
            setAudioURL(audioPath);
            setRecording(false);
            setRecorded(true);
          }
        }, maxRecordingTime);
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleStop = (audioURL, audioRecordingDuration, action) => {
    console.log(
      '---handlestop--',
      audioURL,
      audioRecordingDuration,
      props.formState,
      props.formStates,
    );
  
    if (action === 'audioDelete') {
      setAudioURL('');
    } else {
      dispatch(change('FileComplaint', 'description_of_camplaint', 'Audio Description is provided'));
      setAudioURL(audioURL);
    }

    setAudioDuration(audioRecordingDuration);
  };

  const submitConfirmFinalSubmission = newValue => {
    setConfirmFinalSubmission(newValue);
  };

  const toggleSwitch = () => {
    setSwitchOn(!isSwitchOn);
  };
  const toggleSwitchW = () => {
    setSwitchOnW(!isSwitchOnW);
  };
  const [steps, setSteps] = useState([
    {
      label: translations.personalInfo,
      isValid: undefined,
    },
    {
      label: translations.complaintInfo,
      isValid: undefined,
    },
    {
      label: translations.respondent,
      isValid: undefined,
    },
    {
      label: translations.evidence,
      isValid: undefined,
    },
    {
      label: translations.witness,
      isValid: undefined,
    },
    {
      label: undefined,
      isValid: undefined,
    },
  ]);

  useEffect(() => {
    props.resetComplaintForm();

    // 👇️ run a function when the component unmounts 👇️
    return () => {
      console.log('Child unmounted');
    };
  }, []);

  const toggleModal = () => {
    setModalVisible(false);
    props.navigation.navigate('dashboard');
  };

  const lastStepIndex = steps.length - 1;
  const isLastStep = lastStepIndex === step;
  let consentStep;
  const onConsentSubmit = () => {
    consentStep = lastStepIndex + 1;
    setModalVisibleConsent(false);
  };
  const onConsentCancel = () => {
    setModalVisibleConsent(false);
  };

  const onStepSubmit = useCallback(
    event => {
      // if(step==0 && pincodeLoading){
      //   handlePincodeChange(event?.pincode);
      // }
      
      console.log('======== just clicked  === ', event);
      // const {values} = event;
      const isValid = props.valid;
      console.log(event);
      let userDataSession = props.user;
      const values = {event}; 
      const errors = validate(event, step); 
     console.log('errors',errors)

      const hasErrors = Object.keys(errors).some((field) => !!errors[field]);

      if (Object.keys(errors).length == 0) {
        if (!validPincode && (props.formStates?.values?.state === '' || props.formStates?.values?.district === '')) {
          return;
        }
        const currentSteps = steps.map((currentStep, index) => ({
          ...currentStep,
          isValid: index === step,
        }));
        
      setSteps(currentSteps);
    
      
      

      setStep(() => Math.min(step + 1, lastStepIndex));
      // if (step === 1) {
      //   setFormState({ ...formState, audio_file_complaint: audioURL });
      // }
      setFormState(event);
      if (step == 4) {
        // setModalVisibleConsent(true);
      }
      if (isLastStep) {
        setModalVisibleConsent(false);
        setModalVisible(true);

        const formData = new FormData();

        if (userDataSession?.data?.length > 0) {
          let userData = userDataSession && userDataSession.data[0];
          event['user_id'] = userData?.user_id;
          event['token'] = userData?.token;

          formData.append('user_id', event['user_id']);
          formData.append('token', event['token']);
        }

        formData.append('full_name', event?.full_name);
        formData.append('phone_number', event?.phone_number);
        formData.append('age', event?.age);
        formData.append('occupation', event?.occupation);
        formData.append('pincode', event?.pincode);
        formData.append('state', state);
        formData.append('district', district);
        formData.append('state_id', state);
        formData.append('district_id', district);

        formData.append(
          'description_of_camplaint',
          event?.description_of_camplaint,
        );

        if (audioURL) {
          formData.append('audio_file_camplaint', {
            uri: audioURL,
            name: 'test.aac',
            type: 'audio/aac',
          });
        }

        formData.append('respondent_full_name', event?.respondent_full_name);
        formData.append('respondent_mobile', event?.respondent_mobile);
        formData.append('respondent_email', event?.respondent_email);
        formData.append('respondent_address', event?.respondent_address);
        formData.append('respondent_relation', event?.respondent_relation);
        formData.append('respondent_physical_appearance', event?.respondent_physical_appearance);
        if (evidenceList.length > 0) {
          formData.append(
            'have_evidence',
            evidenceList.length > 0 ? true : false,
          );
          evidenceList.map(evidence => {
            formData.append('evidence_type[]', evidence.evidenceType);
            formData.append(
              'evidence_description[]',
              evidence.evidenceDescription,
            );
            formData.append('evidence_attachment[]', evidence.evidenceFile);
          });
        }
        if (witnessList.length > 0) {
          formData.append(
            'have_witness',
            witnessList.length > 0 ? true : false,
          );
          witnessList.map(witness => {
            formData.append('witness_name[]', witness.name);
            formData.append('witness_contact_number[]', witness.phone);
          });
        }

        console.log('===submitFileComplaint==', formData);
        //handleFormSubmit(formData);

        props.submitFileComplaint(formData);
      }}else{
        dispatch(stopSubmit('FileComplaint',errors))
      }
    
    },
    [
      steps,
      isLastStep,
      step,
      lastStepIndex,
      witnessList,
      validPincode,
      state,
      district,
      dispatch,
      setSubmitFailed,
      initialize,setSteps, setStep, setFormState, props.formStates, props.state
    ],
  );

  const handleFormSubmit = async formData => {
    let axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    // axios.post('https://successwithelvis.com/ecover/forget', formData, axiosConfig)
    // .then((res) => {
    //   console.log("RESPONSE RECEIVED: ",res.status, res.data);
    // })
    // .catch((err) => {
    //   console.log("AXIOS ERROR: ", err);
    // })

    axios
      .post(
        'https://backoffice.myambar.org/api/complaint-form-submit',
        formData,
        axiosConfig,
      )
      .then(res => {
        console.log('RESPONSE RECEIVED: ', res.status, res.data);
      })
      .catch(err => {
        console.log('AXIOS ERROR: ', err);
      });
  };

  const onPrevClick = useCallback(
    event => {
      if(finish==true){
        setStep(() => 1);
        setFinish(()=>false);
      }else{
      setStep(() => Math.max(step - 1, 0));}
    },
    [step, setStep],
  );
  const onSubmitClick = useCallback(
    event => {
      setStep(() => steps.length);
    },
    [step, setStep],
  );
  

  const onFinish = useCallback(
    event => {
      // if(step==0 && pincodeLoading){
      //   handlePincodeChange(event?.pincode);
      // }
      
      console.log('======== just clicked  === ', event);
      // const {values} = event;
      const isValid = props.valid;
      console.log(event);
      let userDataSession = props.user;
      const values = {event}; 
      const errors = validate(event, step); 
     console.log('errors',errors)

      const hasErrors = Object.keys(errors).some((field) => !!errors[field]);

      if (Object.keys(errors).length == 0) {
       
      
        
      // setSteps(currentSteps);
    

      setStep(() => 5);
      setFinish(() => true);
      // setFormState(event);
      // setModalVisibleConsent(true)
    
    
    }},
    [
      steps,
      step,
      dispatch,
      initialize,setSteps, setStep, setFormState, props.formStates, props.state
    ],
  );
  {
    /* ################ First Step ###############3 */
  }
  handlePincodeChange = value => {
    setPincodeLoading(true);
    getPincodeDetailFromApi(value);
  };

  const getPincodeDetailFromApi = async pincode => {
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`,
      );
      const json = await response.json();

      if (
        typeof json[0].PostOffice != undefined &&
        !isEmptyObj(json[0].PostOffice)
      ) {
        setDistrict(json[0].PostOffice[0].District);
        setState(json[0].PostOffice[0].State);

        props.dispatch(
          change('FileComplaint', 'district', json[0].PostOffice[0].District),
        );
        props.dispatch(
          change('FileComplaint', 'state', json[0].PostOffice[0].State),
        );

        setValidPincode(true);
        setPincodeLoading(false);
        setPincodeError('');
      } else {
        setPincodeError('Please enter correct pincode');
        setValidPincode(false);
      }
    } catch (error) {
      //console.error(error);
      // ErrorToaster(" Alert ", "Something went wrong 1323 !!!");
      setPincodeLoading(false);
      setPincodeError('Please enter correct pincode');
      // setValidPincode(false);
    } finally {
      setPincodeLoading(false);
      // setValidPincode(false);
    }
  };

  {
    /* ################ First Step ###############3 */
  }

  {
    /* ################ Last Step ###############3 */
  }
  const addWitness = values => {
    if (updatewitnessID) {
      let newContent = {
        name: values['witness_name'],
        phone: values['witness_contact_number'],
      };

      let witnessListRecords = [...witnessList];

      if (witnessListRecords.length > 0) {
        witnessListRecords[updatewitnessID - 1] = newContent;
        setWitnessList(witnessListRecords);
      }

      setUpdateWitnessID('');
    } else {
      setWitnessList(prevWitnessList => {
        if (prevWitnessList.length < 3) {
          return [
            ...prevWitnessList,
            {
              name: values['witness_name'],
              phone: values['witness_contact_number'],
            },
          ];
        } else {
          return prevWitnessList;
        }
      });
    }

    values['witness_name'] = '';
    values['witness_contact_number'] = '';
  };

  editWitness = (values, id) => {
    const {initialize} = props;

    const formInitialValues = {
      witness_name: values.name,
      witness_contact_number: values.phone,
    };
    initialize(formInitialValues);

    setUpdateWitnessID(id);
  };

  const deleteWitness = index => {
    const newList = [...witnessList];
    newList.splice(index, 1);
    setWitnessList(newList);
  };
  {
    /* ################ Last Step ###############3 */
  }

  {
    /* ################ Evidence Step ###############3 */
  }

  const submitEvidenceData = values => {
    setEvidenceList(prevEvidenceList => {
      console.log('evidenceFileContent', evidenceFileContent, evidenceFileType);
      return [
        ...prevEvidenceList,
        {
          evidenceType: evidenceFileType,
          evidenceFile: evidenceFileContent,
          evidenceDescription: values.evidence_description,
        },
      ];
    });
    console.log("List",values.evidence_description)
    values.evidence_description = '';
    setEvidenceFileContent('');
    setEvidenceFileType('');
  };

  const addEvidence = () => {
    handleSubmit(submitEvidenceData)();
  };

  const addEvidenceFileContent = (values, type) => {
    setEvidenceFileContent(values);
    setEvidenceFileType(type);
    
  };

  const deleteEvidence = index => {
    const newList = [...evidenceList];
    newList.splice(index, 1);

    setEvidenceList(newList);
  };

  {
    /* ################ Evidence Step ###############3 */
  }

  {
    /* ################ Load Step Compoennt ###############3 */
  }

  loadCurerntStepPage = step => {
    console.log('====step===', step);
    if (step === 0) {
      return (
        <DetailsOfVictim
          onPincodeChange={handlePincodeChange}
          validPincode={validPincode}
          pincodeError={pincodeError}
          // state={state}
          // district={district}
          change={props.change}
          district={props.formStates && props.formStates.values.district}
          state={props.formStates && props.formStates.values.state}
        />
      );
    } else if (step === 1) {
      return (
        <Description
          handleStart={handleStart}
          handleStop={handleStop}
          setRecorded={setRecorded}
          recording={recording}
          audioURL={audioURL}
          audioDuration={audioDuration}
          description={props.values && props.values.description_of_camplaint}
          
        />
      );
    } else if (step === 2) {
      return <AccusedInformation />;
    } else if (step === 3 && isSwitchOn == true) {
      return (
        <Evidence
          evidenceList={evidenceList}
          addEvidence={addEvidence}
          deleteEvidence={deleteEvidence}
          addEvidenceFileContent={addEvidenceFileContent}
        />
      );
    } else if (step === 4 && isSwitchOnW == true) {
      return <Witness />;
    } else if (step === 5) {
      return (
        <Declaration
          toggleCheckBox={confirmFinalSubmission}
          submitConfirmFinalSubmission={submitConfirmFinalSubmission}
        />
      );
    }
  };

  let showSuccessPopup = false;
  let caseId;

  console.log('fileComplaintresponse', props.fileComplaint.user);

  if (!isEmptyObj(props.fileComplaint.user)) {
    if (props.fileComplaint.user.status_code === 200) {
      showSuccessPopup = true;
      let message = props.fileComplaint.user.message;
      let findtext = message.split('<b>');
      caseId = findtext[1].replace('</b>', '');
    }
  }

  return (
    <SafeAreaView style={{flex: 1, marginTop: 20}}>
      <KeyboardAwareScrollView extraScrollHeight={50} enableOnAndroid={true}>
        {/* <Background showlogo={false}> */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <View style={globalStyles.complaintBigContainer}>
            <StepIndicator step={step} items={steps} />
            <View style={globalStyles.complaintSmallContainer}>
              {step == 3 && (
                <>
                  <Text
                    style={{color: 'black', fontSize: 17, fontWeight: 'bold'}}>
                    {translations.eveAdd}
                  </Text>
                  <CustomRadioButton
                    isSwitchOn={isSwitchOn}
                    toggleSwitch={toggleSwitch}
                  />
                  {isSwitchOn == true && (
                    <TableHeader title={'Type'} title1={'Description'} />
                  )}
                </>
              )}
              {step == 4 && (
                <>
                  <Text
                    style={{color: 'black', fontSize: 17, fontWeight: 'bold'}}>
                    {translations.witnessAdd}
                  </Text>
                  <CustomRadioButton
                    isSwitchOn={isSwitchOnW}
                    toggleSwitch={toggleSwitchW}
                  />
                </>
              )}
              {step == 4 && witnessList && isSwitchOnW == true && (
                <View style={{flex: 1}}>
                  <TableHeader title={'Name'} title1={'Contact'} />
                  <FlatList
                    data={witnessList}
                    renderItem={({item, index}) => (
                      <View
                        style={{
                          marginBottom: 10,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: 'black',
                            textAlign: 'center',
                            flex: 0.1,
                          }}>
                          {index + 1}.
                        </Text>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: 'black',
                            textAlign: 'center',
                            flex: 0.4,
                          }}>
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: 'black',
                            textAlign: 'center',
                            flex: 0.3,
                          }}>
                          {item.phone}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flex: 0.15,
                          }}>
                          <Pressable
                            style={{alignSelf: 'center'}}
                            onPress={() => editWitness(item, index + 1)}>
                            <MaterialIcons
                              name="edit"
                              size={20}
                              color={'black'}
                            />
                          </Pressable>
                          <Pressable
                            style={{alignSelf: 'center'}}
                            onPress={handleSubmit(deleteWitness)}>
                            <MaterialIcons
                              name="delete"
                              size={20}
                              color={'black'}
                            />
                          </Pressable>
                        </View>
                      </View>
                    )}
                    ListEmptyComponent={() => (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: 10,
                        }}>
                        <Text style={{color: 'black'}}>
                          {translations.noWitness}
                        </Text>
                      </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              )}
              {loadCurerntStepPage(step)}
              {step == 4 && isSwitchOnW == true && (
                <View>
                  {(witnessList.length < 3 ||
                    (updatewitnessID && witnessList.length > 0)) && (
                    <Pressable
                      onPress={handleSubmit(addWitness)}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        borderRadius: 50,
                        borderColor: '#4bb9ac',
                        borderWidth: 1,
                        padding: 5,
                        width: 150,
                        alignSelf: 'center',
                        marginTop: 10,
                        marginBottom: 20,
                      }}>
                      <Ionicons
                        name="add-circle-outline"
                        size={45}
                        color="#6491d2"
                      />
                      <Text style={globalStyles.complaintText}>
                        {' '}
                        {updatewitnessID ? 'Update' : translations.addMore}
                      </Text>
                    </Pressable>
                  )}
                </View>
              )}
 {step==0 && pincodeLoading  && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLOR.BACKGROUND_COLOR} />
          <Text style={styles.loaderText}>Verifying pincode...</Text>
        </View>
          )}  

              {step === 5 && confirmFinalSubmission === false ? (
                <CustomButton
                  onPress={handleSubmit(onStepSubmit)}
                  text={isLastStep ? translations.finish : translations.click}
                  disableButton={true}
                />
              ) : (
                <CustomButton
                  onPress={handleSubmit(onStepSubmit)}
                  text={isLastStep ? translations.finish : translations.click}
                  loader={step==0 && pincodeLoading || props.fileComplaint.loading}
                />
              )}
         
              {/* {step !== 5 && (
              <CustomButton
                onPress={props.handleSubmit(onStepSubmit)}
                // text={isLastStep ? translations.finish : translations.click}
                text={translations.click}
                loader={pincodeLoading || props.fileComplaint.loading}
              />
            )} */}
              {step !== 0 ? (
                <TouchableOpacity onPress={onPrevClick}>
                  <Text style={globalStyles.complaintButtonText}>
                    {translations.back}
                  </Text>
                </TouchableOpacity>
              ) : undefined}
              {step == 1 ? (
                <TouchableOpacity onPress={handleSubmit(onFinish)}>
                  <Text style={globalStyles.complaintButtonText}>
                    {translations.finish}
                  </Text>
                </TouchableOpacity>
              ) : undefined}
              {showSuccessPopup === true && (
                <SuccessMessage
                  caseNumber={caseId}
                  isModalVisible={isModalVisible}
                  toggleModal={toggleModal}
                />
              )}
              {modalVisibleConsent && (
                <ConsentPopup
                  modalVisible={modalVisibleConsent}
                  onPress={props.handleSubmit(onStepSubmit)}
                  onCancel={onConsentCancel}
                />
              )}
            </View>
          </View>
        </ScrollView>
        {/* </Background> */}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const mapStateToPros = state => {
  return {
    user: state.otp.user,
    pincode: state.pincode.data,
    fileComplaint: state.fileComplaint,
    validationErrors: state.validate,
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitFileComplaint: values =>
      dispatch(fileComplaintActions.submitFileComplaint(values)),
    checkPincode: values => dispatch(fileComplaintActions.checkPincode(values)),
    resetComplaintForm: () =>
      dispatch(fileComplaintActions.resetFileComplaint()),
  };
};

FileComplaint = connect(mapStateToPros, mapDispatchToProps)(FileComplaint);

export default reduxForm({
  form: 'FileComplaint',
  initialValues: {},
  enableReinitialize: true,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate:validate,
  // touchOnBlur: false,
})(FileComplaint);

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center'
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black'
  },
});
