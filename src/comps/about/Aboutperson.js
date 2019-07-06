import React from 'react' ;
import Title from '../title/Title.js' ;

class Aboutperson extends React.Component
{
	render()
	{
		return(
			<div>
				<Title name = 'Our Leader' items={["Home -"," About -", "Leader"]}/>
			</div>
		) ;
	}
}

export default Aboutperson ;