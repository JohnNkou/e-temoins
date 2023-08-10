import { useState,useEffect } from 'react';
import fileToURL from '../fileToURLData'

export default function Uploadify(){
	let [files, setFiles] = useState([]);

	useEffect(()=>{
		let form = document.forms[0],
		b = form.elements.bulletins;

		b.onchange = async ()=>{
			let length = b.files.length;
			if(length){
				let newFiles = [];

				for(let i=0; i < length; i++){
					newFiles.push(await fileToURL(b.files[i]));
				}

				setFiles(newFiles);
			}
			else{
				setFiles([]);
			}
		}
	},[true]);

	function showFileDialog(event){
		event.preventDefault();

		let form = document.forms[0],
		b = form.elements.bulletins;

		b.click();
	}
	return (
		<div class="imageuploadify well">
			<div class="imageuploadify-overlay">
				<i class="fa fa-picture-o"></i>
			</div>
			<div class="imageuploadify-images-list text-center">
				<i class="fa fa-cloud-upload"></i>
				<span class="imageuploadify-message">+ Capture Bulletin</span>
				<button type="button" onClick={showFileDialog} class="btn btn-default" style={{backgroundColor: "white", color: "rgb(58, 160, 255)"}}>+ Capture Bulletin</button>
				{files.map((file)=>{
					return (
						<div class="imageuploadify-container" style={{marginLeft: "13px"}}>
							<div class="imageuploadify-details">
								<span>{file.name}</span>
							</div>
							<img src={file.data} />
						</div>
					)
				})}
			</div>
		</div>
	)
}