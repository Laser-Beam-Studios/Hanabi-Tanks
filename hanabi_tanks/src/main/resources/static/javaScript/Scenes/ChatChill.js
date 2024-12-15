class ChatChill extends Phaser.Scene
{
    constructor() 
    {
        super({ key: 'ChatChill' });

        this.musicController;
        this.songsParts = ["Tanks_Party_A", "Tanks_Party_B", "Tanks_Party_C", "Tanks_Party_D", "Tanks_Party_E"];
        
        this.lastMessageId = 0;
        this.chatBox;
        this.messages;
        this.chatBoxDomElement;
        this.inputMessage;
        this.chatOpen = false;

    }

    preload()
    {
        this.load.html("ChatDom", "../html/Chat.html");

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

        this.musicController = AudioManager.Instance.CreateInstance("Tanks_Party_A", "Music");
        this.musicController.Play();
        this.musicController.SetCallBack("complete", this.OnMusicPartEnds.bind(this, "Tanks_Party_A"));

        this.input.keyboard.on("keydown", this.OnKeyPressed.bind(this));

        this.lastMessageId = 0;
        this.chatBoxDomElement = this.add.dom(0, WINDOW.HEIGHT - 100).createFromCache("ChatDom");
        this.chatBox = $("#chatBox");
        this.inputMessage = $("#message");
        this.messages = $("#messages");

        setInterval(this.UpdateChat, 2000, this);
    }

    SendMessage()
    {
        const message = this.chatBoxDomElement.getChildByName("message").value;
        var THIS = this;

        //  Any message
        if (message.value !== "")
        {
            $.post(CHAT_BASE_URL, { message: message }, (data, status) =>
            {
                $("#message").val("");
                this.UpdateChat(THIS);
            });
        }
    }

    UpdateChat(THIS)
    {
        console.log("UpdateChat: " + THIS.lastMessageId);

        $.get(CHAT_BASE_URL, { since: THIS.lastMessageId }, (data) =>
        {
            console.log("The get returns: " + data.lastId);
            if (data.messages && data.messages.length > 0 && THIS.lastMessageId <= data.lastId) {
                data.messages.forEach(msg => {
                    THIS.messages.append("<div class='message'>" + `${msg}` + "</div>");
                });
                THIS.messages.scrollTop(THIS.messages.prop("scrollHeight"));
                THIS.lastMessageId = data.lastId + 1;    // The + 1 it's for the server api, it returns the actual index of the message that it's now display in the chatBox so the next time i get the nexts
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

    OnKeyPressed(key)
    {
        switch(key.keyCode)
        {
            case Phaser.Input.Keyboard.KeyCodes.ENTER:
                if (this.chatOpen) 
                {
                    this.SendMessage();
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