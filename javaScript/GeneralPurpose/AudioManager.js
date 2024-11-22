class AudioManager
{
    constructor(masterVolume = 0.65, sfxVolume = 0.65, musicVolume = 0.65)
    {
        this.MasterVolume = masterVolume;
        this.SFXVolume = sfxVolume;
        this.MusicVolume = musicVolume;
        this.activeScene;

        //#region SingleTon Pattern
        if (typeof AudioManager.Instance === "object")
        {
            return AudioManager.Instance;
        }

        AudioManager.Instance = this;
        return this;
        //#endregion
    }

    SetActiveScene(scene, deleteInstances = true)
    {
        if (this.activeScene != null && deleteInstances)
        {
            this.activeScene.sound.removeAll();
        }

        this.activeScene = scene;
    }

    // Destroy all the instances of a scene, default value active scene
    DestroySceneInstances(scene = this.activeScene)
    {
        scene.sound.removeAll();
    }

    // Get all the audioInstances of a scene, defualt value active scene
    GetSceneInstances(scene = this.activeScene)
    {
        return scene.sound.getAll();
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

        this.activeScene.sound.play(soundKey, config);
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

        var audioController = new AudioController(this.activeScene.sound.add(soundKey, config));
        audioController.Play();

        return audioController;
    }

    CreateInstance(soundKey, channel, callbackType, callback)
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

        var audioController = new AudioController(this.activeScene.sound.add(soundKey, config));
        audioController.audioInstance.on(callbackType, callback);
        return audioController;
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