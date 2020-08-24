import HttpException from './HttpException';

class WrongCredentialsException extends HttpException {
	constructor() {
		super(401, `Wrong email or password`);
	}
}

export default WrongCredentialsException;
