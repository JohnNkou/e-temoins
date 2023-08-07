import Head from 'next/head';

export default function Home(){
	return (
		<>
			<Head>
			    {/*<!-- Favicons Icon -->*/}
				<link rel="shortcut icon" type="image/x-icon" href="img/ico.png" />
			    
			    {/*<!-- Title -->*/}
				<title>Home e-temoins</title>
				
				{/*<!-- PWA Version -->*/}
				<link rel="manifest" href="manifest.json" />
			    
			    {/*<!-- Stylesheets -->*/}
			    <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
			    <link rel="stylesheet" href="assets/vendor/swiper/swiper-bundle.min.css" />
			    
			    {/*<!-- Google Fonts -->*/}
			    <link rel="preconnect" href="https://fonts.googleapis.com" />
			    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
			    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&amp;display=swap" rel="stylesheet" />

			</Head>   
			<div className="page-wraper"> 
			    {/*<!-- Header -->*/}
				<header className="header transparent">
					<div className="main-bar">
						<div className="container">
							<div className="header-content">
								<div className="left-content">
									<a href="javascript:void(0);" className="menu-toggler">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path opacity="0.4" d="M16.0755 2H19.4615C20.8637 2 22 3.14585 22 4.55996V7.97452C22 9.38864 20.8637 10.5345 19.4615 10.5345H16.0755C14.6732 10.5345 13.537 9.38864 13.537 7.97452V4.55996C13.537 3.14585 14.6732 2 16.0755 2Z" fill="#a19fa8"/>
											<path fill-rule="evenodd" clip-rule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="#a19fa8"/>
										</svg>
									</a>
								</div>
								<div className="mid-content"></div>
								<div className="right-content">
									<a href="/notifs" className="theme-color">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chat-right-text" viewBox="0 0 16 16">
											<path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
											<path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
										</svg>
			                            
			                        </a>
								</div>
							</div>
						</div>
					</div>
				</header>
			    {/*<!-- Header End -->*/}
			    
			    {/*<!-- Preloader -->*/}
				<div id="preloader">
					<div className="spinner"></div>
				</div>
			    {/*<!-- Preloader end-->*/}
			    
				{/*<!-- Sidebar -->*/}
			    <div className="sidebar">
					<div className="author-box" style={{background:"#131213"}}>
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
							<a className="nav-link" href="/home">
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
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#212121" className="bi bi-pass" viewBox="0 0 16 16">
									<path d="M5.5 5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5Zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3Z"/>
									<path d="M8 2a2 2 0 0 0 2-2h2.5A1.5 1.5 0 0 1 14 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-13A1.5 1.5 0 0 1 3.5 0H6a2 2 0 0 0 2 2Zm0 1a3.001 3.001 0 0 1-2.83-2H3.5a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5h-1.67A3.001 3.001 0 0 1 8 3Z"/>
								</svg>
							</span>
							<span>Afficher</span>
							</a>
						</li>


						<li>
							<a className="nav-link" href="/notifs">
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
							<a className="nav-link" href="/profil">
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
							<a className="nav-link" href="/messages">
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
							<a className="nav-link" href="/">
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
			    
			    {/*<!-- Banner -->*/}
				<div className="banner-wrapper author-notification" style={{background:"#fb881f"}}>
					<div className="container inner-wrapper">
						<div className="dz-info">
							<span>Témoin Union Sacrée</span>
							<h2 className="name mb-0">Kurtis Mak</h2>
						</div>
						<div className="dz-media media-45 rounded-circle">
							<a href="/profil"><img src="img/kurt.jpg" className="rounded-circle" alt="author-image" /></a>
						</div>
					</div>
				</div>
			    {/*<!-- Banner End -->*/}
			    
			    {/*<!-- Page Content -->*/}
			    <div className="page-content">
			        
			        <div className="content-inner pt-0" >
						<div className="container fb">
			                {/*<!-- Search -->*/}
			                <form className="m-b30">
			                    <div className="input-group">
			                        <span className="input-group-text"> 
			                            <a href="javascript:void(0);" className="search-icon">
			                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			                                    <path d="M20.5605 18.4395L16.7528 14.6318C17.5395 13.446 18 12.0262 18 10.5C18 6.3645 14.6355 3 10.5 3C6.3645 3 3 6.3645 3 10.5C3 14.6355 6.3645 18 10.5 18C12.0262 18 13.446 17.5395 14.6318 16.7528L18.4395 20.5605C19.0245 21.1462 19.9755 21.1462 20.5605 20.5605C21.1462 19.9748 21.1462 19.0252 20.5605 18.4395ZM5.25 10.5C5.25 7.605 7.605 5.25 10.5 5.25C13.395 5.25 15.75 7.605 15.75 10.5C15.75 13.395 13.395 15.75 10.5 15.75C7.605 15.75 5.25 13.395 5.25 10.5Z" fill="#B9B9B9"/>
			                                </svg>
			                            </a>
			                        </span>
			                        <input type="text" placeholder="Search job here..." className="form-control ps-0 bs-0" />
			                    </div>
			                </form>
			                
			                {/*<!-- Dashboard Area -->*/}
			                <div className="dashboard-area mt-5">
								{/*<!-- Features -->*/}

								{/*<!-- Categorie -->*/}
			                    <div className="categorie-section">
			                        <div className="title-bar">
			                            <h5 className="dz-title">Options</h5>
			                        </div>
			                        <ul className="d-flex align-items-center">
			                            <li>
			                                <a href="#!" className="btn">
			                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
			                                    	<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
			                                    </svg>
			                                    <span style={{position: "absolute",marginTop: "45px",fontSize: ".8em"}}>SOS</span>
			                                </a>

			                            </li>
			                            <li>
			                                <a href="/add" className="btn">
			                                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			                                        <path opacity="0.4" d="M19.9925 18.9533H14.2982C13.7426 18.9533 13.2908 19.4123 13.2908 19.9766C13.2908 20.5421 13.7426 21 14.2982 21H19.9925C20.548 21 20.9999 20.5421 20.9999 19.9766C20.9999 19.4123 20.548 18.9533 19.9925 18.9533Z" fill="#130F26"/>
			                                        <path d="M10.309 6.90388L15.7049 11.264C15.835 11.3682 15.8573 11.5596 15.7557 11.6929L9.35874 20.0282C8.95662 20.5431 8.36402 20.8345 7.72908 20.8452L4.23696 20.8882C4.05071 20.8904 3.88775 20.7614 3.84542 20.5765L3.05175 17.1258C2.91419 16.4916 3.05175 15.8358 3.45388 15.3306L9.88256 6.95548C9.98627 6.82111 10.1778 6.79746 10.309 6.90388Z" fill="#130F26"/>
			                                        <path opacity="0.4" d="M18.1205 8.66544L17.0803 9.96401C16.9755 10.0962 16.7872 10.1177 16.657 10.0124C15.3924 8.98901 12.1543 6.36285 11.2559 5.63509C11.1247 5.52759 11.1067 5.33625 11.2125 5.20295L12.2157 3.95706C13.1257 2.78534 14.7131 2.67784 15.9935 3.69906L17.4644 4.87078C18.0676 5.34377 18.4698 5.96726 18.6073 6.62299C18.7661 7.3443 18.5967 8.0527 18.1205 8.66544Z" fill="#130F26"/>
			                                    </svg>

			                                    <span style={{position: "absolute",marginTop: "45px",fontSize: ".8em"}}>Ajouter</span>
			                                </a>
			                            </li>
			                            <li>
			                                <a href="#!" className="btn">
			                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-clipboard-minus-fill" viewBox="0 0 16 16">
			                                    	<path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>
			                                    	<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1ZM6 9h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1Z"/>
			                                    </svg>
			                                    <span style={{position: "absolute",marginTop: "45px",fontSize: ".8em"}}>Afficher</span>
			                                </a>
			                            </li>
			                            
			                        </ul>
			                    </div>
								{/*<!-- Categorie End -->*/}

			                    <div className="features-box">
			                        <div className="row m-b20 g-3">
			                            <div className="col">
			                                <div className="card card-bx card-content" style={{background:"#434243"}}>
			                                    <div className="card-body">
			                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#ffffff" className="bi bi-pass-fill" viewBox="0 0 16 16">
			                                        	<path d="M10 0a2 2 0 1 1-4 0H3.5A1.5 1.5 0 0 0 2 1.5v13A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 12.5 0H10ZM4.5 5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1Zm0 2h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1Z"/>
			                                        </svg>
			                                        <div className="card-info">
			                                            <h4 className="title">29K</h4>
			                                            <p>Bulletins Votants</p>
			                                        </div>
			                                    </div>
			                                </div>
			                            </div>
			                            <div className="col">
			                                <div className="card card-bx card-content bg-secondary">
			                                    <div className="card-body">
													<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pass" viewBox="0 0 16 16">
														<path d="M5.5 5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5Zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3Z"/>
														<path d="M8 2a2 2 0 0 0 2-2h2.5A1.5 1.5 0 0 1 14 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-13A1.5 1.5 0 0 1 3.5 0H6a2 2 0 0 0 2 2Zm0 1a3.001 3.001 0 0 1-2.83-2H3.5a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5h-1.67A3.001 3.001 0 0 1 8 3Z"/>
													</svg>
			 
			                                        <div className="card-info">
			                                            <h4 className="title">8K</h4>
			                                            <p>Bulletins nuls</p>
			                                        </div>
			                                    </div>
			                                </div>
			                            </div>    
			                        </div>    
			                    </div>
								{/*<!-- Features End -->*/}



								{/*<!-- Features -->*/}
			                    <div className="features-box">
			                        <div className="row m-b20 g-3">
			                            <div className="col">
			                                <div className="card card-bx card-content" style={{background:"#fb881f"}}>
			                                    <div className="card-body">
			                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-box2-fill" viewBox="0 0 16 16">
			                                        	<path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4h-8.5ZM15 4.667V5H1v-.333L1.5 4h6V1h1v3h6l.5.667Z"/>
			                                        </svg>
			                                        <div className="card-info">
			                                            <h4 className="title">1M</h4>
			                                            <p>Total</p>
			                                        </div>
			                                    </div>
			                                </div>
			                            </div>
			                            <div className="col">
			                                <div className="card card-bx card-content" style={{background:"#2c2054"}}>
			                                    <div className="card-body">
													<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
														<path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
														<path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
													</svg>
			 
			                                        <div className="card-info">
			                                            <h4 className="title">1</h4>
			                                            <p>centre</p>
			                                        </div>
			                                    </div>
			                                </div>
			                            </div>    
			                        </div>    
			                    </div>
								{/*<!-- Features End -->*/}
			                </div>
			            </div>
			        </div>
				</div>				
								
								
								
								
			    
			    {/*<!-- Menubar -->*/}
				<div className="menubar-area" style={{background:"#131213"}}>
					<div className="toolbar-inner menubar-nav">
						<a href="/home" className="nav-link active">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M9.14373 20.7821V17.7152C9.14372 16.9381 9.77567 16.3067 10.5584 16.3018H13.4326C14.2189 16.3018 14.8563 16.9346 14.8563 17.7152V20.7732C14.8562 21.4473 15.404 21.9951 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0007C21.1356 20.3586 21.5 19.4868 21.5 18.5775V9.86585C21.5 9.13139 21.1721 8.43471 20.6046 7.9635L13.943 2.67427C12.7785 1.74912 11.1154 1.77901 9.98539 2.74538L3.46701 7.9635C2.87274 8.42082 2.51755 9.11956 2.5 9.86585V18.5686C2.5 20.4637 4.04738 22 5.95617 22H7.87229C8.19917 22.0023 8.51349 21.8751 8.74547 21.6464C8.97746 21.4178 9.10793 21.1067 9.10792 20.7821H9.14373Z" fill="#130F26"/>
							</svg>
						</a>
						<a href="#!" className="nav-link">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" className="bi bi-bar-chart-fill" viewBox="0 0 16 16">
							  <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>

							</svg>
						</a>
						<a href="#!" className="nav-link">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" className="bi bi-people-fill" viewBox="0 0 16 16">
								<path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
							</svg>
						</a>
						<a href="javascript:void(0);" className="menu-toggler">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
								<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
							</svg>
						</a>
					</div>
				</div>
				{/*<!-- Menubar -->*/}
				
				

				
			</div>  
			{/*<!--**********************************
			    Scripts
			***********************************-->*/}
			<script src="index.js" defer></script>
			<script src="assets/js/jquery.js"></script>
			<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
			<script src="assets/js/settings.js"></script>
			<script src="assets/js/custom.js"></script>
			<script src="assets/js/dz.carousel.js"></script>{/*<!-- Swiper -->*/}
			<script src="assets/vendor/swiper/swiper-bundle.min.js"></script>{/*<!-- Swiper -->*/}
		</>
	)
}