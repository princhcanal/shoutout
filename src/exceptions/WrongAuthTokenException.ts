import HttpException from './HttpException';

class WrongAuthTokenException extends HttpException {
	constructor() {
		super(404, `Wrong auth token`);
	}
}

export default WrongAuthTokenException;
