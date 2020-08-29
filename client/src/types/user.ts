interface User {
	username: string;
	name: string;
	email: string;
	url: string;
	followers: [];
	following: [];
	subscriptions: [];
	subscribers: [];
}

export default User;
