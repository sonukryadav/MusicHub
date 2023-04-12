import TrackPlayer from 'react-native-track-player';
import { PlaybackService } from "./Components/HelperFunctions/PlaybackService";

module.exports = async function () {
    TrackPlayer.registerPlaybackService(() => PlaybackService);
}