import React, { Component } from 'react';
import { Button } from 'native-base';
import {
  Dimensions,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
// import RNFetchBlob from 'rn-fetch-blob';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import globalStyles from '../assets/css/styles';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455A64',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleTxt: {
    marginTop: 100,
    color: 'white',
    fontSize: 28,
  },
  viewRecorder: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
  },
  recordBtnWrapper: {
    flexDirection: 'row',
  },
  viewPlayer: {
    marginTop: 60,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  viewBarWrapper: {
    marginTop: 28,
    marginHorizontal: 28,
    alignSelf: 'stretch',
  },
  viewBar: {
    backgroundColor: '#ccc',
    height: 4,
    alignSelf: 'stretch',
  },
  viewBarPlay: {
    backgroundColor: 'white',
    height: 4,
    width: 0,
  },
  playStatusTxt: {
    marginTop: 8,
    color: '#ccc',
  },
  playBtnWrapper: {
    flexDirection: 'row',
    marginTop: 40,
  },
  btn: {
    borderColor: 'white',
    borderWidth: 1,
  },
  txt: {
    color: 'white',
    fontSize: 14,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  txtRecordCounter: {
    marginTop: 32,
    color: 'white',
    fontSize: 20,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
  txtCounter: {
    marginTop: 12,
    color: 'white',
    fontSize: 20,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
});

const screenWidth = Dimensions.get('screen').width;
const audioRecorderPlayer = new AudioRecorderPlayer();

class AudioRecorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      eventType:'start',
      eventaction : '',
      values: {
        // initial values
        description_of_camplaint: 'Audio Description is provided', // or any other initial value
      },
    };

    this.path = Platform.select({
      ios: undefined,
      android: undefined,
      // ios: 'https://firebasestorage.googleapis.com/v0/b/cooni-ebee8.appspot.com/o/test-audio.mp3?alt=media&token=d05a2150-2e52-4a2e-9c8c-d906450be20b',
      // ios: 'https://staging.media.ensembl.fr/original/uploads/26403543-c7d0-4d44-82c2-eb8364c614d0',
      // ios: 'hello.m4a',
      // android: `${this.dirs.CacheDir}/hello.mp3`,
    });

   // audioRecorderPlayer = new AudioRecorderPlayer();
     audioRecorderPlayer.setSubscriptionDuration(0.1); // optional. Default is 0.5
  }


  onStatusPress = (e) => {
    const touchX = e.nativeEvent.locationX;
   
    const playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth - 56);
   
    const currentPosition = Math.round(this.state.currentPositionSec);

    if (playWidth && playWidth < touchX) {
      const addSecs = Math.round(currentPosition + 1000);
      audioRecorderPlayer.seekToPlayer(addSecs);
    } else {
      const subSecs = Math.round(currentPosition - 1000);
      audioRecorderPlayer.seekToPlayer(subSecs);
      
    }
  };

  onStartRecord = async () => {
    
    this.setState({eventType : 'stop'});

    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

     

        if (
          (grants['android.permission.WRITE_EXTERNAL_STORAGE'] === 'never_ask_again' ||
    grants['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted') &&
  (grants['android.permission.READ_EXTERNAL_STORAGE'] === 'never_ask_again' ||
    grants['android.permission.READ_EXTERNAL_STORAGE'] === 'granted') &&
  (grants['android.permission.RECORD_AUDIO'] === 'never_ask_again' ||
    grants['android.permission.RECORD_AUDIO'] === 'granted')
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
    };

    

    const uri = await audioRecorderPlayer.startRecorder(this.path, audioSet);

    audioRecorderPlayer.addRecordBackListener((e) => {
      
     
      this.setState({
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      });
    });
    console.log(`uri: ${uri}`);
  };

  onPauseRecord = async () => {
    try {
      const r = await audioRecorderPlayer.pauseRecorder();
      console.log(r);
    } catch (err) {
      console.log('pauseRecord', err);
    }
  };

  onResumeRecord = async () => {
    await audioRecorderPlayer.resumeRecorder();
  };

  onStopRecord = async () => {
    this.setState({eventType : 'play'});

    const result = await audioRecorderPlayer.stopRecorder();

    
    this.state.values.description_of_camplaint='Audio Description is provided'
    audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
      playTime : '00:00:00',
      duration: this.state.recordTime,
      values:this.state.values
    });

   


    this.props.handleStop(result,this.state.recordTime,this.state.values);
   
  };

  onStartPlay = async () => {
  
    this.setState({eventType : 'play'});

    try {
      let pathnew = this.path;
      if(this.props.audioURL && this.state.eventType ==='start')
      {
        pathnew = this.props.audioURL;
      }
     

      const msg = await audioRecorderPlayer.startPlayer(pathnew);

      //? Default path
      // const msg = await audioRecorderPlayer.startPlayer();
      const volume = await audioRecorderPlayer.setVolume(1.0);
      
      audioRecorderPlayer.addPlayBackListener((e) => {
       
        this.setState({
          currentPositionSec: e.currentPosition,
          currentDurationSec: e.duration,
          playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
          duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
        });
      });
    } catch (err) {
      console.log('startPlayer error', err);
    }
  };

  onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  onResumePlay = async () => {
    await audioRecorderPlayer.resumePlayer();
  };

  onStopPlay = async () => {
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();


  };

  onDeleteRecording = async () => {
    
    this.setState({eventType : 'start',eventaction : 'delete'});

    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    audioRecorderPlayer.removeRecordBackListener();
    this.props.handleStop(null,'00:00:00','audioDelete');

  };

  
  
  renderAudioRecordingStartUI = () => {
    return(
      <>
      <TouchableOpacity  onPress={this.onStartRecord}>
        <MaterialCommunityIcons
          name="microphone-plus"
          size={45}
          color="#6491d2"
          style={globalStyles.descriptionIcon}
        />
        </TouchableOpacity>
        <Text style={globalStyles.complaintText}>Add Audio Recording</Text>
      </>
    );
}

