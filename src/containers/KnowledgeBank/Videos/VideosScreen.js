import {View, Text, StyleSheet, Image, Linking, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import globalStyles from '../../../assets/css/styles';
import Background from '../../../components/Background';
import {ScrollView, isEmptyObj} from 'native-base';
import Card from '../../../components/Card';
import axios from 'axios';
import {api, apiStartPoint} from '../../../api/config';
import {ActivityIndicator} from 'react-native-paper';
import {COLOR} from '../../../constants/GlobalConstants';
import NoData from '../../../components/NoData';
import {ErrorToaster} from '../../../helpers';
const {width, height} = Dimensions.get('window');
const VideosCard = ({item}) => {
  return (
    <View style={globalStyles.knowledgeContainer1}>
      <Card
        thumbnail={item?.thumbnail}
        title={item?.title}
        onPress={() => Linking.openURL(item?.url)}
        description={item?.description}
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
      thumbnail: d.thumbnail,
      description: d.description,
      url: d.url,
    };
  });
};

const VideosScreen = () => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    axios
      .get(`${api}videos/readAll`)
      .then(res => {
        setLoading(false);

        if (res.status === 200) {
          if (res.data.response?.length) {
            const data = mapData(res.data.response);
            setVideos([...data]);
          }
        } else {
          setVideos([]);
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
        <ScrollView>
          {!isEmptyObj(videos) ? (
            videos?.map(item => {
              return <VideosCard key={item.id} item={item} />;
            })
          ) : (
            <NoData />
          )}
        </ScrollView>
      )}
    </Background>
  );
};

export default VideosScreen;
