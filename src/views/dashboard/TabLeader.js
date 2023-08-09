import { useState, useEffect } from 'react'
import axios from 'axios';
import LoadingText from '../../components/LoadingText'

export default function TabLeader(){
	let [records, setRecords] = useState([]),
	[loading,setLoading] = useState(false),
	[domaine,setDomaine] = useState('president'),
	loadingClass = (loading)? '':'whoosh';

	useEffect(()=>{
		fetchDomaine();
	},[true]);

	function fetchDomaine(d){
		let newDomaine = d || domaine,
		url = `/api/leaderBoard?column=${newDomaine}`;

		axios.get(url).then((response)=>{
			let payload = response.data;

			setRecords(payload.data);
			setDomaine(newDomaine);
		}).catch((error)=>{
			alert("Erreur lors de la recherche de "+newDomaine);
			setRecords([]);
		})
	}

	function handler(event){
		let target = event.target,
		newDomaine = target.getAttribute('domaine');

		if(newDomaine && newDomaine != domaine){
			event.preventDefault();
			fetchDomaine(newDomaine);
		}
	}

	return (
		<div onClick={handler} class="col-xl-6">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Vote en tête</h4>
                            </div>
                            <div class="card-body">
                            	<LoadingText className={loadingClass} />
                                <div class="row">
                                    <div class="col-sm-4">
                                        <div class="nav flex-column nav-pills mb-3">
                                            <a href="#v-pills-home" domaine='president' data-bs-toggle="pill" class="nav-link active show">Presidentiel</a>
                                            <a href="#v-pills-profile" domaine='national' data-bs-toggle="pill" class="nav-link">National</a>
                                            <a href="#v-pills-messages" domaine='provincial' data-bs-toggle="pill" class="nav-link">Provincial</a>
                                        </div>
                                    </div>
                                    <div class="col-sm-8">
                                        <div class="tab-content">
                                        	{records.map((record)=>{
                                        		return (
                                        			<div onClick={()=>{ location.href = `/profile?n=${record.numero}&column=${domaine}` }} class="media mb-4">
		                                            	<span class="p-3 border me-3 rounded"><img style={{width:'50px'}} src={`/profiles/${record.image}`} /></span>
		                                            	<div class="media-body">
		                                            		<p class="fs-14 mb-1 text-black font-w500">{record.noms}</p>
		                                            		<span class="fs-14"><strong>{record.total} voix</strong></span>
		                                            	</div>
		                                            </div>
                                        		)
                                        	})}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
	)
}