import React from 'react' ;

import Title from '../title/Title.js' ;
import './AboutPerson.css' ;

import Image from '../images/Psyment logo.jpg' ;

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
					<div className = 'photo mb br'>
						<img className = 'br' src = {Image} alt = 'Logo' />
					</div>
					<div className = 'text'>
						<p>
							Psyment is a <span className = 'bld'>S</span>ocial <span className = 'bld'>B</span>usiness <span className = 'bld'>O</span>rganisation.
						</p>
						<p>
							Psyment aspires to provide counselling and mentoring solutions to those need it.
						</p>
						<p>
							Psyment aims to work with a purpose to promote, encourage and make social change
							by working in the areas of Education, Human Skilling and Transformation.
						</p>
						<p>
							Psyment shall work with its clients providing solutions by using the techniques
							of Customised profile assessment, counselling, E-query answer and content based
							workshops.
						</p>
						<p>
							Psyment shall work on the core values of Empathy, Enlighenment and Empowerment to
							increase Self Efficacy amongst its clients and audiences." 
						</p>
					</div>
					
				</div>
			</div>
		) ;
	}
}

export default Aboutpsican ;