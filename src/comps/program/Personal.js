import React from 'react' ;
import Title from '../title/Title.js' ;

class Personal extends React.Component
{
	render()
	{
		return(
			<div>
				<Title name = 'Personal Consultation' items={["Home -"," Programs -", "Personal"]}/>
			</div>
		) ;
	}
}

export default Personal ;