<!DOCTYPE html>
<html lang="en">
<head>
    
    <!-- Meta -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, minimal-ui, viewport-fit=cover">
	<meta name="theme-color" content="#2196f3">
	<meta name="author" content="DexignZone" /> 
    <meta name="keywords" content="" /> 
    <meta name="robots" content="" /> 
	<meta name="format-detection" content="telephone=no">
    
    <!-- Favicons Icon -->
	<link rel="shortcut icon" type="image/x-icon" href="img/ico.png" />
    
    <!-- Title -->
	<title>e-temoins</title>
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="assets/vendor/swiper/swiper-bundle.min.css">
    <link rel="stylesheet" type="text/css" href="assets/css/style.css">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&amp;display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    
    <!-- Animte -->
    <link rel="stylesheet" href="assets/vendor/wow/css/libs/animate.css">

    <style type="text/css">
        .scroll__infinite{
          background-image:url(img/all.jpg);
          height: 40vh;
          width: 100%;
          background-size: cover;
          background-position: left top;
          animation: infinite 88s linear infinite;
        }

        @keyframes infinite{
          0%{
            background-position: 50% 0;
          }

          100%{
            background-position: 50% -200px;
          }
        }
    </style>
    
</head>   
<body>

<div class="page-wraper">    
    
    <!-- Page Content -->
    <div class="page-content page page-onboading">
        <!-- Onboading Start -->
        <div class="started-swiper-box">
            <div class="swiper-container get-started">
                <div class="swiper-wrapper">
                    

                    <div class="swiper-slide scroll__infinite" style="background-image:url(img/all.jpg);background-size: cover;width: 100%;height: 100%;">
                        <div style="background: rgb(19,18,19);background: linear-gradient(0deg, rgba(19,18,19,1) 5%, rgba(19,18,19,0.21474527310924374) 68%);height: 100vh;background-size: cover;width: 100%;">
                        <div class="slide-info">
                            <div class="slide-content" style="margin-top:460px;z-index: 999;">
                                <h1 class="dz-title" style="color:#fff">e-témoins</h1>
                                <p style="color:#fff">Fiez-vous à e-témoins pour une démocratie renforcée.</p>
                            </div>
                        </div>
                        </div>
                    </div>


                    <div class="swiper-slide" style="background-image:url(img/prezi.jpg);background-size: cover;width: 100%;height: 100%;background-position: top;">
                        <div style="background: rgb(19,18,19);background: linear-gradient(0deg, rgba(19,18,19,1) 5%, rgba(19,18,19,0.21474527310924374) 68%);height: 100vh;background-size: cover;width: 100%;">
                        <div class="slide-info">
                            <div class="slide-content" style="margin-top:460px;z-index: 999;">
                                <h1 class="dz-title" style="color:#fff">e-témoins</h1>
                                <p style="color:#fff;">Votre voix compte avec e-témoins : Des élections sûres et fiables.</p>
                            </div>
                        </div>
                        </div>
                    </div>


                    <div class="swiper-slide" style="background-image:url(img/6.jpeg);background-size: cover;width: 100%;height: 100%;background-position: top;">
                        <div style="background: rgb(19,18,19);background: linear-gradient(0deg, rgba(19,18,19,1) 5%, rgba(19,18,19,0.21474527310924374) 68%);height: 100vh;background-size: cover;width: 100%;">
                        <div class="slide-info">
                            <div class="slide-content" style="margin-top:460px;z-index: 999;">
                                <h1 class="dz-title" style="color:#fff">transparence</h1>
                                <p style="color:#fff">Transparence électorale avec e-témoins : Rien ne nous échappe !</p>
                            </div>
                        </div>
                        </div>
                    </div>


           

                </div>
            </div>

             <div class="swiper-pagination-started pagination-dots style-1" style="position:fixed;margin-bottom: 90px;width: 90%;left: 20px;"></div>

            <div style="position: fixed;bottom: 70px;width: 90%;margin-left: 20px;z-index: 999;">
                <a href="sign.php" style="color: #fff!important;font-weight: 600;font-size: 1.5em;" class="d-block">Commencer 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fb881f" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                    </svg>
                </a>  
            </div>
            
            
        </div>
        <!-- Onboading End-->    
    </div>
    <!-- Page Content End-->
    
  
    
    
</div>    
<!--**********************************
    Scripts
***********************************-->
<script src="assets/js/jquery.js"></script>
<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="assets/js/settings.js"></script>
<script src="assets/js/custom.js"></script>
<script src="assets/js/dz.carousel.js"></script><!-- Swiper -->
<script src="assets/vendor/swiper/swiper-bundle.min.js"></script><!-- Swiper -->
<script src="assets/vendor/wow/dist/wow.min.js"></script>
<script>
    new WOW().init();
    
    var wow = new WOW(
    {
      boxClass:     'wow',      // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset:       0,          // distance to the element when triggering the animation (default is 0)
      mobile:       false       // trigger animations on mobile devices (true is default)
    });
    wow.init();	
</script>
</body>
</html>