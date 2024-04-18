import {
  View,
  ScrollView,
  Text,
  Pressable,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import globalStyles from '../assets/css/styles';
import {LargeButton} from './renderButton';
import {Icon} from 'native-base';
import {renderTextArea} from './renderInput';
import {Field} from 'redux-form';
import DocumentPicker from 'react-native-document-picker';

const CustomModal = ({
  isModalVisible,
  addEvidence,
  handleAddFile,
  toggleModal,
  modalType,
}) => {
  const [evidenceFileName, setEvidenceFileName] = useState('No File chosen');
  console.log('modalType', modalType);

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
      const res = await DocumentPicker.pick({
        //by using allFiles type, you will able to pick any type of media from user device,
        //There can me more options as well
        //DocumentPicker.types.images: All image types
        //DocumentPicker.types.plainText: Plain text files
        //DocumentPicker.types.audio: All audio types
        //DocumentPicker.types.pdf: PDF documents
        //DocumentPicker.types.zip: Zip files
        //DocumentPicker.types.csv: Csv files
        //DocumentPicker.types.doc: doc files
        //DocumentPicker.types.docx: docx files
        //DocumentPicker.types.ppt: ppt files
        //DocumentPicker.types.pptx: pptx files
        //DocumentPicker.types.xls: xls files
        //DocumentPicker.types.xlsx: xlsx files
        //For selecting more more than one options use the
        //type: [DocumentPicker.types.csv,DocumentPicker.types.xls]
        type: fileTypeArray,
      });
      console.log('---------------------res------------------', res);
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
  };

  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Attach File</Text>
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
            <View
              style={{
                backgroundColor: '#f8f9fa',
                borderRightWidth: 1,
                borderRightColor: '#CCCCCC',
                marginRight: 20,
                paddingRight: 10,
              }}>
              <Text style={styles.buttonText}>Choose File</Text>
            </View>

            <Text style={{flexShrink: 1}}>{evidenceFileName}</Text>
          </TouchableOpacity>
          <Text style={styles.label}>Evidence Description:</Text>
          <Field
            key={'evidence_description'}
            id={'evidence_description'}
            name={'evidence_description'}
            component={renderTextArea}
          />
        </View>
        <LargeButton
          title="Add Evidence"
          style={globalStyles.gradientButton}
          onPressEvent={addEvidence}
        />
      </View>
    </Modal>
  );
};
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
});
export default CustomModal;
