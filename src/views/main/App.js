import Head from './Head';
import NavHeader from './NavHeader'
import Header from './Header'
import SideBar from './SideBar'
import Footer from './Footer'
import { useEffect } from 'react';

export default function App({ title,children, customLink }){

	useEffect(()=>{
		let main = document.getElementById('main-wrapper'),
		preloader = document.getElementById('preloader'),
		hamburger = document.querySelector('.hamburger');

		preloader.style.display = 'none';
		main.className = 'show';

		main.onclick = (event)=>{

			let target = event.target,
			className = target.className || "";

			if(className.indexOf && className.indexOf('hamburger') != -1){
				event.preventDefault();
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

	},[true])

	return (
		<div>
			<Head title={title} customLink={customLink} />

			<div id="preloader">
			        <div className="sk-three-bounce">
			            <div className="sk-child sk-bounce1"></div>
			            <div className="sk-child sk-bounce2"></div>
			            <div className="sk-child sk-bounce3"></div>
			        </div>
			</div>
			<div id='main-wrapper'>
				<NavHeader />
				<Header />
				<SideBar />
				{children}
			</div>
		</div>
	)
}