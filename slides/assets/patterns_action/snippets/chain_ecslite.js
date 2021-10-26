this.owner.addComponent(new ChainComponent()
    .call(() => player.blockInput())
    .waitFor(new DoorAnimComponent(DoorActions.OPEN))
    .waitFor(new WalkAnim(player, direction))
    .call(() => player.hide())
    .waitFor(new DoorAnimComponent(DoorActions.CLOSE))
    .waitTime(500));