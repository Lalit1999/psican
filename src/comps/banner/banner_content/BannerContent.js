 import React from 'react' ;
 import './BannerContent.css' ;

 class BannerContent extends React.Component
 {
 	createLi = () => {
 		return this.props.lidata.map( (li,i) => <li className="banner-li" key={i}> {li} </li> ) ;
 	}
 	
 	render()
 	{
 		return(
 			<div className = {'ban_text ' + this.props.left}>
 				<h3>{this.props.title}</h3>
				<div className="ul">
					<ul>
						{this.createLi()}
					</ul>
				</div>
				<a href={this.props.link} className = 'explore'>Explore</a>
 			</div>
 		) ;
 	}
 }

 export default BannerContent ;