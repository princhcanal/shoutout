import path from 'path';

import { Request } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

type DiskStorageCallback = (error: Error | null, destination: string) => void;

const storage = multer.diskStorage({
	destination: (
		req: Request,
		file: Express.Multer.File,
		cb: DiskStorageCallback
	) => {
		const dest = path.join(
			path.dirname(require.main?.filename as string),
			'images'
		);
		cb(null, dest);
	},
	filename: (
		req: Request,
		file: Express.Multer.File,
		cb: DiskStorageCallback
	) => {
		cb(null, `${uuidv4()}-${file.originalname}`);
	},
});

const fileFilter = (
	req: Request,
	file: Express.Multer.File,
	cb: multer.FileFilterCallback
) => {
	if (
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/png'
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const multerConfig = multer({ storage, fileFilter });

export default multerConfig;
