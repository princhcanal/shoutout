import { cleanEnv, str, port } from 'envalid';

export const validateEnv = () => {
	cleanEnv(process.env, {
		MONGO_PASSWORD: str(),
		MONGO_USER: str(),
		MONGO_DB_NAME: str(),
		MONGO_URI: str(),
		PORT: port(),
		JWT_SECRET: str(),
		BASE_URL: str(),
		BASE_URL_CLIENT: str(),
		STRIPE_SECRET_KEY: str(),
		STRIPE_PUBLISHABLE_KEY: str(),
		STRIPE_WEBHOOK_SECRET: str(),
	});
};
