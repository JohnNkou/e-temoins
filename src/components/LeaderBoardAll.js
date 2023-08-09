import axios from 'axios'
import { useState, useEffect } from 'react';

export default function LeaderBoardAll(){
	let [records,setRecords] = useState([]);

	useEffect(()=>{
		axios.get('/api/leaderBoard?all=true').then((response)=>{
			let payload = response.data;

			setRecords(payload.data);
		}).catch((error)=>{
			alert("LeaderBoardAll ERror");
			console.error(error);
		})
	},[true])

	return (
		<div className="col-xl-3 col-xxl-4">
			<div className="row">
				<div className="col-xl-12">
											<div className="card d-flex flex-xl-column flex-sm-column flex-md-row flex-column">
												<div className="card-body text-center profile-bx">
													<h3 className='text-black'>Candidats en tête</h3>
												</div>
												<div className="card-body col-xl-12 col-md-6 col-sm-12 activity-card">
													{records.map((record,i)=>{
														return (
															<div key={i} className="media mb-4">
																<span className="p-3 border me-3 rounded">
																	<img width='50' src={`/profiles/${record.image}`} />
																</span>
																<div className="media-body">
																	<p className="fs-14 mb-1 text-black font-w500">{record.noms} <strong>{record.total} voix</strong></p>
																	<span className="fs-14">{record.domaine}</span>
																</div>
															</div>
														)
													})}
												</div>
											</div>
										</div>
									</div>
								</div>
	)
}