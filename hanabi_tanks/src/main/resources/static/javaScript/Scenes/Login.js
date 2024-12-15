class Login extends Phaser.Scene
{
    constructor() 
    {
        super({ key: 'Login' });
    }

    preload() 
    {
        this.load.image("MainMenuBackground", "../assets/UI/Screens/mainMenu.png")

        this.load.html("LoginDom", "../html/Login.html");
    }

    create() 
    {
        const Background = this.add.image(WINDOW.WIDHT/2, WINDOW.HEIGHT/2, "MainMenuBackground");
        Scaler.ScaleToGameH(Background);

        const login = this.add.dom(WINDOW.WIDHT/2, WINDOW.HEIGHT/2).createFromCache("LoginDom");
        login.addListener("click");

        var scene = this.scene;

        login.on("click", function(event)
        {
            if (event.target.name === 'loginButton')
            {
                const inputUsername = login.getChildByName("username").value;
                const inputPassword = login.getChildByName("password").value;

                //  Have they entered anything?
                if (inputUsername.value !== '' || inputPassword.value !== '')
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
                        success: (data, status) => { 
                            if (status == "success")
                                {
                                    scene.stop("Login");
                                    scene.start("MainMenu");
                                }
                        },
                        dataType: "json"
                      });
                }
            }
        });
    }

    update() 
    {

    }
}