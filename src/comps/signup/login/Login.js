import React from 'react' ;
import Title from '../../title/Title.js' ;

class Login extends React.Component
{
	render()
	{
		return(
			<div>
				<Title name = 'Login' items={["Home -", "Login"]}/>
			</div>
		) ;
	}
}

export default Login ;