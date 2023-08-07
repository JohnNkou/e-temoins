import Head from 'next/head'

export default function Sign(){
    return (
        <>
            <Head>
                {/*<!-- Favicons Icon -->*/}
                <link rel="shortcut icon" type="image/x-icon" href="img/ico.png" />
                
                {/*<!-- Title -->*/}
                <title>Créer compte</title>
                
                {/*<!-- Stylesheets -->*/}
                <link rel="stylesheet" href="assets/vendor/swiper/swiper-bundle.min.css" />
                <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
                
                {/*<!-- Google Fonts -->*/}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&amp;family=Racing+Sans+One&amp;display=swap" rel="stylesheet" />

                <style type="text/css" dangerouslySetInnerHTML={{__html:`
                    #extwaiokist{
                        display: none!important;
                    }

                `}}>
                </style>

            </Head>   
            <div className="page-wraper">
                
                {/*<!-- Preloader -->*/}
                <div id="preloader">
                    <div className="spinner"></div>
                </div>
                {/*<!-- Preloader end-->*/}
                
                {/*<!-- Page Content -->*/}
                <div className="page-content">
                
                    {/*<!-- Banner -->*/}
                    <div className="banner-wrapper shape-1" style={{backgroundImage:'url(img/sh1.jpg)',backgroundSize: 'cover',width: '100%',height: '100%',paddingBottom: '0px!important',paddingTop: '0px!important'}}>
                        <div style={{background: 'rgb(19,18,19)',background: 'linear-gradient(0deg, rgba(19,18,19,1) 25%, rgba(19,18,19,0.2) 68%)',height: '100%',backgroundSize: 'cover',width: '100%'}}>
                        <div className="container inner-wrapper">
                            <h2 className="dz-title" style={{marginTop: '180px'}}>Créer votre compte</h2>
                            <p className="mb-5">Veuillez remplir le formulaire ci-dessous</p>
                        </div>
                        </div>
                    </div>
                    {/*<!-- Banner End -->*/}    
                    
                    <div className="container" style={{paddingBottom: '0px!important'}}>
                        <div className="account-are" style={{paddingBottom: '0px!important'}}>
                            <form style={{paddingBottom: '0px!important'}}>
                                
                                <div className="input-group" style={{border: 'solid 0px!important'}}>
                                    <input type="text" placeholder="Noms complet" className="form-control" style={{border: 'solid 0px!important',borderRadius: '50px'}} />
                                </div>

                                <div className="input-group">
                                    <input type="email" placeholder="Adresse e-mail" className="form-control" style={{border: 'solid 0px!important',borderRadius: '50px'}} />
                                </div>

                                

                                <div className="input-group">
                                    <input type="password" placeholder="Password" id="dz-password" className="form-control be-0" style={{border: 'solid 0px!important'}} />
                                    <span className="input-group-text show-pass" style={{border: 'solid 0px!important'}}> 
                                        <i className="fa fa-eye-slash"></i>
                                        <i className="fa fa-eye"></i>
                                    </span>
                                </div>
                                <div className="input-group">
                                    <input type="tel" placeholder="Téléphone" className="form-control" style={{border: 'solid 0px!important',borderRadius: '50px'}} />
                                </div>

                                <div className="row justify-content-center">
                                    <div className="col-8">
                                        <a href="/otp" className="btn mt-2 btn w-100 btn-rounded" style={{fontWeight: '800',background: '#fb881f',color: '#fff'}}>Créer compte</a>
                                    </div>

                                    <div className="col-8">
                                        <a href="/login" className="btn mt-2 btn w-100 btn-rounded" style={{fontWeight: '800',background: '#cbcacc',color: '#131213'}}>Se connecter</a>
                                    </div>

                                    <div className="col-10 mt-2">
                                    <small className="text-center">By tapping “Sign Up” you accept our <a href="javascript:void(0);" className="text-primary font-w700">terms</a> and <a href="javascript:void(0);" className="text-primary font-w700">condition</a></small>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/*<!-- Page Content End -->*/}
                
            </div>


            <script src="assets/js/jquery.js"></script>
            <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="assets/js/settings.js"></script>
            <script src="assets/js/custom.js"></script> 
        </>
    )
}