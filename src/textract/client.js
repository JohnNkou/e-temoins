import { TextractClient } from '@aws-sdk/client-textract';
import { NodeHttpHandler } from '@smithy/node-http-handler'
import { Agent } from 'http'

let instance;

export default function getClient(){
	if(instance){
		return instance;
	}
	else{
		const config = {
		   region:'us-east-1',
		   credentials:{ accessKeyId:'AKIATNHOUSMIRJQXVKRI', secretAccessKey:'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' },
		   collectionName:(process.env.TESTING)? 'FF':'Dev',
		   requestHandler: new NodeHttpHandler({
		      httpAgent: new Agent({ keepAlive:true, keepAliveMsecs:1200000 })
		   })
		},
		client = new TextractClient(config);

		return client;
	}
}