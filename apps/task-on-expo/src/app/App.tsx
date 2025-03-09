import React from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview'; // WebView 추가

export default function App() {
  return Platform.OS === 'web' ? (
    <iframe src="http://localhost:3000/" height={'100%'} width={'100%'} />
  ) : (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          source={{ uri: 'http://localhost:3000/' }}
          style={{ flex: 1 }}
        />
      </SafeAreaView>
    </>
  )
};