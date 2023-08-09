'use client';

import Head from 'next/head';
import { useEffect } from 'react'
import Card from '../../src/views/dashboard/Card.js'
import App from '../../src/views/main/App.js'
import LeaderBoard from '../../src/components/LeaderBoardAll.js'
import CommonScript from '../../src/components/CommonScript'

const castels = [
	{
		title:'Candidats',
		url:'/api/candidat?total=true',
		link:'/admin/candidats'
	},
	{
		title:'Temoins',
		url:'/api/temoin?total=true',
		link:'/admin/temoins'
	},
	{
		title:'Bulletin',
		url:'/api/bulletin?total=true',
		link:'/admin/bulletins'
	}
],
customLink = <link href="/vendor/jqvmap/css/jqvmap.min.css" rel="stylesheet" />

export default function Index(){

	

	return <App title='Admin Dashboard'>
			<div className="content-body">
			            {/*<!-- row -->*/}
						<div className="container-fluid">
							<div className="row">
								{castels.map((castel)=>{
									return <Card {...castel} key={castel.title}/>
								})}
								<LeaderBoard />
								<div className="col-xl-9 col-xxl-8">
									<div className="row">
										<div className="col-xl-12">
											<div className="card">
												<div className="card-header border-0 pb-0 flex-wrap">
													<h4 className="fs-20 text-black me-4 mb-2">Vacancy Stats</h4>
													<div className="form-check custom-checkbox mb-3">
														<input type="checkbox" className="form-check-input" id="customCheckBox1" required />
														<label className="form-check-label" htmlFor="customCheckBox1">Application Sent</label>
													</div>
													<div className="form-check custom-checkbox mb-3">
														<input type="checkbox" className="form-check-input" id="customCheck1" required />
														<label className="form-check-label" htmlFor="customCheck1">Interviews</label>
													</div>
													<div className="form-check custom-checkbox mb-3">
														<input type="checkbox" className="form-check-input" id="customCheck2" required />
														<label className="form-check-label" htmlFor="customCheck2">Rejected</label>
													</div>
													<select className="form-control style-1 default-select mt-3 mt-sm-0">
														<option>Monthly</option>
														<option>Weekly</option>
														<option>Daily</option>
													</select>
												</div>
												<div className="card-body">	
													<canvas id="lineChart" className="Vacancy-chart"></canvas>
													<div className="d-flex flex-wrap align-items-center justify-content-center mt-3">
														<div className="fs-14 text-black me-4">
															<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
																<rect width="19" height="19" rx="9.5" fill="#4E36E2"/>
															</svg>
															Application Sent
														</div>
														<div className="fs-14 text-black me-4">
															<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
																<rect width="19" height="19" rx="9.5" fill="#1BD084"/>
															</svg>
															Interviews
														</div>
														<div className="fs-14 text-black">
															<svg className="me-2" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
																<rect width="19" height="19" rx="9.5" fill="#FF424D"/>
															</svg>
															Rejected
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="col-xl-12">
											<h4 className="fs-20 text-black mb-sm-4 mt-sm-0 mt-2  mb-2">Recomended Jobs</h4>
											<div className="testimonial-one owl-carousel">
												<div className="items">
													<div className="card shadow">
														<div className="card-body">	
															<div className="media mb-2">
																<div className="media-body">
																	<p className="mb-1">Maximoz Team</p>
																	<h4 className="fs-20 text-black">PHP Progammer</h4>
																</div>
																<svg className="ms-3" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path d="M0 8.72727C0 3.90733 3.90733 0 8.72727 0H51.2727C56.0927 0 60 3.90733 60 8.72727V51.2727C60 56.0927 56.0927 60 51.2727 60H8.72727C3.90733 60 0 56.0927 0 51.2727V8.72727Z" fill="#D3D3D3"/>
																	<path d="M0 8.72727C0 3.90733 3.90733 0 8.72727 0H51.2727C56.0927 0 60 3.90733 60 8.72727V51.2727C60 56.0927 56.0927 60 51.2727 60H8.72727C3.90733 60 0 56.0927 0 51.2727V8.72727Z" fill="#3144F3"/>
																	<path d="M15.4662 15.4665C17.3565 13.5761 19.6007 12.0766 22.0705 11.0536C24.5403 10.0305 27.1875 9.50399 29.8608 9.50399C32.5342 9.50399 35.1813 10.0305 37.6512 11.0536C40.121 12.0766 42.3652 13.5761 44.2555 15.4665C46.1459 17.3568 47.6453 19.6009 48.6684 22.0708C49.6914 24.5406 50.218 27.1878 50.218 29.8611C50.218 32.5345 49.6914 35.1816 48.6684 37.6515C47.6453 40.1213 46.1458 42.3655 44.2555 44.2558L37.0582 37.0585C38.0033 36.1133 38.7531 34.9912 39.2646 33.7563C39.7761 32.5214 40.0394 31.1978 40.0394 29.8611C40.0394 28.5245 39.7761 27.2009 39.2646 25.966C38.7531 24.731 38.0033 23.609 37.0582 22.6638C36.113 21.7186 34.9909 20.9689 33.756 20.4574C32.5211 19.9458 31.1975 19.6826 29.8608 19.6826C28.5242 19.6826 27.2006 19.9458 25.9657 20.4574C24.7307 20.9689 23.6087 21.7186 22.6635 22.6638L15.4662 15.4665Z" fill="#8FD7FF"/>
																	<path d="M15.4661 44.2558C11.6484 40.4381 9.50365 35.2601 9.50365 29.8611C9.50365 24.462 11.6484 19.2841 15.4661 15.4664C19.2838 11.6487 24.4617 9.50395 29.8608 9.50395C35.2598 9.50394 40.4378 11.6487 44.2555 15.4664L37.0581 22.6637C35.1493 20.7549 32.5603 19.6825 29.8608 19.6825C27.1613 19.6825 24.5723 20.7549 22.6635 22.6638C20.7546 24.5726 19.6822 27.1616 19.6822 29.8611C19.6822 32.5606 20.7546 35.1496 22.6635 37.0584L15.4661 44.2558Z" fill="white"/>
																</svg>
															</div>
															<span className="text-primary font-w500 d-block mb-3">$14,000 - $25,000</span>
															<p className="fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...</p>
															<div className="d-flex align-items-center mt-4">
																<a href="companies.html" className="btn btn-primary light btn-rounded me-auto">REMOTE</a>
																<span className="text-black font-w500 ps-3">London, England</span>
															</div>
														</div>
													</div>
												</div>
												<div className="items">
													<div className="card shadow">
														<div className="card-body">	
															<div className="media mb-2">
																<div className="media-body">
																	<p className="mb-1">Klean n Clin Studios</p>
																	<h4 className="fs-20 text-black">Senior Programmer</h4>
																</div>
																<svg className="ms-3" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path d="M0 8.72727C0 3.90733 3.90733 0 8.72727 0H51.2727C56.0927 0 60 3.90733 60 8.72727V51.2727C60 56.0927 56.0927 60 51.2727 60H8.72727C3.90733 60 0 56.0927 0 51.2727V8.72727Z" fill="#D3D3D3"/>
																	<path d="M0 8.72727C0 3.90733 3.90733 0 8.72727 0H51.2727C56.0927 0 60 3.90733 60 8.72727V51.2727C60 56.0927 56.0927 60 51.2727 60H8.72727C3.90733 60 0 56.0927 0 51.2727V8.72727Z" fill="#FE8024"/>
																	<path d="M15.4662 15.4665C17.3565 13.5761 19.6007 12.0766 22.0705 11.0536C24.5403 10.0305 27.1875 9.50398 29.8608 9.50398C32.5342 9.50399 35.1813 10.0305 37.6512 11.0536C40.121 12.0766 42.3652 13.5761 44.2555 15.4665C46.1459 17.3568 47.6453 19.6009 48.6684 22.0708C49.6914 24.5406 50.218 27.1878 50.218 29.8611C50.218 32.5345 49.6914 35.1816 48.6684 37.6515C47.6453 40.1213 46.1458 42.3655 44.2555 44.2558L37.0582 37.0585C38.0033 36.1133 38.7531 34.9912 39.2646 33.7563C39.7761 32.5214 40.0394 31.1978 40.0394 29.8611C40.0394 28.5245 39.7761 27.2009 39.2646 25.966C38.7531 24.731 38.0033 23.609 37.0582 22.6638C36.113 21.7186 34.9909 20.9689 33.756 20.4574C32.5211 19.9458 31.1975 19.6826 29.8608 19.6826C28.5242 19.6826 27.2006 19.9458 25.9657 20.4574C24.7307 20.9689 23.6087 21.7186 22.6635 22.6638L15.4662 15.4665Z" fill="white"/>
																	<path d="M15.4661 44.2558C11.6484 40.4381 9.50364 35.2601 9.50364 29.8611C9.50363 24.462 11.6484 19.2841 15.4661 15.4664C19.2838 11.6487 24.4617 9.50395 29.8608 9.50395C35.2598 9.50394 40.4377 11.6487 44.2554 15.4664L37.0581 22.6637C35.1493 20.7549 32.5603 19.6825 29.8608 19.6825C27.1613 19.6825 24.5723 20.7549 22.6634 22.6638C20.7546 24.5726 19.6822 27.1616 19.6822 29.8611C19.6822 32.5606 20.7546 35.1496 22.6634 37.0584L15.4661 44.2558Z" fill="white"/>
																</svg>
															</div>
															<span className="text-primary font-w500 d-block mb-3">$14,000 - $25,000</span>
															<p className="fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...</p>
															<div className="d-flex align-items-center mt-4">
																<a href="companies.html" className="btn btn-primary light btn-rounded me-auto">REMOTE</a>
																<span className="text-black font-w500 ps-3">Manchester, England</span>
															</div>
														</div>
													</div>
												</div>
												<div className="items">
													<div className="card shadow">
														<div className="card-body">	
															<div className="media mb-2">
																<div className="media-body">
																	<p className="mb-1">Maximoz Team</p>
																	<h4 className="fs-20 text-black">Intern UX Designer</h4>
																</div>
																<svg className="ms-3" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path d="M0 8.72727C0 3.90733 3.90733 0 8.72727 0H51.2727C56.0927 0 60 3.90733 60 8.72727V51.2727C60 56.0927 56.0927 60 51.2727 60H8.72727C3.90733 60 0 56.0927 0 51.2727V8.72727Z" fill="#D3D3D3"/>
																	<path d="M0 8.72727C0 3.90733 3.90733 0 8.72727 0H51.2727C56.0927 0 60 3.90733 60 8.72727V51.2727C60 56.0927 56.0927 60 51.2727 60H8.72727C3.90733 60 0 56.0927 0 51.2727V8.72727Z" fill="#FE8024"/>
																	<path d="M15.4662 15.4665C17.3565 13.5761 19.6007 12.0766 22.0705 11.0536C24.5403 10.0305 27.1875 9.50398 29.8608 9.50398C32.5342 9.50399 35.1813 10.0305 37.6512 11.0536C40.121 12.0766 42.3652 13.5761 44.2555 15.4665C46.1459 17.3568 47.6453 19.6009 48.6684 22.0708C49.6914 24.5406 50.218 27.1878 50.218 29.8611C50.218 32.5345 49.6914 35.1816 48.6684 37.6515C47.6453 40.1213 46.1458 42.3655 44.2555 44.2558L37.0582 37.0585C38.0033 36.1133 38.7531 34.9912 39.2646 33.7563C39.7761 32.5214 40.0394 31.1978 40.0394 29.8611C40.0394 28.5245 39.7761 27.2009 39.2646 25.966C38.7531 24.731 38.0033 23.609 37.0582 22.6638C36.113 21.7186 34.9909 20.9689 33.756 20.4574C32.5211 19.9458 31.1975 19.6826 29.8608 19.6826C28.5242 19.6826 27.2006 19.9458 25.9657 20.4574C24.7307 20.9689 23.6087 21.7186 22.6635 22.6638L15.4662 15.4665Z" fill="white"/>
																	<path d="M15.4661 44.2558C11.6484 40.4381 9.50364 35.2601 9.50364 29.8611C9.50363 24.462 11.6484 19.2841 15.4661 15.4664C19.2838 11.6487 24.4617 9.50395 29.8608 9.50395C35.2598 9.50394 40.4377 11.6487 44.2554 15.4664L37.0581 22.6637C35.1493 20.7549 32.5603 19.6825 29.8608 19.6825C27.1613 19.6825 24.5723 20.7549 22.6634 22.6638C20.7546 24.5726 19.6822 27.1616 19.6822 29.8611C19.6822 32.5606 20.7546 35.1496 22.6634 37.0584L15.4661 44.2558Z" fill="white"/>
																</svg>
															</div>
															<span className="text-primary font-w500 d-block mb-3">$14,000 - $25,000</span>
															<p className="fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...</p>
															<div className="d-flex align-items-center mt-4">
																<a href="companies.html" className="btn btn-primary light btn-rounded me-auto">FULTIME</a>
																<span className="text-black font-w500 ps-3">London, England</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-12">
									<div className="d-sm-flex align-items-center mb-3 mt-sm-0 mt-2">
										<h4 className="text-black fs-20 me-auto">Featured Companies</h4>
										<a href="companies.html" className="btn btn-primary light btn-rounded">View More
											<svg className="ms-3" width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M23.5607 5.93941L18.2461 0.62482C17.9532 0.331898 17.5693 0.185461 17.1854 0.185461C16.8015 0.185461 16.4176 0.331898 16.1247 0.62482C15.539 1.21062 15.539 2.16035 16.1247 2.74615L18.8787 5.50005L1.5 5.50005C0.671578 5.50005 0 6.17163 0 7.00005C0 7.82848 0.671578 8.50005 1.5 8.50005L18.8787 8.50005L16.1247 11.254C15.539 11.8398 15.539 12.7895 16.1247 13.3753C16.7106 13.9611 17.6602 13.9611 18.2461 13.3753L23.5607 8.06069C24.1464 7.47495 24.1464 6.52516 23.5607 5.93941Z" fill="#40189D"/>
											</svg>
										</a>
									</div>
									<div className="testimonial-two owl-carousel">
										<div className="items">
											<div className="card">
												<div className="card-body">
													<div className="media">
														<svg className="me-3" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M0 11.6364C0 5.20978 5.20978 0 11.6364 0H68.3636C74.7902 0 80 5.20978 80 11.6364V68.3636C80 74.7902 74.7902 80 68.3636 80H11.6364C5.20978 80 0 74.7902 0 68.3636V11.6364Z" fill="#D3D3D3"/>
															<path d="M0 11.6364C0 5.20978 5.20978 0 11.6364 0H68.3636C74.7902 0 80 5.20978 80 11.6364V68.3636C80 74.7902 74.7902 80 68.3636 80H11.6364C5.20978 80 0 74.7902 0 68.3636V11.6364Z" fill="#40C7CF"/>
															<path d="M20.6216 20.6219C23.142 18.1015 26.1342 16.1022 29.4273 14.7381C32.7205 13.374 36.25 12.672 39.8145 12.672C43.3789 12.672 46.9085 13.374 50.2016 14.7381C53.4947 16.1022 56.4869 18.1015 59.0074 20.6219C61.5278 23.1424 63.5271 26.1346 64.8912 29.4277C66.2552 32.7208 66.9573 36.2504 66.9573 39.8148C66.9573 43.3793 66.2552 46.9088 64.8912 50.202C63.5271 53.4951 61.5278 56.4873 59.0074 59.0077L49.4109 49.4113C50.6711 48.1511 51.6708 46.6549 52.3528 45.0084C53.0348 43.3618 53.3859 41.5971 53.3859 39.8148C53.3859 38.0326 53.0348 36.2678 52.3528 34.6213C51.6708 32.9747 50.6711 31.4786 49.4109 30.2184C48.1507 28.9582 46.6546 27.9585 45.008 27.2765C43.3615 26.5944 41.5967 26.2434 39.8145 26.2434C38.0322 26.2434 36.2675 26.5944 34.6209 27.2765C32.9743 27.9585 31.4782 28.9582 30.218 30.2184L20.6216 20.6219Z" fill="#8FD7FF"/>
															<path d="M20.6215 59.0077C15.5312 53.9174 12.6715 47.0135 12.6715 39.8148C12.6715 32.6161 15.5312 25.7122 20.6215 20.6219C25.7118 15.5316 32.6157 12.6719 39.8144 12.6719C47.0131 12.6719 53.917 15.5316 59.0073 20.6219L49.4108 30.2183C46.8657 27.6732 43.4138 26.2434 39.8144 26.2434C36.215 26.2434 32.7631 27.6732 30.2179 30.2183C27.6728 32.7635 26.243 36.2154 26.243 39.8148C26.243 43.4141 27.6728 46.8661 30.2179 49.4112L20.6215 59.0077Z" fill="white"/>
														</svg>
														<div className="media-body">
															<h6 className="fs-16 text-black font-w600">Herman-Carter</h6>
															<span className="text-primary font-w500">21 Vacancy</span>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="items">
											<div className="card">
												<div className="card-body">
													<div className="media">
														<svg className="me-3" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M0 11.6364C0 5.20978 5.20978 0 11.6364 0H68.3636C74.7902 0 80 5.20978 80 11.6364V68.3636C80 74.7902 74.7902 80 68.3636 80H11.6364C5.20978 80 0 74.7902 0 68.3636V11.6364Z" fill="#D3D3D3"/>
															<path d="M0 11.6364C0 5.20978 5.20978 0 11.6364 0H68.3636C74.7902 0 80 5.20978 80 11.6364V68.3636C80 74.7902 74.7902 80 68.3636 80H11.6364C5.20978 80 0 74.7902 0 68.3636V11.6364Z" fill="#6EC061"/>
															<path d="M39.8144 66.9577C36.25 66.9577 32.7205 66.2556 29.4273 64.8916C26.1342 63.5275 23.142 61.5282 20.6216 59.0077C18.1011 56.4873 16.1018 53.4951 14.7377 50.2019C13.3737 46.9088 12.6716 43.3793 12.6716 39.8148C12.6716 36.2504 13.3737 32.7208 14.7377 29.4277C16.1018 26.1346 18.1011 23.1424 20.6216 20.6219C23.142 18.1015 26.1342 16.1021 29.4273 14.7381C32.7205 13.374 36.25 12.672 39.8145 12.672L39.8145 26.2434C38.0322 26.2434 36.2675 26.5944 34.6209 27.2765C32.9743 27.9585 31.4782 28.9582 30.218 30.2184C28.9578 31.4786 27.9581 32.9747 27.2761 34.6213C26.5941 36.2678 26.243 38.0326 26.243 39.8148C26.243 41.597 26.5941 43.3618 27.2761 45.0084C27.9581 46.6549 28.9578 48.151 30.218 49.4113C31.4782 50.6715 32.9743 51.6712 34.6209 52.3532C36.2675 53.0352 38.0322 53.3863 39.8144 53.3863L39.8144 66.9577Z" fill="white"/>
															<path d="M20.6215 59.0077C15.5312 53.9174 12.6715 47.0135 12.6715 39.8148C12.6715 32.6161 15.5312 25.7122 20.6215 20.6219C25.7118 15.5316 32.6157 12.6719 39.8144 12.6719C47.0131 12.6719 53.917 15.5316 59.0073 20.6219L49.4108 30.2183C46.8657 27.6732 43.4138 26.2434 39.8144 26.2434C36.215 26.2434 32.7631 27.6732 30.2179 30.2183C27.6728 32.7635 26.243 36.2154 26.243 39.8148C26.243 43.4141 27.6728 46.8661 30.2179 49.4112L20.6215 59.0077Z" fill="white"/>
														</svg>
														<div className="media-body">
															<h6 className="fs-16 text-black font-w600">Funk Inc.</h6>
															<span className="text-primary font-w500">21 Vacancy</span>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="items">
											<div className="card">
												<div className="card-body">
													<div className="media">
														<svg className="me-3" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M0 11.6364C0 5.20978 5.20978 0 11.6364 0H68.3636C74.7902 0 80 5.20978 80 11.6364V68.3636C80 74.7902 74.7902 80 68.3636 80H11.6364C5.20978 80 0 74.7902 0 68.3636V11.6364Z" fill="#D3D3D3"/>
															<path d="M0 11.6364C0 5.20978 5.20978 0 11.6364 0H68.3636C74.7902 0 80 5.20978 80 11.6364V68.3636C80 74.7902 74.7902 80 68.3636 80H11.6364C5.20978 80 0 74.7902 0 68.3636V11.6364Z" fill="#F3C831"/>
															<path d="M20.6216 20.6219C23.142 18.1015 26.1342 16.1022 29.4273 14.7381C32.7205 13.374 36.25 12.672 39.8145 12.672C43.3789 12.672 46.9085 13.374 50.2016 14.7381C53.4947 16.1022 56.4869 18.1015 59.0074 20.6219C61.5278 23.1424 63.5271 26.1346 64.8912 29.4277C66.2552 32.7208 66.9573 36.2504 66.9573 39.8148C66.9573 43.3793 66.2552 46.9088 64.8912 50.202C63.5271 53.4951 61.5278 56.4873 59.0074 59.0077L49.4109 49.4113C50.6711 48.1511 51.6708 46.6549 52.3528 45.0084C53.0348 43.3618 53.3859 41.5971 53.3859 39.8148C53.3859 38.0326 53.0348 36.2678 52.3528 34.6213C51.6708 32.9747 50.6711 31.4786 49.4109 30.2184C48.1507 28.9582 46.6546 27.9585 45.008 27.2765C43.3615 26.5944 41.5967 26.2434 39.8145 26.2434C38.0322 26.2434 36.2675 26.5944 34.6209 27.2765C32.9743 27.9585 31.4782 28.9582 30.218 30.2184L20.6216 20.6219Z" fill="white"/>
															<path d="M20.6215 59.0077C15.5312 53.9174 12.6715 47.0135 12.6715 39.8148C12.6715 32.6161 15.5312 25.7122 20.6215 20.6219C25.7118 15.5316 32.6157 12.6719 39.8144 12.6719C47.0131 12.6719 53.917 15.5316 59.0073 20.6219L49.4108 30.2183C46.8657 27.6732 43.4138 26.2434 39.8144 26.2434C36.215 26.2434 32.7631 27.6732 30.2179 30.2183C27.6728 32.7635 26.243 36.2154 26.243 39.8148C26.243 43.4141 27.6728 46.8661 30.2179 49.4112L20.6215 59.0077Z" fill="white"/>
														</svg>
														<div className="media-body">
															<h6 className="fs-16 text-black font-w600">Williamson Inc</h6>
															<span className="text-primary font-w500">21 Vacancy</span>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="items">
											<div className="card">
												<div className="card-body">
													<div className="media">
														<svg className="me-3" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M0 11.6364C0 5.20978 5.20978 0 11.6364 0H68.3636C74.7902 0 80 5.20978 80 11.6364V68.3636C80 74.7902 74.7902 80 68.3636 80H11.6364C5.20978 80 0 74.7902 0 68.3636V11.6364Z" fill="#D3D3D3"/>
															<path d="M0 11.6364C0 5.20978 5.20978 0 11.6364 0H68.3636C74.7902 0 80 5.20978 80 11.6364V68.3636C80 74.7902 74.7902 80 68.3636 80H11.6364C5.20978 80 0 74.7902 0 68.3636V11.6364Z" fill="#F331E0"/>
															<path d="M20.6216 20.6219C23.142 18.1015 26.1342 16.1022 29.4273 14.7381C32.7205 13.374 36.25 12.672 39.8145 12.672C43.3789 12.672 46.9085 13.374 50.2016 14.7381C53.4947 16.1022 56.4869 18.1015 59.0074 20.6219C61.5278 23.1424 63.5271 26.1346 64.8912 29.4277C66.2552 32.7208 66.9573 36.2504 66.9573 39.8148C66.9573 43.3793 66.2552 46.9088 64.8912 50.202C63.5271 53.4951 61.5278 56.4873 59.0074 59.0077L49.4109 49.4113C50.6711 48.1511 51.6708 46.6549 52.3528 45.0084C53.0348 43.3618 53.3859 41.5971 53.3859 39.8148C53.3859 38.0326 53.0348 36.2678 52.3528 34.6213C51.6708 32.9747 50.6711 31.4786 49.4109 30.2184C48.1507 28.9582 46.6546 27.9585 45.008 27.2765C43.3615 26.5944 41.5967 26.2434 39.8145 26.2434C38.0322 26.2434 36.2675 26.5944 34.6209 27.2765C32.9743 27.9585 31.4782 28.9582 30.218 30.2184L20.6216 20.6219Z" fill="#F331E0"/>
															<path d="M20.6215 59.0077C15.5312 53.9174 12.6715 47.0135 12.6715 39.8148C12.6715 32.6161 15.5312 25.7122 20.6215 20.6219C25.7118 15.5316 32.6157 12.6719 39.8144 12.6719C47.0131 12.6719 53.917 15.5316 59.0073 20.6219L49.4108 30.2183C46.8657 27.6732 43.4138 26.2434 39.8144 26.2434C36.215 26.2434 32.7631 27.6732 30.2179 30.2183C27.6728 32.7635 26.243 36.2154 26.243 39.8148C26.243 43.4141 27.6728 46.8661 30.2179 49.4112L20.6215 59.0077Z" fill="#B60DA5"/>
														</svg>
														<div className="media-body">
															<h6 className="fs-16 text-black font-w600">Donnelly Ltd.</h6>
															<span className="text-primary font-w500">21 Vacancy</span>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="items">
											<div className="card">
												<div className="card-body">
													<div className="media">
														<svg className="me-3" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M0 11.6364C0 5.20978 5.20978 0 11.6364 0H68.3636C74.7902 0 80 5.20978 80 11.6364V68.3636C80 74.7902 74.7902 80 68.3636 80H11.6364C5.20978 80 0 74.7902 0 68.3636V11.6364Z" fill="#D3D3D3"/>
															<path d="M0 11.6364C0 5.20978 5.20978 0 11.6364 0H68.3636C74.7902 0 80 5.20978 80 11.6364V68.3636C80 74.7902 74.7902 80 68.3636 80H11.6364C5.20978 80 0 74.7902 0 68.3636V11.6364Z" fill="#9B70A1"/>
															<path d="M20.6216 20.6219C23.142 18.1015 26.1342 16.1022 29.4273 14.7381C32.7205 13.374 36.25 12.672 39.8145 12.672C43.3789 12.672 46.9085 13.374 50.2016 14.7381C53.4947 16.1022 56.4869 18.1015 59.0074 20.6219C61.5278 23.1424 63.5271 26.1346 64.8912 29.4277C66.2552 32.7208 66.9573 36.2504 66.9573 39.8148C66.9573 43.3793 66.2552 46.9088 64.8912 50.202C63.5271 53.4951 61.5278 56.4873 59.0074 59.0077L49.4109 49.4113C50.6711 48.1511 51.6708 46.6549 52.3528 45.0084C53.0348 43.3618 53.3859 41.5971 53.3859 39.8148C53.3859 38.0326 53.0348 36.2678 52.3528 34.6213C51.6708 32.9747 50.6711 31.4786 49.4109 30.2184C48.1507 28.9582 46.6546 27.9585 45.008 27.2765C43.3615 26.5944 41.5967 26.2434 39.8145 26.2434C38.0322 26.2434 36.2675 26.5944 34.6209 27.2765C32.9743 27.9585 31.4782 28.9582 30.218 30.2184L20.6216 20.6219Z" fill="white"/>
															<path d="M20.6215 59.0077C15.5312 53.9174 12.6715 47.0135 12.6715 39.8148C12.6715 32.6161 15.5312 25.7122 20.6215 20.6219C25.7118 15.5316 32.6157 12.6719 39.8144 12.6719C47.0131 12.6719 53.917 15.5316 59.0073 20.6219L49.4108 30.2183C46.8657 27.6732 43.4138 26.2434 39.8144 26.2434C36.215 26.2434 32.7631 27.6732 30.2179 30.2183C27.6728 32.7635 26.243 36.2154 26.243 39.8148C26.243 43.4141 27.6728 46.8661 30.2179 49.4112L20.6215 59.0077Z" fill="white"/>
														</svg>
														<div className="media-body">
															<h6 className="fs-16 text-black font-w600">Herman-Carter</h6>
															<span className="text-primary font-w500">21 Vacancy</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
			            </div>
			        </div>
			        
			        <CommonScript>
			        	<script src="/vendor/owl-carousel/owl.carousel.js"></script>
						<script src="/vendor/peity/jquery.peity.min.js"></script>
						<script type='text/javascript' dangerouslySetInnerHTML={{__html:`
							function carouselReview(){
								
								function checkDirection() {
									var htmlClassName = document.getElementsByTagName('html')[0].getAttribute('class');
									if(htmlClassName == 'rtl') {
										return true;
									} else {
										return false;
									
									}
								}
								jQuery('.testimonial-one').owlCarousel({
									loop:true,
									autoplay:true,
									margin:15,
									nav:false,
									dots: false,
									left:true,
									rtl: checkDirection(),
									navText: ['', ''],
									responsive:{
										0:{
											items:1
										},
										800:{
											items:2
										},	
										991:{
											items:2
										},			
										
										1200:{
											items:2
										},
										1600:{
											items:2
										}
									}
								})		
								jQuery('.testimonial-two').owlCarousel({
									loop:true,
									autoplay:true,
									margin:15,
									nav:false,
									dots: true,
									left:true,
									rtl: checkDirection(),
									navText: ['', ''],
									responsive:{
										0:{
											items:1
										},
										600:{
											items:2
										},	
										991:{
											items:3
										},			
										
										1200:{
											items:3
										},
										1600:{
											items:4
										}
									}
								})					
							}
							jQuery(window).on('load',function(){
								setTimeout(function(){
									carouselReview();
								}, 1000); 
							});
						`}}>
						</script>
			        </CommonScript>
	</App>
}