import React from 'react' ;
import Banner from '../banner/Banner.js' ;
import Title from '../title/Title.js' ;

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
					<Banner name= "Our Vision" clr="red" img="a" />
				</div>
			</div>
		) ;
	}
}

export default Aboutpsican ;