import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView,Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getLanguage } from '../../translations/languageSelector';
import CustomPressable from '../../components/CustomPressable';
import Background from '../../components/Background';
import HTMLView, { RenderHTML }  from 'react-native-render-html';
import { api } from '../../api/config';
import { ActivityIndicator } from 'react-native-paper';
import { COLOR } from '../../constants/GlobalConstants';
import { ErrorToaster } from '../../helpers';
const windowWidth = Dimensions.get('window').width;
const {width, height} = Dimensions.get('window');
const FAQCard = ({text,html}) => {
 
  const [showMore, setShowMore] = useState(false);
  return (
    <View>
    <View style={{marginBottom:10,marginHorizontal:10}}>
      <CustomPressable name={showMore ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} text={text} onPress={() => setShowMore(!showMore)}/>
    </View>
    {showMore&&(
              <RenderHTML                  
              contentWidth={windowWidth}          
              source={{       
                html: html,         
              }}   
              baseStyle={{fontSize:16,marginHorizontal:20,color:'black'}}     
            />
            )}
    </View>
)
}

const FAQScreen = () => {
  let lang='en';
  const language = useSelector(getLanguage);
  lang=language.language;
  const [groupedData, setGroupedData] = useState({});
  const [faqData, setFaqData] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${api}faq/getTags`)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          if (res.data.response?.length) {
            setTagData(res.data.response);
          }
        } else {
          setLoading(false);
          setTagData([]);
        }
      })
      .catch((err) => {
        setLoading(false);
        ErrorToaster(" Alert ", err);
      });
  }, [faqData]);

  useEffect(() => {
    axios
      .get(`${api}faq/readAll`)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          if (res.data.response?.length) {
            setFaqData([...res.data.response]);
          }
        } else {
          setLoading(false);
          setFaqData([]);
        }
      })
      .catch((err) => {
        setLoading(false);
        ErrorToaster(" Alert ", err);
      });
  }, []);

  useEffect(() => {
    const tempp = {};
    const tagKey = `name_${lang}`;

    for (const tag of tagData) {
      const imgUrl = `${api}/faqTags/${tag.tagImageId}${tag.tagImageExt}`;
      const faqs = [];

      for (const faq of faqData) {
        const tagId = faq[`tag_${lang}`];
        if (tagId === tag[tagKey]) {
          faqs.push({ ...faq });
        }
      }

      tempp[tag[tagKey]] = { imgUrl, qna: [...faqs] };
    }

    setGroupedData({ ...tempp });
  }, [tagData]);


  return (
    <Background showlogo={false}>
      {loading ? (
        <ActivityIndicator color={COLOR.BACKGROUND_COLOR} size="large" style={{marginTop:height/2.5}}/>
      ) : (
    <ScrollView contentContainerStyle={{paddingHorizontal:20}}>
                  {Object.keys(groupedData).map((tag, index) => (
                    <View  key={tag}>
                      {groupedData[tag].qna.length > 0 && (
                        <>
                          <Text style={{fontSize:Math.round((20 * width) / 400),fontWeight:'bold',color:'black'}}>{tag}</Text>
                          <ScrollView>
                            {groupedData[tag]?.qna.map((faq) => (
                              <View key={faq.id} >
                                <FAQCard text={faq[`question_${lang}`]} html={faq[`answer_${lang}`]}/>
                              </View>
                            ))}
                          </ScrollView>
                        </>
                      )}
                    </View>
                  ))}
    </ScrollView>
      )}
    </Background>
  );
};

export default FAQScreen;


