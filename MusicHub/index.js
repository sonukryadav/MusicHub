/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import { name as appName } from './app.json';
// import { PlaybackService } from "./Components/HelperFunctions/PlaybackService";
import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./service'));
// TrackPlayer.registerPlaybackService(() => PlaybackService);
