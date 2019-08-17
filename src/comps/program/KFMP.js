import React from 'react' ;

import Title from '../title/Title.js' ;
import './program.css' ;
import DisplayDetailed from '../display/DisplayDetailed.js' ;
import ContentChoice from '../choice/ContentChoice.js' ;
import Heading from '../Heading/Heading.js' ;

const arr = ['To provide workshops to schools and colleges for:' , 'Student Motivation', 'Student Career',
'Health related guidance for students', 'Behaviour related guidance for students',
'Parental Education', 'Teachers Training'] ;

class Sarathi extends React.Component
{
	render()
	{
		return(
			<div>
				<Title name = 'Sarathi Program'
				 items={["Home -"," Programs -", "Sarathi"]}/>
				<h4 className="intro"> <span className='brand'>Sarathi</span> is a program, supported
				 by <span className="ngo"> The Kasturi Foundation</span>. It provides workshop
				 organising facilities to schools and colleges. </h4> 
				<DisplayDetailed title="Aim" lidata={arr}/>
				<Heading text="Choose Your Topic" />
				<ContentChoice choices={['Parents', 'Students', 'Teachers']} 
					Parents={<div> This is Parents </div>} Students={<div> This is Students </div>}
					Teachers={<div> This is Teachers </div>}/>
			</div>
		) ;
	}
}

export default Sarathi ;