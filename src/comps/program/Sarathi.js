import React from 'react' ;

import Title from '../title/Title.js' ;
import DisplayDetailed from '../display/DisplayDetailed.js' ;
import Heading from '../Heading/Heading.js' ;
import './program.css' ;

const arr = ['htmlTo provide workshops to schools and colleges for:<ul><li>Student Motivation</li><li>Student Career</li><li>Health related guidance for students</li><li>Behaviour related guidance for students</li><li>Parental Education</li><li>Teachers Training</li>'] ;

const features = [
'htmlCOMPLEMENTARY WORKSHOPS for partner Schools and Educational Institutions.',
'html<ul>Coverage of core areas like: <li>Student Motivation & Skillset</li><li>Parental Awareness & Orientation</li><li>Teacher Training & Co-Working</li></ul>',
'All programs shall be funded by KASTURI FOUNDATION',
'Only travel support needs to be provided by partner organisations',
] ;

const Sarathi = () => {			
	return(
		<div>
			<Title name = 'Sarathi Program'
			 items={["Home -"," Programs -", "Sarathi"]}/>
			<h4 className="intro"> <span className='brand'>Sarathi</span> is a program, supported
			 by <span className="ngo"> The Kasturi Foundation</span> to organise workshops for schools and colleges. </h4> 
			<DisplayDetailed title="Aim" lidata={arr}/>
			<DisplayDetailed title="Features" lidata={features} />
			<Heading text="Schedule Your Workshop" />
			<div className="blue-bg">
				<p> To schedule a workshop, Contact : <br/><strong> Mr. Ashish Aggarwal ( +91 9555235231, info.psyment@gmail.com )</strong></p>
			</div>
		</div>
	) ;	
}

export default Sarathi ;