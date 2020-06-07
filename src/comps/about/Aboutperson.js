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
					<div>
						<div className = 'font bld'>Ashish Aggarwal</div>
						<ul>
							<div className = 'bld'>Academic Journey</div> 
							<li>Upto X : MAHAVIR SENIOR MODEL SCHOOL Delhi</li>
							<li>XI & XII : GBSSS No. 1 Shakti Nagar Delhi</li>
							<li>D Pharmacy : DIPSAR Delhi</li>
							<li>BSc(Applied Psychology) : Annamalai University</li>
							<li>MSc(Applied Psychology) : Annamalai University</li>
							<li>PGDGC : Annamalai University</li>
						</ul>
						<ul>
							<div className = 'bld'>Professional Journey </div>
							<li>1993-1998 : Job in Sun Pharma Ltd., NATCO Pharma Ltd. and USV Ltd.</li>
							<li>1998-2012 : Prop. Kasturi Enterprises ( Pharma Distribution)</li>
							<li>2006-Till Date : Managing Director ORN Remedies Private Ltd.(Ayurvedic & life style Products)</li>
						</ul>
						<ul>
							<div className = 'bld'>Social Profile</div>
							<li>2003-Till Date : Core Committee member Udayan shallini Fellowship Program of NGO "UDAYAN CARE".</li>
							<li>2002-Till Date : Associated with MSMS Delhi in various advisory Roles and presently the VICE CHAIRMAN of PTA.</li>
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