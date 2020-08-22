interface User {
	_id: string;
	username: string;
	name: string;
	email: string;
	password: string;
	url: string;
	followers: string[];
	following: string[];
	subscriptions: string[];
	subscribers: string[];
}

export default User;
