import TrackPlayer, {Event} from 'react-native-track-player';

export default async function service() {

    try {
        TrackPlayer.addEventListener(Event.RemotePause, () => {
            TrackPlayer.pause();
        });

        TrackPlayer.addEventListener(Event.RemotePlay, () => {
            TrackPlayer.play();
        });

        TrackPlayer.addEventListener(Event.RemoteNext, () => {
            TrackPlayer.skipToNext();
        });

        TrackPlayer.addEventListener(Event.RemotePrevious, () => {
            TrackPlayer.skipToPrevious();
        });
    }
    catch (error) {
        console.log(error);
    }

}