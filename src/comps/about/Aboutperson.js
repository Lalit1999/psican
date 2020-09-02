import React from 'react' ;

import Title from '../title/Title.js' ;
import './AboutPerson.css' ;

import Leader_image from '../images/leader.webp' ;

class Aboutperson extends React.Component
{	
	render()
	{	let width = 0 ;
		let height = 0 ;
		if(window.screen.availWidth > 600)
		{	width = 1120 ;
			height = 630 ;
		}
		else
		{	width = 308 ;
			height = 173.25 ;
		}
		return(
			<div>
				<div>
					<Title name = 'Our Leader' items={["Home -"," About -", "Leader"]}/>
				</div>
				<div className = 'flex'>
					<div className="about-left">
						<div className = 'font about-bold'>Ashish Aggarwal</div>
						<ul className="about-list"> 
							<li>Counsellor, Mentor, Motivator</li>
							<li>B.Sc & M.Sc (Applied Psychology) </li>
							<li>Post-Graduate Diploma in Guidance & Counselling</li>
							<li>Diploma in Pharmacy</li>
							<li>Diploma in System Management</li>
						</ul>
					</div>
					<div className = 'photo br'>
						<img className ='br' src = {Leader_image} alt = "Leader"/>
					</div>
				</div>
				<div className="after-div">
					<ul> 
						<li className = 'txt'>Director&emsp;:&emsp;Psyment</li>
						<li className = 'txt'>Managing Director&emsp;:&emsp;ORN Remedies Pvt. Ltd. (A 
							Pharmaceutical Company based in Delhi) </li>
						<li className = 'txt'>Hails an illustrous multi-year association with esteemed
							organisations like Mahavir Senior Model School (Delhi), NGO - Udayan Care
							(Delhi), Tatva Pranic Healing (Pune) as a trainer and motivator</li>
						<li className = 'txt'>He has been born and brought-up in Delhi. Most of his 
							education has also been based in Delhi.</li>
						<li className = 'txt'>In the initial part of his career, he served in top 
							Pharmaceutical companies like Sun Pharma, Natco Pharma & USV Ltd. </li> 
					</ul>
				</div>
				<div className="frame-con">
					<iframe width={width} height={height} title="Youtube" src="https://www.youtube.com/embed/x5q0iTT3UQE" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
					<iframe width={width} height={height} title="Youtube" src="https://www.youtube.com/embed/V31EeCfb1f8" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
				</div>
			</div>
		) ;
	}
}

export default Aboutperson ;