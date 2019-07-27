import React from 'react' ;

class DisplayDetailed extends React.Component
{
	render()
	{
		return (
			<div className="display-detail">
			 	<div className="title-con">
					<h2 className="left-title"> {this.props.title}</h2>
				</div>
				<div className="intro">
					<ul>
						<li> One Two hree </li>
						<li> One Two hree </li>
						<li> One Two hree </li>
						<li> One Two hree </li>
					</ul>
				</div>
			</div>
			) ;
	}
}

export default DisplayDetailed ;