import React from 'react' ;
import Title from '../title/Title.js' ;

class Test extends React.Component
{
	render()
	{
		return(
			<div>
				<Title name = 'Tests' items={["Home -", "Tests"]}/>
			</div>
		) ;
	}
}

export default Test ;