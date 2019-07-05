import React from 'react' ;

import Banner from '../banner/Banner.js' ;


class Home extends React.Component
{
	render()
	{
		return(
			<div>
				<Banner name= "aeqs" clr="red" img="a" />
				<Banner name= "kfmp" clr="blue" img="b" />
				<Banner name= "mentamorph" clr="green" img="c" />
			</div>
		) ;
	}
}

export default Home ;