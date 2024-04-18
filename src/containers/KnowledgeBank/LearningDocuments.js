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

const LearningDocuments = () => {
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
              'https://doc-00-3o-prod-03-apps-viewer.googleusercontent.com/viewer2/prod-03/pdf/64tgla4nj7f2remagj7bctamqfputiln/ttnjn5iuc2mnvm84k1uf3g6853rlgdf9/1679125950000/3/111667900078633172453/APznzaagtmZ52GZ2odeEHLRHIM1c6tksclvy8sWwEsqsJq0C8Mt55r4C0KkjwEz3wZsyOQPz94-GyXP3_fgGJI4dqlnppikJgXh41nvwwhXG2WDBKcKXW4KHxjBUpSktFSUYu5GchKtUB8xxrG2UYQrTyqbR3LZVCzrTKJVaf9visluk3diEetuN1qLChLaAvQmi4BI1fpoWbQdGN27ibbGesAhXrkHABtxUamsHCyC24Nx6Hbk_32CcpYXoK59pbi8zrKNC-INRKPuE2Vryf6-9Nxb6fzlbI8UHWoqAibReRITcL5DSfzYt9p45GC-icWvFEl7fcPScRnYPRwKPoXSwgEXHaOjGm28VJTNjPZCCrwtQmI-OCS4j2dGxwBV_JulT01mZ0Jy-?authuser=0&nonce=kl5j3a1a8rb5g&user=111667900078633172453&hash=4l2n02o06q9l8u3tosn2cdmme5fbh0mp',
              'training.pdf',
            )
          }>
          <Text style={globalStyles.knowledgeText}>
            TRANING MODULE ON SEXUAL HARASSMENT OF WOMEN AT WORKPLACE.
          </Text>
          <FontAwesome name={'cloud-download'} size={30} color="black" />
        </Pressable>
        <Pressable
          style={globalStyles.knowledgeContainer3}
          onPress={() =>
            handleDownloadPDF(
              'https://doc-0g-c8-prod-02-apps-viewer.googleusercontent.com/viewer2/prod-02/pdf/mllm0bhvu1o8buov9k9v5bqiigoh0t7r/4dboqbg0ce1l5pba1ekm4jsst6vubmv5/1679126025000/3/111667900078633172453/APznzaZo7YNum6T7LCpo3ppb9uFgj0PYkwUZOBYasO5jLIVCBliOTiWoC368JFKa3WrHuDmpV_NHDnwaHUaY5HCdfM69lCAPOVqtX0J1hjgLCiwJdAq2_z7E8ScI211hSv7VfeJZdxazPmVm2Wz4UFempFtVug8pO8bhCcnG_PbfPrDMqQxy20DcNlxRzTr_-x1HcKfRen47W4KHI3t2jKyrYDgpxvwPGU---XBNWQUPQYhfS6eL-p2ZEkgVTu_SlBUPViyBGnpcUxPcUfb9tifmMljrcflnl6-VQW3AgLHUP8DNs2ufYt6AC-gW3Q5jFdOEXQxhAuSGgk79k3Glwbj0J9UoSFRuVea7GPxNpihmgXCJnWB8ZNkj3ZuZf-PnefP4KvHWduzI?authuser=0&nonce=miebrbldgr8b2&user=111667900078633172453&hash=0vb5o68uth8kbdu2mucf7n8a9k7v25p2',
              'workplace.pdf',
            )
          }>
          <Text style={globalStyles.knowledgeText}>
            Handbook on Sexual Harassment of Women at Workplace.
          </Text>
          <FontAwesome name={'cloud-download'} size={30} color="black" />
        </Pressable>
      </View>
    </Background>
  );
};

export default LearningDocuments;
