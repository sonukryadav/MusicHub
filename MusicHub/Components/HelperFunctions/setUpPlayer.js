import TrackPlayer, { Capability, Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents, AppKilledPlaybackBehavior } from 'react-native-track-player';

const setUpPlayer = async () => {
    try {
        await TrackPlayer.setupPlayer();
        TrackPlayer.updateOptions({

            android: {
                appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
            },
            // Media controls capabilities
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.SeekTo,
                Capability.Stop,
            ],
            // Capabilities that will show up when the notification is in the compact form on Android
            // , Capability.SeekTo, Capability.Like, Capability.Stop, Capability.SeekTo, Capability.SkipToPrevious, Capability.SkipToNext, Capability.SkipToPrevious, Capability.JumpForward
            // compactCapabilities: [Capability.Play, Capability.Pause],
            compactCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
            ],
            progressUpdateEventInterval: 2,
        });
        // await TrackPlayer.reset();
        // await TrackPlayer.add(arr);
    } catch (error) {
        console.log("error in setUpPlayer -----", error);
    }
}


export default setUpPlayer;