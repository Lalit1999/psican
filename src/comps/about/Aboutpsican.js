import React from 'react' ;

import Title from '../title/Title.js' ;
import Display from '../display/Display.js' ;

import Image2 from '../images/i1.jpg' ;

class Aboutpsican extends React.Component
{
	render()
	{
		return(
			<div>
				<div>
					<Title name = 'P S Y M E N T' items={["Home -"," Programs -", "PSYMENT"]}/>
				</div>
				<div>
					<Display name= "Psican" img={Image2} left="yes" content = "Psyment is a Social Business
							Organisation.
							Psyment aspires to provide counselling and mentoring solutions to those need it.
							Psyment Aim to work with a purpose to promote, encourage and make social change
							  by working in the areas of Education, Human Skilling and Transformation.
							Psyment shall work with its clients providing solutions by using the techniques
							  of Customised profile assessment , counselling, Equerry answer and content based
							  workshops.
							Psyment shall work on the cove values of Empathy, Enlighenment and Empowerment to
							  increase Self Efficancy amongst its clients and audiences." 
							/>
				</div>
			</div>
		) ;
	}
}

export default Aboutpsican ;