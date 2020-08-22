import path from 'path';
import fs from 'fs';

const deleteFile = (filePath: string) => {
	filePath = path.join(filePath);
	fs.unlink(filePath, (err: NodeJS.ErrnoException | null) => {
		console.error('clearImageError:', err);
	});
};

export default deleteFile;
