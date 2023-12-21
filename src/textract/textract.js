import { TextractClient, DetectDocumentTextCommand, AnalyzeDocumentCommand, BadDocumentException,DocumentTooLargeException, InternalServerError, InvalidParameterException, ThrottlingException, UnsupportedDocumentException,TextractServiceException } from '@aws-sdk/client-textract';
import fs from 'fs/promises';
import getClient from './client.js'
import { sanitize, isDomain,pvRef, dePonctuate } from '../conversion.js'
import { getFileName, isDev, domainKeys } from '../utils/helper.js'
import { pvURI,pvARN, voixURI, voixARN, preuveURI, preuveARN } from '../ob/config.js'

const formKeys =  Object.keys(pvRef),
tableHead = ['No.', 'Organisations', 'Candidats', 'Voix'],
AllRegex = /[^A-ZÀ-Ž\s-._]/ig,
voiceLink = (isDev())? voixURI: voixARN,
preuveLink = (isDev())? preuveURI: preuveARN,
pvLink = (isDev())? pvURI: pvARN;
/*,
response = JSON.parse((await fs.readFile('/Users/flashbell/Node/e-temoins/src/textract/response.json')).toString())*/;

export default function textract(userProvince, userDistrict){
   const client = getClient(),
   instance = this;

   if(!userProvince || !userDistrict){
      throw Error("No province no district given in constructor");
   }

   let analyzedDocument = 0;

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
      else if(error instanceof CustomError){
         return { custom:true, msg: error.toString() }
      }
      else{
         error.msg = error.toString();
         return error;
      }
   }

   function updateDocumentHandler(e){
      if(e instanceof TextractServiceException){
         analyzedDocument++;
      }
   }

   async function analyzeForm(filepath,domain){
      let file = await fs.readFile(filepath),
      response = await instance.createCommand(file,['FORMS']),
      blocks = response.Blocks,
      ids = instance.getIds(blocks),
      formResult = instance.getForm(blocks,ids,domain != domainKeys[0]),
      form = formResult.forms,
      missing = formResult.missing,
      unwanted = formResult.unwanted;

      return { form, missing, file, unwanted };
   }

   this.analyzeDocument =  async function({ donnees, refResponse,voiceResponse }){
      let keys = domainKeys,
      keyLength = keys.length,
      dataReturn = {};

      try{
         for(let i=0; i < keyLength; i++){
            let domain = keys[i],
            data = donnees[domain];

            if(!data){
               continue;
               //throw new CustomError(`No ${domain} found in data`);
            }

            dataReturn[domain] = { };

            try{
               let path = data.reference[0].path,
               d = await analyzeForm(path,domain);
               dataReturn[domain].form = d.form;
               dataReturn[domain].missing = (d.missing.length)? d.missing:null;
               dataReturn[domain].refName = pvLink + '/' + getFileName(path);
               dataReturn[domain].refFile = d.file;

               analyzedDocument++;

               if(d.missing.length == 0){
                  d = await analyzeTable(data.voix);
                  dataReturn[domain].tables = d.tables;
                  dataReturn[domain].voixNames = d.names;
                  dataReturn[domain].voixFiles = d.files;
               }
               else{
                  console.error("Manquand dans fichier reference pour domaine",domain,d.missing,d.unwanted);
                  if(domain == domainKeys[0]){
                     throw new CustomError("Le fichier reference presidentiel n'a pas pu etre correctement traité, Veuillez vous assurez que les photos references ont tout les éléments d'en-tête suivants:  "+d.missing.join('---'))
                  }
                  return { dataReturn, analyzedDocument };
               }
            }
            catch(e){
               console.error("Error with domain",domain);
               updateDocumentHandler(e);

               throw e;
            }
         }

         return { dataReturn, analyzedDocument };
      }
      catch(error){
         error = this.exceptionHandler(error);
         error.analyzedDocument = analyzedDocument;

         return Promise.reject(error);
      }
   }

   async function analyzeTable(files){
      let length = files.length,
      tables = [], names = [], dales = [];

      for(let i=0; i < length; i++){
         let path = files[i].path,
         file = await fs.readFile(path),
         response = await instance.createCommand(file,['TABLES']),
         blocks = response.Blocks,
         ids = instance.getIds(blocks),
         data = instance.getTables(blocks,ids);

         analyzedDocument++;

         tables = tables.concat(data.tables);
         names.push(`${voiceLink}/${getFileName(path)}`);
         dales.push(file);
      }

      return { tables, names, files:dales }
   }

   this.getText = (Ids,ids)=>{
      return Ids.reduce((text,next)=>{
         text += ids[next].Text + ' ';
         return text;
      },'');
   }

   this.getForm = function(blocks,ids,checkUser){
      let forms = [],
      missing = [...formKeys],
      unwanted = [],
      key,valueBlock,
      value,relations;

      blocks.forEach((block)=>{
         try{
            if(block.BlockType == 'KEY_VALUE_SET'){
               if(block.EntityTypes.indexOf('KEY') != -1){
                  relations = block.Relationships;
                  if(relations && relations.length > 1){
                     if(!relations[0].Ids || !relations[1].Ids){
                        return;
                     }

                     key = dePonctuate(this.getText(relations[1].Ids,ids)).toLowerCase();
                     valueBlock = ids[relations[0].Ids[0]];
                     value = (!isDomain(key))? ((valueBlock.Relationships)? this.getText(valueBlock.Relationships[0].Ids,ids):null) :true;

                     if(isDomain(value)){
                        key = value;
                        value = true;
                     }

                     if(value === true){ console.log('key',key);
                        let newKey = 'legislative';
                        value = pvRef[newKey].conversion(key);
                        key = newKey;
                     }
                     else if(value){
                        value = value.toLowerCase();
                     }

                     key = sanitize(key.replace(AllRegex,'').trim());

                     if(value !== null){
                        value = value.trim();
                     }

                     if(missing.indexOf(key) != -1){
                        let index = missing.indexOf(key);
                        key = missing[index];
                        missing.splice(index,1);

                        if(key == 'provinces'){
                           value = sanitize(value);
                        }

                        if(checkUser){
                           if(key == 'provinces'){
                              if(value != userProvince){
                                 
                                 throw new CustomError(`Vous n'êtes pas authorizé à envoyer des pvs pour cette province.`);
                              }
                           }
                        }

                        forms.push([key,value]);
                     }
                     else{
                        unwanted.push([key,value]);
                     }
                  }
               }  
            }
         }
         catch(e){
            console.error("Error with block",relations,key,value,isDomain(key),forms,unwanted);
            console.error(block);
            throw e;
         }
      })

      return { forms, missing, unwanted }
   }

   this.getTables = function(blocks,ids){
      let tables = [[]],
      indexTable = 0,
      tHead = [...tableHead],
      removeNumber = 0,
      hightestColumn = 0;

      blocks.forEach((block)=>{
         if(block.BlockType == 'CELL'){
            if(block.Relationships){
               if(block.EntityTypes == 'COLUMN_HEADER'){
                  if(!removeNumber){
                     removeNumber = 1;
                  }
                  return;
               }
               block.Relationships.forEach((bb)=>{
                        let bIds = bb.Ids,
                        row = (block.RowIndex - 1) - removeNumber,
                        col = block.ColumnIndex -1,
                        text = '';

                        if(block.ColumnIndex > hightestColumn){
                           hightestColumn = block.ColumnIndex;
                        }

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
         }
      });

      if(tables[0].length == 0){
         throw new CustomError("Fichier voix envoyé incorrect")
      }

      if(hightestColumn < 3){
         throw new CustomError("Fichier voix envoyé incorrect");
      }

      return { tables, tHead }
   }
}

function CustomError(message){

   this.toString = function(){
      return message;
   }
}

async function useResponse({ refResponse, voiceResponse }){
   let t = new textract(),
   response = await t.analyzeDocument({refResponse, voiceResponse, userProvince:'nord kivu'});

   return response;
}

async function useFiles({ refFile, voiceFile }){
   let t = new textract(),
   response = await t.analyzeDocument({ refFile, voiceFile });
}

/*let { blocks, ids, checkUser } = JSON.parse((await fs.readFile('getFormBlocks')).toString());

let t = new textract('nord kivu','goma ville');

console.log(t.getForm(blocks,ids,checkUser))*/

/*try{
   let r = await useResponse({ refResponse: JSON.parse((await fs.readFile('response.json')).toString()), voiceResponse: [JSON.parse((await fs.readFile('voice_0')).toString()), JSON.parse((await fs.readFile('voice_0')).toString())] });
   console.log(r.tables);
}
catch(e){
   console.error(e);
}*/