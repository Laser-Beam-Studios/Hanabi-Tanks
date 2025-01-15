const Orders = 
{
    CreateLobby: 0,
    CreatedLobby: 1,
    JoinLobby: 2,
    JoinedLobby: 3,
    Disconnect: 4,
    Disconnected: 5,
    StartGame: 6
}

class CommsManager
{
    constructor()
    {
        this.orderActionPairs = {};
        this.connection = new WebSocket(COMMS_URL.slice(4, COMMS_URL.length));
        this.connection.onopen = function () 
        {
            console.log("Connected");
        }

        this.onerror = function (e)
        {
            console.log(e);
        }

        this.onmessage = function (msg)
        {
            let message = JSON.parse(msg);
            if (this.orderActionPairs[message.code][false])
                this.orderActionPairs[message.code][false](additionalInfo);
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
        if (!update && this.orderActionPairs[order][sending])
            return;
        this.orderActionPairs[order][sending] = callback;
    }

    sendOrder(order)
    {
        this.connection.send({ code: order, additionalInfo: this.orderActionPairs[order][true]?.()});
    }
}