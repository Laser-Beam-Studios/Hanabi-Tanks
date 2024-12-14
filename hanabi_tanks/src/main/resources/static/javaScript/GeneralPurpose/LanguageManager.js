class LanguageManager
{
    constructor()
    {
        this.languageTexts = {};
        this.currentLanguage = "english";
        this.subscribers = {};
    }

    hasData()
    {
        return Object.keys(this.languageTexts) > 0;
    }

    loadLanguage(language, data)
    {
        this.languageTexts[language] = data;
    }

    getText(scene, object)
    {
        try
        {
            return this.languageTexts[this.currentLanguage][scene][object];
        }
        catch (error)
        {
            console.warn("Text not found: " + scene + " -> " + object + " with " + currentLanguage + "language");
            return object;
        }
    }

    static getInstance()
    {
        if (!LanguageManager.instance)
            LanguageManager.instance = new LanguageManager();
        return LanguageManager.instance;
    }

    getLanguages()
    {
        return Object.keys(this.languageTexts);
    }

    onLanguageChanged(scene, callback)
    {
        let contains = false;
        Object.keys(this.languageTexts).forEach((key) =>
        {
            if (key == scene)
            {
                contains = true;
                return;
            }
        })

        if (!contains)
            this.subscribers[scene] = [];
        this.subscribers[scene].push(callback);
    }

    desubscribe(scene)
    {
        delete this.subscribers[scene];
    }

    changeLanguage(language)
    {
        this.currentLanguage = language;
        Object.keys(this.languageTexts).forEach((key) =>
        {
            Object.keys(this.languageTexts[key]).forEach((sub) =>
            {
                sub();
            });
        });
    }
}