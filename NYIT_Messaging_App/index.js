/**
 * @format
 */

import {AppRegistry} from 'react-native';
import MessagingPage from './MessagingPage';
import LoginPage from './LoginPage';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => LoginPage);
//AppRegistry.registerComponent(appName, () => MessagingPage);