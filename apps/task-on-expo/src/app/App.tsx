import React from 'react';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview'; // WebView 추가

export default function App() {
  return Platform.OS === "web" ? (
    <iframe src="https://next-portfolio-awjaes-projects.vercel.app" height={'100%'} width={'100%'} />
  ) : (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          source={{ uri: 'https://next-portfolio-awjaes-projects.vercel.app' }} // 웹뷰로 URL 열기
          style={{ flex: 1 }} // 웹뷰 스타일 설정
        />
      </SafeAreaView>
    </>
  )
};