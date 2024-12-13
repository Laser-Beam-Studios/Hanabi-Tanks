class LanguageManager
{
    constructor()
    {
        this.languageTexts = {};
        this.currentLanguage = "english";
        this.subscribers = [];
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
            console.warn("Text not found: ${scene} -> ${object} with ${currentLanguage} language");
            return object;
        }
    }

    static getInstance()
    {
        if (!LanguageManager.instance)
            LanguageManager.instance = new LanguageManager();
        return LanguageManager.instance;
    }

    onLanguageChanged(callback)
    {
        this.subscribers.push(callback);
    }

    changeLanguage(language)
    {
        this.currentLanguage = language;
        for (let sub in this.subscribers)
        {
            sub();
        }
    }
}