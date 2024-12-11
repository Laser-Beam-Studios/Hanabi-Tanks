class AudioController
{
    constructor(audioInstance, channel)
    {
        this.audioInstance = audioInstance;
        this.channel = channel;
    }

    Play()
    {
        this.audioInstance.play();
    }

    Stop()
    {
        this.audioInstance.stop();
    }

    Pause()
    {
        this.audioInstance.pause();
    }

    Resume()
    {
        this.audioInstance.resume();
    }

    SetVolume(value)
    {
        this.audioInstance.setVolume(value);
    }

    IsPlaying()
    {
        return this.audioInstance.isPlaying;
    }

    SetCallBack(callbackType, callback)
    {
        this.audioInstance.on(callbackType, callback);
    }

}