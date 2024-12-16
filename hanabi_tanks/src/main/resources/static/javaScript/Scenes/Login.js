class Login extends Phaser.Scene
{
    constructor() 
    {
        super({ key: 'Login' });
    }

    preload() 
    {
        this.load.image("TemplateBackground", "../assets/UI/Screens/template.png")

        this.load.html("LoginDom", "../html/Login.html");
        this.load.html("RegisterDom", "../html/Register.html");
    }

    create() 
    {
        const Background = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "TemplateBackground");
        Scaler.ScaleToGameH(Background);

        const register = this.add.dom(WINDOW.WIDHT/2, WINDOW.HEIGHT/2).createFromCache("RegisterDom");
        register.addListener("click");

        const login = this.add.dom(WINDOW.WIDHT/2, WINDOW.HEIGHT/2).createFromCache("LoginDom");
        login.addListener("click");
        login.visible = false; 
        login.active = false;

        var scene = this.scene;

        register.on("click", function(event)
        {
            if (event.target.name === 'registerButton')
            {
                const inputUsername = register.getChildByName("username").value;
                const inputPassword = register.getChildByName("password").value;

                //  Have they entered anything?
                if (inputUsername.value !== '' || inputPassword.value !== '')
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
                                register.removeElement();
                                //register.visible = false; 
                                //register.active = false;
                                login.visible = true; 
                                login.active = true;
                            }
                        },
                        dataType: "json"
                    });
                }
            }
        });

        login.on("click", function(event)
        {
            if (event.target.name === 'loginButton')
            {
                const inputUsername = login.getChildByName("username").value;
                const inputPassword = login.getChildByName("password").value;
    
                //  Have they entered anything?
                if (inputUsername.value !== '' || inputPassword.value !== '')
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
            }

        });
    }

    update() 
    {

    }
}