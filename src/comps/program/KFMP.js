import React from 'react' ;
import Title from '../title/Title.js' ;

class Sarathi extends React.Component
{
	render()
	{
		return(
			<div>
				<Title name = 'Sarathi Program'
				 items={["Home -"," Programs -", "Sarathi"]}/>
			</div>
		) ;
	}
}

export default Sarathi ;