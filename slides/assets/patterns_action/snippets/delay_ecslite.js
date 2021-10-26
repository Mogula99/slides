// wait for 2 seconds and load another scene
this.sendMessage(Messages.FREEZE);
this.scene.callWithDelay(2000, () => {
	Factory.loadScene(Scenes.MAIN_MENU);
});