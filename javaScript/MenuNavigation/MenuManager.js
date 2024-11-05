class MenuManager
{
    constructor()
    {
        this.CurrentState;

        if (typeof MenuManager.Instance === "object")
        {
            return MenuManager.Instance;
        }
            
        this.Instance = this;
        return this;
    }

    SetState(newState)
    {
        if (this.CurrentState != null) this.CurrentState.Exit();

        this.CurrentState = newState;

        this.CurrentState.Enter();
    }
}