# React-native WebView issue: Search input not working on https://google.com

Problem: When open https://google.com in WebView in iOS, search input is not working
Solution: rerender WebView by changing key property

## Steps to reproduce

1. Generate react-native project
```
$ npx @react-native-community/cli@15.0.1 init react_native_webview_issue --version 0.76.1
```

2. Add WebView
```
npm i --save react-native-webview@13.12.3
```

3. Change App.tsx to
```
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
```

4. Install pods for iOS
```
$ cd ios
$ bundle install
$ bundle exec pod install
```

5. Run on iOS
```
npm run ios
```