import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cacheControl from 'express-cache-controller';
import path from 'path';

import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';
import notFoundMiddleware from './middleware/notFound.middleware';
import multerConfig from './utils/multerConfig';

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
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json());
		this.app.use(multerConfig.single('image'));
		this.app.use(cookieParser());
		this.app.use('/images', express.static('images'));
		this.app.use(
			cacheControl({
				noCache: true,
			})
		);
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			let origin = 'http://localhost:3000';
			if (process.env.NODE_ENV === 'production') {
				origin = 'http://shoutout-by-princh.herokuapp.com';
			}

			res.setHeader(
				'Access-Control-Allow-Headers',
				'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Allow-Origin, Access-Control-Allow-Credentials'
			);
			res.setHeader('Access-Control-Allow-Origin', origin);
			res.setHeader(
				'Access-Control-Allow-Methods',
				'OPTIONS, GET, POST, PUT, PATCH, DELETE'
			);
			res.setHeader('Access-Control-Allow-Credentials', 'true');

			if (req.method === 'OPTIONS') {
				return res.sendStatus(200);
			}

			next();
		});
	}

	private initializeErrorHandling() {
		this.app.use(notFoundMiddleware);
		this.app.use(errorMiddleware);
	}

	private initializeControllers(controllers: Controller[]) {
		controllers.forEach((controller: Controller) => {
			this.app.use('/api/', controller.router);
		});

		if (process.env.NODE_ENV === 'production') {
			this.app.use(express.static('client/build'));
			this.app.get('*', (req: Request, res: Response) => {
				res.sendFile(
					path.resolve(
						__dirname,
						'..',
						'client',
						'build',
						'index.html'
					)
				);
			});
		}
	}

	private async connectToDatabase() {
		const { MONGO_URI } = process.env;

		try {
			await mongoose.connect(MONGO_URI as string, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
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
