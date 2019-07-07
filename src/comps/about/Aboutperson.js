import React from 'react' ;
import Title from '../title/Title.js' ;
import Display from '../display/Display.js' ;


// import Image2 from '../images/i1.jpg' ;
// import Image3 from '../images/i2.jpg' ;
// import Image4 from '../images/i3.jpg' ;
import Image1 from '../images/i4.jpg' ;


class Aboutperson extends React.Component
{
	render()
	{
		return(
			<div>
				<div>
					<Title name = 'Our Leader' items={["Home -"," About -", "Leader"]}/>
				</div>
				<div>
					<Display name= "Our Leader" clr="red" img = {Image1} content = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
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

export default Aboutperson ;