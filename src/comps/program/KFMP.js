import React from 'react' ;

import Title from '../title/Title.js' ;
import './program.css' ;
import DisplayDetailed from '../display/DisplayDetailed.js' ;

class Sarathi extends React.Component
{
	render()
	{
		return(
			<div>
				<Title name = 'Sarathi Program'
				 items={["Home -"," Programs -", "Sarathi"]}/>
				<h4 className="intro"> Sarathi is a program, supported by the Kasturi Foundation. It
				  provides workshop	organising facilities to schools and colleges. </h4> 
				<DisplayDetailed title="Aim" />
			</div>
		) ;
	}
}

export default Sarathi ;