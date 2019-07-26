import React from 'react' ;

import './Banner.css' ;

class Banner extends React.Component
{	
	render()
	{	let classcolor = 'ban_main ' + this.props.clr ;
		return(
			<div className={'banner ' + this.props.img}>
				<div className = {classcolor}>
					{this.props.children}
				</div>
			</div>
		) ;
	}
}

export default Banner ;