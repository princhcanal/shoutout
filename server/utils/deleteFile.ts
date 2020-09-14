import path from 'path';
import fs from 'fs';

const deleteFile = async (filePath: string) => {
	filePath = path.join(filePath);
	fs.unlink(filePath, (err: NodeJS.ErrnoException | null) => {
		if (err) {
			console.error('clearImageError:', err);
		}
	});
};

export default deleteFile;
