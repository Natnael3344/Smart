import {View, Text, Pressable, StyleSheet, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import globalStyles from '../../../assets/css/styles';
import {renderTextField} from '../../../components/renderInput';
import {Field} from 'redux-form';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const required = value => (value ? undefined : 'This field value is required.')

export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined;

export const Witness = props => {


  return (
      <View style={{marginTop:20}}>
        <Text style={globalStyles.complaintText}>Enter full name</Text>
        <Field
          key={'witness_name'}
          id={'witness_name'}
          name={'witness_name'}
          label={'Enter Name'}
          component={renderTextField}
          validate={[required]}
        />
        {/* <Text style={globalStyles.warningText}>{}</Text> */}
        <Text style={globalStyles.complaintText}>Enter phone number</Text>
        <Field
          key={'witness_contact_number'}
          id={'witness_contact_number'}
          name={'witness_contact_number'}
          label={'Enter Phone Number'}
          keyboardType={'phone-pad'}
          component={renderTextField}
          validate={[required, phoneNumber]}
        />
        {/* <Text style={globalStyles.warningText}>{}</Text> */}
      </View>

  );
};
const styles = StyleSheet.create({
  witnessItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  witnessName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  witnessPhone: {
    flex: 1,
    fontSize: 16,
    color: 'white',
  },
});
