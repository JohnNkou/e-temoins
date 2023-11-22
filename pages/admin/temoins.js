import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import App from '../../src/views/main/App'
import CommonScript from '../../src/components/CommonScript';

let apiUrl = '/api/temoin',
apiUrl2 = '/api/candidat',
customLink = <link href="/vendor/datatables/css/jquery.dataTables.min.css" rel="stylesheet" />;

export default function Temoin(){
	let [temoins, setTemoins] = useState([]),
	[candidats, setCandidats] = useState([]),
	[options] = useState(["","Kinshasa","Bandundun","Equateur"]),
	[selected,setSelected] = useState(''),
	[selected2, setSelected2] = useState({}),
	[showModal,setShowModal] = useState(false),
	formRef = React.createRef(),
	modalClass = `modal fade ${(showModal)? 'show':''}`,
	modalDisplay = (showModal)? 'block':'none';

	useEffect(()=>{
		axios.get(apiUrl).then((response)=>{
			let payload = response.data;

			setTemoins(payload.data);
		}).catch((error)=>{
			alert("Erreur on fetching Temoint");
			console.error(error);
		})

		axios.get(apiUrl2).then((response)=>{
			let payload = response.data;

			setCandidats(payload.data);
		}).catch((error)=>{
			alert("Error fetching Candidats");
			console.error(error);
		})
	},[true])

	async function submitForm(event){
		event.preventDefault();

		let form = formRef.current,
		els = form.elements,
		missed = false,
		value,
		length = els.length,
		el;

		axios.post(apiUrl,form).then((response)=>{
			console.log("Great",response);
			alert("Temoin inseré avec success");
			form.reset();
		}).catch((error)=>{
			console.error(error);
			alert("Erreur pendant l'insertiong du temoin");
		})
	};

	function handler(event){
		let target = event.target,
		className = target.className;

		if(className && className.indexOf('btn-close') != -1 || target.type == 'reset'){
			setShowModal(false);
			formRef.current.reset();
		}
	}

	return (
		<App title='Temoins' customLink={customLink}>
			<div onClick={handler} className="content-body">
			            {/*<!-- row -->*/}
						<div className="container-fluid">
							<div className="d-flex flex-wrap mb-4 row">
								<div className="col-xl-3 col-lg-4 mb-2">
									<h6 className="text-black fs-16 font-w600 mb-1">{temoins.length} Temoinss</h6>
									<span className="fs-14">Based your preferences</span>
								</div>
								<div className="col-xl-9 col-lg-8 d-flex flex-wrap">
									<div className="me-auto">
										<a href="#" className="btn btn-primary btn-rounded me-2 mb-2">Tout</a>
										<a href="#" className="btn btn-primary btn-rounded me-2 light mb-2">Kinshasa</a>
										<a href="#" className="btn btn-primary btn-rounded me-2 light mb-2">Bandundun</a>
										<a href="#" className="btn btn-primary btn-rounded me-2 light mb-2">Equateur</a>
										<a href="#" onClick={()=> setShowModal(true)}>Ajouter un temoin</a>
									</div>
									<select className="form-control style-3 default-select mt-3 mt-sm-0 me-3">
										<option>Newest</option>
										<option>Latest</option>
									</select>
								</div>
							</div>
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
													<th>Email</th>
													<th>Telephon</th>
													<th>Province</th>
												</tr>
											</thead>
											<tbody>
												{temoins.map((candidat,i)=>{
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
																		<svg className="me-3" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
																			<path d="M0.000732422 7.27273C0.000732422 3.25611 3.25684 0 7.27346 0H42.728C46.7446 0 50.0007 3.25611 50.0007 7.27273V42.7273C50.0007 46.7439 46.7446 50 42.728 50H7.27346C3.25684 50 0.000732422 46.7439 0.000732422 42.7273V7.27273Z" fill="#D3D3D3"/>
																			<path d="M0.000732422 7.27273C0.000732422 3.25611 3.25684 0 7.27346 0H42.728C46.7446 0 50.0007 3.25611 50.0007 7.27273V42.7273C50.0007 46.7439 46.7446 50 42.728 50H7.27346C3.25684 50 0.000732422 46.7439 0.000732422 42.7273V7.27273Z" fill="#F0780A"/>
																			<path d="M12.8892 12.8887C14.4645 11.3134 16.3346 10.0638 18.3928 9.21129C20.451 8.35875 22.657 7.91996 24.8848 7.91996C27.1126 7.91996 29.3185 8.35875 31.3767 9.21129C33.4349 10.0638 35.305 11.3134 36.8803 12.8887C38.4556 14.464 39.7052 16.3341 40.5577 18.3923C41.4103 20.4505 41.8491 22.6565 41.8491 24.8842C41.8491 27.112 41.4103 29.318 40.5577 31.3762C39.7052 33.4344 38.4556 35.3045 36.8803 36.8798L30.8825 30.882C31.6702 30.0944 32.295 29.1593 32.7212 28.1302C33.1475 27.1011 33.3669 25.9981 33.3669 24.8842C33.3669 23.7704 33.1475 22.6674 32.7212 21.6383C32.295 20.6092 31.6702 19.6741 30.8825 18.8865C30.0949 18.0988 29.1598 17.474 28.1307 17.0478C27.1016 16.6215 25.9987 16.4021 24.8848 16.4021C23.7709 16.4021 22.6679 16.6215 21.6388 17.0478C20.6097 17.474 19.6746 18.0988 18.887 18.8865L12.8892 12.8887Z" fill="white"/>
																			<path d="M12.8892 36.8798C9.70778 33.6984 7.92048 29.3835 7.92048 24.8843C7.92048 20.385 9.70778 16.0701 12.8892 12.8887C16.0706 9.70727 20.3856 7.91997 24.8848 7.91996C29.384 7.91996 33.6989 9.70726 36.8803 12.8887L30.8825 18.8865C29.2918 17.2958 27.1344 16.4021 24.8848 16.4021C22.6352 16.4021 20.4777 17.2958 18.887 18.8865C17.2963 20.4772 16.4026 22.6346 16.4026 24.8843C16.4026 27.1339 17.2963 29.2913 18.887 30.882L12.8892 36.8798Z" fill="white"/>
																		</svg>
																		<div className="media-body text-nowrap">
																			<h6 className="text-black font-w600 fs-16 mb-0">Mosciski Inc.</h6>
																			<span className="fs-14">Creative Design Agency</span>
																		</div>
																	</div>
																</td>
																<td>{candidat.noms}</td>
																<td>{candidat.email}</td>
																<td>{candidat.telephone}</td>
																<td>{candidat.province}</td>
															</tr>
												})}
											</tbody>
										</table>
									</div>
								</div>
							</div>
			            </div>

			            <div className={modalClass} id="basicModal" style={{display:modalDisplay}} aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                        	<form ref={formRef} onSubmit={submitForm}>
	                                            <div className="modal-content">
	                                                <div className="modal-header">
	                                                    <h5 className="modal-title">Ajouter temoin</h5>
	                                                    <button type="button" className="btn-close" data-bs-dismiss="modal">
	                                                    </button>
	                                                </div>
	                                                <div className="modal-body">
					                                        <div className="mb-3">
					                                            <input name='nom'required type="text" className="form-control input-default " placeholder="Nom" />
					                                        </div>
					                                        <div className="mb-3">
					                                            <input name='prenom' required type="text" className="form-control input-default " placeholder="Prenom" />
					                                        </div>
					                                        <div className="mb-3">
					                                            <input name='postnom' required type="text" className="form-control input-default " placeholder="PostNom" />
					                                        </div>
					                                        <div className="mb-3">
					                                            <input name='password' required type="password" className="form-control input-default " placeholder="Mot de passe" />
					                                        </div>
					                                        <div className="mb-3">
					                                            <input name='email' required type="email" className="form-control input-default " placeholder="Email" />
					                                        </div>
					                                        <div className="mb-3">
					                                            <input name='telephone' required type="telephone" className="form-control input-default " placeholder="Telephone" />
					                                        </div>
					                                        <div className="mb-3">
					                                            <label>Province </label>
					                                            <div className="dropdown bootstrap-select default-select form-control wide mb-3">
					                                            	<select required value={selected} name='province' className="default-select form-control wide mb-3" tabIndex="null">
					                                            		{options.map((opt,i)=>{
					                                            			return <option value={opt} key={i}>{opt}</option>
					                                            		})}
																	</select>
																	<button type="button" tabIndex="-1" className="btn dropdown-toggle btn-light" data-bs-toggle="dropdown" role="combobox" aria-owns="bs-select-1" aria-haspopup="listbox" aria-expanded="false" title="Option 3">
																		<div className="filter-option">
																			<div className="filter-option-inner">
																				<div className="filter-option-inner-inner">{selected}</div>
																			</div> 
																		</div>
																	</button>
																	<div className="dropdown-menu" style={{maxHeight:'402.25px', overflow:'hidden', minHeight:'0px',}}>
																		<div className="inner show" role="listbox" id="bs-select-1" tabIndex="-1" aria-activedescendant="bs-select-1-2" style={{maxHeight:'386.25px', overflowY:'auto', minHeight:'0px'}}>
																			<ul onClick={(event)=> {
																				event.preventDefault();
																				let target = event.target,
																				ita = target.getAttribute('ita');

																				setSelected(ita);
																			}} className="dropdown-menu inner show" role="presentation" style={{marginTop:'0px', marginBottom:'0px'}}>
																				{options.map((opt,i)=>{
																					return <li key={i} className="">
																								<a ita={opt} role="option" className="dropdown-item" id="bs-select-1-0" tabIndex="0" aria-setsize="3" aria-posinset="1">
																									<span ita={opt} className="text">{opt}</span>
																								</a>
																							</li>
																				})}
																			</ul>
																		</div>
																	</div>
																</div>
					                                        </div>
					                                        <div className="mb-3">
					                                            <label className='me-3 align-middle'>Relier candidats </label>
					                                            <select multiple name='idCandidats' className='align-middle' required>
					                                            	<option value=''></option>
					                                            	{candidats.map((candidat)=>{
					                                            		return <option value={candidat.id}>{candidat.noms}</option>
					                                            	})}
					                                            </select>
					                                        </div>
					                                    	<div className='mb-3'>
					                                        	<div className="input-group mb-3">
																	<button className="btn btn-primary btn-sm" type="button">Image</button>
						                                            <div className="form-file">
						                                                <input required name='image' type="file" className="form-file-input form-control" />
						                                            </div>
						                                        </div>
					                                        </div>
	                                                </div>
	                                                <div className="modal-footer">
	                                                    <button type="reset" className="btn btn-danger light" data-bs-dismiss="modal">Annuler</button>
	                                                    <button type="submit" className="btn btn-primary">Ajouter</button>
	                                                </div>
	                                            </div>
                                            </form>
                                        </div>
                                    </div>
                                    <CommonScript>
                                    	<script src="/vendor/datatables/js/jquery.dataTables.min.js"></script>
                                    	<script dangerouslySetInnerHTML={{__html:`
											(function($) {
												var table = $('#example5').DataTable({
													searching: false,
													paging:true,
													select: false,
													//info: false,         
													lengthChange:false 
													
												});
												$('#example tbody').on('click', 'tr', function () {
													var data = table.row( this ).data();
													
												});
											})(jQuery);
										`}}>
										</script>
                                    </CommonScript>
			        </div>
		</App>
	)
}