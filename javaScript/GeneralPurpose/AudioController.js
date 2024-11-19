class AudioController
{
    constructor(audioInstance)
    {
        this.audioInstance = audioInstance;
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

}