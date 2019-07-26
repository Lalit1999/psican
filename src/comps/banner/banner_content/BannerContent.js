 import React from 'react' ;
 import './BannerContent.css' ;

 class BannerContent extends React.Component
 {
 	createLi = () => {
 		return this.props.lidata.map( li => <li> {li} </li> ) ;
 	}
 	render()
 	{
 		return(
 			<div className = 'ban_text'>
 				<h3>{this.props.title}</h3>
				<div>
					<ul>
						{this.createLi()}
					</ul>
				</div>
				<button className = 'explore'>Explore</button>
 			</div>
 		) ;
 	}
 }

 export default BannerContent ;