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

import { Icon } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import { useImmer } from "use-immer";

const TextFadeIn = ({ botData, stateCheck }) => {


  // const [botImage, setBotImage]=useImmer('')
  // setBotImage(botData.image)
  let botTextSplit = [...botData.text]
  console.log(botTextSplit)
  //텍스트 에니메이션 변수 세팅
  let animationStylesTextFadeIn = []
  let animationTextFadeIn = []
  let sequenceArray = []

  //텍스트 에니메에션 초기값 설정 및 시퀀스 만들기
  //기존 sequence의 하나가 끝나면 시작되어야 하므로, 이전에니메이션이 완전히 끝나지 않은 상태에서는 다음을 진행 할 수 없다.
  //부드럽게 하려면 너무 느리고, 빠르게하면 fadein 효과가 줄어든다.
  //에니메이션패러럴로 동시에 시작 하되 각에니메이션에 딜레이를 주어 실행하여 부드럽게 진행됨.
  //
  let offset=0
  botTextSplit.map((item, index) => {

    animationTextFadeIn[index] = new Animated.Value(0)
    animationStylesTextFadeIn[index] = {
      opacity: animationTextFadeIn[index]
    }
    let sequenceTemp = Animated.timing(
      animationTextFadeIn[index],
      {
        toValue: 1,
        duration: 500,
        delay:offset,
        useNativeDriver: true,
      }
    )
    offset +=80
    //let sequenceDelay = Animated.delay(-500)
    sequenceArray.push(sequenceTemp)
    //sequenceArray.push(sequenceDelay)

  })

  const fadeIn = () => {
    // Animated.sequence(
    //   sequenceArray
    // ).start(() => {
    //   imageStart()
    // })
    Animated.parallel(
      sequenceArray
    ).start(() => {
      infoStart()
    })
  }

  fadeIn()


  //info 에니메이션 변수 세팅
  const animationInfo = new Animated.Value(0)
  const animationStylesInfo = {
    opacity: animationInfo
  }
  const infoStart = () => {
    Animated.timing(
      animationInfo,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start()
  }
  return (
    <>
      <View style={styles.top}>
        <View style={styles.textContainer}>
          {botTextSplit.length > 0 && botTextSplit.map((item, index) => {
            if (index + 1 == botTextSplit.length) { console.log('완료') }

            return (
              <>
                <Animated.Text key={item} style={[styles.botText, animationStylesTextFadeIn[index]]}>{item}</Animated.Text>
              </>
            )
          })}
          {/* <Text>stateCheck:{stateCheck}</Text> */}

        </View>
      </View>
      {/* <Animated.Image style={[styles.image]} source={botImage[0]} ></Animated.Image> */}

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.bottom}>
        {botData.restaurant && botData.restaurant.map((item, index) => (
          <Animated.View key={item.name} style={[styles.imageContainer, animationStylesInfo]}>
            {item.src && <Image style={styles.image} source={item.src} />}
            <View style={{ justifyContent: 'flex-start', paddingLeft: 10 }}>
              <Text style={styles.imageName}>{item.name}</Text>
              <Text style={styles.imageInfo}>{item.category}</Text>
              <Text style={styles.imageInfo}>{item.address}</Text>
            </View>

          </Animated.View>
        )

        )}
        {botData.taxi && botData.taxi.map((item, index) => (
          <Animated.View key={item.name} style={[styles.imageContainer, animationStylesInfo]}>
            {item.src && <Image style={styles.image} source={item.src} />}
            <Text style={styles.imageInfo}>{item.fee}</Text>
            <Text style={styles.imageInfo}>{item.info}</Text>
            <Text style={styles.imageInfo}>{item.phone}</Text>
          </Animated.View>

        )
        )}
        {/* <Animated.Text style={[styles.botText, animationStylesImage]}>여긴 어때요?</Animated.Text> */}
      </ScrollView>

    </>
  );
};

const styles = StyleSheet.create({
  top: {
    flex: 0.8,
    justifyContent: 'flex-end'
  },
  bottom: {
    flex: 1.2,
  },
  textContainer: {
    flexDirection: 'row',
    width: '75%',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  botText: {
    fontSize: 30,
    color: '#333',
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 180,
    resizeMode: 'cover',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 20,
    elevation: 5,
  },
  imageContainer: {
    alignItems: 'flex-start',
    margin: 10,
  },
  imageName: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 20,
    // position: 'absolute',
    // top: 120,
  }


});

export default TextFadeIn;
