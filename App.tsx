import React, { useRef, useState, useEffect } from 'react';
import {
  SafeAreaView,
  useColorScheme
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { WebView } from 'react-native-webview';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const webViewRef = useRef<WebView>(null);

  const [key, setKey] = useState(0);

  const [uri, setUri] = useState('https://google.com');

  // Hack for iOS: rerender WebView to avoid input stuck when searching
  useEffect(() => {
    setTimeout(() => {
      if (key === 0) {
        setKey(key + 1)
      }
    }, 0)
  });

  return (
    <SafeAreaView style={backgroundStyle}>
      <WebView
        key={key}
        ref={webViewRef}
        source={{ uri }}
        javaScriptEnabled={true}
        decelerationRate="normal"
      />
    </SafeAreaView>
  );
}

export default App;