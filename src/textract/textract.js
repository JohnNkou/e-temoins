import { TextractClient, DetectDocumentTextCommand, AnalyzeDocumentCommand, BadDocumentException,DocumentTooLargeException, InternalServerError, InvalidParameterException, ThrottlingException, UnsupportedDocumentException,TextractServiceException } from '@aws-sdk/client-textract';
import { NodeHttpHandler } from '@smithy/node-http-handler'
import { Agent } from 'http'
import fs from 'fs/promises';

const config = {
   region:'us-east-1',
   credentials:{ accessKeyId:'AKIATNHOUSMIRJQXVKRI', secretAccessKey:'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' },
   collectionName:(process.env.TESTING)? 'FF':'Dev',
   requestHandler: new NodeHttpHandler({
      httpAgent: new Agent({ keepAlive:true, keepAliveMsecs:60000 })
   })
},
client = new TextractClient(config),
formKeys = ['Candidats ayant obtenu au moins une voix', 'BV', 'Bulletins de vote non-valides', 'SV.bv', 'Total Candidats', 'Taux de Participation', 'Suffrages valablement Exprimés', 'Total Electeurs sur la liste', 'Total des Votants sur la liste', 'Territoires Villes','sect_chef_com', 'Provinces'],
tableHead = ['No.', 'Organisations', 'Candidats', 'Voix'],
AllRegex = /[^A-ZÀ-Ž\s-._]/ig/*,
response = JSON.parse((await fs.readFile('/Users/flashbell/Node/e-temoins/src/textract/response.json')).toString())*/;

var instance;

export default function textract(){

   if(!instance){
      instance = this;
   }
   else{
      return instance;
   }

   this.getIds = function(blocks){
      let ids = {};

      blocks.forEach((block)=>{
         ids[block.Id] = block;
      })

      return ids;
   }

   this.createCommand  =  function(file,features){
      let command = new AnalyzeDocumentCommand({
         Document:{
            Bytes:file
         },
         FeatureTypes: features
      });

      return client.send(command);
   }

   this.exceptionHandler =  function(error){
      if(error instanceof TextractServiceException){
         if(error instanceof UnsupportedDocumentException){
            return { custom:true, msg:'Veuillez choisir un format de fichier suivant(PNG,JPEG,PDF,TIFF)' }
         }
         else if(error instanceof ThrottlingException){
            return { custom:true, retry:true };
         }
         else if(error instanceof DocumentTooLargeException){
            return { custom:true, msg:"Les fichiers envoyés sont trop lourd. Veuillez réduire la taille des fichiers ou envoyer moins de photos" }
         }
         else if(error instanceof BadDocumentException){
            return { custom:true, msg:"Fichier image incorrect",error }
         }
         else{
            return { custom:true, msg:'Une erreur est survenue lors du traitement des fichiers. Veuillez recommencer',error }
         }
      }
      else{
         return { error };
      }
   }

   this.analyzeDocument =  async function({ refFile, voiceFile, refResponse,voiceResponse }){
      try{
         let dateNow = Date.now(),
         response = refResponse ||  await this.createCommand(refFile,['FORMS']),
         dateThen = Date.now(),
         blocks = response.Blocks,
         ids,formResult,
         voiceLength = voiceFile.length,
         forms = [],
         tables = [],
         missing = [];

         console.log("it took ",dateThen - dateNow,"To process the datas");

         //console.log('response',blocks);

         //await fs.writeFile('response.json',JSON.stringify(response));

         ids = this.getIds(blocks);
         formResult = this.getForm(blocks,ids);
         forms = formResult.forms;
         missing = formResult.missing;

         if(missing.length == 0){
            for(let i=0; i < voiceLength; i++){
               let f = voiceFile[i],
               index = `voice_${i}`,
               response = (voiceResponse && voiceResponse[i])? voiceResponse[i] : await this.createCommand(f,['TABLES']),
               blocks = response.Blocks,
               ids = this.getIds(blocks),
               datas = this.getTables(blocks,ids);

               //await fs.writeFile(index,JSON.stringify(response));

               tables = tables.concat(datas.tables)
            }
         }

         return { forms, tables, missing };
      }
      catch(error){
         error = this.exceptionHandler(error);

         return Promise.reject(error);
      }
   }

   this.getForm = function(blocks,ids){
      let forms = [],
      missing = [...formKeys];

      blocks.filter((block)=> block.BlockType == 'KEY_VALUE_SET').forEach((block)=>{
         try{
            if(block.EntityTypes.indexOf('KEY') != -1){
               let relations = block.Relationships;
               if(relations){
                  let key = relations[1].Ids.reduce((text,next)=>{
                     text += ids[next].Text + ' ';
                     return text;
                  },''),
                  valueBlock = ids[relations[0].Ids[0]],
                  value = ids[valueBlock.Relationships[0].Ids[0]].Text;

                  key = key.replace(AllRegex,'').trim();
                  value = value.trim();

                  if(missing.indexOf(key) != -1){
                     let index = missing.indexOf(key);
                     key = missing[index];
                     missing.splice(index,1);
                  }

                  forms.push([key,value]);
               }
            }
         }
         catch(e){
            console.error("Error with block");
            console.error(block);
            throw e;
         }
      })

      return { forms, missing }
   }

   this.getTables = function(blocks,ids){
      let tables = [[]],
      indexTable = 0,
      tHead = [...tableHead];

      blocks.filter((block)=> block.BlockType == 'CELL').forEach((block)=>{
         if(block.Relationships){
            block.Relationships.forEach((bb)=>{
                     let bIds = bb.Ids,
                     row = block.RowIndex - 1,
                     col = block.ColumnIndex -1,
                     text = '';

                     bIds.forEach((id)=>{
                        if(ids[id].BlockType == 'WORD'){
                           text +=  ids[id].Text + ' ';
                        }
                     })

                     text = text.trim();

                     if(tHead.indexOf(text) != -1){
                        return;
                     }

                     if(!tables[indexTable][row]){
                        tables[indexTable][row] = [text];
                     }
                     else if(!tables[indexTable][row][col]){
                        tables[indexTable][row][col] = text;
                     }
                     else{
                        tables[++indexTable] = [];
                        tables[indexTable][row] = [];
                        tables[indexTable][row][col] = text;
                     }
                  })
               }
      })

      return { tables, tHead }
   }
}

/*let refFile = await fs.readFile('/Users/alainkashoba/Desktop/page.html'),
voiceFile = await fs.readFile('/Users/alainkashoba/Desktop/page.html'),
t = new textract(),
refResponse, //= JSON.parse((await fs.readFile('response.json')).toString()),
voiceResponse, // = JSON.parse((await fs.readFile('voice_0')).toString()),
d = await t.analyzeDocument({ refFile, voiceFile, refResponse }); console.log('d',d);

//fs.writeFile('head.json',JSON.stringify(d));

/*let file = JSON.parse((await fs.readFile('head.json')).toString());
console.log(file.tables[0]);*/