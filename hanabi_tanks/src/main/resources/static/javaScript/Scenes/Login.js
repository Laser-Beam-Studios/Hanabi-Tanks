class Login extends Phaser.Scene
{
    constructor() 
    {
        super({ key: 'Login' });

        this.musicController;
        this.songsParts = ["Tanks_Party_A", "Tanks_Party_B", "Tanks_Party_C", "Tanks_Party_D", "Tanks_Party_E"];
    }

    preload() 
    {
        this.load.image("MainMenuBackground", "../assets/UI/Screens/mainMenu.png")

        this.load.html("LoginDom", "../html/Login.html");
        
        // Song
        this.load.audio("Tanks_Party_A", "../assets/Audio/Music/TanksParty_PART_A.mp3");
        this.load.audio("Tanks_Party_B", "../assets/Audio/Music/TanksParty_PART_B.mp3");
        this.load.audio("Tanks_Party_C", "../assets/Audio/Music/TanksParty_PART_C.mp3");
        this.load.audio("Tanks_Party_D", "../assets/Audio/Music/TanksParty_PART_D.mp3");
        this.load.audio("Tanks_Party_E", "../assets/Audio/Music/TanksParty_PART_E.mp3");
    }

    create() 
    {
        AudioManager.Instance.SetActiveScene(this);

        if (this.musicController == null)
        {
            this.musicController = AudioManager.Instance.CreateInstance("Tanks_Party_A", "Music");
            this.musicController.Play();
        }
        this.musicController.SetCallBack("complete", this.OnMusicPartEnds.bind(this, "Tanks_Party_A"));


        const Background = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "MainMenuBackground");
        Scaler.ScaleToGameH(Background);

        const login = this.add.dom(WINDOW.WIDHT/2, WINDOW.HEIGHT/2).createFromCache("LoginDom");
        login.addListener("click");

        login.on("click", function(event)
        {
            if (event.target.name === 'loginButton')
            {
                const inputUsername = login.getChildByName("username").value;
                const inputPassword = login.getChildByName("password").value;

                //  Have they entered anything?
                if (inputUsername.value !== '' && inputPassword.value !== '')
                {    
                    const body = JSON.stringify({
                        username: inputUsername,
                        password: inputPassword,
                        numberOfVictories: 0,
                        lastSeen: 0
                    });
                    $.ajax({
                        type: "POST",
                        url: USERS_BASE_URL,
                        contentType: "application/json",
                        data: body,
                        success: (data, status) =>
                        {
                            console.log(data);
                            console.log(status);
                        },
                        dataType: "json"
                      });
                }
            }
        });
    }

    OnMusicPartEnds(last)
    {
        var lastIdx;
        for (var i = 0; i < this.songsParts.length; i++)
        {
            if(this.songsParts[i] == last) 
            {
                lastIdx = i;
                break;
            }
        }

        var randomPartIdx = Math.floor(Math.random() * this.songsParts.length);
        while(randomPartIdx == lastIdx)
        {
            randomPartIdx = Math.floor(Math.random() * this.songsParts.length);
        }
        
        this.musicController = AudioManager.Instance.CreateInstance(this.songsParts[randomPartIdx], "Music");
        this.musicController.SetCallBack("complete", this.OnMusicPartEnds.bind(this, this.songsParts[randomPartIdx]));
        this.musicController.Play();
    }


    update() 
    {

    }
}