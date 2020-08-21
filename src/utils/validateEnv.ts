import { cleanEnv, str, port } from 'envalid';

export const validateEnv = () => {
	cleanEnv(process.env, {
		MONGO_PASSWORD: str(),
		MONGO_USER: str(),
		MONGO_DB_NAME: str(),
		MONGO_URI: str(),
		PORT: port(),
		JWT_SECRET: str(),
	});
};
