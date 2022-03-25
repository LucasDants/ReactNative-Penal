import { useFonts, Roboto_700Bold, Roboto_400Regular } from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import React from 'react';
import {  StatusBar, View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { CrimeList } from './src/screens/CrimeList';
import theme from './src/theme';


export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })


  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <View style={{ flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ThemeProvider theme={theme}>
          <CrimeList />
      </ThemeProvider>
    </View>
  );
}

