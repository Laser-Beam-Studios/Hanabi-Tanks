const Orders = 
{
    CreateLobby: 0,
    CreatedLobby: 1,
    JoinLobby: 2,
    JoinedLobby: 3,
    Disconnect: 4,
    Disconnected: 5,
    StartGame: 6,
    MoveForward: 7,
    Stop: 8,
    MoveBackward: 9,
    MoveAngleA: 10,
    MoveAngleD: 11,
    StopAngle: 12,
    TankShoot: 13,
    ChangePowerUps: 14,
    EndGame: 15
}

class CommsManager
{
    constructor()
    {
        let THIS = this;
        this.orderActionPairs = {};
        this.connection = new WebSocket(COMMS_URL.slice(4, COMMS_URL.length - 1)[1] + "api/comms");
        this.connection.onopen = function () 
        {
            console.log("Connected");
        }

        this.connection.onerror = function (e)
        {
            console.log(e);
        }

        this.connection.onmessage = function (msg)
        {
            let message = JSON.parse(msg.data);
            console.log(message);
            console.log(THIS.orderActionPairs)
            if (THIS.orderActionPairs[message.code][false])
                THIS.orderActionPairs[message.code][false](message.additionalInfo);
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
        if (!this.orderActionPairs[order])
            this.orderActionPairs[order] = {};

        if (!update && this.orderActionPairs[order][sending])
            return;

        this.orderActionPairs[order][sending] = callback;
    }

    send(order)
    {
        console.log(order);
        this.connection.send(JSON.stringify({ code: order, additionalInfo: this.orderActionPairs[order]?.[true]?.()}));
    }
}