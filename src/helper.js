import multiparty from 'multiparty';

export function multiParse(req){
	return new Promise((resolve,reject)=>{
		let form = new multiparty.Form();

		form.parse(req,(error,fields,files)=>{
			let data = {},
			file,
			removePath = [];
			if(error){
				return reject(error);
			}
			for(let name in fields){
				data[name] = fields[name][0];
			}
			for(let name in files){
				file = files[name][0];
				data[name] = file.originalFilename;
				removePath.push([file.path,file.originalFilename]);
			}

			resolve({ data,removePath,files });
		});
	})
}