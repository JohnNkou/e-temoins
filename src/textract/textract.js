import { TextractClient, DetectDocumentTextCommand, AnalyzeDocumentCommand } from '@aws-sdk/client-textract';
import fs from 'fs/promises';

const config = {
   region:'us-east-1',
   credentials:{ accessKeyId:'AKIATNHOUSMIRJQXVKRI', secretAccessKey:'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' },
   collectionName:(process.env.TESTING)? 'FF':'Dev'
},
client = new TextractClient(config),
formKeys = ['Candidats ayant obtenu au moins une voix', 'BV', 'Bulletins de vote non-valides', 'SV.bv', 'Total Candidats', 'Taux de Participation', 'Suffrages valablement Exprimés', 'Total Electeurs sur la liste', 'Total des Votants sur la liste', 'Territoires Villes','sect_chef_com', 'Provinces'],
tableHead = ['No.', 'Organisations', 'Candidats', 'Voix'],
AllRegex = /[^A-ZÀ-Ž\s-._]/ig/*,
response = JSON.parse((await fs.readFile('/Users/flashbell/Node/e-temoins/src/textract/response.json')).toString())*/;

export default class textract{
   constructor(){
      this.analyzeDocument = this.analyzeDocument.bind(this);
   }

   getIds(blocks){
      let ids = {};

      blocks.forEach((block)=>{
         ids[block.Id] = block;
      })

      return ids;
   }

   createCommand(file,features){ console.log('features',features);
      let command = new AnalyzeDocumentCommand({
         Document:{
            Bytes:file
         },
         FeatureTypes: features
      });

      return client.send(command);
   }

   async analyzeDocument({ refFile, voiceFile, refResponse,voiceResponse }){
      try{
         let response = refResponse ||  await this.createCommand(refFile,['FORMS']),
         blocks = response.Blocks,
         ids,formResult,
         voiceLength = voiceFile.length,
         forms = [],
         tables = [],
         missing = [];

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
         return Promise.reject({error});
      }
   }

   getForm(blocks,ids){
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

   getTables(blocks,ids){
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

/*let file = await fs.readFile('/Users/alainkashoba/Desktop/head.png'),
file2 = await fs.readFile('/Users/alainkashoba/Desktop/voice.png'),
t = new textract(),
refResponse = JSON.parse((await fs.readFile('response.json')).toString()),
voiceResponse = JSON.parse((await fs.readFile('voice_0')).toString()),
d = await t.analyzeDocument({ refFile:file, voiceFile:[file2,file2], refResponse, voiceResponse:[voiceResponse,voiceResponse] }); console.log('d',d);

fs.writeFile('head.json',JSON.stringify(d));*/

/*let file = JSON.parse((await fs.readFile('head.json')).toString());
console.log(file.tables[0]);*/