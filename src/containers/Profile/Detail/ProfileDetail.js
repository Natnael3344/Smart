import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {OTPActions} from '../../Auth/OTP/OTP.actions';
import {getLanguage} from '../../../translations/languageSelector';
import en from '../../../../locales/en.json';
import hi from '../../../../locales/hi.json';
const ProfileDetail = ({user}) => {
  const [name, setName] = useState('John Doe');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [isEditing, setIsEditing] = useState(false);

  const language = useSelector(getLanguage);
  let translations;
  if (language.language === 'en') {
    translations = en;
  } else {
    translations = hi;
  }
  useEffect(() => {
    if (user) {
      setName(user.data[0].first_name + `  ${user.data[0].last_name}`);
      setPhoneNumber(user.data[0].mobile);
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.profilePictureContainer}>
        <Image
          style={styles.profilePicture}
          source={Profile}
          resizeMode="contain"
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>{translations.personal}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>{translations.name}</Text>
          <Text style={styles.value}>{name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>{translations.phone}</Text>
          <Text style={styles.value}>{phoneNumber}</Text>
        </View>
        <View style={styles.cardFooter}></View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    backgroundColor: '#4bb9ac',
    width: '100%',
    marginTop: 20,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#ccc',
  },
  infoContainer: {
    backgroundColor: '#f0f5fb',
    borderRadius: 50,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    padding: 30,
    justifyContent: 'center',
  },
  card: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    padding: 16,
  },
  cardHeader: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  cardHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 16,
    minWidth: 100,
    color: 'black',
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 16,
  },
  editButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  return {
    user: state.otp.user,
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      OTP: OTPActions.OTP,
      // Add other action creators here if needed
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetail);
