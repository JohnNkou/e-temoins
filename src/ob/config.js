import { isDev } from '../utils/helper.js';

const config = {
	region:'us-east-1',
	credentials:{ accessKeyId:'AKIATNHOUSMIRJQXVKRI', secretAccessKey:'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' },
}

const bucketARN = 'e-temoins.s3.amazonaws.com',
localPATH = `e-temoins/img`;

export const pvARN = `${bucketARN}/pv`
export const voixARN = `${bucketARN}/voix`
export const preuveARN = `${bucketARN}/preuve`
export const profilARN = `${bucketARN}/profil`
export const pvURI = "pv"
export const voixURI = `voix`
export const preuveURI = 'preuve'
export const profilURI = 'profil'

export const profilDir = (isDev())? `${localPATH}/${profilURI}`: `https://${profilARN}`;
export const pvDir = (isDev())? `${localPATH}/pv/${pvURI}`: `https://${pvARN}`;
export const voixDir = (isDev())? `${localPATH}/img/${voixURI}`: `https://${voixARN}`;
export const preuveDir = (isDev())? `${localPATH}/img/${preuveURI}`: `https://${preuveARN}`;

export default config;