renderAudioRecordingStopUI = () => {
     return(
      <>
       <Text style={globalStyles.complaintText}>On Recording</Text>
              <Text style={globalStyles.complaintText}></Text>
              <Text style={globalStyles.complaintText}>{this.state.recordTime}</Text>
              <Text style={globalStyles.complaintText}></Text>
              <TouchableOpacity onPress={this.onStopRecord} >
            <MaterialCommunityIcons
              name="stop-circle"
              size={45}
              color="#6491d2"
              style={globalStyles.descriptionIcon}
            />
            </TouchableOpacity>
      </>
     )
}

renderAudioRecordingPlayUI = () => {
  let duration = this.state.duration;
if(this.props.audioURL && this.state.eventType ==='start')
{
  duration = this.props.audioDuration;
}
  return(
   <>
    <Text style={globalStyles.complaintText}>Recorded</Text>
           <Text style={globalStyles.complaintText}></Text>
           <Text style={globalStyles.complaintText}>  {this.state.playTime} / {duration}</Text>
           <Text style={globalStyles.complaintText}></Text>
           <TouchableOpacity  onPress={this.onStartPlay}>
         <MaterialCommunityIcons
           name="play-circle"
           size={45}
           color="#6491d2"
           style={globalStyles.descriptionIcon}
         />
        </TouchableOpacity>

        <TouchableOpacity  onPress={this.onDeleteRecording} style={{position : 'absolute', bottom:15, right : 15}}>
         <MaterialCommunityIcons
           name="delete"
           size={20}
           color="red"
           style={globalStyles.descriptionIcon}
         />
           </TouchableOpacity>
   </>
  )
}

render(){
   return(
    <>
    {this.state.eventType === 'start' && (this.props.audioURL == '') && this.renderAudioRecordingStartUI()}
    {this.state.eventType === 'stop' && this.renderAudioRecordingStopUI()}
    {(this.state.eventType === 'play' || this.props.audioURL != '') && this.renderAudioRecordingPlayUI()}
    </>
  )
}
  render12() {
    let playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth - 56);

    if (!playWidth) {
      playWidth = 0;
    }

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleTxt}>Audio Recorder Player</Text>
        <Text style={styles.txtRecordCounter}>{this.state.recordTime}</Text>
        <View style={styles.viewRecorder}>
          <View style={styles.recordBtnWrapper}>
            <Button
              style={styles.btn}
              onPress={this.onStartRecord}
              textStyle={styles.txt}>
              Record
            </Button>
            <Button
              style={[styles.btn, { marginLeft: 12 }]}
              onPress={this.onPauseRecord}
              textStyle={styles.txt}>
              Pause
            </Button>
            <Button
              style={[styles.btn, { marginLeft: 12 }]}
              onPress={this.onResumeRecord}
              textStyle={styles.txt}>
              Resume
            </Button>
            <Button
              style={[styles.btn, { marginLeft: 12 }]}
              onPress={this.onStopRecord}
              textStyle={styles.txt}>
              Stop
            </Button>
          </View>
        </View>
        <View style={styles.viewPlayer}>
          <TouchableOpacity
            style={styles.viewBarWrapper}
            onPress={this.onStatusPress}>
            <View style={styles.viewBar}>
              <View style={[styles.viewBarPlay, { width: playWidth }]} />
            </View>
          </TouchableOpacity>
          <Text style={styles.txtCounter}>
            {this.state.playTime} / {this.state.duration}
          </Text>
          <View style={styles.playBtnWrapper}>
            <Button
              style={styles.btn}
              onPress={this.onStartPlay}
              textStyle={styles.txt}>
              Play
            </Button>
            <Button
              style={[styles.btn, { marginLeft: 12 }]}
              onPress={this.onPausePlay}
              textStyle={styles.txt}>
              Pause
            </Button>
            <Button
              style={[styles.btn, { marginLeft: 12 }]}
              onPress={this.onResumePlay}
              textStyle={styles.txt}>
              Resume
            </Button>
            <Button
              style={[styles.btn, { marginLeft: 12 }]}
              onPress={this.onStopPlay}
              textStyle={styles.txt}>
              Stop
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default AudioRecorder;
