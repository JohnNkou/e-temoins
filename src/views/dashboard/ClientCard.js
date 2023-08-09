import { useState, useEffect } from 'react'
import axios from 'axios';

export default function ClientCard({ title, url, link }){
	let [total,setTotal] = useState(0);

	useEffect(()=>{
		axios.get(url).then((response)=>{
			let payload = response.data;

			setTotal(payload.data[0].total);
		}).catch((error)=>{
			alert("Erreur lors de la recherche de "+title);
		})
	})

	function handle(event){
		event.preventDefault();

		if(link){
			location.href = link;
		}
	}

	return (
		<div onClick={handle} className="col">
			                                <div className="card card-bx card-content" style={{background:"#434243"}}>
			                                    <div className="card-body">
			                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#ffffff" className="bi bi-pass-fill" viewBox="0 0 16 16">
			                                        	<path d="M10 0a2 2 0 1 1-4 0H3.5A1.5 1.5 0 0 0 2 1.5v13A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 12.5 0H10ZM4.5 5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1Zm0 2h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1Z"/>
			                                        </svg>
			                                        <div className="card-info">
			                                            <h4 className="title">{total}</h4>
			                                            <p>{title}</p>
			                                        </div>
			                                    </div>
			                                </div>
			                            </div>
	)
}