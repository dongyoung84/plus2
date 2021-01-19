import { NavigationContext, NavigationRouteContext, useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions,
  Modal,

} from 'react-native';

import { useImmer } from "use-immer";
import Voice from '@react-native-community/voice';
import Wave from './Wave'
const VoiceComponent = ({ setBotIndex, stateCheck, setStateCheck }) => {
  const [text, setText] = useImmer({ value: '' });
  const [volume, setVolume] = useState('')
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    //Setting callbacks for the process status
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
    startRecognizing()

    return () => {
      //destroy the process after switching the screen
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e) => {
    //Invoked when .start() is called without error
    console.log('onSpeechStart: ', e);
    setStarted(true);
  };

  const onSpeechEnd = (e) => {
    //Invoked when SpeechRecognizer stops recognition
    console.log('onSpeechEnd: ', e);

  };

  const onSpeechError = (e) => {
    //Invoked when an error occurs.
    console.log('onSpeechError: ', e);
    // showMessage({
    //     message: JSON.stringify(e.error),
    //     type: "default",
    //     backgroundColor: "#ddd", // background color
    //     color: "#333", // text color
    // });
    console.log(JSON.stringify(e.error))
    // if (e.error.message.toLowerCase().indexOf('match') != -1)
      setStarted(false);
      startRecognizing();
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e) => {
    //Invoked when SpeechRecognizer is finished recognizing
    console.log('onSpeechResults: ', e);

    // showMessage({
    //   message: e.value[0],
    //   type: "default",
    //   backgroundColor: "#97B5D1", // background color
    //   color: "#333", // text color
    //   position:'top',
    //   floating:true,
    //   elevation: 5,
    // });

    setText(draft => {
      draft.value = e.value[0];
    })
    startRecognizing();
  };

  const onSpeechPartialResults = (e) => {
    //Invoked when any results are computed
    console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = (e) => {
    //Invoked when pitch that is recognized changed
    // console.log('onSpeechVolumeChanged: ', e);
    // setPitch(e.value);
  };

  const startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    try {
      // let speechToTextData = await SpeechToText.startSpeech('Try saying something', 'ko-KR');
      // console.log('speechToTextData: ', speechToTextData)

      // setText(draft => {
      //   draft.value = '';
      // })
      await Voice.start('ko-KR');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const stopRecognizing = async (e) => {
    //Stops listening for speech
    try {
      await Voice.cancel();
      // await Voice.stop();
      setStarted(false);
      setText(draft => {
        draft.value = '';
      })
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };
  const cancelRecognizing = async () => {
    //Cancels the speech recognition
    try {
      await Voice.cancel();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };
  //////////////////////////////////////animation
  const animationBounce = new Animated.Value(1)
  const animationStylesBounce = {
    transform: [
      { scale: animationBounce }
    ]
  };

  const bounceLoop = () => {
    Animated.sequence([
      Animated.timing(
        animationBounce,
        {
          toValue: 1.05,
          duration: 300,
          useNativeDriver: true,
        }
      ),
      Animated.timing(
        animationBounce,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }
      ),
    ]).start(() => {
      if (started) bounceLoop()
      else { return }
    })
  }

// 바운스 시작
 //bounceLoop()


  useEffect(()=>{
    if ((text.value.indexOf('어') != -1 || text.value.indexOf('추천') != -1) && stateCheck==1) {
      setBotIndex(1)
      setStateCheck(2)
    }
    else if ((text.value.indexOf('한식') != -1 || text.value.indexOf('아니') != -1 || text.value.indexOf('말고') != -1) && stateCheck==2) {
      setBotIndex(2)
      setStateCheck(3)
    }
    else if ((text.value.indexOf('메뉴') != -1 || text.value.indexOf('뭐') != -1) && stateCheck==3) {
      setBotIndex(3)
      setStateCheck(4)
    }    
    else if ((text.value.indexOf('주차') != -1 || text.value.indexOf('되') != -1) && stateCheck==3) {
      setBotIndex(8)
      setStateCheck(4)
    }
    // else if ((text.value.indexOf('응') != -1 || text.value.indexOf('예약') != -1) && stateCheck==4) {
    else if ( text.value.indexOf('예약') != -1 && stateCheck==4 || stateCheck==3 ) {
      setBotIndex(4)
      setStateCheck(5)
    }
    else if ((text.value.indexOf('명') != -1 || text.value.indexOf('도착') != -1) && stateCheck==5) {
      setBotIndex(5)
      setStateCheck(6)
    }
    else if ((text.value.indexOf('어') != -1 || text.value.indexOf('불러') != -1) && stateCheck==6) {
      setBotIndex(6)
      setStateCheck(7)
    }
    else if ((text.value.indexOf('고생') != -1 || text.value.indexOf('수고') != -1 || text.value.indexOf('고마워') != -1) && stateCheck==7) {
      setBotIndex(7)
      setStateCheck(8)
    }
    else if ((text.value.indexOf('아니') != -1 || text.value.indexOf('됐어') != -1) && stateCheck==6) {
      setBotIndex(7)
      setStateCheck(7)
    }
    ///어떤 state에서도 실행
    else if ((text.value.indexOf('택시') != -1 || text.value.indexOf('불러줘') != -1)) {
      setBotIndex(6)
      setStateCheck(7)
    }
    else if ((text.value.indexOf('처음') != -1 || text.value.indexOf('돌아') != -1)) {
      setBotIndex(0)
      setStateCheck(1)
    }
  })
  return (
    <>


      <View style={styles.container}>

        {text.value?
        (
          <View style={styles.humanText}>
          <Text>{text.value}</Text>
          </View>
        ):
        (
          <View></View>

        )}


        <TouchableOpacity onPress={!started ? startRecognizing : stopRecognizing} style={styles.buttonContainer}>

          {started ? <>
            <Text style={styles.callText}>듣고 있어요.</Text>
          </>
            :
            <Text style={styles.callText}>마이크켜기.</Text>}
            <Animated.Image style={[styles.callImage, animationStylesBounce]} source={require('../../assets/voice3.png')} />
            <Wave started={started}/>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container:{
    justifyContent:'flex-end',
    position:'absolute',
    bottom:0,
    alignItems:'center'
  },
  buttonContainer:{
    alignItems:'center'
  },
  callImage: {
    width: 150,
    height: 75,
    resizeMode:'contain',
    marginBottom:-5,

  },
  callText:{
    color:'#fff',
    marginBottom:-40,
    zIndex:100,
  },
  humanText:{
    borderWidth:0.5,
    borderRadius:20,
    borderColor:'#ccc',
    //width:'80%',
    backgroundColor:'#fff',
    padding:5,
    paddingHorizontal:10,
    marginBottom:30,
  },

});

export default VoiceComponent;
