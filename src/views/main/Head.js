import Head from 'next/head'

export default function HeadTop({title, customLink=null}){
	return (
		<Head>
			    <title>{title}</title>
			    {/*<!-- Favicon icon -->*/}
			    <link rel="icon" type="image/png" sizes="16x16" href="images/favicon.png" />
			    <link rel="stylesheet" href="vendor/chartist/css/chartist.min.css" />
				{/*<!-- Vectormap -->*/}
			    <link href="/vendor/bootstrap-select/dist/css/bootstrap-select.min.css" rel="stylesheet" />
				<link href="/vendor/owl-carousel/owl.carousel.css" rel="stylesheet" />
				<link href="https://cdn.lineicons.com/2.0/LineIcons.css" rel="stylesheet" />
				<link href="/css/style.css" rel="stylesheet" />
				{customLink}
			</Head>


	)
}