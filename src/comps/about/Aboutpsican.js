import React from 'react' ;
import Title from '../title/Title.js' ;
import Banner from '../banner/Banner.js' ;

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
					<Banner name= "Psican" clr="red" img="a" />
				</div>
			</div>
		) ;
	}
}

export default Aboutpsican ;