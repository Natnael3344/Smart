import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Button,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Background from '../../components/Background';
import globalStyles from '../../assets/css/styles';
import RenderHtml from 'react-native-render-html';
const windowWidth = Dimensions.get('window').width;

import axios from 'axios';
import About1 from "../../assets/images/about1.svg";
import About2 from "../../assets/images/about2.svg";
import About3 from "../../assets/images/about3.svg";
import About4 from "../../assets/images/about4.svg";
import About5 from "../../assets/images/about5.svg";
import { useSelector } from 'react-redux';
import { getLanguage } from '../../translations/languageSelector';
import { api } from '../../api/config';
import { ActivityIndicator } from 'react-native-paper';
import { COLOR } from '../../constants/GlobalConstants';
import { ErrorToaster } from '../../helpers';
const {width, height} = Dimensions.get('window');
const AboutUs = () => {
  const [loading, setLoading] = useState(true);
  const [aboutUS, setAboutUS] = useState({});
  let lang = 'en';
  const language = useSelector(getLanguage);
  lang=language.language;
  const titleMap = {
    aboutMyAmbar: {
      en: 'MyAmbar',
      hi: 'माय अंबर',
      img: 3,
    },
    aboutMyAmbarSurakshaChakra: {
      en: 'MyAmbar Suraksha Chakra',
      hi: 'माय अंबर सुरक्षा चक्र',
      img: 1,
    },
    aboutVodafoneIdeaFoundation: {
      en: 'Vodafone Idea Foundation',
      hi: 'वोडाफोन आइडिया फाउंडेशन',
      img: 5,
    },
    aboutNasscom: {
      en: 'NASSCOM Foundation',
      hi: 'नैसकॉम फाउंडेशन',
      img: 4,
    },
    aboutMarthaFarrell: {
      en: 'Martha Farrell Foundation',
      hi: 'मार्था फैरेल फाउंडेशन',
      img: 2,
    },
  };

  useEffect(() => {
    getAboutUs();
  }, []);

  const getAboutUs = () => {
    axios
      .get(`${api}site/getAbout`)
      .then(res => {
        setLoading(false);
        if (res.status === 200) {
          const JsonData = res.data.response;
          if (Object.keys(JsonData).length) {
            setAboutUS({...JsonData});
          }
        } else {
          setLoading(false);
          setAboutUS({});
        }
      })
      .catch(err => {
        setLoading(false);
        ErrorToaster(" Alert ", err);
      });
  };

  renderViewMore = onPress => {
    return <Text onPress={onPress}>View more</Text>;
  };
  renderViewLess = onPress => {
    return <Text onPress={onPress}>View less</Text>;
  };

  return (
    <View style={{backgroundColor:'#ffffff',paddingVertical:20,flex:1}}>
      {loading ? (
        <ActivityIndicator color={COLOR.BACKGROUND_COLOR} size="large" style={{marginTop:height/2.5}}/>
      ) : (
      <ScrollView style={{paddingHorizontal: 20}}>
        {Object.keys(aboutUS).map((about, index) => {
          //  return <PreviewParagraph text={aboutUS[about][lang]} wordLimit={100} lang={lang} />
          return (
            <View key={index} >
              <View>
                <Text
                  style={[globalStyles.header_title_text, {color: 'black',fontWeight:'bold'}]}>
                  {titleMap[about][lang]}
                </Text>
              </View>
              <View style={{borderColor : '#000',borderWidth :0, flex : 1}}>
             
                    { titleMap[about]['img'] === 1 &&  <About1 width={windowWidth} /> }
                     { titleMap[about]['img'] === 2 && <About2 width={windowWidth}/> }
                     { titleMap[about]['img'] === 3 && <About3  width={windowWidth}/> }
                     { titleMap[about]['img'] === 4 && <About4  width={windowWidth}/> }
                     { titleMap[about]['img'] === 5 && <About5  width={windowWidth}/> }
              </View>

              <RenderHtml
                contentWidth={windowWidth}
                source={{
                  html: aboutUS[about][lang],
                }}
                baseStyle={{fontSize:16,color:'black'}}
              />
            </View>
          );
        })}
      </ScrollView>
      )}
    </View>
  );
};

export default AboutUs;
