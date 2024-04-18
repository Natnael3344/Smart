import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
const {height, width} = Dimensions.get('window');
import {setLanguage} from './languageActions';
// import Selected from '../assets/images/selected.png';
// import NotSelected from '../assets/images/non_selected.png';
import {LargeButton} from '../components/renderButton';
import {COLOR} from '../constants/GlobalConstants';
const LanguageSelectionMenu = ({route, visible, setVisible }) => {
  const navigation = useNavigation();
  const [selectedLang, setSelectedLang] = useState(0);
 
  const onNext = () => {
    // setVisible(false);
    visible=false;
    // setVisible(!visible);
    navigation.navigate('dashboard');
  }
  
  
  const [languages, setLangauges] = useState([
    {name: 'English', selected: true},
    {name: 'हिंदी', selected: false},
  ]);
  const onSelect = index => {
    const temp = languages;
    temp.map((item, ind) => {
      if (index == ind) {
        if (item.selected == true) {
          item.selected = false;
        } else {
          item.selected = true;
          setSelectedLang(index);
        }
      } else {
        item.selected = false;
      }
    });
    let temp2 = [];
    temp.map(item => {
      temp2.push(item);
    });
    setLangauges(temp2);
  };

  const dispatch = useDispatch();

  if (selectedLang == 0) {
    dispatch(setLanguage('en'));
  } else {
    dispatch(setLanguage('hi'));
  }
  
  

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Select Language</Text>
          <View style={{width: '100%'}}>
            <FlatList
              data={languages}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.languageItem,
                      {
                        borderColor:
                          item.selected == true
                            ? COLOR.BACKGROUND_COLOR
                            : 'black',
                      },
                    ]}
                    onPress={() => {
                      onSelect(index);
                    }}>
                    {item.selected == true ? (
                      <Image
                        source={Selected}
                        style={[
                          styles.icon,
                          {tintColor: COLOR.BACKGROUND_COLOR},
                        ]}
                      />
                    ) : (
                      <Image source={NotSelected} style={styles.icon} />
                    )}

                    <Text
                      style={{
                        marginLeft: 20,
                        fontSize: 18,
                        color:
                          item.selected == true
                            ? COLOR.BACKGROUND_COLOR
                            : 'black',
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <LargeButton
            title="Continue"
            style={styles.btns}
            onPressEvent={onNext}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modalView: {
    margin: 20,
    width: width - 20,
    // height: height / 2,

    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  languageItem: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    marginTop: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  btns: {
    borderRadius: 30,
    height: 50,
    marginTop: 20,
    overflow: 'hidden',
    width: '100%',
  },
});

export default LanguageSelectionMenu;
