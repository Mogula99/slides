new ECS.Builder(scene)
	.localPos(this.engine.app.screen.width / 2, this.engine.app.screen.height / 2)
	.anchor(0.5)
	.withParent(scene.stage)
	.withComponent(
		new ECS.FuncComponent('rotation')
		.doOnUpdate((cmp, delta, absolute) => cmp.owner.rotation += 0.001 * delta))
	.asText('Hello World', new PIXI.TextStyle({ fill: '#FF0000', fontSize: 80}))
	.build();