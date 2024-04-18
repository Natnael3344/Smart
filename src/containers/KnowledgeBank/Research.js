import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Pressable,
  Linking,
} from 'react-native';
import React from 'react';
import Background from '../../components/Background';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {PermissionsAndroid} from 'react-native';
import globalStyles from '../../assets/css/styles';

const Research = () => {
  const [loading, setLoading] = useState(true);
  const [research, setResearch] = useState([]);
  const [error, setError] = useState('');

  const mapData = data => {
    return data.map((d, i) => {
      return {
        id: d.id,
        sid: i + 1,
        title: d.title,
        url:
          'https://surakshachakra-api.myambar.org/research/' +
          d.fileId +
          d.fileExt +
          '#zoom=75&view=fit',
      };
    });
  };

  useEffect(() => {
    axios
      .get(`https://surakshachakra-api.myambar.org/research/readAll`)
      .then(res => {
        Alert('gi');
        if (res.status === 200) {
          if (res.data.response?.length) {
            const data = mapData(res.data.response);
            setResearch([...data]);
            //  setResource({...data[0]})
          }
        } else {
          setResearch([]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const handleDownloadPDF = async (urls, fileNames) => {
    try {
      const url = urls;
      const fileName = fileNames;
      const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      const options = {
        fromUrl: url,
        toFile: downloadDest,
      };
      const readGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      const writeGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      const isGranted =
        result[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
          'granted' &&
        result[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
          'granted';

      RNFS.downloadFile(options)
        .promise.then(() =>
          PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ]),
        )
        .then(result => {
          const isGranted =
            result[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
              'granted' &&
            result[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
              'granted';

          isGranted
            ? FileViewer.open(downloadDest, {
                showOpenWithDialog: true,
                showAppsSuggestions: true,
              })
            : console.log('Declined');
        })
        .then(() => {
          console.log('File should have opened');
        });
      const downloadRes = await RNFS.downloadFile(options).promise;
      const shareOptions = {
        type: 'application/pdf',
        url: `file://${downloadDest}`,
      };
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Background showlogo={false}>
      <View style={globalStyles.knowledgeContainer1}>
        <Pressable
          style={globalStyles.knowledgeContainer3}
          onPress={() =>
            handleDownloadPDF(
              'https://doc-0s-c8-prod-02-apps-viewer.googleusercontent.com/viewer2/prod-02/pdf/mllm0bhvu1o8buov9k9v5bqiigoh0t7r/1pfb5gkok2cg9ott97mtmgkq7facmhkl/1679125875000/3/111667900078633172453/APznzaZkHu0uVnkDX_aVh2c33r-cxIrMuBf18tdMWoxy1SisaRqpZDkFWRh_WMaGHiXI4GyW1Q2AMzauY3KBofta4Qq0EA3L3J5y6EmNNB-LuYwvY2Jlbva1Zo9TirGKy2MkgSQXAldWMrAO5r6d65vy48zACb5k8gY4EyYV4JjdqDRjSkLT3ehJEdNAcaSjCrdLK3nFtbvquJ_OmmFPv-FFa0RrDE0Z2opA1LkauaSk6-lrODmUO3T19VvULn8ljd3XorLiNkFr3iTUnMN0qMz4zB6BhdwrPZuon028vne_csDGyCmjJfRfY_mFEaInosghffxhW7eznpxyof5bipRm-d2VEmvcSoa8pnurwuxnfH3lOJDC-K4np_xhuBJ0Yu8vHWzFTopJ?authuser=0&nonce=krp7o3h3bp7ju&user=111667900078633172453&hash=ik4og3tr3of9u8d58049agu4vkf3pcrn',
              'research.pdf',
            )
          }>
          <Text style={globalStyles.knowledgeText}>
            The Local Committee study report of 2018.
          </Text>
          <FontAwesome name={'cloud-download'} size={30} color="black" />
        </Pressable>
      </View>
    </Background>
  );
};

export default Research;
