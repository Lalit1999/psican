import React from 'react' ;
import Title from '../title/Title.js' ;

class Program extends React.Component
{
	render()
	{
		return(
			<div>
				<Title name = 'Programs' items={["Home -", "Programs"]}/>
			</div>
		) ;
	}
}

export default Program ;