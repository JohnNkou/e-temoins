import axios from 'axios';
import { useState,useEffect } from 'react';

export default function bulletin(){
	let [bulletins,setBulletins] = useState([]);

	useEffect(()=>{
		axios.get('/api/bulletin').then((response)=>{
			let payload = response.data;

			setBulletins(payload.data);
		}).catch((error)=>{
			alert("Erreur pendant la recherche des bulletin");
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
															<th>Commentaire</th>
														</tr>
													</thead>
													<tbody>
														{bulletins.map((bulletin,i)=>{
															return <tr key={i}>
																		<td>
																			<div className="checkbox me-0 align-self-center">
																				<div className="form-check custom-checkbox mb-3 check-xs">
																					<input type="checkbox" className="form-check-input" checked id="check1" required />
																					<label className="form-check-label" htmlFor="check1"></label>
																				</div>
																			</div>
																		</td>
																		<td>{bulletin.id}</td>
																		<td>
																			<div className="media">
																				<img style={{height:'100px'}} src={`/upload/bulletin/${bulletin.img}`} />
																			</div>
																		</td>
																		<td>{bulletin.commentaire}</td>
																	</tr>
														})}
													</tbody>
												</table>
											</div>
										</div>
									</div>
	)
}