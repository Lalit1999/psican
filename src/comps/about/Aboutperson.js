import React from 'react' ;

import Title from '../title/Title.js' ;
import './AboutPerson.css' ;

import Leader_image from '../images/leader.jpg' ;

class Aboutperson extends React.Component
{
	render()
	{
		return(
			<div>
				<div>
					<Title name = 'Our Leader' items={["Home -"," About -", "Leader"]}/>
				</div>
				<div className = 'flex'>
					<div className="about-left">
						<div className = 'font about-bold'>Ashish Aggarwal</div>
						<ul> <div className = 'about-bold'>Academic Journey</div> 
							<li>Upto X : Mahavir Senior Model School, Delhi</li>
							<li>XI & XII : GBSSS No. 1 Shakti Nagar, Delhi</li>
							<li>D. Pharmacy : DIPSAR, Delhi</li>
							<li>B.Sc (Applied Psychology) : Annamalai University</li>
							<li>M.Sc (Applied Psychology) : Annamalai University</li>
							<li>PGD.GC : Annamalai University</li>
						</ul>
						<ul> <div className = 'about-bold'>Professional Journey </div>
							<li>1993-1998 : Job in Sun Pharma Ltd., NATCO Pharma Ltd. and USV Ltd.</li>
							<li>1998-2012 : Propreitor Kasturi Enterprises (Pharma Distribution)</li>
							<li>2006-Till Date : Managing Director, ORN Remedies Private Ltd.
								(Ayurvedic & Life-Style Products)</li>
						</ul>
						<ul> <div className = 'about-bold'>Social Profile</div>
							<li>2003-Till Date : Core Committee Member at Udayan shallini 
								Fellowship Program of NGO "Udayan Care".</li>
							<li>2002-Till Date : Associated with MSMS Delhi in various
							 advisory roles and presently the Vice-Chairman of PTA.</li>
						</ul>
						<div className = 'txt'>DOB : 13 September 1973.</div>
					</div>
					<div className = 'photo br'>
						<img className ='br' src = {Leader_image} alt = "Leader"/>
					</div>
				</div>
			</div>
		) ;
	}
}

export default Aboutperson ;