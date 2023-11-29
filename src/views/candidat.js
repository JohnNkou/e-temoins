import axios from 'axios';
import { useState,useEffect } from 'react';

export default function Candidat(){
	let [candidats,setCandidats] = useState([]),
	[hostname, setHostname] = useState('');

	useEffect(()=>{
		setHostname(document.location.hostname);
		axios.get('/api/candidat').then((response)=>{
			let payload = response.data;

			setCandidats(payload.data);
		}).catch((error)=>{
			alert("Erreur pendant la recherche des candidat");
			console.error(error);
		})
	},[true])

	return (
		<div className="row">
										<div className="col-xl-12">
											<div className="table-responsive">
												<table className="table display mb-4 dataTablesCard table-responsive-xl card-table" id="example5">
													<thead>
														<tr>
															<th>
																<div className="checkbox me-0 align-self-center">
																	<div className="form-check custom-checkbox mb-3 check-xs">
																		<input type="checkbox" className="form-check-input" checked id="checkAll" required />
																		<label className="form-check-label" htmlFor="checkAll"></label>
																	</div>
																</div>
															</th>
															<th>ID</th>
															<th>Image</th>
															<th>Noms</th>
															<th>Numero</th>
															<th>Domaine</th>
														</tr>
													</thead>
													<tbody>
														{candidats.map((candidat,i)=>{
															let imgPath;

															if(candidat.image.indexOf('amazonaws') != -1){
																imgPath = `${candidat.image}`;
															}
															else{
																imgPath = `http://${hostname}/${candidat.image}`;
															}


															return <tr key={i}>
																		<td>
																			<div className="checkbox me-0 align-self-center">
																				<div className="form-check custom-checkbox mb-3 check-xs">
																					<input type="checkbox" className="form-check-input" checked id="check1" required />
																					<label className="form-check-label" htmlFor="check1"></label>
																				</div>
																			</div>
																		</td>
																		<td>{candidat.id}</td>
																		<td>
																			<div className="media">
																				<img width='50' src={imgPath} />
																			</div>
																		</td>
																		<td>{candidat.noms}</td>
																		<td>{candidat.numero}</td>
																		<td>{candidat.domain}</td>
																	</tr>
														})}
													</tbody>
												</table>
											</div>
										</div>
									</div>
	)
}