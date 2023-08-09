import Head from 'next/head';
import ClientCard from '../src/views/dashboard/ClientCard';
import TabLeader from '../src/views/dashboard/TabLeader';
import Candidat from '../src/views/candidat';

const castels = [
	{
		title:'Candidats',
		url:'/api/candidat?total=true',
		link:'/candidats'
	},
	{
		title:'Bulletin',
		url:'/api/bulletin?total=true',
		link:'/bulletins'
	}
];

export default function Home(){
	return (
		<>
			<Head>
			    {/*<!-- Favicons Icon -->*/}
				<link rel="shortcut icon" type="image/x-icon" href="img/ico.png" />
			    
			    {/*<!-- Title -->*/}
				<title>Candidats</title>
				
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
							<a className="nav-link" href="/candidats">
							<span className="dz-icon light">
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#212121" className="bi bi-pass" viewBox="0 0 16 16">
									<path d="M5.5 5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5Zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3Z"/>
									<path d="M8 2a2 2 0 0 0 2-2h2.5A1.5 1.5 0 0 1 14 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-13A1.5 1.5 0 0 1 3.5 0H6a2 2 0 0 0 2 2Zm0 1a3.001 3.001 0 0 1-2.83-2H3.5a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5h-1.67A3.001 3.001 0 0 1 8 3Z"/>
								</svg>
							</span>
							<span>Candidats</span>
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
							<h2 className="name mb-0">Resultat</h2>
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
			                        <input type="text" placeholder="Rechercher candidat" className="form-control ps-0 bs-0" />
			                    </div>
			                </form>
			                
			                {/*<!-- Dashboard Area -->*/}
			                <div className="dashboard-area mt-5">
								
			                </div>
			            </div>
			        </div>
				</div>				
				<Candidat />
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