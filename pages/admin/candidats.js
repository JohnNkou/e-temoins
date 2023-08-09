import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import App from '../../src/views/main/App.js'
import CommonScript from '../../src/components/CommonScript'
import Candidats from '../../src/views/candidat'

let apiUrl = '/api/candidat',
customLink = <link href="/vendor/datatables/css/jquery.dataTables.min.css" rel="stylesheet" />;

export default function Candidat(){
	let [candidats, setCandidats] = useState([]),
	[options] = useState(["","Presidentiel","National","Provincial"]),
	[selected,setSelected] = useState(""),
	[showModal,setShowModal] = useState(false),
	formRef = React.createRef(),
	modalClass = `modal fade ${(showModal)? 'show':''}`,
	modalDisplay = (showModal)? 'block':'none';

	useEffect(()=>{
		axios.get(apiUrl).then((response)=>{
			let payload = response.data;

			setCandidats(payload.data);
		}).catch((error)=>{
			alert("Erreur on fetch candidat");
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

		for(let i=0; i < length; i++){
			el = els[i];

			if(el.tagName && el.name){
				if(!el.value){
					missed = true;
					console.log('element',el.name,'missed',el.value);
				}
			}
		}

		if(missed){
			alert("Completez toute les valeur");
		}
		else{
			axios.post(apiUrl,form).then((response)=>{
				console.log("Great",response);
				form.reset();
				setSelected("");
				alert("Candidat ajouté");
			}).catch((error)=>{
				console.error(error);
			})
		}
	};

	function handler(event){
		let target = event.target,
		className = target.className,
		type = target.type;

		if(className && className.indexOf('btn-close') != -1 || type == 'reset'){
			event.preventDefault();
			setShowModal(false);
			formRef.current.reset();
		}
	}

	return (
		<App title='Candidats' customLink={customLink}>
			<div onClick={handler} className="content-body">
			            {/*<!-- row -->*/}
						<div className="container-fluid">
							<div className="d-flex flex-wrap mb-4 row">
								<div className="col-xl-3 col-lg-4 mb-2">
									<h6 className="text-black fs-16 font-w600 mb-1">{candidats.length} Candidats</h6>
									<span className="fs-14">Based your preferences</span>
								</div>
								<div className="col-xl-9 col-lg-8 d-flex flex-wrap">
									<div className="me-auto">
										<a href="#" className="btn btn-primary btn-rounded me-2 mb-2">Tout</a>
										<a href="#" className="btn btn-primary btn-rounded me-2 light mb-2">Presidentiel</a>
										<a href="#" className="btn btn-primary btn-rounded me-2 light mb-2">National</a>
										<a href="#" className="btn btn-primary btn-rounded me-2 light mb-2">Provincial</a>
										<a href="#" onClick={(event)=> {event.preventDefault(); setShowModal(true)}}>Ajouter un candidat</a>
									</div>
									<select className="form-control style-3 default-select mt-3 mt-sm-0 me-3">
										<option>Newest</option>
										<option>Latest</option>
									</select>
								</div>
							</div>
							<Candidats />
			            </div>
			            <div className={modalClass} id="basicModal" style={{display:modalDisplay}} aria-hidden="true">
	                                        <div className="modal-dialog" role="document">
	                                        	<form ref={formRef} onSubmit={submitForm}>
		                                            <div className="modal-content">
		                                                <div className="modal-header">
		                                                    <h5 className="modal-title">Ajouter candidat</h5>
		                                                    <button type="button" className="btn-close" data-bs-dismiss="modal">
		                                                    </button>
		                                                </div>
		                                                <div className="modal-body">
						                                        <div className="mb-3">
						                                            <input name='nom' type="text" className="form-control input-default " placeholder="Nom" />
						                                        </div>
						                                        <div className="mb-3">
						                                            <input name='prenom' type="text" className="form-control input-default " placeholder="Prenom" />
						                                        </div>
						                                        <div className="mb-3">
						                                            <input name='postnom' type="text" className="form-control input-default " placeholder="PostNom" />
						                                        </div>
						                                        <div className="mb-3">
						                                            <input name='numero' type="text" className="form-control input-default " placeholder="Numero" />
						                                        </div>
						                                        <div className="mb-3">
						                                            <label>Domaine </label>
						                                            <div className="dropdown bootstrap-select default-select form-control wide mb-3">
						                                            	<select value={selected} name='domaine' className="default-select form-control wide mb-3" tabIndex="null">
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
						                                    	<div className='mb-3'>
						                                        	<div className="input-group mb-3">
																		<button className="btn btn-primary btn-sm" type="button">Image</button>
							                                            <div className="form-file">
							                                                <input name='image' type="file" className="form-file-input form-control" />
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