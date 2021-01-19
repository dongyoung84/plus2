/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { Provider as PaperProvider } from 'react-native-paper';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MainNavigation from './src/navigation/MainNavigation';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content" />
       <PaperProvider>
          <MainNavigation />
        </PaperProvider>

    </>
  )
};


export default App;
