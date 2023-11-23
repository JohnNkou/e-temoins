import { basename,extname } from 'path'

export function getFileName(filePath){
	return basename(filePath,extname(filePath));
}

export function isDev(){
	return process.env.NODE_ENV == 'development';
}