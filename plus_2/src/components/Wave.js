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
  Easing,
  TouchableOpacity,
  Dimensions,
  Modal,

} from 'react-native';

const Wave = ({started}) => {
  const dot = ['·', '·', '·', '·', '·', '·']
  //텍스트 에니메에션 초기값 설정 및 시퀀스 만들기
  let animationDot = []
  let animationStylesDot = []
  let sequenceArray = []
  let animationFuncArray = []

  dot.map((item, index) => {
    animationDot[index] = new Animated.Value(0)
    animationStylesDot[index] = {
      translateY: animationDot[index]
    }

    sequenceArray[index] = () => {
      Animated.sequence([
        Animated.timing(
          animationDot[index],
          {
            toValue: -10,
            duration: 400,
            useNativeDriver: true,
          }
        ),
        Animated.timing(
          animationDot[index],
          {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }
        ),
      ]).start(() => {
        if (started) sequenceArray[index]()
        else { return }
        
      }


      )
    }

  })
  // useEffect(()=>{
  //   while(true){
  //     let offset=0
  //     setTimeout(()=>{
  //       loopItem()

  //     },1000+offset);
  //     offset+=1000
  //   }
    
  // })

const loopItem=()=>{
  let offset = 0;
  sequenceArray.map((item, index) => {
    setTimeout(() => {
      sequenceArray[index]()
    }, 100 + offset);
    offset += 100;
  })
}
// useEffect(()=>{
// },[started])
  
loopItem()


  return (
    <View style={styles.wave}>
      {dot.map((item, index) =>
        <>
          <Animated.View key={index} style={animationStylesDot[index]}>
            <Text style={{ fontSize: 50,color:'#fff' }}>{item}</Text>
          </Animated.View>

        </>
      )}

    </View>

  );
};

const styles = StyleSheet.create({
    wave:{
      flexDirection: 'row',
      position:'absolute',
      bottom:-13,
  },


});

export default Wave;
