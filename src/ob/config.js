const config = {
	region:'us-east-1',
	credentials:{ accessKeyId:'AKIATNHOUSMIRJQXVKRI', secretAccessKey:'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' },
}

export const bulletinURI = "bulletins"
export const bulletinARN = "arn:aws:s3:::e-temoins/bulletins"
export const successURI = `${bulletinURI}/success`
export const errorURI = `${bulletinURI}/failed`
export const successARN = `${bulletinARN}/success`;
export const errorARN = `${bulletinARN}/failed`

export default config;