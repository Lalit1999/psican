import React from 'react' ;

import './program.css' ;
import Title from '../title/Title.js' ;
import DisplayDetailed from '../display/DisplayDetailed.js' ;

class AQueSS extends React.Component
{
	render()
	{
		return(
			<div>
				<Title name = 'AQueSS Program' items={["Home -"," Programs -", "AQueSS"]}/>
				<h4 className="intro"> AQueSS is an Online Query System for Students which is completely
				 free of cost.  </h4>
				<DisplayDetailed title="Aim" />
			</div>
		) ;
	}
}

export default AQueSS ;