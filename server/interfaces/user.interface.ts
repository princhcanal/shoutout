interface User {
	_id: string;
	username: string;
	name: string;
	email: string;
	password: string;
	url: string;
	followers: string[] | User[];
	following: string[] | User[];
	subscriptions: string[] | User[];
	subscribers: string[] | User[];
}

export default User;
