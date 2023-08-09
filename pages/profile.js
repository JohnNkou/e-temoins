import Head from 'next/head';

export async function getServerSideProps({req,res,query}){
	let id = query.n,
	column = query.column,
	conn = (await import('../src/db/db.js')).default,
	dbClass = (await import('../src/db/dbClass')).default,
	db = new dbClass(conn),
	response = await db.getResume(id,column).catch((error)=> ({error,data:[]}));

	if(response.error){
		res.writeHead(500,{ "Content-Type":"application/json" });
		return res.end(JSON.stringify(response));
	}
	console.log(response);
	return {
		props:{
			bulletins:response.data[1].map((d)=> ({...d})),
			candidat:{...response.data[0][0]},
			error:response.error
		}
	}
}

export default function Profile({candidat,bulletins}){
	let { noms, total:votes, numero, domaine,image } = candidat;
	return (
		<>
			<Head>
			    
			    <link rel="shortcut icon" type="image/x-icon" href="assets/images/favicon.png" />
			    
			    {/*<!-- Title -->*/}
				<title>Profile</title>
			    
			    {/*<!-- Stylesheets -->*/}
			    <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
			    
			    {/*<!-- Google Fonts -->*/}
			    <link rel="preconnect" href="https://fonts.googleapis.com" />
			    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
			    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&amp;display=swap" rel="stylesheet" />

			</Head>   
			<div className="page-wraper"> 
			    
			    {/*<!-- Preloader -->*/}
				<div id="preloader">
					<div className="spinner"></div>
				</div>
			    {/*<!-- Preloader end-->*/}
			    
				{/*<!-- Header -->*/}
			    <header className="header transparent">
			        <div className="main-bar">
			            <div className="container">
			                <div className="header-content">
			                    <div className="left-content">
			                        <a href="javascript:void(0);" className="back-btn">
			                            <svg width="18" height="18" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M9.03033 0.46967C9.2966 0.735936 9.3208 1.1526 9.10295 1.44621L9.03033 1.53033L2.561 8L9.03033 14.4697C9.2966 14.7359 9.3208 15.1526 9.10295 15.4462L9.03033 15.5303C8.76406 15.7966 8.3474 15.8208 8.05379 15.6029L7.96967 15.5303L0.96967 8.53033C0.703403 8.26406 0.679197 7.8474 0.897052 7.55379L0.96967 7.46967L7.96967 0.46967C8.26256 0.176777 8.73744 0.176777 9.03033 0.46967Z" fill="#a19fa8"/>
										</svg>
			                        </a>
			                    </div>
			                    <div className="mid-content">
			                        <h5 className="mb-0">Profil</h5>
			                    </div>
			                    <div className="right-content">
			                        <a href="javascript:void(0);" className="menu-toggler">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path opacity="0.4" d="M16.0755 2H19.4615C20.8637 2 22 3.14585 22 4.55996V7.97452C22 9.38864 20.8637 10.5345 19.4615 10.5345H16.0755C14.6732 10.5345 13.537 9.38864 13.537 7.97452V4.55996C13.537 3.14585 14.6732 2 16.0755 2Z" fill="#a19fa8"/>
											<path fill-rule="evenodd" clip-rule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="#a19fa8"/>
										</svg>
									</a>
			                    </div>
			                </div>
			            </div>
			        </div>
			    </header>
			    {/*<!-- Header End -->*/}
				
			    {/*<!-- Sidebar -->*/}
			    <div className="sidebar">
					<div className="author-box" style={{background:'#131213'}}>
						<div className="dz-media">
							<img src="img/kurt.jpg" className="rounded-circle" alt="author-image" />
						</div>
						<div className="dz-info">
							<span>Témoins Union Sacrée</span>
							<h5 className="name">Kurtis Mak</h5>
						</div>
					</div>
					<ul className="nav navbar-nav">	
						
						<li>
							<a className="nav-link" href="home.php">
							<span className="dz-icon light">
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M9.14373 20.7821V17.7152C9.14372 16.9381 9.77567 16.3067 10.5584 16.3018H13.4326C14.2189 16.3018 14.8563 16.9346 14.8563 17.7152V20.7732C14.8562 21.4473 15.404 21.9951 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0007C21.1356 20.3586 21.5 19.4868 21.5 18.5775V9.86585C21.5 9.13139 21.1721 8.43471 20.6046 7.9635L13.943 2.67427C12.7785 1.74912 11.1154 1.77901 9.98539 2.74538L3.46701 7.9635C2.87274 8.42082 2.51755 9.11956 2.5 9.86585V18.5686C2.5 20.4637 4.04738 22 5.95617 22H7.87229C8.19917 22.0023 8.51349 21.8751 8.74547 21.6464C8.97746 21.4178 9.10793 21.1067 9.10792 20.7821H9.14373Z" fill="#130F26"/>
								</svg>
							</span>
							<span>Accueil</span>
							</a>
						</li>

						<li>
							<a className="nav-link" href="#!">
							<span className="dz-icon light">
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#4e4f51" className="bi bi-people-fill" viewBox="0 0 16 16">
								  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
								</svg>
							</span>
							<span>Afficher</span>
							</a>
						</li>


						<li>
							<a className="nav-link" href="notifs.php">
							<span className="dz-icon bg-green light">
								<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18" height="18" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
									<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
										<path d="M17,12 L18.5,12 C19.3284271,12 20,12.6715729 20,13.5 C20,14.3284271 19.3284271,15 18.5,15 L5.5,15 C4.67157288,15 4,14.3284271 4,13.5 C4,12.6715729 4.67157288,12 5.5,12 L7,12 L7.5582739,6.97553494 C7.80974924,4.71225688 9.72279394,3 12,3 C14.2772061,3 16.1902508,4.71225688 16.4417261,6.97553494 L17,12 Z" fill="#fff"/>
										<rect fill="#fff" opacity="0.3" x="10" y="16" width="4" height="4" rx="2"/>
									</g>
								</svg>
							</span>
							<span>Notification</span>
							<span className="badge badge-circle badge-danger">1</span>
							</a>
						</li>


						<li>
							<a className="nav-link" href="profil.php">
							<span className="dz-icon bg-yellow light">
								<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18" height="18" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
									<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
										<polygon points="0 0 24 0 24 24 0 24"/>
										<path d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z" fill="#fff" fill-rule="nonzero" opacity="0.3"/>
										<path d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z" fill="#fff" fill-rule="nonzero"/>
									</g>
								</svg>
							</span>
							<span>Profil</span>
							</a>
						</li>


						<li>
							<a className="nav-link" href="messages.php">
							<span className="dz-icon bg-skyblue light">
								<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18" height="18" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
									<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
										<rect x="0" y="0" width="24" height="24"/>
										<path d="M21.9999843,15.009808 L22.0249378,15 L22.0249378,19.5857864 C22.0249378,20.1380712 21.5772226,20.5857864 21.0249378,20.5857864 C20.7597213,20.5857864 20.5053674,20.4804296 20.317831,20.2928932 L18.0249378,18 L6,18 C4.34314575,18 3,16.6568542 3,15 L3,6 C3,4.34314575 4.34314575,3 6,3 L19,3 C20.6568542,3 22,4.34314575 22,6 L22,15 C22,15.0032706 21.9999948,15.0065399 21.9999843,15.009808 Z" fill="#fff" opacity="0.3"/>
										<path d="M7.5,12 C6.67157288,12 6,11.3284271 6,10.5 C6,9.67157288 6.67157288,9 7.5,9 C8.32842712,9 9,9.67157288 9,10.5 C9,11.3284271 8.32842712,12 7.5,12 Z M12.5,12 C11.6715729,12 11,11.3284271 11,10.5 C11,9.67157288 11.6715729,9 12.5,9 C13.3284271,9 14,9.67157288 14,10.5 C14,11.3284271 13.3284271,12 12.5,12 Z M17.5,12 C16.6715729,12 16,11.3284271 16,10.5 C16,9.67157288 16.6715729,9 17.5,9 C18.3284271,9 19,9.67157288 19,10.5 C19,11.3284271 18.3284271,12 17.5,12 Z" fill="#fff" opacity="0.3"/>
									</g>
								</svg>
							</span>
							<span>Chat</span>
							<span className="badge badge-circle badge-info">5</span>
							</a>
						</li>


						
						
						
						<li>
							<a className="nav-link" href="index.php">
								<span className="dz-icon bg-red light">
									<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18" height="18" viewBox="0 0 24 24" version="1.1" className="svg-main-icon">
										<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
											<rect x="0" y="0" width="24" height="24"/>
											<path d="M14.0069431,7.00607258 C13.4546584,7.00607258 13.0069431,6.55855153 13.0069431,6.00650634 C13.0069431,5.45446114 13.4546584,5.00694009 14.0069431,5.00694009 L15.0069431,5.00694009 C17.2160821,5.00694009 19.0069431,6.7970243 19.0069431,9.00520507 L19.0069431,15.001735 C19.0069431,17.2099158 17.2160821,19 15.0069431,19 L3.00694311,19 C0.797804106,19 -0.993056895,17.2099158 -0.993056895,15.001735 L-0.993056895,8.99826498 C-0.993056895,6.7900842 0.797804106,5 3.00694311,5 L4.00694793,5 C4.55923268,5 5.00694793,5.44752105 5.00694793,5.99956624 C5.00694793,6.55161144 4.55923268,6.99913249 4.00694793,6.99913249 L3.00694311,6.99913249 C1.90237361,6.99913249 1.00694311,7.89417459 1.00694311,8.99826498 L1.00694311,15.001735 C1.00694311,16.1058254 1.90237361,17.0008675 3.00694311,17.0008675 L15.0069431,17.0008675 C16.1115126,17.0008675 17.0069431,16.1058254 17.0069431,15.001735 L17.0069431,9.00520507 C17.0069431,7.90111468 16.1115126,7.00607258 15.0069431,7.00607258 L14.0069431,7.00607258 Z" fill="#fff" fill-rule="nonzero" opacity="0.3" transform="translate(9.006943, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-9.006943, -12.000000) "/>
											<rect fill="#ff4db8" opacity="0.3" transform="translate(14.000000, 12.000000) rotate(-270.000000) translate(-14.000000, -12.000000) " x="13" y="6" width="2" height="12" rx="1"/>
											<path d="M21.7928932,9.79289322 C22.1834175,9.40236893 22.8165825,9.40236893 23.2071068,9.79289322 C23.5976311,10.1834175 23.5976311,10.8165825 23.2071068,11.2071068 L20.2071068,14.2071068 C19.8165825,14.5976311 19.1834175,14.5976311 18.7928932,14.2071068 L15.7928932,11.2071068 C15.4023689,10.8165825 15.4023689,10.1834175 15.7928932,9.79289322 C16.1834175,9.40236893 16.8165825,9.40236893 17.2071068,9.79289322 L19.5,12.0857864 L21.7928932,9.79289322 Z" fill="#fff" fill-rule="nonzero" transform="translate(19.500000, 12.000000) rotate(-90.000000) translate(-19.500000, -12.000000) "/>
										</g>
									</svg>
								</span>
								<span>Déconnexion</span>
							</a>
						</li>


						
			            
					</ul>
					<div className="sidebar-bottom">
						<h6 className="name">
						<img src="img/etemoins.png" style={{width:"120px"}} />
						</h6>
						<p>Version 1.0</p>
			        </div>
			    </div>
			    {/*<!-- Sidebar End -->*/}
			    
			    {/*<!-- Page Content -->*/}
			    <div className="page-content">
			        <div className="content-body fb">
						<div className="dz-banner-heading">
			                <div className="overlay-black-light">
			                    <img src="assets/images/bg1.png" className="bnr-img" alt="" />
			                </div>
			            </div>
			            <div className="container company-detail">
			                <div className="media media-60">
			                    <img src={`/profiles/${image}`} style={{borderRadius: "100px"}} />
			                </div>
			                <div className="detail-content">
			                    <div className="flex-1">
			                        <h4>{noms}</h4>
			                    </div>
			                    <div className="text-end">
			                        <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
			                            <path d="M20.16 6.99999H14.535L12.775 1.31C12.6566 0.931915 12.4205 0.601517 12.1013 0.366937C11.782 0.132357 11.3962 0.00585175 11 0.00585175C10.6038 0.00585175 10.2179 0.132357 9.89867 0.366937C9.5794 0.601517 9.34337 0.931915 9.22497 1.31L7.46497 6.99999H1.83997C1.45649 7.00195 1.08316 7.12335 0.771871 7.34731C0.460586 7.57128 0.226822 7.88667 0.103083 8.24963C-0.0206557 8.6126 -0.0282203 9.0051 0.0814415 9.37257C0.191103 9.74004 0.412541 10.0642 0.714965 10.3L5.33497 13.875L3.60997 19.445C3.48787 19.8456 3.49626 20.2746 3.63395 20.6701C3.77163 21.0656 4.03146 21.4071 4.37593 21.6453C4.72039 21.8835 5.13164 22.006 5.55029 21.9951C5.96893 21.9843 6.37329 21.8407 6.70497 21.585L11 18.26L15.295 21.585C15.6396 21.853 16.0634 21.999 16.5 22C16.8087 21.9998 17.113 21.9271 17.3884 21.7877C17.6638 21.6483 17.9026 21.4462 18.0856 21.1975C18.2685 20.9489 18.3905 20.6608 18.4416 20.3563C18.4927 20.0519 18.4716 19.7397 18.38 19.445L16.665 13.875L21.285 10.3C21.5874 10.0642 21.8088 9.74004 21.9185 9.37257C22.0282 9.0051 22.0206 8.6126 21.8968 8.24963C21.7731 7.88667 21.5393 7.57128 21.2281 7.34731C20.9168 7.12335 20.5434 7.00195 20.16 6.99999Z" fill="#FF912C"/>
			                        </svg>
			                        <h4 className="text-warning pt-2 mb-3">{votes} voix</h4>
			                    </div>
			                    </div>
			                <ul className="contact-box">
			                    <li className="d-flex align-items-center">
			                        <a href="javascript:void(0);" className="contact-icon">
			                            <svg className="text-primary" width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
			                                <path d="M26.2806 19.775C26.2089 19.7181 21 15.9635 19.5702 16.233C18.8877 16.3538 18.4975 16.8193 17.7144 17.7511C17.5884 17.9016 17.2856 18.2621 17.0503 18.5185C16.5553 18.3571 16.0726 18.1606 15.6056 17.9305C13.1955 16.7571 11.2481 14.8098 10.0747 12.3996C9.84451 11.9327 9.648 11.45 9.48675 10.955C9.744 10.7188 10.1045 10.416 10.2585 10.2865C11.186 9.50775 11.6524 9.1175 11.7731 8.43325C12.0208 7.01575 8.26875 1.771 8.22937 1.72375C8.05914 1.48056 7.83698 1.27825 7.57896 1.13147C7.32095 0.984676 7.03353 0.897075 6.7375 0.875C5.21675 0.875 0.875 6.50737 0.875 7.45587C0.875 7.511 0.954625 13.1145 7.8645 20.1434C14.8864 27.0454 20.489 27.125 20.5441 27.125C21.4935 27.125 27.125 22.7832 27.125 21.2625C27.1032 20.9675 27.0161 20.681 26.8701 20.4238C26.724 20.1666 26.5227 19.945 26.2806 19.775Z" fill="#40189D"/>
			                            </svg>
			                        </a>
			                        <div className="ms-3">
			                            <p className="mb-2">Numero</p>    
			                            <h6><a href="javascript:void(0);">{numero}</a></h6>    
			                        </div>
			                    </li>
			                    <li className="d-flex align-items-center my-3">
			                        <a href="javascript:void(0);" className="contact-icon">
			                            <svg className="text-primary" width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
			                                <path d="M27.0761 6.24662C26.9621 5.48439 26.5787 4.78822 25.9955 4.28434C25.4123 3.78045 24.6679 3.50219 23.8972 3.5H4.10295C3.33223 3.50219 2.58781 3.78045 2.00462 4.28434C1.42143 4.78822 1.03809 5.48439 0.924072 6.24662L14.0001 14.7079L27.0761 6.24662Z" fill="#40189D"/>
			                                <path d="M14.4751 16.485C14.3336 16.5765 14.1686 16.6252 14 16.6252C13.8314 16.6252 13.6664 16.5765 13.5249 16.485L0.875 8.30025V21.2721C0.875926 22.1279 1.2163 22.9484 1.82145 23.5535C2.42659 24.1587 3.24707 24.4991 4.10288 24.5H23.8971C24.7529 24.4991 25.5734 24.1587 26.1786 23.5535C26.7837 22.9484 27.1241 22.1279 27.125 21.2721V8.29938L14.4751 16.485Z" fill="#40189D"/>
			                            </svg>
			                        </a>
			                        <div className="ms-3">
			                            <p className="mb-2">Candidat Pour</p>    
			                            <h6><a href="javascript:void(0);">{domaine}</a></h6>    
			                        </div>
			                    </li>
			                </ul>
			                <div className="about-company">
			                    <h5>Bulletin Associé</h5>
			                    {bulletins.map((bulletin)=>{
			                    	return <img src={`/upload/bulletin/${bulletin.img}`} />
			                    })}
			                </div>
			            </div>
					</div>    
			    </div>    
			    {/*<!-- Page Content End -->*/}
				
			</div>    
			{/*<!--**********************************
			    Scripts
			***********************************-->*/}
			<script src="assets/js/jquery.js"></script>
			<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
			<script src="assets/js/custom.js"></script>
			<script src="assets/js/settings.js"></script>
			<script src="assets/js/dz.carousel.js"></script>{/*<!-- Swiper -->*/}
			<script src="assets/vendor/swiper/swiper-bundle.min.js"></script>{/*<!-- Swiper -->*/}
		</>
	)
}