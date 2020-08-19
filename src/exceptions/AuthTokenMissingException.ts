import HttpException from './HttpException';

class AuthTokenMissingException extends HttpException {
	constructor() {
		super(404, `Auth token missing`);
	}
}

export default AuthTokenMissingException;
