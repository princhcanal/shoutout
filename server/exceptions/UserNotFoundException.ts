import HttpException from './HttpException';

class UserNotFoundException extends HttpException {
	constructor(username: string) {
		super(404, `User ${username} not found`);
	}
}

export default UserNotFoundException;
