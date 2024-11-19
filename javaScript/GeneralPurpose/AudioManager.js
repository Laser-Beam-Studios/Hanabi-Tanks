class AudioManager
{
    constructor(masterVolume = 0.65, sfxVolume = 0.65, musicVolume = 0.65)
    {
        this.MasterVolume = masterVolume;
        this.SFXVolume = sfxVolume;
        this.MusicVolume = musicVolume;

        //#region SingleTon Pattern
        if (typeof AudioManager.instance === "object")
        {
            return AudioManager.instance;
        }

        AudioManager.instance = this;
        return this;
        //#endregion
    }

    GetChannelVolume(channel)
    {
        switch(channel)
        {
            case "Master":
                return this.MasterVolume;
            case "SFX":
                return this.SFXVolume;
            case "Music":
                return this.MusicVolume;
            default:
                console.log("ERROR_IN_GET_THE_CHANNEL_VOLUME_UNKONW_CHANNEL: ", channel);
                return;
        }
    }

    // The sound and the channel with the sound is played
    PlayOneShoot(soundKey, channel)
    {
        var config = 
        {
            mute: false,
            volume: (channel == "Master")? this.MasterVolume : this.GetChannelVolume(channel) * this.MasterVolume,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0,
        }

        scene.sound.play(soundKey, config);
    }

    // Play a loop and return a controller of the instance of sound
    PlayLoop(soundKey, channel)
    {
        var config = 
        {
            mute: false,
            volume: (channel == "Master")? this.MasterVolume : this.GetChannelVolume(channel) * this.MasterVolume,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
        }

        var AudioController = new AudioController(scene.sound.add(soundKey, config));
        AudioController.Play();

        return AudioController;
    }

    SetVolume(value, channel)
    {
        switch(channel)
        {
            case "Master":
                this.MasterVolume = value;
            case "SFX":
                this.SFXVolume = value;
            case "Music":
                this.MusicVolume = value;
            default:
                console.log("ERROR_IN_SET_VOLUME_UNKONW_CHANNEL: ", channel);
                return;
        }
        // Change the volume for the instances of audio to the new value
        
    }

}