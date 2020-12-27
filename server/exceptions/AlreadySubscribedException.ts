import HttpException from './HttpException';

class AlreadySubscribedException extends HttpException {
	constructor(username: string, subscription: string) {
		super(401, `${username} already subscribed to ${subscription}`);
	}
}

export default AlreadySubscribedException;
