import React from 'react' ;
import Title from '../../title/Title.js' ;

class Register extends React.Component
{
	render()
	{
		return(
			<div>
				<Title name = 'Register' items={["Home -", "Register"]}/>
			</div>
		) ;
	}
}

export default Register ;