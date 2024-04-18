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
import Background from '../../../components/Background';
import {ScrollView, isEmptyObj} from 'native-base';

import CustomPressable from '../../../components/CustomPressable';
import axios from 'axios';
import {api, apiStartPoint, config} from '../../../api/config';
import {COLOR} from '../../../constants/GlobalConstants';
import {ErrorToaster} from '../../../helpers';
import NoData from '../../../components/NoData';
const {width, height} = Dimensions.get('window');
const LawsCard = ({item}) => {
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
      url: api + 'laws/' + d.fileId + '.pdf',
    };
  });
};

const LawsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [laws, setLaws] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`${api}laws/readAll`)
      .then(res => {
        setLoading(false);

        if (res.status === 200) {
          if (res.data.response?.length) {
            const data = mapData(res.data.response);
            setLaws([...data]);
          }
        } else {
          setLaws([]);
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
          {!isEmptyObj(laws) ? (
            laws?.map(item => {
              return <LawsCard key={item.id} item={item} />;
            })
          ) : (
            <NoData />
          )}
        </ScrollView>
      )}
    </Background>
  );
};

export default LawsScreen;
