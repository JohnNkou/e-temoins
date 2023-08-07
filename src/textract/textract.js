import { TextractClient, DetectDocumentTextCommand } from '@aws-sdk/client-textract';
import fs from 'fs/promises';

const config = {
   region:'us-east-1',
   credentials:{ accessKeyId:'AKIATNHOUSMIRJQXVKRI', secretAccessKey:'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' },
   collectionName:(process.env.TESTING)? 'FF':'Dev'
},
client = new TextractClient(config);

export default async function textract(file){
   let command = new DetectDocumentTextCommand({
         Document:{ Bytes:file }
   }),
   response = await client.send(command).catch((error)=> ({error})),
   votes,
   length,
   block;

   if(response.error){
      throw response.error;
   }
   else{
      votes = [];
      length = response.Blocks.length;
      
      for(let i=1; i < length && votes.length != 3; i++){
         block = response.Blocks[i];

         if(block.Text.indexOf('No.') != -1){
            votes.push(block.Text.replace(/\D/g,''));
         }
      }

      return { votes };
   }
}