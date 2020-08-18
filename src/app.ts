import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';

class App {
	public app: express.Application;
	public port: number;

	constructor(controllers: Controller[], port: number) {
		this.app = express();
		this.port = port;

		this.connectToDatabase();
		this.initializeMiddlewares();
		this.initializeControllers(controllers);
		this.initializeErrorHandling();
	}

	private initializeMiddlewares() {
		this.app.use(bodyParser.json());
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader(
				'Access-Control-Allow-Methods',
				'OPTIONS, GET, POST, PUT, PATCH, DELETE'
			);
			res.setHeader(
				'Access-Control-Allow-Headers',
				'Content-Type, Authorization'
			);
			next();
		});
	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}

	private initializeControllers(controllers: Controller[]) {
		controllers.forEach((controller: Controller) => {
			this.app.use('/', controller.router);
		});
	}

	private async connectToDatabase() {
		const { MONGO_URI } = process.env;

		try {
			await mongoose.connect(MONGO_URI as string, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			console.log('Connected to database');
		} catch (err) {
			console.log('Could not connect to database');
			console.log(err);
		}
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`Serving on port ${this.port}`);
		});
	}
}

export default App;
