import React from 'react' ;

import './program.css' ;
import Title from '../title/Title.js' ;
import DisplayDetailed from '../display/DisplayDetailed.js' ;

const arr = ['To provide customised support o students for various academic, behavioural, lifestyle' +
', emotional and attitude related issues',
' To provide soluions and guidance o studentsd for various health, psychological, gender and interpersonal issues'] ;

class AQUESS extends React.Component
{
	render()
	{
		return(
			<div>
				<Title name = 'AQUESS Program' items={["Home -"," Programs -", "AQUESS"]}/>
				<h4 className="intro"> <span className="brand">AQUESS</span> is an 
				<span className="ngo">&nbsp;Online Query System for Students </span> which is 
				 free of cost.  </h4>
				<DisplayDetailed title="Aim" lidata={arr} />
			</div>
		) ;
	}
}

export default AQUESS ;