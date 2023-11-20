import config, { successURI, errorURI, successARN, errorARN } from './config.js';
import { S3Client, PutObjectCommand, ListObjectsCommand } from '@aws-sdk/client-s3';
import fs from 'fs/promises';

process.env.s3Bucket = 'e-temoins';

let file = await fs.readFile('/Users/alainkashoba/Downloads/image.png'),
bucketName = process.env.s3Bucket,
client = new S3Client(config),
command = new PutObjectCommand({
	Bucket: bucketName,
	Key:'bulletins/success/image.png',
	Body: file,
	ContentDisposition:'inline'
}),
ROOT = process.env.ROOT,
uploadDir = `/upload`,
prod = process.env.NODE_ENV == 'production';

function S3(){
	let client = new S3Client(config),
	bucketName = process.env.s3Bucket;

	this.putFile = async function(name,Body){
		let Key = `${successURI}/${name}`,
		fileName = `${successARN}/${name}`,
		command = new PutObjectCommand({
			Bucket:bucketName,
			Key,
			Body
		}),
		result = await client.send(command);

		return { fileName };
	}
}

function fsS3(){
	this.putFile = async function(name,Body){
		try{
			let fileName = `${uploadDir}/${name}`,
			result = await fs.writeFile(fileName);

			return { fileName };
		}
		catch(e){
			return Promise.reject(e);
		}
	}
}

export default (prod)? S3 : fsS3;