class ChatChill extends Phaser.Scene
{
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
        // AUDIO
        AudioManager.Instance.SetActiveScene(this);

        this.musicController = AudioManager.Instance.CreateInstance("Tanks_Party_A", "Music");
        this.musicController.Play();
        this.musicController.SetCallBack("complete", this.OnMusicPartEnds.bind(this, "Tanks_Party_A"));

        // UI
        this.connected = this.add.image((WINDOW.WIDHT * 13)/32, WINDOW.HEIGHT * 0.97, "Connected");
        Scaler.ScaleToGameW(this.connected, 0.04);
        this.disconnected = this.add.image((WINDOW.WIDHT * 13)/32, WINDOW.HEIGHT * 0.97, "Disconnected");
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

        setInterval(this.UpdateChat, 2000, this);
        setInterval(this.UpdateUsersConnected, 2000, this);

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