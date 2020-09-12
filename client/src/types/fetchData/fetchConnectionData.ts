import User from '../models/user';

interface FetchConnectionData {
	message: string;
	followers?: User[];
	following?: User[];
	subscribers?: User[];
	subscribing?: User[];
}

export default FetchConnectionData;
