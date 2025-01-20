const Orders = 
{
    CreateLobby: 0,
    CreatedLobby: 1,
    JoinLobby: 2,
    JoinedLobby: 3,
    Disconnect: 4,
    Disconnected: 5,
    Host: 6,
    StartGame: 7,
    MoveForward: 8,
    Stop: 9,
    MoveBackward: 10,
    MoveAngleA: 11,
    MoveAngleD: 12,
    StopAngle: 13,
    TankShoot: 14,
    ChangePowerUps: 15,
    EndGame: 16,
    AbandonWin: 17
}

class CommsManager
{
    constructor()
    {
        this.orderActionPairs = {};
        this.connect();
    }

    connect()
    {        
        let THIS = this;
        this.connection = new WebSocket(COMMS_URL.slice(4, COMMS_URL.length - 1)[1] + "api/comms");
        this.connection.onopen = function () 
        {
            console.log("Connected");
        }

        this.connection.onerror = (e) =>
        {
            console.log(e);
            THIS.orderActionPairs[Orders.Disconnected][false]();
            this.connect();
        }

        this.connection.onmessage = (msg) =>
        {
            let message = JSON.parse(msg.data);
            console.log(message);
            console.log(THIS.orderActionPairs)
            if (THIS.orderActionPairs[message.code][false])
                THIS.orderActionPairs[message.code][false](message.additionalInfo);
        }

        this.connection.onclose = () =>
        {
            console.error("Disconneecting");
            THIS.orderActionPairs[Orders.Disconnected][false]();
            this.connect();
        }
    } 

    static getInstance()
    {
        if (CommsManager.instance == null)
            CommsManager.instance = new CommsManager();
        return CommsManager.instance;
    }

    addOrderCallback(order, sending, callback, update = false)
    {
        console.log("adding");
        if (!this.orderActionPairs[order])
            this.orderActionPairs[order] = {};

        if (!update && this.orderActionPairs[order][sending])
            return;

        this.orderActionPairs[order][sending] = callback;
    }

    send(order)
    {
        // if (this.connection.readyState == WebSocket.CLOSED || this.connection.readyState == WebSocket.CLOSING)
        //     this.connect();
        this.connection.send(JSON.stringify({ code: order, additionalInfo: this.orderActionPairs[order]?.[true]?.()}));
    }
}