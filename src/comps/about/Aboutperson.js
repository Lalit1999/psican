import React from 'react' ;
import Title from '../title/Title.js' ;
import Banner from '../banner/Banner.js' ;

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
					<Banner name= "Our Leader" clr="red" img="a" />
				</div>
			</div>
		) ;
	}
}

export default Aboutperson ;