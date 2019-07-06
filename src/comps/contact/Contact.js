import React from 'react' ;
import Title from '../title/Title.js' ;

class Contact extends React.Component
{
	render()
	{
		return(
			<div>
				<Title name = 'Contact Us' items={["Home -", "Contact Us"]}/>
			</div>
		) ;
	}
}

export default Contact ;