class NullAnimComponent extends Component {

	constructor() {
		super('AnimComponent')
	}

	playAnimation(id: string) {
		// immediately end
		this.sendMessage('ANIMATION_ENDED', { id });
	}
}