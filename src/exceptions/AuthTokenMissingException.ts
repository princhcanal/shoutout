import HttpException from './HttpException';

class AuthTokenMissingException extends HttpException {
	constructor() {
		super(401, `Auth token missing`);
	}
}

export default AuthTokenMissingException;
