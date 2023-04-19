import TrackPlayer, { Capability, Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player';

const setUpPlayer = async (arr) => {
    try {
        await TrackPlayer.setupPlayer();
        TrackPlayer.updateOptions({
            // Media controls capabilities
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop,
            ],
            // Capabilities that will show up when the notification is in the compact form on Android
            // , Capability.SeekTo, Capability.Like, Capability.Stop, Capability.SeekTo, Capability.SkipToPrevious, Capability.SkipToNext, Capability.SkipToPrevious, Capability.JumpForward
            compactCapabilities: [Capability.Play, Capability.Pause],
        });
        await TrackPlayer.reset();
        await TrackPlayer.add(arr);
    } catch (error) {
        console.log("error in setUpPlayer -----", error);
    }
}


export default setUpPlayer;