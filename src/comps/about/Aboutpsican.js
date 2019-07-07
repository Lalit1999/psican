import React from 'react' ;
import Title from '../title/Title.js' ;
import Display from '../display/Display.js' ;


import Image2 from '../images/i1.jpg' ;

class Aboutpsican extends React.Component
{
	render()
	{
		return(
			<div>
				<div>
					<Title name = 'P S I C A N' items={["Home -"," Programs -", "PSICAN"]}/>
				</div>
				<div>
					<Display name= "Psican" clr="red" img={Image2} content = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
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