import Head from 'next/head';
import axios from 'axios';
import React from 'react'
import LoadingText from '../src/components/LoadingText'
import { useState } from 'react';

export default function Add(){
    let formRef = React.createRef(),
    [loading,setLoading] = useState(false),
    loadingClass = (loading)? '':'hide';

    function postBulletin(event){
        event.preventDefault();

        let form = formRef.current;

        if(!form.elements.bulletins.value){
            alert("Completer le bulletin ");
        }
        else{
            setLoading(true);

            axios.post('/api/bulletin',form).then((response)=>{
                let payload = response.data;

                if(payload.failed.length){
                    alert(payload.failed.length + " bulletins n'ont pas pu etre inséré. \n"+payload.failed.toString());
                }
                else{
                    location.href = 'http://54.152.100.182/e-temoins/success.php'
                }
            }).catch((error)=>{
                alert("Erreur lors du bulletin non inséré");
                console.error(error);
            }).finally(()=>{
                setLoading(false);
            })
        }
    }

    return (
        <>
            <Head>
                {/*<!-- Favicons Icon -->*/}
                <link rel="shortcut icon" type="image/x-icon" href="img/ico.png" />
                
                {/*<!-- Title -->*/}
                <title>Add</title>
                
                {/*<!-- Stylesheets -->*/}
                <link href="assets/vendor/imageuplodify/imageuploadify.min.css" rel="stylesheet" />
                <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
                
                {/*<!-- Google Fonts -->*/}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&amp;family=Racing+Sans+One&amp;display=swap" rel="stylesheet" />

            </Head>   
            <div className="page-wraper">
                
                {/*<!-- Preloader -->*/}
                <div id="preloader">
                    <div className="spinner"></div>
                </div>
                {/*<!-- Preloader end-->*/}
                
                {/*<!-- Page Content -->*/}
                <div className="page-content bottom-content">
                    
                    {/*<!-- Banner -->*/}
                    <div className="head-details" style={{background: "#131213"}}>
                        <div className=" container">
                            <div className="dz-info">
                                <span className="location d-block">Enregistrez un vote</span>
                                <h5 className="title">Dépouillement</h5>
                            </div>
                            <div className="dz-media media-65">
                                <img src="assets/images/logo/logo.svg" alt="" />
                            </div>
                        </div>
                    </div>
                        
                    <div className="fixed-content p-0"> 
                        <div className="container">
                            <div className="main-content">
                                <div className="left-content">
                                    <a href="http://54.152.100.182/e-temoins/home.php">
                                        <svg width="18" height="18" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.03033 0.46967C9.2966 0.735936 9.3208 1.1526 9.10295 1.44621L9.03033 1.53033L2.561 8L9.03033 14.4697C9.2966 14.7359 9.3208 15.1526 9.10295 15.4462L9.03033 15.5303C8.76406 15.7966 8.3474 15.8208 8.05379 15.6029L7.96967 15.5303L0.96967 8.53033C0.703403 8.26406 0.679197 7.8474 0.897052 7.55379L0.96967 7.46967L7.96967 0.46967C8.26256 0.176777 8.73744 0.176777 9.03033 0.46967Z" fill="#a19fa8"/>
                                        </svg>
                                    </a>
                                </div>
                                <div className="mid-content">
                                    <h5 className="mb-0">Ajouter</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<!-- Banner End -->*/}
                    
                    <div className="container">
                        <LoadingText className={loadingClass} />
                        <form ref={formRef} onSubmit={postBulletin} className="my-2">
                            <div className="input-group">
                                <input name='bulletins' type="file" className="imageuplodify" accept=".xlsx,.xls,image/*,.doc,audio/*,.docx,video/*,.ppt,.pptx,.txt,.pdf" multiple='true' />
                            </div>
                            <div className="input-group">
                                <textarea name='commentaire' type="text" placeholder="Observations" className="form-control" style={{borderRadius: "10px"}}></textarea>
                            </div>

                        </form>
                    </div>
                    {/*<!-- Page Content End -->*/}
                    
                    {/*<!-- Footer -->*/}
                    <footer className="footer fixed">
                        <div className="container">
                            <a onClick={postBulletin} href="#!" className="btn btn-primary w-100 btn-rounded">Envoyez</a>
                        </div>
                    </footer>
                    {/*<!-- Footer End -->*/}
                    
                </div>    
            </div>
            {/*<!--**********************************
                Scripts
            ***********************************-->*/}
            <script src="assets/js/jquery.js"></script>
            <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="assets/js/settings.js"></script>
            <script src="assets/js/custom.js"></script>
            <script src="assets/vendor/imageuplodify/imageuploadify.min.js"></script>
            {/*<script dangerouslySetInnerHTML={{__html:`
                $(document).ready(function() {
                    $('input[type="file"]').imageuploadify();
                })
            `}}>
            </script>*/}
        </>
    )
}