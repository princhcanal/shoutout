import HttpException from './HttpException';

class FileNotFoundException extends HttpException {
	constructor() {
		super(404, 'File not found');
	}
}

export default FileNotFoundException;
