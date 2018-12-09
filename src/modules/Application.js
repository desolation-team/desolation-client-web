import LoginService from '../services/LoginService';
import Game from './Game';

export default class Application {
	constructor() {
		this.game = null;
		const form = document.getElementById('form');
		form.addEventListener('submit', () => {
			LoginService.checkAuth(document.getElementById('nickname').value)
				.then((token) => {
					this.game = new Game(token);
				});
		});
	}
}
