import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  ActivityIndicator,
  Linking,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Background from '../../../components/Background';
import {ScrollView, isEmptyObj} from 'native-base';
import CustomPressable from '../../../components/CustomPressable';
import axios from 'axios';
import {api, apiStartPoint} from '../../../api/config';
import {COLOR} from '../../../constants/GlobalConstants';
import NoData from '../../../components/NoData';
import {ErrorToaster} from '../../../helpers';

const {width, height} = Dimensions.get('window');
const ResearchCard = ({item}) => {
  return (
    <View style={{marginBottom: 20, marginHorizontal: 10}}>
      <CustomPressable
        name={'file-download'}
        text={item?.title}
        onPress={() => Linking.openURL(item.url)}
      />
    </View>
  );
};
const mapData = data => {
  return data.map((d, i) => {
    return {
      id: d.id,
      sid: i + 1,
      title: d.title,
      url: api + 'research/' + d.fileId + '.pdf',
    };
  });
};
const ResearchScreen = () => {
  const [loading, setLoading] = useState(true);
  const [researches, setResearches] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    axios
      .get(`${api}research/readAll`)
      .then(res => {
        setLoading(false);

        if (res.status === 200) {
          if (res.data.response?.length) {
            const data = mapData(res.data.response);
            setResearches([...data]);
          }
        } else {
          setResearches([]);
          setLoading(false);
          setError('');
        }
      })
      .catch(err => {
        setLoading(false);
        ErrorToaster(' Alert ', err);
      });
  }, []);

  return (
    <Background showlogo={false}>
      {loading ? (
        <ActivityIndicator
          color={COLOR.BACKGROUND_COLOR}
          size="large"
          style={{marginTop: height / 2.5}}
        />
      ) : (
        <ScrollView style={{paddingHorizontal: 10}}>
          {!isEmptyObj(researches) ? (
            researches?.map(item => {
              return <ResearchCard key={item.id} item={item} />;
            })
          ) : (
            <NoData />
          )}
        </ScrollView>
      )}
    </Background>
  );
};

export default ResearchScreen;
