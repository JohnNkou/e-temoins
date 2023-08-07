import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

let apiUrl = '/api/candidat';

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

	console.log('selected is',selected);

	useEffect(()=>{
		let main = document.getElementById('main-wrapper'),
		preloader = document.getElementById('preloader'),
		hamburger = document.querySelector('.hamburger');
		
		preloader.style.display = 'none';
		main.className = 'show';

		main.onclick = (event)=>{

			let target = event.target,
			className = target.className || "";

			if(className.indexOf('hamburger') != -1){
				if(className.indexOf('is-active') == -1){
					main.className += ' menu-toggle';
					hamburger.className += ' is-active';
				}
				else{
					main.className = 'show';
					hamburger.className = 'hamburger';
				}
			}
		}
	},[true]);

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
		<div onClick={handler}>
			<Head>
			    <title>Jobie - Job Portal Bootstrap Admin Dashboard</title>
			    {/*<!-- Favicon icon -->*/}
			    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon.png" />
				<link href="/vendor/datatables/css/jquery.dataTables.min.css" rel="stylesheet" />
				<link rel="stylesheet" href="vendor/chartist/css/chartist.min.css"/ >
				{/*<!-- Vectormap -->*/}
			    <link href="/vendor/bootstrap-select/dist/css/bootstrap-select.min.css" rel="stylesheet" />
			    <link href="/css/style.css" rel="stylesheet" />
				<link href="https://cdn.lineicons.com/2.0/LineIcons.css" rel="stylesheet" />
				<link href="/vendor/owl-carousel/owl.carousel.css" rel="stylesheet" />

			</Head>
			    {/*<!--*******************
			        Preloader start
			    ********************-->*/}
			    <div id="preloader">
			        <div className="sk-three-bounce">
			            <div className="sk-child sk-bounce1"></div>
			            <div className="sk-child sk-bounce2"></div>
			            <div className="sk-child sk-bounce3"></div>
			        </div>
			    </div>
			    {/*<!--*******************
			        Preloader end
			    ********************-->*/}

			    {/*<!--**********************************
			        Main wrapper start
			    ***********************************-->*/}
			    <div id="main-wrapper">

			        {/*<!--**********************************
			            Nav header start
			        ***********************************-->*/}
			        <div className="nav-header">
			            <a href="index.html" className="brand-logo">
							<svg className="logo-abbr" width="66.5px" height="66.5px">
								<g><path className="svg-logo-circle" fillRule="evenodd"  fill="rgb(64, 24, 157)"
								 d="M32.999,66.000 C14.774,66.000 -0.000,51.225 -0.000,33.000 C-0.000,14.775 14.774,-0.000 32.999,-0.000 C51.225,-0.000 66.000,14.775 66.000,33.000 C66.000,51.225 51.225,66.000 32.999,66.000 Z"/></g><g><path className="svg-logo-icon-text" fillRule="evenodd"  stroke="rgb(255, 255, 255)" strokeWidth="1px" strokeLinecap="butt" strokeLinejoin="miter" fill="rgb(255, 255, 255)"
								 d="M58.273,11.788 L53.346,35.007 C52.729,37.824 51.661,40.116 50.142,41.883 C48.623,43.602 46.868,44.939 44.874,45.894 C42.928,46.849 40.840,47.470 38.609,47.757 C36.379,48.091 34.243,48.258 32.202,48.258 C29.829,48.258 27.788,48.091 26.080,47.757 C24.371,47.470 22.852,47.040 21.523,46.467 C20.242,45.894 19.079,45.202 18.035,44.390 C16.991,43.530 15.947,42.599 14.902,41.597 L17.181,30.780 L30.565,30.780 C30.565,30.924 30.493,31.282 30.351,31.855 C30.256,32.380 30.138,33.025 29.995,33.789 C29.853,34.553 29.710,35.389 29.568,36.296 C29.473,37.203 29.426,38.039 29.426,38.803 C29.426,39.281 29.473,39.782 29.568,40.307 C29.663,40.832 29.829,41.334 30.066,41.811 C30.304,42.241 30.636,42.623 31.063,42.958 C31.538,43.244 32.107,43.387 32.771,43.387 C34.006,43.387 34.979,42.886 35.690,41.883 C36.450,40.832 37.114,38.946 37.683,36.224 L44.858,2.204 C50.110,4.228 54.714,7.552 58.273,11.788 Z"/>
								</g>
							</svg>
							<svg className="brand-title" width="101.5px" height="29.5px">
							<path className="svg-logo-text-path" fillRule="evenodd"  stroke="rgb(0, 0, 0)" strokeWidth="1px" strokeLinecap="butt" strokeLinejoin="miter" fill="rgb(64, 24, 157)"
							 d="M99.505,17.384 C99.302,18.169 98.998,18.840 98.593,19.398 L87.915,19.398 C87.813,19.955 87.737,20.487 87.687,20.994 C87.661,21.501 87.649,21.957 87.649,22.362 C87.649,22.590 87.661,22.843 87.687,23.122 C87.712,23.401 87.763,23.667 87.839,23.920 C87.940,24.148 88.067,24.351 88.219,24.528 C88.396,24.680 88.637,24.756 88.941,24.756 C89.169,24.756 89.422,24.680 89.701,24.528 C90.005,24.376 90.296,24.161 90.575,23.882 C90.879,23.603 91.158,23.261 91.411,22.856 C91.690,22.451 91.905,21.995 92.057,21.488 L98.289,21.488 L97.301,25.554 C96.794,25.883 96.211,26.162 95.553,26.390 C94.894,26.618 94.197,26.808 93.463,26.960 C92.728,27.087 91.981,27.175 91.221,27.226 C90.461,27.302 89.739,27.340 89.055,27.340 C87.788,27.340 86.610,27.226 85.521,26.998 C84.432,26.770 83.482,26.377 82.670,25.820 C81.860,25.263 81.214,24.528 80.733,23.616 C80.277,22.679 80.049,21.526 80.049,20.158 C80.049,18.917 80.239,17.701 80.619,16.510 C81.024,15.319 81.683,14.268 82.595,13.356 C83.532,12.419 84.773,11.671 86.319,11.114 C87.890,10.557 89.840,10.278 92.171,10.278 C94.704,10.278 96.604,10.671 97.871,11.456 C99.163,12.241 99.809,13.470 99.809,15.142 C99.809,15.826 99.708,16.573 99.505,17.384 ZM92.589,13.280 C92.335,13.001 92.032,12.862 91.677,12.862 C91.271,12.862 90.892,13.001 90.537,13.280 C90.208,13.533 89.904,13.888 89.625,14.344 C89.346,14.775 89.093,15.281 88.865,15.864 C88.637,16.421 88.447,17.017 88.295,17.650 L92.627,17.650 C92.678,17.346 92.728,17.029 92.779,16.700 C92.830,16.421 92.868,16.117 92.893,15.788 C92.944,15.459 92.969,15.155 92.969,14.876 C92.969,14.090 92.842,13.559 92.589,13.280 ZM79.024,8.340 C78.644,8.644 78.201,8.872 77.694,9.024 C77.188,9.176 76.668,9.252 76.136,9.252 C75.123,9.252 74.274,9.011 73.590,8.530 C72.906,8.049 72.564,7.289 72.564,6.250 C72.564,5.693 72.678,5.199 72.906,4.768 C73.134,4.312 73.438,3.945 73.818,3.666 C74.224,3.362 74.679,3.134 75.186,2.982 C75.718,2.830 76.263,2.754 76.820,2.754 C77.808,2.754 78.644,2.995 79.328,3.476 C80.012,3.957 80.354,4.705 80.354,5.718 C80.354,6.301 80.227,6.807 79.974,7.238 C79.746,7.669 79.429,8.036 79.024,8.340 ZM75.832,27.036 L68.118,27.036 L71.576,10.696 L79.366,10.696 L75.832,27.036 ZM67.055,19.550 C66.878,20.411 66.625,21.311 66.295,22.248 C65.967,23.160 65.523,23.996 64.966,24.756 C64.433,25.516 63.750,26.137 62.914,26.618 C62.103,27.099 61.128,27.340 59.988,27.340 C59.304,27.340 58.632,27.264 57.974,27.112 C57.340,26.960 56.757,26.757 56.226,26.504 C55.719,26.251 55.263,25.959 54.857,25.630 C54.478,25.275 54.199,24.921 54.021,24.566 L53.755,24.566 L52.045,27.036 L45.890,27.036 L51.286,1.500 L59.076,1.500 L56.605,13.128 L56.871,13.128 C57.707,12.165 58.645,11.481 59.683,11.076 C60.747,10.645 61.799,10.430 62.838,10.430 C63.724,10.430 64.459,10.569 65.042,10.848 C65.650,11.101 66.131,11.456 66.485,11.912 C66.840,12.368 67.093,12.913 67.245,13.546 C67.397,14.179 67.473,14.851 67.473,15.560 C67.473,15.915 67.448,16.447 67.397,17.156 C67.347,17.865 67.233,18.663 67.055,19.550 ZM59.304,14.572 C59.152,14.243 58.860,14.078 58.429,14.078 C57.923,14.078 57.454,14.268 57.024,14.648 C56.592,15.003 56.276,15.307 56.074,15.560 L54.591,22.362 C54.769,22.666 54.997,22.957 55.276,23.236 C55.579,23.515 55.934,23.654 56.340,23.654 C56.948,23.654 57.454,23.337 57.859,22.704 C58.265,22.045 58.594,21.285 58.847,20.424 C59.101,19.537 59.279,18.663 59.379,17.802 C59.506,16.915 59.569,16.257 59.569,15.826 C59.569,15.319 59.481,14.901 59.304,14.572 ZM42.082,24.908 C40.156,26.529 37.370,27.340 33.722,27.340 C30.606,27.340 28.377,26.745 27.034,25.554 C25.590,24.312 24.868,22.451 24.868,19.968 C24.868,18.321 25.198,16.827 25.856,15.484 C26.540,14.141 27.515,13.027 28.782,12.140 C30.631,10.899 33.165,10.278 36.382,10.278 C39.397,10.278 41.588,10.810 42.956,11.874 C44.400,12.989 45.122,14.838 45.122,17.422 C45.122,19.018 44.856,20.462 44.324,21.754 C43.792,23.021 43.045,24.072 42.082,24.908 ZM37.180,13.432 C37.054,13.052 36.762,12.862 36.306,12.862 C35.622,12.862 35.027,13.229 34.520,13.964 C34.039,14.699 33.646,15.573 33.342,16.586 C33.038,17.599 32.810,18.638 32.658,19.702 C32.531,20.766 32.468,21.627 32.468,22.286 C32.468,23.933 32.912,24.756 33.798,24.756 C34.431,24.756 34.976,24.401 35.432,23.692 C35.914,22.983 36.293,22.121 36.572,21.108 C36.851,20.069 37.054,19.005 37.180,17.916 C37.332,16.801 37.408,15.839 37.408,15.028 C37.408,14.319 37.332,13.787 37.180,13.432 ZM20.309,23.996 C19.499,24.908 18.561,25.617 17.497,26.124 C16.459,26.631 15.344,26.960 14.154,27.112 C12.963,27.289 11.823,27.378 10.733,27.378 C9.467,27.378 8.378,27.289 7.466,27.112 C6.554,26.960 5.743,26.732 5.033,26.428 C4.350,26.124 3.729,25.757 3.171,25.326 C2.614,24.870 2.057,24.376 1.500,23.844 L2.716,18.106 L9.859,18.106 C9.859,18.182 9.821,18.372 9.745,18.676 C9.695,18.955 9.632,19.297 9.556,19.702 C9.480,20.107 9.404,20.551 9.328,21.032 C9.277,21.513 9.252,21.957 9.252,22.362 C9.252,22.615 9.277,22.881 9.328,23.160 C9.379,23.439 9.467,23.705 9.594,23.958 C9.720,24.186 9.897,24.389 10.126,24.566 C10.379,24.718 10.683,24.794 11.038,24.794 C11.696,24.794 12.216,24.528 12.595,23.996 C13.001,23.439 13.356,22.438 13.659,20.994 L17.497,2.906 L25.744,2.906 L22.020,20.348 C21.690,21.843 21.120,23.059 20.309,23.996 Z"/>
							</svg>
			            </a>
			            <div className="nav-control">
			                <div className="hamburger">
			                    <span className="line"></span><span className="line"></span><span className="line"></span>
			                </div>
			            </div>
			        </div>
			        {/*<!--**********************************
			            Nav header end
			        ***********************************-->*/}
					
					{/*<!--**********************************
			            Chat box start
			        ***********************************-->*/}
					<div className="chatbox">
						<div className="chatbox-close"></div>
						<div className="custom-tab-1">
							<ul className="nav nav-tabs">
								<li className="nav-item">
									<a className="nav-link" data-bs-toggle="tab" href="#notes">Notes</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" data-bs-toggle="tab" href="#alerts">Alerts</a>
								</li>
								<li className="nav-item">
									<a className="nav-link active" data-bs-toggle="tab" href="#chat">Chat</a>
								</li>
							</ul>
							<div className="tab-content">
								<div className="tab-pane fade active show" id="chat" role="tabpanel">
									<div className="card mb-sm-3 mb-md-0 contacts_card dz-chat-user-box">
										<div className="card-header chat-list-header text-center">
											<a href="#"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect fill="#000000" x="4" y="11" width="16" height="2" rx="1"/><rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) " x="4" y="11" width="16" height="2" rx="1"/></g></svg></a>
											<div>
												<h6 className="mb-1">Chat List</h6>
												<p className="mb-0">Show All</p>
											</div>
											<a href="#"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg></a>
										</div>
										<div className="card-body contacts_body p-0 dz-scroll  " id="DZ_W_Contacts_Body">
											<ul className="contacts">
												<li className="name-first-letter">A</li>
												<li className="active dz-chat-user">
													<div className="d-flex bd-highlight">
														<div className="img_cont">
															<img src="images/avatar/1.jpg" className="rounded-circle user_img" alt=""/>
															<span className="online_icon"></span>
														</div>
														<div className="user_info">
															<span>Archie Parker</span>
															<p>Kalid is online</p>
														</div>
													</div>
												</li>
												<li className="dz-chat-user">
													<div className="d-flex bd-highlight">
														<div className="img_cont">
															<img src="images/avatar/2.jpg" className="rounded-circle user_img" alt=""/>
															<span className="online_icon offline"></span>
														</div>
														<div className="user_info">
															<span>Alfie Mason</span>
															<p>Taherah left 7 mins ago</p>
														</div>
													</div>
												</li>
												<li className="dz-chat-user">
													<div className="d-flex bd-highlight">
														<div className="img_cont">
															<img src="images/avatar/3.jpg" className="rounded-circle user_img" alt=""/>
															<span className="online_icon"></span>
														</div>
														<div className="user_info">
															<span>AharlieKane</span>
															<p>Sami is online</p>
														</div>
													</div>
												</li>
												<li className="dz-chat-user">
													<div className="d-flex bd-highlight">
														<div className="img_cont">
															<img src="images/avatar/4.jpg" className="rounded-circle user_img" alt=""/>
															<span className="online_icon offline"></span>
														</div>
														<div className="user_info">
															<span>Athan Jacoby</span>
															<p>Nargis left 30 mins ago</p>
														</div>
													</div>
												</li>
												<li className="name-first-letter">B</li>
												<li className="dz-chat-user">
													<div className="d-flex bd-highlight">
														<div className="img_cont">
															<img src="images/avatar/5.jpg" className="rounded-circle user_img" alt=""/>
															<span className="online_icon offline"></span>
														</div>
														<div className="user_info">
															<span>Bashid Samim</span>
															<p>Rashid left 50 mins ago</p>
														</div>
													</div>
												</li>
												<li className="dz-chat-user">
													<div className="d-flex bd-highlight">
														<div className="img_cont">
															<img src="images/avatar/1.jpg" className="rounded-circle user_img" alt=""/>
															<span className="online_icon"></span>
														</div>
														<div className="user_info">
															<span>Breddie Ronan</span>
															<p>Kalid is online</p>
														</div>
													</div>
												</li>
												<li className="dz-chat-user">
													<div className="d-flex bd-highlight">
														<div className="img_cont">
															<img src="images/avatar/2.jpg" className="rounded-circle user_img" alt=""/>
															<span className="online_icon offline"></span>
														</div>
														<div className="user_info">
															<span>Ceorge Carson</span>
															<p>Taherah left 7 mins ago</p>
														</div>
													</div>
												</li>
												<li className="name-first-letter">D</li>
												<li className="dz-chat-user">
													<div className="d-flex bd-highlight">
														<div className="img_cont">
															<img src="images/avatar/3.jpg" className="rounded-circle user_img" alt=""/>
															<span className="online_icon"></span>
														</div>
														<div className="user_info">
															<span>Darry Parker</span>
															<p>Sami is online</p>
														</div>
													</div>
												</li>
												<li className="dz-chat-user">
													<div className="d-flex bd-highlight">
														<div className="img_cont">
															<img src="images/avatar/4.jpg" className="rounded-circle user_img" alt=""/>
															<span className="online_icon offline"></span>
														</div>
														<div className="user_info">
															<span>Denry Hunter</span>
															<p>Nargis left 30 mins ago</p>
														</div>
													</div>
												</li>
												<li className="name-first-letter">J</li>
												<li className="dz-chat-user">
													<div className="d-flex bd-highlight">
														<div className="img_cont">
															<img src="images/avatar/5.jpg" className="rounded-circle user_img" alt=""/>
															<span className="online_icon offline"></span>
														</div>
														<div className="user_info">
															<span>Jack Ronan</span>
															<p>Rashid left 50 mins ago</p>
														</div>
													</div>
												</li>
												<li className="dz-chat-user">
													<div className="d-flex bd-highlight">
														<div className="img_cont">
															<img src="images/avatar/1.jpg" className="rounded-circle user_img" alt=""/>
															<span className="online_icon"></span>
														</div>
														<div className="user_info">
															<span>Jacob Tucker</span>
															<p>Kalid is online</p>
														</div>
													</div>
												</li>
												<li className="dz-chat-user">
													<div className="d-flex bd-highlight">
														<div className="img_cont">
															<img src="images/avatar/2.jpg" className="rounded-circle user_img" alt=""/>
															<span className="online_icon offline"></span>
														</div>
														<div className="user_info">
															<span>James Logan</span>
															<p>Taherah left 7 mins ago</p>
														</div>
													</div>
												</li>
												<li className="dz-chat-user">
													<div className="d-flex bd-highlight">
														<div className="img_cont">
															<img src="images/avatar/3.jpg" className="rounded-circle user_img" alt=""/>
															<span className="online_icon"></span>
														</div>
														<div className="user_info">
															<span>Joshua Weston</span>
															<p>Sami is online</p>
														</div>
													</div>
												</li>
												<li className="name-first-letter">O</li>
												<li className="dz-chat-user">
													<div className="d-flex bd-highlight">
														<div className="img_cont">
															<img src="images/avatar/4.jpg" className="rounded-circle user_img" alt=""/>
															<span className="online_icon offline"></span>
														</div>
														<div className="user_info">
															<span>Oliver Acker</span>
															<p>Nargis left 30 mins ago</p>
														</div>
													</div>
												</li>
												<li className="dz-chat-user">
													<div className="d-flex bd-highlight">
														<div className="img_cont">
															<img src="images/avatar/5.jpg" className="rounded-circle user_img" alt=""/>
															<span className="online_icon offline"></span>
														</div>
														<div className="user_info">
															<span>Oscar Weston</span>
															<p>Rashid left 50 mins ago</p>
														</div>
													</div>
												</li>
											</ul>
										</div>
									</div>
									<div className="card chat dz-chat-history-box d-none">
										<div className="card-header chat-list-header text-center">
											<a href="#" className="dz-chat-history-back">
												<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><polygon points="0 0 24 0 24 24 0 24"/><rect fill="#000000" opacity="0.3" transform="translate(15.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-15.000000, -12.000000) " x="14" y="7" width="2" height="10" rx="1"/><path d="M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z" fill="#000000" fillRule="nonzero" transform="translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997) "/></g></svg>
											</a>
											<div>
												<h6 className="mb-1">Chat with Khelesh</h6>
												<p className="mb-0 text-success">Online</p>
											</div>							
											<div className="dropdown">
												<a href="#" data-bs-toggle="dropdown" ><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg></a>
												<ul className="dropdown-menu dropdown-menu-end">
													<li className="dropdown-item"><i className="fa fa-user-circle text-primary me-2"></i> View profile</li>
													<li className="dropdown-item"><i className="fa fa-users text-primary me-2"></i> Add to close friends</li>
													<li className="dropdown-item"><i className="fa fa-plus text-primary me-2"></i> Add to group</li>
													<li className="dropdown-item"><i className="fa fa-ban text-primary me-2"></i> Block</li>
												</ul>
											</div>
										</div>
										<div className="card-body msg_card_body dz-scroll" id="DZ_W_Contacts_Body3">
											<div className="d-flex justify-content-start mb-4">
												<div className="img_cont_msg">
													<img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt=""/>
												</div>
												<div className="msg_cotainer">
													Hi, how are you samim?
													<span className="msg_time">8:40 AM, Today</span>
												</div>
											</div>
											<div className="d-flex justify-content-end mb-4">
												<div className="msg_cotainer_send">
													Hi Khalid i am good tnx how about you?
													<span className="msg_time_send">8:55 AM, Today</span>
												</div>
												<div className="img_cont_msg">
											<img src="images/avatar/2.jpg" className="rounded-circle user_img_msg" alt=""/>
												</div>
											</div>
											<div className="d-flex justify-content-start mb-4">
												<div className="img_cont_msg">
													<img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt=""/>
												</div>
												<div className="msg_cotainer">
													I am good too, thank you for your chat template
													<span className="msg_time">9:00 AM, Today</span>
												</div>
											</div>
											<div className="d-flex justify-content-end mb-4">
												<div className="msg_cotainer_send">
													You are welcome
													<span className="msg_time_send">9:05 AM, Today</span>
												</div>
												<div className="img_cont_msg">
											<img src="images/avatar/2.jpg" className="rounded-circle user_img_msg" alt=""/>
												</div>
											</div>
											<div className="d-flex justify-content-start mb-4">
												<div className="img_cont_msg">
													<img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt=""/>
												</div>
												<div className="msg_cotainer">
													I am looking for your next templates
													<span className="msg_time">9:07 AM, Today</span>
												</div>
											</div>
											<div className="d-flex justify-content-end mb-4">
												<div className="msg_cotainer_send">
													Ok, thank you have a good day
													<span className="msg_time_send">9:10 AM, Today</span>
												</div>
												<div className="img_cont_msg">
													<img src="images/avatar/2.jpg" className="rounded-circle user_img_msg" alt=""/>
												</div>
											</div>
											<div className="d-flex justify-content-start mb-4">
												<div className="img_cont_msg">
													<img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt=""/>
												</div>
												<div className="msg_cotainer">
													Bye, see you
													<span className="msg_time">9:12 AM, Today</span>
												</div>
											</div>
											<div className="d-flex justify-content-start mb-4">
												<div className="img_cont_msg">
													<img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt=""/>
												</div>
												<div className="msg_cotainer">
													Hi, how are you samim?
													<span className="msg_time">8:40 AM, Today</span>
												</div>
											</div>
											<div className="d-flex justify-content-end mb-4">
												<div className="msg_cotainer_send">
													Hi Khalid i am good tnx how about you?
													<span className="msg_time_send">8:55 AM, Today</span>
												</div>
												<div className="img_cont_msg">
											<img src="images/avatar/2.jpg" className="rounded-circle user_img_msg" alt=""/>
												</div>
											</div>
											<div className="d-flex justify-content-start mb-4">
												<div className="img_cont_msg">
													<img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt=""/>
												</div>
												<div className="msg_cotainer">
													I am good too, thank you for your chat template
													<span className="msg_time">9:00 AM, Today</span>
												</div>
											</div>
											<div className="d-flex justify-content-end mb-4">
												<div className="msg_cotainer_send">
													You are welcome
													<span className="msg_time_send">9:05 AM, Today</span>
												</div>
												<div className="img_cont_msg">
											<img src="images/avatar/2.jpg" className="rounded-circle user_img_msg" alt=""/>
												</div>
											</div>
											<div className="d-flex justify-content-start mb-4">
												<div className="img_cont_msg">
													<img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt=""/>
												</div>
												<div className="msg_cotainer">
													I am looking for your next templates
													<span className="msg_time">9:07 AM, Today</span>
												</div>
											</div>
											<div className="d-flex justify-content-end mb-4">
												<div className="msg_cotainer_send">
													Ok, thank you have a good day
													<span className="msg_time_send">9:10 AM, Today</span>
												</div>
												<div className="img_cont_msg">
													<img src="images/avatar/2.jpg" className="rounded-circle user_img_msg" alt=""/>
												</div>
											</div>
											<div className="d-flex justify-content-start mb-4">
												<div className="img_cont_msg">
													<img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt=""/>
												</div>
												<div className="msg_cotainer">
													Bye, see you
													<span className="msg_time">9:12 AM, Today</span>
												</div>
											</div>
										</div>
										<div className="card-footer type_msg">
											<div className="input-group">
												<textarea className="form-control" placeholder="Type your message..."></textarea>
												<div className="input-group-append">
													<button type="button" className="btn btn-primary"><i className="fa fa-location-arrow"></i></button>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="tab-pane fade" id="alerts" role="tabpanel">
									<div className="card mb-sm-3 mb-md-0 contacts_card">
										<div className="card-header chat-list-header text-center">
											<a href="#"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg></a>
											<div>
												<h6 className="mb-1">Notications</h6>
												<p className="mb-0">Show All</p>
											</div>
											<a href="#"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"/><path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fillRule="nonzero" opacity="0.3"/><path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fillRule="nonzero"/></g></svg></a>
										</div>
										<div className="card-body contacts_body p-0 dz-scroll" id="DZ_W_Contacts_Body1">
											<ul className="contacts">
												<li className="name-first-letter">SEVER STATUS</li>
												<li className="active">
													<div className="d-flex bd-highlight">
														<div className="img_cont primary">KK</div>
														<div className="user_info">
															<span>David Nester Birthday</span>
															<p className="text-primary">Today</p>
														</div>
													</div>
												</li>
												<li className="name-first-letter">SOCIAL</li>
												<li>
													<div className="d-flex bd-highlight">
														<div className="img_cont success">RU<i className="icon fa-birthday-cake"></i></div>
														<div className="user_info">
															<span>Perfection Simplified</span>
															<p>Jame Smith commented on your status</p>
														</div>
													</div>
												</li>
												<li className="name-first-letter">SEVER STATUS</li>
												<li>
													<div className="d-flex bd-highlight">
														<div className="img_cont primary">AU<i className="icon fa fa-user-plus"></i></div>
														<div className="user_info">
															<span>AharlieKane</span>
															<p>Sami is online</p>
														</div>
													</div>
												</li>
												<li>
													<div className="d-flex bd-highlight">
														<div className="img_cont info">MO<i className="icon fa fa-user-plus"></i></div>
														<div className="user_info">
															<span>Athan Jacoby</span>
															<p>Nargis left 30 mins ago</p>
														</div>
													</div>
												</li>
											</ul>
										</div>
										<div className="card-footer"></div>
									</div>
								</div>
								<div className="tab-pane fade" id="notes">
									<div className="card mb-sm-3 mb-md-0 note_card">
										<div className="card-header chat-list-header text-center">
											<a href="#"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect fill="#000000" x="4" y="11" width="16" height="2" rx="1"/><rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) " x="4" y="11" width="16" height="2" rx="1"/></g></svg></a>
											<div>
												<h6 className="mb-1">Notes</h6>
												<p className="mb-0">Add New Nots</p>
											</div>
											<a href="#"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"/><path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fillRule="nonzero" opacity="0.3"/><path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fillRule="nonzero"/></g></svg></a>
										</div>
										<div className="card-body contacts_body p-0 dz-scroll" id="DZ_W_Contacts_Body2">
											<ul className="contacts">
												<li className="active">
													<div className="d-flex bd-highlight">
														<div className="user_info">
															<span>New order placed..</span>
															<p>10 Aug 2020</p>
														</div>
														<div className="ms-auto">
															<a href="#" className="btn btn-primary btn-xs sharp me-1"><i className="fas fa-pencil-alt"></i></a>
															<a href="#" className="btn btn-danger btn-xs sharp"><i className="fa fa-trash"></i></a>
														</div>
													</div>
												</li>
												<li>
													<div className="d-flex bd-highlight">
														<div className="user_info">
															<span>Youtube, a video-sharing website..</span>
															<p>10 Aug 2020</p>
														</div>
														<div className="ms-auto">
															<a href="#" className="btn btn-primary btn-xs sharp me-1"><i className="fas fa-pencil-alt"></i></a>
															<a href="#" className="btn btn-danger btn-xs sharp"><i className="fa fa-trash"></i></a>
														</div>
													</div>
												</li>
												<li>
													<div className="d-flex bd-highlight">
														<div className="user_info">
															<span>john just buy your product..</span>
															<p>10 Aug 2020</p>
														</div>
														<div className="ms-auto">
															<a href="#" className="btn btn-primary btn-xs sharp me-1"><i className="fas fa-pencil-alt"></i></a>
															<a href="#" className="btn btn-danger btn-xs sharp"><i className="fa fa-trash"></i></a>
														</div>
													</div>
												</li>
												<li>
													<div className="d-flex bd-highlight">
														<div className="user_info">
															<span>Athan Jacoby</span>
															<p>10 Aug 2020</p>
														</div>
														<div className="ms-auto">
															<a href="#" className="btn btn-primary btn-xs sharp me-1"><i className="fas fa-pencil-alt"></i></a>
															<a href="#" className="btn btn-danger btn-xs sharp"><i className="fa fa-trash"></i></a>
														</div>
													</div>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*<!--**********************************
			            Chat box End
			        ***********************************-->*/}
					
					{/*<!--**********************************
			            Header start
			        ***********************************-->*/}
			        <div className="header">
			            <div className="header-content">
			                <nav className="navbar navbar-expand">
			                    <div className="collapse navbar-collapse justify-content-between">
			                        <div className="header-left">
			                            <div className="dashboard_bar">
			                                Application
			                            </div>
			                        </div>

			                        <ul className="navbar-nav header-right">
										<li className="nav-item">
											<div className="input-group search-area d-md-inline-flex d-none">
												<input type="text" className="form-control" placeholder="Search something here..." />
												<div className="input-group-append">
													<span className="input-group-text"><i className="flaticon-381-search-2"></i></span>
												</div>
											</div>
										</li>
										<li className="nav-item dropdown notification_dropdown">
			                                <a className="nav-link bell bell-link" href="#">
			                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M22.5678 26.5202C22.8079 26.5202 23.0447 26.6115 23.2249 26.7856C24.3769 27.8979 26.0572 28.2683 27.551 27.8047C26.5897 25.802 26.4564 23.5075 27.2014 21.383C28.126 18.7398 28.3577 16.0905 27.3055 13.4334C26.381 11.0992 24.5971 9.15994 22.3395 8.05408C22.4784 8.79455 22.5484 9.54903 22.5484 10.3115C22.5484 13.5478 21.304 16.5916 19.0444 18.8823C16.7846 21.1733 13.7553 22.4615 10.5147 22.5097C9.91267 22.5191 9.31331 22.4837 8.72073 22.4056C10.5017 25.5274 13.8606 27.5606 17.5516 27.6153C19.1663 27.6403 20.7166 27.302 22.1604 26.6125C22.2904 26.5503 22.4296 26.5202 22.5678 26.5202Z" fill="#3E4954"/>
													<path d="M10.541 0.00236249C4.79223 -0.111786 0.0134501 4.53885 -0.000411333 10.2863C-0.00380737 11.6906 0.270302 13.052 0.814361 14.3331C0.822262 14.3517 0.829608 14.3706 0.836262 14.3897C1.58124 16.5142 1.4481 18.8086 0.486678 20.8114C1.98059 21.2748 3.66073 20.9046 4.81275 19.7922C5.09656 19.518 5.5212 19.449 5.8773 19.6192C7.3209 20.3087 8.87143 20.648 10.486 20.6221C16.1898 20.5374 20.6576 16.0085 20.6576 10.3117C20.6576 4.73921 16.1193 0.114501 10.541 0.00236249ZM4.81898 11.8517C3.99305 11.8517 3.32348 11.1832 3.32348 10.3587C3.32348 9.53414 3.99305 8.86568 4.81898 8.86568C5.64492 8.86568 6.31449 9.53414 6.31449 10.3587C6.31442 11.1832 5.64492 11.8517 4.81898 11.8517ZM10.3286 11.8517C9.50268 11.8517 8.8331 11.1832 8.8331 10.3587C8.8331 9.53414 9.50268 8.86568 10.3286 8.86568C11.1545 8.86568 11.8241 9.53414 11.8241 10.3587C11.8241 11.1832 11.1545 11.8517 10.3286 11.8517ZM15.8383 11.8517C15.0124 11.8517 14.3428 11.1832 14.3428 10.3587C14.3428 9.53414 15.0124 8.86568 15.8383 8.86568C16.6642 8.86568 17.3338 9.53414 17.3338 10.3587C17.3338 11.1832 16.6642 11.8517 15.8383 11.8517Z" fill="#3E4954"/>
												</svg>
												<span className="badge light text-white bg-primary rounded-circle">18</span>
			                                </a>
										</li>
										<li className="nav-item dropdown notification_dropdown">
			                                <a className="nav-link  ai-icon" href="#" role="button" data-bs-toggle="dropdown">
			                                    <svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M9.45251 25.6682C10.0606 27.0357 11.4091 28 13.0006 28C14.5922 28 15.9407 27.0357 16.5488 25.6682C15.4266 25.7231 14.2596 25.76 13.0006 25.76C11.7418 25.76 10.5748 25.7231 9.45251 25.6682Z" fill="#3E4954"/>
													<path d="M25.3531 19.74C23.8769 17.8785 21.3995 14.2195 21.3995 10.64C21.3995 7.09073 19.1192 3.89758 15.7995 2.72382C15.7592 1.21406 14.5183 0 13.0006 0C11.4819 0 10.2421 1.21406 10.2017 2.72382C6.88095 3.89758 4.60064 7.09073 4.60064 10.64C4.60064 14.2207 2.12434 17.8785 0.647062 19.74C0.154273 20.3616 0.00191325 21.1825 0.240515 21.9363C0.473484 22.6721 1.05361 23.2422 1.79282 23.4595C3.08755 23.8415 5.20991 24.2715 8.44676 24.491C9.84785 24.5851 11.3543 24.64 13.0007 24.64C14.646 24.64 16.1524 24.5851 17.5535 24.491C20.7914 24.2715 22.9127 23.8415 24.2085 23.4595C24.9477 23.2422 25.5268 22.6722 25.7597 21.9363C25.9983 21.1825 25.8448 20.3616 25.3531 19.74Z" fill="#3E4954"/>
												</svg>
												<span className="badge light text-white bg-primary rounded-circle">52</span>
			                                </a>
			                                <div className="dropdown-menu dropdown-menu-end">
			                                    <div id="DZ_W_Notification1" className="widget-media dz-scroll p-3 height380">
													<ul className="timeline">
														<li>
															<div className="timeline-panel">
																<div className="media me-2">
																	<img alt="image" width="50" src="images/avatar/1.jpg" />
																</div>
																<div className="media-body">
																	<h6 className="mb-1">Dr sultads Send you Photo</h6>
																	<small className="d-block">29 July 2020 - 02:26 PM</small>
																</div>
															</div>
														</li>
														<li>
															<div className="timeline-panel">
																<div className="media me-2 media-info">
																	KG
																</div>
																<div className="media-body">
																	<h6 className="mb-1">Resport created successfully</h6>
																	<small className="d-block">29 July 2020 - 02:26 PM</small>
																</div>
															</div>
														</li>
														<li>
															<div className="timeline-panel">
																<div className="media me-2 media-success">
																	<i className="fa fa-home"></i>
																</div>
																<div className="media-body">
																	<h6 className="mb-1">Reminder : Treatment Time!</h6>
																	<small className="d-block">29 July 2020 - 02:26 PM</small>
																</div>
															</div>
														</li>
														 <li>
															<div className="timeline-panel">
																<div className="media me-2">
																	<img alt="image" width="50" src="images/avatar/1.jpg" />
																</div>
																<div className="media-body">
																	<h6 className="mb-1">Dr sultads Send you Photo</h6>
																	<small className="d-block">29 July 2020 - 02:26 PM</small>
																</div>
															</div>
														</li>
														<li>
															<div className="timeline-panel">
																<div className="media me-2 media-danger">
																	KG
																</div>
																<div className="media-body">
																	<h6 className="mb-1">Resport created successfully</h6>
																	<small className="d-block">29 July 2020 - 02:26 PM</small>
																</div>
															</div>
														</li>
														<li>
															<div className="timeline-panel">
																<div className="media me-2 media-primary">
																	<i className="fa fa-home"></i>
																</div>
																<div className="media-body">
																	<h6 className="mb-1">Reminder : Treatment Time!</h6>
																	<small className="d-block">29 July 2020 - 02:26 PM</small>
																</div>
															</div>
														</li>
													</ul>
												</div>
			                                    <a className="all-notification" href="#">See all notifications <i className="ti-arrow-right"></i></a>
			                                </div>
			                            </li>
			                            <li className="nav-item dropdown header-profile">
			                                <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown">
			                                    <img src="images/profile/17.jpg" width="20" alt=""/>
												<div className="header-info">
													<span className="text-black">Oda Dink</span>
													<p className="fs-12 mb-0">Super Admin</p>
												</div>
			                                </a>
			                                <div className="dropdown-menu dropdown-menu-end">
			                                    <a href="app-profile.html" className="dropdown-item ai-icon">
			                                        <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
			                                        <span className="ms-2">Profile </span>
			                                    </a>
			                                    <a href="email-inbox.html" className="dropdown-item ai-icon">
			                                        <svg id="icon-inbox" xmlns="http://www.w3.org/2000/svg" className="text-success" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
			                                        <span className="ms-2">Inbox </span>
			                                    </a>
			                                    <a href="page-login.html" className="dropdown-item ai-icon">
			                                        <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
			                                        <span className="ms-2">Logout </span>
			                                    </a>
			                                </div>
			                            </li>
			                        </ul>
			                    </div>
			                </nav>
			            </div>
			        </div>
			        {/*<!--**********************************
			            Header end ti-comment-alt
			        ***********************************-->*/}

			        {/*<!--**********************************
			            Sidebar start
			        ***********************************-->*/}
			       <div className="deznav">
			            <div className="deznav-scroll">
							<ul className="metismenu" id="menu">
			                    <li className="has-menu"><a className="has-arrow ai-icon" href="javascript:void()" aria-expanded="false">
										<i className="flaticon-381-networking"></i>
										<span className="nav-text">Dashboard</span>
									</a>
			                        <ul aria-expanded="false">
										<li><a href="index.html">Dashboard Light</a></li>
										<li><a href="index2.html">Dashboard Dark</a></li>
										<li><a href="search-job.html">Search Job</a></li>
										<li><a href="application.html">Application</a></li>
										<li><a href="profile.html">Profile</a></li>
										<li><a href="companies.html">Companies</a></li>
										<li><a href="statistics.html">Statistics</a></li>
									</ul>
			                    </li>
			                    <li className="has-menu"><a className="has-arrow ai-icon" href="javascript:void()" aria-expanded="false">
										<i className="flaticon-381-television"></i>
										<span className="nav-text">Apps</span>
									</a>
			                        <ul aria-expanded="false">
			                            <li><a href="app-profile.html">Profile</a></li>
			                            <li><a className="has-arrow" href="javascript:void()" aria-expanded="false">Email</a>
			                                <ul aria-expanded="false">
			                                    <li><a href="email-compose.html">Compose</a></li>
			                                    <li><a href="email-inbox.html">Inbox</a></li>
			                                    <li><a href="email-read.html">Read</a></li>
			                                </ul>
			                            </li>
			                            <li><a href="app-calender.html">Calendar</a></li>
										<li><a className="has-arrow" href="javascript:void()" aria-expanded="false">Shop</a>
			                                <ul aria-expanded="false">
			                                    <li><a href="ecom-product-grid.html">Product Grid</a></li>
												<li><a href="ecom-product-list.html">Product List</a></li>
												<li><a href="ecom-product-detail.html">Product Details</a></li>
												<li><a href="ecom-product-order.html">Order</a></li>
												<li><a href="ecom-checkout.html">Checkout</a></li>
												<li><a href="ecom-invoice.html">Invoice</a></li>
												<li><a href="ecom-customers.html">Customers</a></li>
			                                </ul>
			                            </li>
			                        </ul>
			                    </li>
			                    <li className="has-menu"><a className="has-arrow ai-icon" href="javascript:void()" aria-expanded="false">
										<i className="flaticon-381-controls-3"></i>
										<span className="nav-text">Charts</span>
									</a>
			                        <ul aria-expanded="false">
			                            <li><a href="chart-flot.html">Flot</a></li>
			                            <li><a href="chart-morris.html">Morris</a></li>
			                            <li><a href="chart-chartjs.html">Chartjs</a></li>
			                            <li><a href="chart-chartist.html">Chartist</a></li>
			                            <li><a href="chart-sparkline.html">Sparkline</a></li>
			                            <li><a href="chart-peity.html">Peity</a></li>
			                        </ul>
			                    </li>
			                    <li className="has-menu"><a className="has-arrow ai-icon" href="javascript:void()" aria-expanded="false">
										<i className="flaticon-381-internet"></i>
										<span className="nav-text">Bootstrap</span>
									</a>
			                        <ul aria-expanded="false">
			                            <li><a href="ui-accordion.html">Accordion</a></li>
			                            <li><a href="ui-alert.html">Alert</a></li>
			                            <li><a href="ui-badge.html">Badge</a></li>
			                            <li><a href="ui-button.html">Button</a></li>
			                            <li><a href="ui-modal.html">Modal</a></li>
			                            <li><a href="ui-button-group.html">Button Group</a></li>
			                            <li><a href="ui-list-group.html">List Group</a></li>
			                            <li><a href="ui-media-object.html">Media Object</a></li>
			                            <li><a href="ui-card.html">Cards</a></li>
			                            <li><a href="ui-carousel.html">Carousel</a></li>
			                            <li><a href="ui-dropdown.html">Dropdown</a></li>
			                            <li><a href="ui-popover.html">Popover</a></li>
			                            <li><a href="ui-progressbar.html">Progressbar</a></li>
			                            <li><a href="ui-tab.html">Tab</a></li>
			                            <li><a href="ui-typography.html">Typography</a></li>
			                            <li><a href="ui-pagination.html">Pagination</a></li>
			                            <li><a href="ui-grid.html">Grid</a></li>

			                        </ul>
			                    </li>
			                    <li className="has-menu"><a className="has-arrow ai-icon" href="javascript:void()" aria-expanded="false">
										<i className="flaticon-381-heart"></i>
										<span className="nav-text">Plugins</span>
									</a>
			                        <ul aria-expanded="false">
			                            <li><a href="uc-select2.html">Select 2</a></li>
			                            <li><a href="uc-nestable.html">Nestedable</a></li>
			                            <li><a href="uc-noui-slider.html">Noui Slider</a></li>
			                            <li><a href="uc-sweetalert.html">Sweet Alert</a></li>
			                            <li><a href="uc-toastr.html">Toastr</a></li>
			                            <li><a href="map-jqvmap.html">Jqv Map</a></li>
			                            <li><a href="uc-lightgallery.html">Light Gallery</a></li>
			                        </ul>
			                    </li>
			                    <li><a href="widget-basic.html" className="ai-icon" aria-expanded="false">
										<i className="flaticon-381-settings-2"></i>
										<span className="nav-text">Widget</span>
									</a>
								</li>
			                    <li className="has-menu"><a className="has-arrow ai-icon" href="javascript:void()" aria-expanded="false">
										<i className="flaticon-381-notepad"></i>
										<span className="nav-text">Forms</span>
									</a>
			                        <ul aria-expanded="false">
			                            <li><a href="form-element.html">Form Elements</a></li>
			                            <li><a href="form-wizard.html">Wizard</a></li>
			                            <li><a href="form-editor-summernote.html">Summernote</a></li>
			                            <li><a href="form-pickers.html">Pickers</a></li>
			                            <li><a href="form-validation-jquery.html">Jquery Validate</a></li>
			                        </ul>
			                    </li>
			                    <li className="has-menu"><a className="has-arrow ai-icon" href="javascript:void()" aria-expanded="false">
										<i className="flaticon-381-network"></i>
										<span className="nav-text">Table</span>
									</a>
			                        <ul aria-expanded="false">
			                            <li><a href="table-bootstrap-basic.html">Bootstrap</a></li>
			                            <li><a href="table-datatable-basic.html">Datatable</a></li>
			                        </ul>
			                    </li>
			                    <li className="has-menu"><a className="has-arrow ai-icon" href="javascript:void()" aria-expanded="false">
										<i className="flaticon-381-layer-1"></i>
										<span className="nav-text">Pages</span>
									</a>
			                        <ul aria-expanded="false">
			                            <li><a href="page-register.html">Register</a></li>
			                            <li><a href="page-login.html">Login</a></li>
			                            <li><a className="has-arrow" href="javascript:void()" aria-expanded="false">Error</a>
			                                <ul aria-expanded="false">
			                                    <li><a href="page-error-400.html">Error 400</a></li>
			                                    <li><a href="page-error-403.html">Error 403</a></li>
			                                    <li><a href="page-error-404.html">Error 404</a></li>
			                                    <li><a href="page-error-500.html">Error 500</a></li>
			                                    <li><a href="page-error-503.html">Error 503</a></li>
			                                </ul>
			                            </li>
			                            <li><a href="page-lock-screen.html">Lock Screen</a></li>
			                        </ul>
			                    </li>
			                </ul>
							
							<div className="copyright">
								<p><strong>Jobie Dashboard</strong>  © 2022 All Rights Reserved</p>
								<p>by DexignZone</p>
							</div>
						</div>
			        </div>
			        {/*<!--**********************************
			            Sidebar end
			        ***********************************-->*/}
					
					{/*<!--**********************************
			            Content body start
			        ***********************************-->*/}
			        <div className="content-body">
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
																<td>{candidat.numero}</td>
																<td>{candidat.domaine}</td>
															</tr>
												})}
											</tbody>
										</table>
									</div>
								</div>
							</div>
			            </div>
			        </div>
			        {/*<!--**********************************
			            Content body end
			        ***********************************-->*/}

			        {/*<!--**********************************
			            Footer start
			        ***********************************-->*/}
			        <div className="footer">
			            <div className="copyright">
			                <p>Copyright © Designed &amp; Developed by <a href="http://dexignzone.com/" target="_blank">DexignZone</a> 2022</p>
			            </div>
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
			        {/*<!--**********************************
			            Footer end
			        ***********************************-->*/}

					{/*<!--**********************************
			           Support ticket button start
			        ***********************************-->*/}

			        {/*<!--**********************************
			           Support ticket button end
			        ***********************************-->*/}


			    </div>
			    {/*<!--**********************************
			        Main wrapper end
			    ***********************************-->*/}

			    {/*<!--**********************************
			        Scripts
			    ***********************************-->*/}
			    {/*<!-- Required vendors -->*/}
			    <script src="/vendor/global/global.min.js"></script>
				<script src="/vendor/bootstrap-select/dist/js/bootstrap-select.min.js"></script>
				<script src="/vendor/chart.js/Chart.bundle.min.js"></script>
					
				{/*<!-- Datatable -->*/}
				<script src="/vendor/datatables/js/jquery.dataTables.min.js"></script>
			    <script src="/js/custom.min.js"></script>
				<script src="/js/deznav-init.js"></script>
				<script src="/js/demo.js"></script>
			    <script src="/js/styleSwitcher.js"></script>
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
		</div>
	)
}