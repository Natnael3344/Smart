/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import * as RNLocalize from 'react-native-localize';

// Initialize React Native Localize
// RNLocalize.addEventListener('change', handleLocalizationChange);
// RNLocalize.init();

// Function to handle localization change
function handleLocalizationChange() {
  // Handle any necessary updates when the user's language preference changes
}
AppRegistry.registerComponent(appName, () => App);
