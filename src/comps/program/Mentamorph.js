import React from 'react' ;
import Title from '../title/Title.js' ;

import './mm.css' ;

class Mentamorph extends React.Component
{
	render()
	{
		return(
			<div>
				<Title name = 'Menta-Morph' items={["Home -", "MentaMorph"]}/>
				<button className="pay-btn"> Pay Us </button> 
			</div>
		) ;
	}
}

export default Mentamorph ;