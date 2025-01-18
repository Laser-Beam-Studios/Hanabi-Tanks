class ChatChill extends Phaser.Scene
{
    textsScale = 
    {
        "NumberOfUsers": 0.32
    }

    texts =
    {
        "NumberOfUsers": 
        { 
            pos: { x: 0.5, y: 0.98 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["NumberOfUsers"] / textDivider) + "px",
                color: blackColor
            } 
       }
    }


    constructor() 
    {
        super({ key: 'ChatChill' });

        this.musicController;
        this.songsParts = ["Tanks_Party_A", "Tanks_Party_B", "Tanks_Party_C", "Tanks_Party_D", "Tanks_Party_E"];

        this.connected;
        
        this.lastMessageId = 0;
        this.chatBox;
        this.messages;
        this.chatBoxDomElement;
        this.inputMessage;
        this.chatOpen = false;
        this.username;

        this.UpdateChatIntervalID;
        this.UpdateUsersIntervalID;

        this.numberOfUsersText;
        this.numberOfUsersTextConst;
    }

    init(data)
    {
        this.username = data.username;
    }

    preload()
    {
        this.load.html("ChatDom", "../html/Chat.html");

        // Connected and disconnected UI
        this.load.image("Connected", "../assets/activo.png");
        this.load.image("Disconnected", "../assets/desactivo.png");

        // Song
        this.load.audio("Tanks_Party_A", "../assets/Audio/Music/TanksParty_PART_A.mp3");
        this.load.audio("Tanks_Party_B", "../assets/Audio/Music/TanksParty_PART_B.mp3");
        this.load.audio("Tanks_Party_C", "../assets/Audio/Music/TanksParty_PART_C.mp3");
        this.load.audio("Tanks_Party_D", "../assets/Audio/Music/TanksParty_PART_D.mp3");
        this.load.audio("Tanks_Party_E", "../assets/Audio/Music/TanksParty_PART_E.mp3");
    }

    create()
    {
        let THIS = this;

        WebFont.load({
            custom: {
                families: ["FontChild"], 
                urls: ["../../css/styles.css"]
            },
            active: () => {
                if (!LanguageManager.getInstance().hasData())
                {
                    //const enData = this.cache.json.get("localization_en");      
                    //const esData = this.cache.json.get("localization_es");
                    
                    //LanguageManager.getInstance().loadLanguage("english", enData);
                    //LanguageManager.getInstance().loadLanguage("español", esData);
            
                    this.textsGroup = {};
                    // Ejemplo de crear textos
                    Object.keys(this.texts).forEach((key) =>
                    {
                        this.textsGroup[key] = this.add.text(this.texts[key].pos.x * WINDOW.WIDHT, this.texts[key].pos.y * WINDOW.HEIGHT, LanguageManager.getInstance().getText("ChatChill", key), this.texts[key].style);
                        this.textsGroup[key].setOrigin(this.texts[key].center.x, this.texts[key].center.y);
                        this.textsGroup[key].rotation = this.texts[key].rotation;
                        //Scaler.ScaleToGameW(this.textsGroup[key], texts[key].scale / 7.0)
                    });
                    LanguageManager.getInstance().onLanguageChanged("ChatChill", () =>
                    {
                        Object.keys(this.textsGroup).forEach((key) =>
                        {
                            this.textsGroup[key].text = LanguageManager.getInstance().getText("ChatChill", key);
                        });
                    });

                    THIS.numberOfUsersText = this.textsGroup["NumberOfUsers"];
                    THIS.numberOfUsersTextConst = THIS.numberOfUsersText._text.repeat(1);


                    this.events.once("shutdown", () =>
                        {
                            LanguageManager.getInstance().desubscribe("ChatChill");
                        });
                    }
                }
            });


        // AUDIO
        AudioManager.Instance.SetActiveScene(this);

        this.musicController = AudioManager.Instance.CreateInstance("Tanks_Party_A", "Music");
        this.musicController.Play();
        this.musicController.SetCallBack("complete", this.OnMusicPartEnds.bind(this, "Tanks_Party_A"));

        // UI
        this.connected = this.add.image(WINDOW.WIDHT * 0.017, WINDOW.HEIGHT * 0.85, "Connected");
        Scaler.ScaleToGameW(this.connected, 0.04);
        this.disconnected = this.add.image(WINDOW.WIDHT * 0.017, WINDOW.HEIGHT * 0.85, "Disconnected");
        Scaler.ScaleToGameW(this.disconnected, 0.04);

        this.connected.visible = false;
        this.disconnected.visible = false;


        // INPUTS
        this.input.keyboard.on("keydown", this.OnKeyPressed.bind(this));

        // CHAT
        this.lastMessageId = 0;
        this.chatBoxDomElement = this.add.dom(0, WINDOW.HEIGHT - 100).createFromCache("ChatDom");
        this.chatBoxDomElement.alpha = 0.4;

        this.chatBox = $("#chatBox");
        this.inputMessage = $("#message");
        this.messages = $("#messages");

        this.UpdateChatIntervalID = setInterval(this.UpdateChat, 2000, this);
        this.UpdateUsersIntervalID = setInterval(this.UpdateUsersConnected, 2000, this);

        this.UpdateChat(this);  // For fecth the messages at the start
        this.UpdateUsersConnected(this) // The same reason but with the logos of conneted or disconnected
    }

    SendMessage(username)
    {
        const message = this.chatBoxDomElement.getChildByName("message").value;
        var THIS = this;

        //  Any message
        if (message.value !== "")
        {
            console.log(username);
            $.post(CHAT_BASE_URL, { message: message, username: username }, (data, status) =>
            {
                $("#message").val("");
                this.UpdateChat(THIS);
            });
        }
    }

    UpdateChat(THIS)
    {
        console.log("UpdateChat: " + THIS.lastMessageId);

        $.get(CHAT_BASE_URL, { since: THIS.lastMessageId, username: THIS.username }, (data) =>
        {
            console.log("last message ID: " + data.lastId);
            if (data.messages && data.messages.length > 0 && THIS.lastMessageId <= data.lastId) {
                for (var i = 0; i < data.messages.length; i++)
                {
                    THIS.messages.append("<div class='message'>[" + `${data.usernames[i]}` + "] " + `${data.messages[i]}` + "</div>");
                }
                THIS.messages.scrollTop(THIS.messages.prop("scrollHeight"));
                THIS.lastMessageId = data.lastId + 1;    // The + 1 it's for the server api, it returns the actual index of the message that it's now display in the chatBox so the next time i get the nexts
            }
        });
    }

    UpdateUsersConnected(THIS)
    {
        console.log("Updating users connected...");

        $.get(USERS_BASE_URL + "/connected", {}, (connected) =>
        {
            console.log("Connected Users: " + connected);
            if (connected > 0)
            {
                THIS.connected.visible = true;
                THIS.disconnected.visible = false;
            }
            else
            {
                THIS.connected.visible = false;
                THIS.disconnected.visible = true;
            }
            THIS.numberOfUsersText.setText(THIS.numberOfUsersTextConst + connected);
            console.log(THIS.numberOfUsersText._text);
        }).error(() =>
        {
            console.log("ERROR IN GET");
            THIS.connected.visible = false;
            THIS.disconnected.visible = true;
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

    OnKeyPressed(key)
    {
        switch(key.keyCode)
        {
            case Phaser.Input.Keyboard.KeyCodes.ENTER:
                if (this.chatOpen) 
                {
                    this.SendMessage(this.username);
                    this.chatBoxDomElement.alpha = 0.4;
                }
                else
                {
                    this.chatBoxDomElement.alpha = 1.0;
                }
                this.chatOpen = !this.chatOpen;
                break;
            default:
                console.log("ERROR_UNKNOWN_KEY_PRESSED: " + key.keyCode);
                break;
        }
    }

    update() 
    {

    }

}