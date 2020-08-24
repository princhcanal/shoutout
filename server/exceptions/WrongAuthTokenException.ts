import HttpException from './HttpException';

class WrongAuthTokenException extends HttpException {
	constructor() {
		super(401, `Wrong auth token`);
	}
}

export default WrongAuthTokenException;
