import config, { pvURI, voixURI, preuveURI, profilURI, preuveARN, pvARN, voixARN, profilARN } from './config.js';
import { S3Client, PutObjectCommand, ListObjectsCommand } from '@aws-sdk/client-s3';
import { basename } from 'path'
import fs from 'fs/promises';

process.env.s3Bucket = 'e-temoins';

let //file = await fs.readFile('/Users/alainkashoba/Downloads/image.png'),
bucketName = process.env.s3Bucket,
client = new S3Client(config),
/*command = new PutObjectCommand({
	Bucket: bucketName,
	Key:'bulletins/success/image.png',
	Body: file,
	ContentDisposition:'inline'
}),*/
ROOT = process.env.ROOT,
pvDir = `${ROOT}/img/pv`,
voixDir = `${ROOT}/img/voix`,
preuveDir = `${ROOT}/img/preuve`,
profilDir = `${ROOT}/img/profil`,
prod = process.env.NODE_ENV == 'production';

function S3(){
	let client = new S3Client(config),
	bucketName = process.env.s3Bucket;

	this.putPv = async function(name,Body){
		let Key = `${pvURI}/${name}`,
		command = new PutObjectCommand({
			Bucket:bucketName,
			Key,
			Body
		}),
		result = await client.send(command);

		return true;
	}

	this.putVoix = async function(name,Body){
		let Key = `${voixURI}/${name}`,
		command = new PutObjectCommand({
			Bucket:bucketName,
			Key,
			Body
		}),
		result = await client.send(command);

		return true;
	}

	this.putPreuve = async function(name,Body){
		let Key = `${preuveURI}/${name}`,
		command = new PutObjectCommand({
			Bucket:bucketName,
			Key,
			Body
		}),
		result = await client.send(command);

		return true;
	}

	this.putProfil = async function(name,Body){
		let Key = `${profilURI}/${name}`,
		command = new PutObjectCommand({
			Bucket:bucketName,
			Key,
			Body
		}),
		result = await client.send(command);

		return true;
	}
}

function fsS3(){
	this.putPv = async function(name,Body){
		let fileName = `${pvDir}/${name}`,
		result = await fs.writeFile(fileName,Body);

		return true;
	}
	this.putVoix = async function(name,Body){
		let fileName = `${voixDir}/${name}`,
		result = await fs.writeFile(fileName,Body);

		return true;
	}

	this.putPreuve = async function(name,Body){
		let fileName = `${preuveDir}/${name}`,
		result = await fs.writeFile(fileName,Body);

		return true;
	}

	this.putProfil = async function(name,Body){
		let fileName = `${profilDir}/${name}`,
		result = await fs.writeFile(fileName,Body);

		return true;
	}
}

export default (prod)? S3 : fsS3;