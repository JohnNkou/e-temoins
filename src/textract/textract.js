import { TextractClient, DetectDocumentTextCommand, AnalyzeDocumentCommand } from '@aws-sdk/client-textract';
import fs from 'fs/promises';

const config = {
   region:'us-east-1',
   credentials:{ accessKeyId:'AKIATNHOUSMIRJQXVKRI', secretAccessKey:'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' },
   collectionName:(process.env.TESTING)? 'FF':'Dev'
},
client = new TextractClient(config),
file = await fs.readFile('/Users/alainkashoba/Downloads/bulletin.jpeg'),
formKeys = ['Candidats ayant obtenu au moins une voix', 'BV', 'Bulletins de vote non-valides', 'SV.bv', 'Total Candidats', 'Taux de Participation', 'Suffrages valablement Exprimés', 'Total Electeurs sur la liste', 'Total des Votants sur la liste', 'Territoires Villes','sect_chef_com', 'Provinces'],
tableHead = ['No.', 'Organisations', 'Candidats', 'Voix'],
AllRegex = /[^A-ZÀ-Ž\s-._]/ig,
response = JSON.parse((await fs.readFile('/Users/alainkashoba/Node/e-temoins/src/textract/response.json')).toString());

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

   async analyzeDocument(file){
      try{
         let command = new AnalyzeDocumentCommand({
            Document:{
               Bytes:file
            },
            FeatureTypes: ['TABLES','FORMS']
         }),
         //response = await client.send(command),
         blocks = response.Blocks,
         ids,datas;

         ids = this.getIds(blocks);
         datas = this.getFormTables(blocks,ids);

         return datas;
      }
      catch(error){
         return Promise.reject({error});
      }
   }

   async getFormTables(blocks,ids){
      let tables = [[]],
      forms = [],
      indexTable = 0,
      fKeys = [...formKeys],
      tHead = [...tableHead];

      blocks.filter((block)=> (block)=> block.BlockType == 'KEY_VALUE_SET' || block.BlockType == 'CELL').forEach((block)=>{
         switch(block.BlockType){
            case 'CELL':
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


                     if(tHead.indexOf(text) != -1){
                        let index = tHead.indexOf(text);
                        tHead.splice(index,1);
                     }
                  })
               }
               break;
            case 'KEY_VALUE_SET':
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



                     if(fKeys.indexOf(key) != -1){
                        let index = fKeys.indexOf(key);
                        fKeys.splice(index,1);
                     }

                     forms.push([key,value]);
                  }
               }
               break;
            }
      })

      return {
         tables, forms, fKeys, tHead
      }
   }
}

let t = new textract();

console.log(await t.analyzeDocument(file));
