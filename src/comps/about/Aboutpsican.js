import React from 'react' ;

import Title from '../title/Title.js' ;
import Display from '../display/Display.js' ;
import './Aboutpsican.css' ;

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
				<div className = 'allign'>
					<div className = 'bord'>
						<img src = {Image} alt = 'Logo' />
					</div>
					<div className = 'text'>
						<p>
							Psyment is a <span className = 'bolda'>S</span>ocial <span className = 'bolda'>B</span>usiness <span className = 'bolda'>O</span>rganisation.
						</p>
						<p>
							Psyment aspires to provide counselling and mentoring solutions to those need it.
						</p>
						<p>
							Psyment Aim to work with a purpose to promote, encourage and make social change
							by working in the areas of Education, Human Skilling and Transformation.
						</p>
						<p>
							Psyment shall work with its clients providing solutions by using the techniques
							of Customised profile assessment, counselling, Equerry answer and content based
							workshops.
						</p>
						<p>
							Psyment shall work on the cove values of Empathy, Enlighenment and Empowerment to
							increase Self Efficancy amongst its clients and audiences." 
						</p>
					</div>
					
				</div>
			</div>
		) ;
	}
}

export default Aboutpsican ;