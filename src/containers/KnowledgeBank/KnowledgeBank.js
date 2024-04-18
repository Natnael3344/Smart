import React, {useState} from 'react';
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
import CustomPressable from '../../components/CustomPressable';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Image0 from '../../assets/images/v1.jpg';
// import Image1 from '../../assets/images/v2.jpg';
// import Image2 from '../../assets/images/v3.jpg';
// import Image3 from '../../assets/images/v4.jpg';
import {PermissionsAndroid} from 'react-native';
import Background from '../../components/Background';
import globalStyles from '../../assets/css/styles';

const KnowledgeBank = () => {
  const [showLaw, setShowLaw] = useState(false);
  const [showResearch, setShowResearch] = useState(false);
  const [showLearning, setShowLearning] = useState(false);
  const [showVideos, setShowVideos] = useState(false);

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
    <ScrollView style={{paddingHorizontal: 20}}>
      <Background showlogo={false}>
        <CustomPressable
          text={'Laws'}
          name={'keyboard-arrow-down'}
          onPress={() => setShowLaw(!showLaw)}
        />
        {showLaw && (
          <View style={globalStyles.knowledgeContainer1}>
            <Pressable
              style={globalStyles.knowledgeContainer3}
              onPress={() =>
                handleDownloadPDF(
                  'https://doc-14-8c-prod-00-apps-viewer.googleusercontent.com/viewer2/prod-00/pdf/q42hb55cvibf3n0a4svnv2hduigr97c8/lfseh9eii82r9oi932kd926qhqhjppr6/1679118525000/3/111667900078633172453/APznzaahZIW_GjauqUMVtBOXZqRMufeJ5gf2VwHgNWRBSjFJATxostmPYeRt5SvL4oVUjXF27vFtkIba5RiHSO86aSNXHRVAkbxQs_3eNxgUBUN4uHPXwKnh6CB71NbEixTX0axIgZLtqlXNxnc0iqb2smOC6euiozdGRAtEqnTlbPHRsF9wGuXZ7SwPZDAzGE6xb3aAZuM40f8jqcn-8YgkOEeSVVO7ZMey7Pnipx205tcGWhzS5BXLB01qu-X80XIPV1ySjuYiuaflBtLisgzCIAhTyCSBYUc4IbxcjjNzA0XGVL41WFCw8Jvo-3VTDGwkPtkJTrLm1-McCktzICVkx4GF7pp6nMtBaLBTFpgDoAurXEwcCYFgyF87qA8ATz7vFIIJZK1_?authuser=0&nonce=sagk8es3i4jdq&user=111667900078633172453&hash=qblgqspioblfgl6otceh8o3loljqdv12',
                  'law.pdf',
                )
              }>
              <Text style={globalStyles.knowledgeText}>A copy of the law.</Text>
              <FontAwesome name={'cloud-download'} size={30} color="black" />
            </Pressable>
            <Pressable
              style={globalStyles.knowledgeContainer3}
              onPress={() =>
                handleDownloadPDF(
                  'https://doc-0o-8c-prod-00-apps-viewer.googleusercontent.com/viewer2/prod-00/pdf/q42hb55cvibf3n0a4svnv2hduigr97c8/dsfe1mveojk5unnc12i1ktoshvd9gls4/1679125725000/3/111667900078633172453/APznzaZpoGiyW21Bf7-TdVifAqCkpOtIDdWiqFb_KDRjmwY_M-5GVJdDjrMwUdrjzPRm3VKXtA0HDdU2ABGXETtb3U5ZD9eyIoDfEaMElXvhqOEY_QCog1-rSWRRl4-tSs6b1pExBvt-bdlAiPLEyVJTOmk3PEGgLGo-9Za5I3-5GJw8hhapekjO_VnD7viN-EVBqh1ApPhkT4wXABYKSy80Xhl2gxyLl4x4sZ-e-rgtgRY8H736jM4aezfLk2NOd-MveqqhfIA09RsszXE8xbbL95HYFmXB_65kIDCAwbjaXcWkTqfV7UfkAX-3HmQ35hwWiEs0glwRYBVvuY4vRI3ocW4zPCLSS0jK_ypwnID7SqQLAL-RxChUz8k4IQe-JwpykQ0rlO0Y?authuser=0&nonce=cc63v55pu72oq&user=111667900078633172453&hash=g96o8e1590vdfhca1jmtafesf32dmhva',
                  'rules.pdf',
                )
              }>
              <Text style={globalStyles.knowledgeText}>
                A copy of the Rules.
              </Text>
              <FontAwesome name={'cloud-download'} size={30} color="black" />
            </Pressable>
            <Pressable
              style={globalStyles.knowledgeContainer3}
              onPress={() =>
                handleDownloadPDF(
                  'https://doc-00-c8-prod-02-apps-viewer.googleusercontent.com/viewer2/prod-02/pdf/mllm0bhvu1o8buov9k9v5bqiigoh0t7r/aqvdh75h5jg8ij4hammgalcrq1dsn9o1/1679125725000/3/111667900078633172453/APznzaamAz331ju_6_AGVXEmW3zJw01KDKhT6Nn-QTEddK4a8U3xMnJCmOE9aIVAOtVFFbnyapHfUtivIg8CK7TqTKHKVs4xRz96C6SFv5D2r1SVbR7QBTCaYTZREkuZAyaIgGT3x3-ORlbC7Vwhx0SMjIuWP22M4SXGWvjmhH5mvznQe9wvnt7BqJGQ-7B8ce0JAtgUlvH-FucV9SCLaQdPcsKpYJjwMXU3I63MCucwzi2WPZlLLzHi6CKuOtXPuUZiFVpV6DVclGUaOwyr_ixbj_rYo9XxC-FmuZrmAkuS5Rk4W944JdL0RrPfQt6L3DCV-SQjoBbrirYvrXt_yabIfGbtPgoEA53Cr6hnwj0-4Nw0pteyOk8SckneuVxUEGjzKAQl8kU5?authuser=0&nonce=fai48dpfu5oso&user=111667900078633172453&hash=a2rrsge7lst1tidthp3ui4kgbcsj1m6i',
                  'ugc.pdf',
                )
              }>
              <Text style={globalStyles.knowledgeText}>UGC regulations.</Text>
              <FontAwesome name={'cloud-download'} size={30} color="black" />
            </Pressable>
            <Pressable
              style={globalStyles.knowledgeContainer3}
              onPress={() =>
                handleDownloadPDF(
                  'https://doc-0c-8c-prod-00-apps-viewer.googleusercontent.com/viewer2/prod-00/pdf/q42hb55cvibf3n0a4svnv2hduigr97c8/do765dkbpt5j6a1e98tdqg64gh8lf34b/1679125800000/3/111667900078633172453/APznzabkAEHutc82X0PqLxrdlAp4iLlxKvl1DxNq7rBaVuX5KTLVVCXJEeY-sCapz3KBMF0mArZ4wtxBUHCv9i0c7l_oOnnZaMQQkgPHErFj1qzEFDnxsMFtfKk2H8wgIVWwzXl4dLTUTu2lBN4mGxb4HYrKMLts89ahVDTkDc_4rIXZsucxpYvLYFJrwW_xPQzh8_wGTf_skq_lZrkiV4rLOJI_CldOuiS-SnsKt5WCo0tRprSskOZC3524qQvAcI1YEpSxJuEq4fV-3T02sc2Ddcxlo52kan99tGhlczOUuQwKfTFsZ-xoGNLhMknqJp8U6_bEPtvY8k3djs2a7sVQNbDEdsXfs4vp06kVpiq8AsPZtuRpxwbWd_5tLNO_En3i4w4THV7l?authuser=0&nonce=52jvsndha9soc&user=111667900078633172453&hash=6rr8dfcc73ukuqqtls3l6p0ak76jov2d',
                  'ipc.pdf',
                )
              }>
              <Text style={globalStyles.knowledgeText}>IPC.</Text>
              <FontAwesome name={'cloud-download'} size={30} color="black" />
            </Pressable>
          </View>
        )}
        <CustomPressable
          text={'Research'}
          name={'keyboard-arrow-down'}
          onPress={() => setShowResearch(!showResearch)}
        />
        {showResearch && (
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
        )}
        <CustomPressable
          text={'Learning Documents'}
          name={'keyboard-arrow-down'}
          onPress={() => setShowLearning(!showLearning)}
        />
        {showLearning && (
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
        )}
        <CustomPressable
          text={'Videos'}
          name={'keyboard-arrow-down'}
          onPress={() => setShowVideos(!showVideos)}
        />
        {showVideos && (
          <View style={globalStyles.knowledgeContainer1}>
            <Pressable
              style={globalStyles.knowledgeContainer3}
              onPress={() => Linking.openURL('https://youtu.be/4X8WnFhUTAQ')}>
              <Image
                style={globalStyles.knowledgeImage}
                source={Image0}
                resizeMode="cover"></Image>
              <Text style={globalStyles.knowledgeText}>
                #YesToPOSH: Issued in public interest by National Commission for
                Women.
              </Text>
            </Pressable>
            <Pressable
              style={globalStyles.knowledgeContainer3}
              onPress={() => Linking.openURL('https://youtu.be/Tp5NYhPE8Cw')}>
              <Image
                style={globalStyles.knowledgeImage}
                source={Image1}
                resizeMode="cover"></Image>
              <Text style={globalStyles.knowledgeText}>
                Postcard Campaign by MFF.
              </Text>
            </Pressable>
            <Pressable
              style={globalStyles.knowledgeContainer3}
              onPress={() => Linking.openURL('https://youtu.be/nyZw7p1sF48')}>
              <Image
                style={globalStyles.knowledgeImage}
                source={Image2}
                resizeMode="cover"></Image>
              <Text style={globalStyles.knowledgeText}>
                Manual on Sexual Harassment of Women at Workplace (Prevention,
                Prohibition and Redressal) Act, 2013.
              </Text>
            </Pressable>
            <Pressable
              style={globalStyles.knowledgeContainer3}
              onPress={() => Linking.openURL('https://youtu.be/faq3CwJfdIY')}>
              <Image
                style={globalStyles.knowledgeImage}
                source={Image3}
                resizeMode="cover"></Image>
              <Text style={globalStyles.knowledgeText}>
                A video on Sexual Harassment at Workplace Act, 2013.
              </Text>
            </Pressable>
          </View>
        )}
      </Background>
    </ScrollView>
  );
};

export default KnowledgeBank;
