import React from 'react' ;
import Display from '../display/Display.js' ;
import Title from '../title/Title.js' ;

import Image3 from '../images/i2.jpg' ;

class Aboutpsican extends React.Component
{
	render()
	{
		return(
			<div>
				<div>
					<Title name = 'Our Vision' items={["Home -"," Programs -", "Vision"]}/>
				</div>
				<div>
					<Display name= "Our Vision" clr="red" img={Image3} content = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
							tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
							quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
							consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
							cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
							proident, sunt in culpa qui officia deserunt mollit anim id est laborum." 
							/>
				</div>
			</div>
		) ;
	}
}

export default Aboutpsican ;