import React from 'react' ;

import Title from '../title/Title.js' ;
import './AboutPerson.css' ;

import Image from '../images/Psyment.jpg' ;

class Aboutpsican extends React.Component
{
	render()
	{
		return(
			<div>
				<div>
					<Title name = 'P S Y M E N T' items={["Home -"," Programs -", "PSYMENT"]}/>
				</div>
				<div className = 'flex'>
					<div className = 'mb br2'>
						<img className = 'br2' src = {Image} alt = 'Logo' />
					</div>
					<div className = 'about-right'>
						<p>
							Psyment is a 
							<span className = 'about-bold'>&nbsp;S</span>ocial &nbsp; 
							<span className = 'about-bold'>B</span>usiness &nbsp; 
							<span className = 'about-bold'>O</span>rganisation.
						</p>
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
					
				</div>
			</div>
		) ;
	}
}

export default Aboutpsican ;