import 'react-native-gesture-handler';
import './i18n';
// import { enableScreens } from 'react-native-screens';
import { AppRegistry, FlatList, Text, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DEVICE_ANDROID } from 'src/utils/deviceConstants.ts';
import App from './App.tsx';
import AppConfig from './app.json';

// detox e2e tests fail when yellowboxes come up
console.disableYellowBox = true;

// remove setting a timer warning
if (__DEV__) {
  const _ = require('lodash');
  const _console = _.clone(console);
  console.warn = (message) => {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  };
}

// enable react-native-screens
// enableScreens is causing some android devices to crash
// enable screens might be causing ios swipe navigation to freeze
// enableScreens();

// Bootstrap fonts
Ionicons.loadFont();
SimpleLineIcons.loadFont();
MaterialCommunityIcons.loadFont();
Octicons.loadFont();
AntDesign.loadFont();
MaterialIcons.loadFont();

// Fix Font Scaling

Text.defaultProps = Text.defaultProps || {};

Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};

TextInput.defaultProps.allowFontScaling = false;

FlatList.defaultProps = FlatList.defaultProps || {};

FlatList.defaultProps.windowSize = DEVICE_ANDROID ? 5 : 10;

FlatList.defaultProps.removeClippedSubviews = DEVICE_ANDROID;

AppRegistry.registerComponent(AppConfig.name, () => App);
AppRegistry.runApplication(AppConfig.name, {
  rootTag: document.getElementById(`root`),
});
