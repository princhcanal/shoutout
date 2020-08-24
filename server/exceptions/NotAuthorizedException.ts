import HttpException from './HttpException';

class NotAuthorizedException extends HttpException {
	constructor() {
		super(401, `Not authorized`);
	}
}

export default NotAuthorizedException;
