class Login extends Phaser.Scene
{
    textsScale =
    {
        "LoginTile": 0.85,
        "RegisterTile": 0.85,
        "LoginButton": 0.32,
        "RegisterButton": 0.32,
        "ToLoginButton": 0.32,
        "ToRegisterButton": 0.32,
    }

    state =
    {
        "LoginTile": true,
        "RegisterTile": false,
        "LoginButton": true,
        "RegisterButton": false,
        "ToLoginButton": false,
        "ToRegisterButton": true,
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

        const usernameInput = this.add.dom(WINDOW.WIDHT/2, WINDOW.HEIGHT * 4.5/10).createFromCache("InputUser");
        const passwordInput = this.add.dom(WINDOW.WIDHT/2, WINDOW.HEIGHT * 5.5/10).createFromCache("InputPass");

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
                this.textsGroup = {};
                Object.keys(this.texts).forEach((key) =>
                {
                    this.textsGroup[key] = this.add.text(this.texts[key].pos.x * WINDOW.WIDHT, this.texts[key].pos.y * WINDOW.HEIGHT, LanguageManager.getInstance().getText("Mode", key), this.texts[key].style);
                    this.textsGroup[key].setOrigin(this.texts[key].center.x, this.texts[key].center.y);
                    this.textsGroup[key].rotation = this.texts[key].rotation;
                    if (state[key])
                        this.login.push(this.textsGroup[key]);
                    else
                        this.register.push(this.textsGroup[key]);
                    //Scaler.ScaleToGameW(this.textsGroup[key], texts[key].scale / 7.0)
                });
                LanguageManager.getInstance().onLanguageChanged("Mode", () =>
                {
                    Object.keys(this.textsGroup).forEach((key) =>
                    {
                        this.textsGroup[key].text = LanguageManager.getInstance().getText("Mode", key);
                    });
                });
    
                this.events.once("shutdown", () =>
                {
                    LanguageManager.getInstance().desubscribe("Mode");
                });
            }
        });

        this.loginButton = this.add.image(this.texts["LoginButton"].pos.x * WINDOW.WIDHT, this.texts["LoginButton"].pos.y * WINDOW.HEIGHT, "LoginButton");
        Scaler.ScaleToGameW(this.loginButton, this.textsScale["LoginButton"]);
        this.loginButton.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, this.loginButton));
        this.loginButton.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        this.loginButton.setInteractive().on("pointerout", this.OnPointerExit.bind(this));
        this.login.push(this.loginButton);

        this.toRegisterButton = this.add.image(this.texts["ToRegisterButton"].pos.x * WINDOW.WIDHT, this.texts["ToRegisterButton"].pos.y * WINDOW.HEIGHT, "ToRegisterButton");
        Scaler.ScaleToGameW(this.toRegisterButton, this.textsScale["ToRegisterButton"]);
        this.toRegisterButton.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, this.toRegisterButton));
        this.toRegisterButton.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        this.toRegisterButton.setInteractive().on("pointerout", this.OnPointerExit.bind(this));
        this.login.push(this.toRegisterButton);

        this.registerButton = this.add.image(this.texts["RegisterButton"].pos.x * WINDOW.WIDHT, this.texts["RegisterButton"].pos.y * WINDOW.HEIGHT, "RegisterButton");
        Scaler.ScaleToGameW(this.registerButton, this.textsScale["RegisterButton"]);
        this.registerButton.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, this.registerButton));
        this.registerButton.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        this.registerButton.setInteractive().on("pointerout", this.OnPointerExit.bind(this));        
        this.register.push(this.registerButton);

        this.toLoginButton = this.add.image(this.texts["ToLoginButton"].pos.x * WINDOW.WIDHT, this.texts["ToLoginButton"].pos.y * WINDOW.HEIGHT, "ToLoginButton");
        Scaler.ScaleToGameW(this.toLoginButton, this.textsScale["ToLoginButton"]);
        this.toLoginButton.setInteractive().on("pointerdown", this.OnClickOnButton.bind(this, this.toLoginButton));
        this.toLoginButton.setInteractive().on("pointerover", this.OnPointerEnter.bind(this));
        this.toLoginButton.setInteractive().on("pointerout", this.OnPointerExit.bind(this));
        this.register.push(this.toLoginButton);

        this.RegisterState();

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
            elem.setActive(false).setVisible(false);

        for (let elem in this.login)
            elem.setActive(true).setVisible(true);
    }

    RegisterState()
    {
        for (let elem in this.register)
            elem.setActive(true).setVisible(true);

        for (let elem in this.login)
            elem.setActive(false).setVisible(false);
    }

    OnClickOnButton(button)
    {
        console.log("boton pulsado = " + button.texture.key);
        
        const inputUsername = this.username.getChildByName("username").value;
        const inputPassword = this.password.getChildByName("password").value;
        
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
                                scene.stop("Login");
                                scene.start("MainMenu");
                                scene.launch("ChatChill", { username: inputUsername });
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
                                register.removeElement();
                                login.visible = true; 
                                login.active = true;
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