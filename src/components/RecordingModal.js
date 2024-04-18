import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,Dimensions, Platform, PermissionsAndroid
} from 'react-native';
import Slider from 'react-native-slider';
import React, {useState,useRef, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import globalStyles from '../assets/css/styles';
import { COLOR, globalConstants } from '../constants/GlobalConstants';
import Sound from 'react-native-sound';
import * as Progress from 'react-native-progress';
import AudioRecorderPlayer, {
AudioEncoderAndroidType,
AudioSourceAndroidType,
AVEncoderAudioQualityIOSType,
AVEncodingOption,
OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
// import RNFetchBlob from 'rn-fetch-blob';
const audioSet = {
AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
AudioSourceAndroid: AudioSourceAndroidType.MIC,
AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
AVNumberOfChannelsKeyIOS: 2,
AVFormatIDKeyIOS: AVEncodingOption.aac,
OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
};
import { useSelector } from 'react-redux';
import en from '../../locales/en.json';
import hi from '../../locales/hi.json';
import { getLanguage } from '../translations/languageSelector';

const audioRecorderPlayer = new AudioRecorderPlayer();
const RecordingModal = ({isModalVisible,toggleModal, count, handleStop }) => {
  const language = useSelector(getLanguage);
  let translations;
  if (language.language === 'en') {
    translations = en;
  } else {
    translations = hi;
  }
  const [progress, setProgress] = useState(0);
const [isRecording, setIsRecording] = useState(false);
const [isPlaying, setIsPlaying] = useState(false);
const [recording, setRecording] = useState(false);
const [duration, setDuration] = useState(0);
const [audioPath, setAudioPath] = useState('');
const [isSaved, setIsSaved] = useState(false);
const audioPlayer = useRef(null);
const [currentTime, setCurrentTime] = useState(0);
const [playbackInterval, setPlaybackInterval] = useState(null);
// const path = `${RNFS.ExternalDirectoryPath}/audio.mp4`;
const [audioURL, setAudioURL] = useState('');
const recorder = useRef(null);
const chunks = useRef([]);
const [recordSecs, setRecordSecs] = useState(0);
const [recordTime, setRecordTime] = useState('00:00:00');
const [currentPositionSec, setCurrentPositionSec] = useState(0);
const [currentDurationSec, setCurrentDurationSec] = useState(0);
const [playTime, setPlayTime] = useState('00:00:00');
const [timerInterval, setTimerInterval] = useState(null);
// const [duration, setDuration] = useState('00:00:00');
const [playWidth, setPlayWidth] = useState(0);
useEffect(() => {
  if (recording) {
    // Start the recording duration timer
    const interval = setInterval(() => {
      setDuration(prevDuration => prevDuration + 1);
    }, 1000);

    setTimerInterval(interval);
  } else {
    // Stop the recording duration timer
    clearInterval(timerInterval);
    setDuration(0);
  }

  return () => {
    // Clean up the timer interval on unmount or when recording state changes
    clearInterval(timerInterval);
  };
}, [recording]);

const formatDuration = () => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const path = Platform.select({
  ios: undefined,
  android: undefined,
  // ios: 'https://firebasestorage.googleapis.com/v0/b/cooni-ebee8.appspot.com/o/test-audio.mp3?alt=media&token=d05a2150-2e52-4a2e-9c8c-d906450be20b',
  // ios: 'https://staging.media.ensembl.fr/original/uploads/26403543-c7d0-4d44-82c2-eb8364c614d0',
  // ios: 'hello.m4a',
  // android: `${this.dirs.CacheDir}/hello.mp3`,
});


audioRecorderPlayer.setSubscriptionDuration(0.1); // optional. Default is 0.5


const onStartRecord = async () => {
  if (Platform.OS === 'android') {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      console.log('write external storage', grants);

      if (
        grants['android.permission.WRITE_EXTERNAL_STORAGE'] === 'never_ask_again' &&
        grants['android.permission.READ_EXTERNAL_STORAGE'] === 'never_ask_again' &&
        grants['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
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
  setRecording(true);
  

  console.log('audioSet', audioSet);

  const uri = await audioRecorderPlayer.startRecorder(path, audioSet);

  audioRecorderPlayer.addRecordBackListener(e => {
    console.log('Recording . . . ', e.currentPosition);
    
     return;
    });
  console.log(`uri: ${uri}`);
};



 const onStopRecord = async () => {
  setRecording(false);
  const result = await audioRecorderPlayer.stopRecorder();
  audioRecorderPlayer.removeRecordBackListener();
  
  console.log('test');
  
  setRecordSecs(0);

  const audioData = await RNFetchBlob.fs.readFile(result, 'base64');
  setAudioPath(result)
  handleStop(result);
};

const onStartPlay = async () => {
  console.log('onStartPlay', audioPath);
  if (audioPath) {
    const sound = new Sound(audioPath, '', error => {
      setDuration(sound.getDuration());
      setIsPlaying(true);
      console.log('Duration',duration)
      const interval = setInterval(() => {
        sound.getCurrentTime(seconds => {
          setCurrentTime(Math.floor(seconds));
        });
      }, 1000);
      setPlaybackInterval(interval);
      if (error) {
        console.log('Error loading audio:', error);
      } else {
        audioPlayer.current = sound;
        audioPlayer.current.play(success => {
          
          if (success) {
            setIsPlaying(false);
            console.log('Finished playing audio');
            setCurrentTime(0);
          } else {
            console.log('Error playing audio');
          }
        });
        
      }
    });
    
  }
 
};

useEffect(() => {
  if (audioPath) {
    const sound = new Sound(audioPath, '', error => {
      if (error) {
        console.log('Error loading audio:', error);
      } else {
        setDuration(Math.floor(sound.getDuration()));
        
      }
    });
    return () => {
      sound.release();
    };
  }
}, [audioPath]);


useEffect(() => {
  if (isPlaying) {
    // Start the audio duration timer
    const interval = setInterval(() => {
      audioPlayer.current.getCurrentTime((seconds, isPlaying) => {
        if (isPlaying) {
          setCurrentTime(Math.floor(seconds));
        }
      });
    }, 1000);

    setTimerInterval(interval);
  } else {
    // Stop the audio duration timer
    clearInterval(timerInterval);
    setCurrentTime(0);
  }

  return () => {
    // Clean up the timer interval on unmount or when playing state changes
    clearInterval(timerInterval);
  };
}, [isPlaying]);

const formatPlay = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
const onStopPlay = () => {
  setIsPlaying(false);
  setCurrentTime(0);
};

let calculatedPlayWidth = (currentPositionSec / currentDurationSec) * (Dimensions.get('window').width - 56);
if (!calculatedPlayWidth) {
  calculatedPlayWidth = 0;
}



const handleSliderChange = (value) => {
  setProgress(value);
};



const renderProgressBar = () => {
  if (duration === 0) {
    return null;
  }

  const progress = currentTime / duration; 
  const progressBarWidth = Dimensions.get('window').width - 150;
  console.log(currentTime);
  console.log(progress);
  return (
    <View>
      <Progress.Bar
        style={{marginLeft: 8}}
        progress={progress}
        width={progressBarWidth}
        color={COLOR.BACKGROUND_COLOR}
        unfilledColor={'white'}
        animated={isPlaying}
      />
    </View>
  );
};
return (
  <Modal isVisible={isModalVisible} >
    <View style={styles.container}>
  <TouchableOpacity onPress={toggleModal}>
          <Text style={styles.closeButtonText}>{translations.close}</Text>
  </TouchableOpacity>
    {!recording ? (
      <TouchableOpacity onPress={onStartRecord}>
        <Text style={{color:'black'}}>{translations.start}</Text>
      </TouchableOpacity>
    ) : (
      <View>
        <TouchableOpacity onPress={onStopRecord}>
          <Text style={{color:'black'}}>{translations.stop}</Text>
        </TouchableOpacity>
        <Text>{formatDuration()}</Text>
      </View>
    )}
    
    {audioPath && (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={onStartPlay}>
              <MaterialCommunityIcons
                name="play"
                size={35}
                color={'black'}
              />
            </TouchableOpacity>
            <Text style={{ marginLeft: 10, fontSize: 17, color: 'black' }}>{formatPlay(Math.floor(duration - currentTime))}</Text>
            {renderProgressBar()}
          </View>
          <TouchableOpacity onPress={onStopPlay}>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 17,
                color: COLOR.BACKGROUND_COLOR,
              }}>
              {translations.stopAudio}
            </Text>
          </TouchableOpacity>
        
        </>
      )}
  </View>
</Modal>
)
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 30,
    
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    alignSelf:'flex-end'
  },
});
export default RecordingModal