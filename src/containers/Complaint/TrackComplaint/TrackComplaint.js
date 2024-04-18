import {View, Text, Dimensions, Alert, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {connect, useSelector} from 'react-redux';
import TrackCustomCard from '../../../components/TrackCustomCard';
import globalStyles from '../../../assets/css/styles';
import Background from '../../../components/Background';
import {Modal, ScrollView, isEmptyObj} from 'native-base';
import {trackComplaintActions} from './TrackComplaintActions';
// import { PDFDocument, PDFText, PDFView } from 'react-native-pdf-lib';
import RNFS from 'react-native-fs';
import RNPrint from 'react-native-print';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import DownloadMessage from '../../../components/DownloadMessage';
import NoData from '../../../components/NoData';
import {ActivityIndicator} from 'react-native-paper';
import {COLOR} from '../../../constants/GlobalConstants';
import axios from 'axios';
// import RNFetchBlob from 'rn-fetch-blob';
const {width, height} = Dimensions.get('window');

class TrackScreen extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      pdfFilePath: '',
      case_id: '',
      complaints: [],
      loader: false,
      filteredComplaints: [],
    };
  }
  handleChange = (e) => {
    const { complaints } = this.state;
    const { value } = e.target;
    this.setState({ case_id: value });

    const temp = complaints.filter((c) =>
      c.case_id.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({ filteredComplaints: temp });
  };
  
 


  downloadReport = async  ({case_id}) => {
    
    let userDataSession = this.props.user;

    let data = {};

      let userData = userDataSession && userDataSession.data[0];
      data['user_id'] = userData?.user_id;
      data['token'] = userData?.token;
    this.setState({ loader: true });
   
    const user_id = data['user_id'] ;
    const token = data['token'];

    try {
      const response = await axios.post(
        'https://backoffice.myambar.org/api/download-complaint-receipt',
        {
          user_id,
          token,
          case_id,
        }
      );

      const url = response.data;
      if (!url) {
        Alert.alert('Unable to download receipt');
      } else {
        const { dirs } = RNFetchBlob.fs;
        const path = `${dirs.DownloadDir}/complaint_receipt.pdf`;

        await RNFetchBlob.config({
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            title: 'Complaint Receipt',
            description: 'Downloading receipt...',
            path,
          },
        }).fetch('GET', url).progress((received, total) => {
          // Progress callback
          const progress = received / total;
          // Update progress if needed
        });
        
        this.setState({ 
          isModalVisible: true,
          pdfFilePath: path,
          loader: false });
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  toggleModal = () => {
    this.setState(prevState => ({
      isModalVisible: !prevState.isModalVisible,
    }));
  };

  

  componentDidMount() {
    let userDataSession = this.props.user;

    let data = {};

    if (userDataSession?.data.length > 0) {
      let userData = userDataSession && userDataSession.data[0];
      data['user_id'] = userData?.user_id;
      data['token'] = userData?.token;
     
    }
    this.props.viewComplaintList(data);
    // data['user_id'] = 804;
    // data['token'] = 'R0VpNTBwSHF5a2VpVU42dEZDSkd5QW83cHo1ZUVnalk4UEV4SGVvcW5PNXdraWwzelNsZHpqWTlFajMzVmMxQ1IyQkV1QlJWb1VURnFUZk1rcjQyNlM0WHNWV09GWEo1Rzl6b1pkdHJReTBLVHpxN3pGcGtSVDRZc0V6WnJVM2g2Y2lFUHIxdXpBbTF0ZUhUVXpjNENV64a15c5f58243';
    
    const user_id = data['user_id'];
    const token = data['token'];

    axios
      .post('https://backoffice.myambar.org/api/complaint-details', {
        user_id,
        token,
      })
      .then((response) => {
        this.setState({ complaints: response.data?.data });
      })
      .catch((error) => {
        this.setState({ complaints: [] });
      });
  }

  render() {
    let complaintlist = this.props.complaintList;
    console.log("====complaintlist===",complaintlist);
    const { case_id, filteredComplaints, loader } = this.state;
    return (
      <Background showlogo={false} >
        {this.props.isLoading ? (
          <ActivityIndicator
            color={COLOR.BACKGROUND_COLOR}
            size="large"
            style={{marginTop: height / 2.5}}
          />
        ) : (
          <ScrollView
          
            contentContainerStyle={{justifyContent: 'flex-start'}}>
            {!isEmptyObj(complaintlist?.data) ? (
              complaintlist?.data.map((item, index) => {
                return (
                  <View style={globalStyles.trackContainer} key={"card-"+index}>
                    <TrackCustomCard
                      key={index}
                      item={item}
                      text={'Februry 3,2023'}
                      number={'jxjkdjcskc'}
                      gender={'female'}
                      name={'Priya Ashish'}
                      status={'Solved'}
                      age={'34'}
                      icon={'check-circle-outline'}
                      color={'green'}
                      onPress={() =>
                        this.downloadReport({
                          case_id: item?.case_id,
                        })
                      }
                    />
                  </View>
                );
              })
            ) : (
              <NoData message={complaintlist.message} />
            )}
            {this.state.isModalVisible && (
              <DownloadMessage
                isModalVisible={this.state.isModalVisible}
                toggleModal={this.toggleModal}
                fileName={this.state.pdfFilePath}
              />
            )}
            
            {loader && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLOR.BACKGROUND_COLOR} />
          <Text style={styles.loaderText}>Downloading...</Text>
        </View>
      )}
            
          </ScrollView>
        )}
      </Background>
    );
  }
}

const mapStateToPros = state => {
  return {
    complaintList: state.complaintList.list,
    isLoading: state.complaintList.isLoading,
    user: state.otp.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    viewComplaintList: data =>
      dispatch(trackComplaintActions.viewComplaintList(data)),
    unload: () => dispatch(trackComplaintActions.unload()),
  };
};

TrackScreen = connect(mapStateToPros, mapDispatchToProps)(TrackScreen);

export default TrackScreen;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black'
  },
});
