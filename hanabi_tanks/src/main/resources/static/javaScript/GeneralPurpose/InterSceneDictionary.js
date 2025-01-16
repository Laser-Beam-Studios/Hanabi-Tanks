class InterSceneDictionary
{
    constructor()
    {
        this.values = { };
    }

    static getInstance()
    {
        if (InterSceneDictionary.instance == null)
            InterSceneDictionary.instance = new InterSceneDictionary();
        return InterSceneDictionary.instance;
    }

    get(key)
    {
        return this.values[key];
    }

    add(key, value)
    {
        if (this.values[key])
            return;
        this.values[key] = value;
    }

    update(key, value)
    {
        this.values[key] = value;
    }

    delete(key)
    {
        delete this.values[key];
    }
}