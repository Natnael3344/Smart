import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from 'react-native';
// import { WebView } from 'react-native-webview';
import React, {useEffect, useState} from 'react';
import Background from '../../../components/Background';
import {ScrollView, isEmptyObj} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {api, apiStartPoint} from '../../../api/config';
import {COLOR} from '../../../constants/GlobalConstants';
import Share from 'react-native-share';
import RenderHTML from 'react-native-render-html';
import NoData from '../../../components/NoData';
import {ErrorToaster} from '../../../helpers';
const {width, height} = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;
const shareBlog = async ({url}) => {
  try {
    const blogLink = url;
    const options = {
      url: blogLink,
    };

    await Share.open(options);
  } catch (error) {
    console.log('Error sharing APK:', error);
  }
};

const Card = ({
  bannerImageId,
  title,
  authorImageName,
  authors,
  date,
  content,
  onPress,
  url,
}) => {
  // const { demoImageName, title, authorImageName, authors, date,content } = blogScreen;

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => onPress(onPress)}>
      <Image source={{uri: bannerImageId}} style={styles.picture} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.authorContainer}>
          <Image source={{uri: authorImageName}} style={styles.authorPicture} />
          <View style={{flex: 1}}>
            <Text style={styles.authorName}>{authors}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
          <Pressable
            onPress={() => shareBlog(url)}
            style={{
              flex: 0,
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginRight: 10,
            }}>
            <FontAwesome
              name="share-alt"
              color={COLOR.BACKGROUND_COLOR}
              size={35}
            />
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const BlogsCard = ({item}) => {
  const navigation = useNavigation();
  const handleCardPress = () => {
    navigation.navigate('BlogDetail', {blog: item});
  };
  return (
    <View style={{marginBottom: 20}}>
      <Card
        url={item?.url}
        bannerImageId={api + 'blogs/banner/' + item?.bannerImageId + '.jpg'}
        title={item?.title}
        authorImageName={api + 'blogs/author/' + item?.authorImageId + '.jpg'}
        authors={item?.authors}
        date={item?.date}
        content={item?.content}
        onPress={handleCardPress}
      />
    </View>
  );
};

export const BlogDetailScreen = ({route}) => {
  const {blog} = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={{flex: 0.5, paddingHorizontal: 20, marginBottom: 10}}>
        <Image
          resizeMode="contain"
          source={{uri: api + 'blogs/banner/' + blog.bannerImageId + '.jpg'}}
          style={styles.picture1}
        />
        <Image
          source={{uri: api + 'blogs/author/' + blog.authorImageId + '.jpg'}}
          style={styles.bannerPicture}
        />
        <Text style={{alignSelf: 'center', color: 'blue'}}>{blog.tag}</Text>
        <Text
          style={{
            alignSelf: 'center',
            color: 'black',
            textAlign: 'center',
            fontSize: 17,
          }}>
          {blog.title}
        </Text>
        <Text style={{alignSelf: 'center'}}>Written by</Text>
        <Text style={{alignSelf: 'center', color: 'blue'}}>{blog.authors}</Text>
      </View>
      <RenderHTML
        contentWidth={windowWidth}
        source={{
          html: blog.content,
        }}
        baseStyle={{fontSize: 16, marginHorizontal: 20, color: 'black'}}
      />
    </ScrollView>
  );
};
const mapData = data => {
  return data.map((d, i) => {
    return {
      id: d.id,
      sid: i + 1,
      title: d.title,
      bannerImageId: d.bannerImageId,
      authorImageId: d.authorImageId,
      tag: d.tag,
      authors: d.authors,
      date: d.date,
      source: d.source,
      content: d.content,
      url:
        apiStartPoint + 'blogs/' + d.fileId + d.fileExt + '#zoom=75&view=fit',
    };
  });
};
const BlogsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`${api}blogs/readAll`)
      .then(res => {
        setLoading(false);

        if (res.status === 200) {
          if (res.data.response?.length) {
            const data = mapData(res.data.response);
            setBlogs([...data]);
          }
        } else {
          setBlogs([]);
          setLoading(false);
          setError('');
        }
      })
      .catch(err => {
        setLoading(false);
        ErrorToaster(' Alert ', err);
      });
  }, []);

  // if (loading) {
  //   return (
  //     <View style={styles.loading}>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Error: {error.message}</Text>
  //     </View>
  //   );
  // }

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
          {!isEmptyObj(blogs) ? (
            blogs?.map(item => {
              return (
                <BlogsCard
                  key={item.id}
                  item={item}
                  // navigation={navigation}
                />
              );
            })
          ) : (
            <NoData />
          )}
        </ScrollView>
      )}
    </Background>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  bannerPicture: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: -40,
  },
  webview: {
    flex: 1,
    backgroundColor: '#f0f5fb',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardContainer: {
    flexDirection: 'column',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  picture: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
  },
  picture1: {
    width: '100%',
    aspectRatio: 36 / 9,
    borderRadius: 8,
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  authorPicture: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: 8,
  },
  authorName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  date: {
    color: 'gray',
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#f0f5fb',
  },
});

export default BlogsScreen;
