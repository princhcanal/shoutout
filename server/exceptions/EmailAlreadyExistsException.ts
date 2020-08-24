import HttpException from './HttpException';

class EmailAlreadyExistsException extends HttpException {
	constructor(email: string) {
		super(404, `A user with the email ${email} already exists`);
	}
}

export default EmailAlreadyExistsException;
