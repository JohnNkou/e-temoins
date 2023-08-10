export default function fileToURLData(file){
	return new Promise((resolve,reject)=>{
		let fileReader = new FileReader();
		fileReader.readAsDataURL(file);

		fileReader.onload = ()=>{
			resolve({ name:file.name, data:fileReader.result })
		}
		fileReader.onerror = (error)=>{
			reject(error);
		}
	})
}