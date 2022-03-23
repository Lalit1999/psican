import Title from '../title/Title.js' ;
import './about.css' ;

import Image from '../images/Psyment.webp' ;
import LeaderImage from '../images/leader.webp' ;

const Aboutpsican=() => {
	let width=0 ;
	let height=0 ;

	if(window.screen.availWidth > 600) {	
		width=538 ;
		height=302 ;
	}
	else {	
		width=184 ;
		height=103 ;
	}

	return(
		<div className="about">
			<Title name='About Us' items={["Home","About"]}/>
			<div className='flex'>
				<div className='about-psyment'>
					<p>
						Psyment aspires to provide counselling and mentoring solutions to those
						who need it.
					</p>
					<p>
						Psyment aims to work with a purpose to promote, encourage and make social
						change by working in the areas of Education, Human Skill and
						Transformation.
					</p>
					<p>
						Psyment shall work with its clients in providing solutions by using the
						techniques of customised profile assessment, counselling, E-query answer
						and content-based workshops.
					</p>
					<p>
						Psyment shall work on the core values of Empathy, Enlightenment and
						Empowerment to increase Self-Efficacy amongst its clients and audiences. 
					</p>
				</div>
				<div className='about-logo'>
					<img src={Image} alt='Logo' />
				</div>
			</div>
			<div className="flex blue-flex">
				<div className='about-left'>
					<div className='about-photo'>
						<img src={LeaderImage} alt="Leader"/>
					</div>
					<div className="about-person">
						<div className='about-name'>Ashish Aggarwal</div>
						<ul className="about-list"> 
							<li>Counsellor, Mentor, Motivator</li>
							<li>Director : Psyment</li>
							<li>Managing Director : <a href="https://ornremedies.com">ORN Remedies Pvt. Ltd.</a></li>
						</ul>
					</div>
				</div>
				<div className="after-div">
					<ul> 
						<li>B.Sc & M.Sc (Applied Psychology) </li>
						<li>Post-Graduate Diploma in Guidance & Counselling</li>
						<li>Diploma in Pharmacy</li>
						<li>Diploma in System Management</li>
						<li>Hails an illustrous multi-year association with esteemed organisations like Mahavir Senior Model School (Delhi), NGO - Udayan Care (Delhi), Tatva Pranic Healing (Pune) as a trainer and motivator</li>
					</ul>
				</div>
			</div>
			<div className="frame-con">
				<iframe width={width} height={height} title="Youtube" src="https://www.youtube.com/embed/x5q0iTT3UQE" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
				<iframe width={width} height={height} title="Youtube" src="https://www.youtube.com/embed/V31EeCfb1f8" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
			</div>
		</div>
	) ;
}

export default Aboutpsican ;