import { useState,useEffect } from 'react';

export default function LoadingText(props){
	let [txt,setTxt] = useState('');

	useEffect(()=>{
		let c = setInterval(()=>{
			if(txt.length == 10){
				txt = '.'
			}
			else{
				txt += '.'
			}

			setTxt(txt);
		},50)

		return ()=>{
			clearInterval(c);
		}
	},[true])

	return <span style={{fontSize:'2em'}} {...props}>{txt}</span>
}