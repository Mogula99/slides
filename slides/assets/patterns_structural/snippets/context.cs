public void OnTriggerEvent(Event evt, GameContext ctx) {
	
	if(evt.Key == "LIFE_LOST") {
		ctx.Inventory.clear();
		ctx.Boosts.clear();
		ctx.Player.Lives--; // access the context
		if(ctx.Player.Lives <= 0) {
			this.FireEvent("GAME_OVER");	
		}
	}
}