import HttpException from './HttpException';

class UserNotFoundException extends HttpException {
	constructor(id: string) {
		super(404, `User ${id} not found`);
	}
}

export default UserNotFoundException;
