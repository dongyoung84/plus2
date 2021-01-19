import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContext, NavigationRouteContext, useFocusEffect, useIsFocused } from '@react-navigation/native';

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
  BackHandler,

} from 'react-native';
import socketio from 'socket.io-client';
import Header from '../components/Header'
import TextFadeIn from '../components/TextFadeIn'
import { BoxShadow } from 'react-native-shadow'
import Voice from '../components/VoiceComponent';
import VoiceComponent from '../components/VoiceComponent';
import { useImmer } from "use-immer";
import LinearGradient from 'react-native-linear-gradient';

// const barWidth = [randNum(), randNum(), randNum()]
let socket;
const MainScreen = ({ navigation }) => {
  const [botIndex, setBotIndex] = useState(0)
  const [stateCheck, setStateCheck] = useState(1)
  const botData = [
    //0
    {
      text: '안녕하세요~ 저녁 식사 하실 곳 찾으시나요?',
      restaurant: []
    },
    //1
    {
      text: '네~가까운 곳으로 한번 추천해 볼게요. 여긴 어때요?',
      restaurant: [
      { name: '스펠바운드', category: '양식', address: '대구 복현동 153', src: require('../../assets/1.jpg') },
      { name: '에그베리', category: '양식', address: '대구 대현동 657-1', src: require('../../assets/2.jpg') },
      { name: '라마앤바바나', category: '인도음식', address: '대구 복현동 33-1', src: require('../../assets/6.jpg') }
    ]
    },
    //2
    {
      text: '아~그럼 여긴 어떤가요? 차타고 5분 거리네요.',
      restaurant: [{ name: '용지봉', category: '한식', address: '대구 수성구 상동 77-2', src: require('../../assets/3.jpg') }]
    },
    //3
    {
      text: '비빔밥으로 유명한데, 갈비탕도 있어요. 괜찮으시면 예약 해드릴까요?',
      restaurant: [{category: '비빔밥 6000원', src: require('../../assets/4.jpg') }, {category: '갈비탕 8000원', src: require('../../assets/5.jpg') }]
    },
    //4
    {
      text: '일행은 몇 명인가요?',
      restaurant: []
    },
    //5
    {
      text: '네! 예약 해드렸습니다. 택시 불러드릴까요?',
      taxi: [{ fee: '예상 택시비 약 5000원', src: require('../../assets/map.png') }]
    },
    //6
    {
      text: '네~택시를 불렀어요. 기사님이 연락 하실거에요.',
      taxi: [{ info: '마카롱택시 : 42소5432', phone: '기사님연락처 : 010-7653-9412' }]
    },
    //7
    {
      text: '네~식사 맛있게 하세요.',
    },
    //8
    {
      text: '네~주차 시설이 완비 되어 있어요.'
    },
  ]




  return (
    <>

      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Header />
        <LinearGradient colors={['#ddd', '#fff', '#fff']} style={styles.linearGradient}>
          {/* {/* <Image style={styles.burger} source ={require('../../assets/burger.png')}/> */}
        {/* <Image style={styles.pizza} source ={require('../../assets/pizza.png')}/> */}

          <View style={styles.top}>
            <TextFadeIn botData={botData[botIndex]} stateCheck={stateCheck} />
          </View>
          <View style={styles.bottom}>
            {/* <TouchableOpacity onPress={(e)=>{setStateCheck(stateCheck+1); setBotIndex[botIndex+1]}}>
            <Text>고고</Text>
          </TouchableOpacity> */}
            <VoiceComponent setBotIndex={setBotIndex} stateCheck={stateCheck} setStateCheck={setStateCheck} />
          </View>
        </LinearGradient>
      </SafeAreaView>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  top: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  botText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold'
  },
  burger: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    position: 'absolute',
    top: 30,
    right: 100,
    transform: [{ rotate: '40deg' }],
    opacity: 0.8
  },
  pizza: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    position: 'absolute',
    top: 20,
    left: 10,
    transform: [{ rotate: '270deg' }],
    opacity: 0.5
  }
})

export default MainScreen;
