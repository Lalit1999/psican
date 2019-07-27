import React from 'react' ;

class DisplayDetailed extends React.Component
{	createLi = () => {
 		return this.props.lidata.map( (li,i) => <li className="banner-li" key={i}> {li} </li> ) ;
 	}
	render()
	{
		return (
			<div className="display-detail">
			 	<div className="title-con">
					<h2 className="left-title"> {this.props.title}</h2>
				</div>
				<div className="intro">
					<ul>
						{this.createLi()}
					</ul>
				</div>
			</div>
			) ;
	}
}

export default DisplayDetailed ;