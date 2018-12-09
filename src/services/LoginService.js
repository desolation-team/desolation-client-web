export default class LoginService {
	static checkAuth(username) {
		if (username) {
			return Promise.resolve('token');
		} else {
			return Promise.reject();
		}
	}
}
