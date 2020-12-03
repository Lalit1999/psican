 import React from 'react' ;
 import { Link } from'react-router-dom' ;
 
 import './BannerContent.css' ;

 class BannerContent extends React.Component
 {
 	createLi = () => {
 		return this.props.lidata.map( (li,i) => <li className="banner-li" key={i}> {li} </li> ) ;
 	}
 	
 	createBtn = () => {
 		if(this.props.test === 'test')
	 		return 'Take the Test' ;
	 	else
	 		return 'Explore' ;
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
			<Link to={this.props.link} className = 'explore'>{this.createBtn()}</Link>
			</div>
		) ;	 	
 	}
 }

 export default BannerContent ;