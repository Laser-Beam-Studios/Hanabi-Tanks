class Login extends Phaser.Scene
{
    textsScale =
    {
        "LoginTile": 0.85,
        "RegisterTile": 0.85,
        "LoginButton": 0.32,
        "RegisterButton": 0.32,
        "ToLoginButton": 0.32,
        "ToRegisterButton": 0.32
    }

    state =
    {
        "LoginTile": true,
        "RegisterTile": false,
        "LoginButton": true,
        "RegisterButton": false,
        "ToLoginButton": false,
        "ToRegisterButton": true
    }

    texts = 
    {
        "LoginTile":
        { 
            pos: { x: 0.25, y: 0.15 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(-4),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["LoginTile"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "RegisterTile":
        { 
            pos: { x: 0.25, y: 0.15 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(-4),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["RegisterTile"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "ToRegisterButton":
        { 
            pos: { x: 0.17, y: 0.94 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["ToRegisterButton"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "ToLoginButton":
        { 
            pos: { x: 0.83, y: 0.94 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["ToLoginButton"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "LoginButton":
        { 
            pos: { x: 0.5, y: 0.8 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["LoginButton"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        },
        "RegisterButton":
        { 
            pos: { x: 0.5, y: 0.8 },
            center: { x: 0.5, y: 0.5 },
            rotation: Phaser.Math.DegToRad(0),
            style: 
            {
                fontFamily: font,
                fontSize: String(WINDOW.HEIGHT * this.textsScale["RegisterButton"] / textDivider) + "px",
                //fontStyle: styleOptions.fontStyle.bold,
                color: blackColor
            } 
        }
    }

    constructor() 
    {
        super({ key: 'Login' });
    }

    preload() 
    {
        this.load.script("webfont", "https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js");

        if (!LanguageManager.getInstance().hasData())
        {
            this.load.pack("localization_en", "../assets/localization/english.json");
            this.load.pack("localization_es", "../assets/localization/espanol.json");
            this.load.pack("localization_eu", "../assets/localization/euskera.json");
            this.load.pack("localization_metal", "../assets/localization/metal.json");
        }

        this.load.image("TemplateBackground", "../assets/UI/Screens/template.png");
        this.load.image("RegisterButton", "../assets/UI/Buttons/back.png");
        this.load.image("ToLoginButton", "../assets/UI/Buttons/back.png");
        this.load.image("ToRegisterButton", "../assets/UI/Buttons/play.png");
        this.load.image("LoginButton", "../assets/UI/Buttons/play.png");

        this.load.html("InputUser", "../html/inputUser.html");
        this.load.html("InputPass", "../html/inputPass.html")
    }

    create() 
    {
        const Background = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "TemplateBackground");
        Scaler.ScaleToGameH(Background);

        this.usernameInput = this.add.dom(WINDOW.WIDHT/2, WINDOW.HEIGHT * 4.5/10).createFromCache("InputUser");
        this.passwordInput = this.add.dom(WINDOW.WIDHT/2, WINDOW.HEIGHT * 5.5/10).createFromCache("InputPass");

        var scene = this.scene;

        this.login = [];
        this.register = [];

        WebFont.load({
            custom: {
                families: ['FontChild'], 
                urls: ['../../css/styles.css']
            },
            active: () => {
                console.log("Font Loaded");
                
                const enData = this.cache.json.get("localization_en");      
                const esData = this.cache.json.get("localization_es");
                const euData = this.cache.json.get("localization_eu");
                const metalData = this.cache.json.get("localization_metal");
                
                LanguageManager.getInstance().loadLanguage("english", enData);
                LanguageManager.getInstance().loadLanguage("español", esData);
                LanguageManager.getInstance().loadLanguage("euskera", euData);
                LanguageManager.getInstance().loadLanguage("metal", metalData);

                const loginButton = this.add.image(this.texts["LoginButton"].pos.x * WINDOW.WIDHT, this.texts["LoginButton"].pos.y * WINDOW.HEIGHT, "LoginButton");
                Scaler.ScaleToGameW(loginButton, this.textsScale["LoginButton"]);
                loginButton.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, loginButton));
                this.login.push(loginButton);
        
                const toRegisterButton = this.add.image(this.texts["ToRegisterButton"].pos.x * WINDOW.WIDHT, this.texts["ToRegisterButton"].pos.y * WINDOW.HEIGHT, "ToRegisterButton");
                Scaler.ScaleToGameW(toRegisterButton, this.textsScale["ToRegisterButton"]);
                toRegisterButton.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, toRegisterButton));
                this.login.push(toRegisterButton);
        
                const registerButton = this.add.image(this.texts["RegisterButton"].pos.x * WINDOW.WIDHT, this.texts["RegisterButton"].pos.y * WINDOW.HEIGHT, "RegisterButton");
                Scaler.ScaleToGameW(registerButton, this.textsScale["RegisterButton"]);
                registerButton.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, registerButton));     
                this.register.push(registerButton);
        
                const toLoginButton = this.add.image(this.texts["ToLoginButton"].pos.x * WINDOW.WIDHT, this.texts["ToLoginButton"].pos.y * WINDOW.HEIGHT, "ToLoginButton");
                Scaler.ScaleToGameW(toLoginButton, this.textsScale["ToLoginButton"]);
                toLoginButton.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, toLoginButton));
                this.register.push(toLoginButton);

                this.textsGroup = {};
                Object.keys(this.texts).forEach((key) =>
                {
                    this.textsGroup[key] = this.add.text(this.texts[key].pos.x * WINDOW.WIDHT, this.texts[key].pos.y * WINDOW.HEIGHT, LanguageManager.getInstance().getText("Login", key), this.texts[key].style);
                    this.textsGroup[key].setOrigin(this.texts[key].center.x, this.texts[key].center.y);
                    this.textsGroup[key].rotation = this.texts[key].rotation;
                    if (this.state[key])
                        this.login.push(this.textsGroup[key]);
                    else
                        this.register.push(this.textsGroup[key]);
                    //Scaler.ScaleToGameW(this.textsGroup[key], texts[key].scale / 7.0)
                });
                LanguageManager.getInstance().onLanguageChanged("Login", () =>
                {
                    Object.keys(this.textsGroup).forEach((key) =>
                    {
                        this.textsGroup[key].text = LanguageManager.getInstance().getText("Login", key);
                    });
                });
    
                this.events.once("shutdown", () =>
                {
                    LanguageManager.getInstance().desubscribe("Login");
                });                

                this.RegisterState();
            }
        });

        CommsManager.getInstance().addOrderCallback(Orders.Disconnect, true, () =>
            {
                return this.scene.key;
            }, true)

        // register.on("click", function(event)
        // {
        //     if (event.target.name === 'registerButton')
        //     {
        //         const inputUsername = register.getChildByName("username").value;
        //         const inputPassword = register.getChildByName("password").value;

        //         //  Have they entered anything?
        //         if (inputUsername.value !== '' && inputPassword.value !== '')
        //         {    
        //             const body = JSON.stringify({
        //                 username: inputUsername,
        //                 password: inputPassword,
        //                 numberOfVictories: 0,
        //                 lastSeen: 0
        //             });
        //             $.ajax(
        //             {
        //                 type: "POST",
        //                 url: USERS_BASE_URL,
        //                 contentType: "application/json",
        //                 data: body,
        //                 success: (data, status) => 
        //                 { 
        //                     if (status == "success")
        //                     {
        //                         InterSceneDictionary.getInstance().add("nick", inputUsername);
        //                         register.removeElement();
        //                         login.visible = true; 
        //                         login.active = true;
        //                     }
        //                 },
        //                 dataType: "json"
        //             });
        //         }
        //     }
        //     else if (event.target.name === "goToLogin")
        //     {
        //         register.visible = false;
        //         register.active = false;
        //         login.visible = true; 
        //         login.active = true;
        //     }
        // });

        // login.on("click", function(event)
        // {
        //     if (event.target.name === "loginButton")
        //     {
        //         const inputUsername = login.getChildByName("username").value;
        //         const inputPassword = login.getChildByName("password").value;
    
        //         //  Have they entered anything?
        //         if (inputUsername.value !== '' && inputPassword.value !== '')
        //         {
        //             $.ajax(
        //             {
        //                 type: "PUT",
        //                 url: USERS_BASE_URL + "/",
        //                 data: { username: inputUsername, password: inputPassword },
        //                 success: (data, status) => 
        //                 { 
        //                     console.log(data + ", " + status);
        //                     if (status == "success")
        //                     {
        //                         scene.stop("Login");
        //                         scene.start("MainMenu");
        //                         scene.launch("ChatChill", { username: inputUsername });
        //                     }
        //                 },
        //             });
        //         }
        //     }
        //     else if (event.target.name === "goToRegister")
        //     {
        //         register.visible = true;
        //         register.active = true;
        //         login.visible = false;
        //         login.active = false;
        //     }

        // });
    }

    LogingState()
    {        
        for (let elem in this.register)
            this.register[elem].setActive(false).setVisible(false);

        for (let elem in this.login)
            this.login[elem].setActive(true).setVisible(true);
    }

    RegisterState()
    {        
        for (let elem in this.login)
            this.login[elem].setActive(false).setVisible(false);

        for (let elem in this.register)
            this.register[elem].setActive(true).setVisible(true);
    }

    OnClickOnButton(button)
    {
        console.log("boton pulsado = " + button.texture.key);
        
        const inputUsername = this.usernameInput.getChildByName("username").value;
        const inputPassword = this.passwordInput.getChildByName("password").value;
        
        switch(button.texture.key)
        {
            case "LoginButton":    
                //  Have they entered anything?
                if (inputUsername.value !== '' && inputPassword.value !== '')
                {
                    $.ajax(
                    {
                        type: "PUT",
                        url: USERS_BASE_URL + "/",
                        data: { username: inputUsername, password: inputPassword },
                        success: (data, status) => 
                        { 
                            console.log(data + ", " + status);
                            if (status == "success")
                            {
                                this.scene.stop("Login");
                                this.scene.start("MainMenu");
                                this.scene.launch("ChatChill", { username: inputUsername });
                            }
                        },
                    });
                }
                break;
            case "RegisterButton":
                //  Have they entered anything?
                if (inputUsername.value !== '' && inputPassword.value !== '')
                {    
                    const body = JSON.stringify({
                        username: inputUsername,
                        password: inputPassword,
                        numberOfVictories: 0,
                        lastSeen: 0
                    });
                    $.ajax(
                    {
                        type: "POST",
                        url: USERS_BASE_URL,
                        contentType: "application/json",
                        data: body,
                        success: (data, status) => 
                        { 
                            if (status == "success")
                            {
                                InterSceneDictionary.getInstance().add("nick", inputUsername);
                                this.LogingState();
                            }
                        },
                        dataType: "json"
                    });
                }

                break;
            case "ToLoginButton":
                this.LogingState();
                break; 
            case "ToRegisterButton":
                this.RegisterState();
                break;
                
            default:
                console.log("ERROR_IN_CLICK_BUTTON: UNKNOWN_BUTTON_KEY: " + button.texture.key);
                break;
        }
    }

    update() 
    {

    }
}