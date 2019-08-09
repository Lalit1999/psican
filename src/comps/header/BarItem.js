import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;

class BarItem extends Component {
	render() {
		return (
			<div className='bar-item'> 
				<div>
				 	<div className="item-txt">
				 		<div className="top"> {this.props.msg} </div>
				 		<div>
				 			<FontAwesomeIcon icon={this.props.icon} />
				 		 	<a href={this.props.link}>{this.props.text}</a>
				 		</div>
					</div>
				</div>
			</div>
		);
	}
}

export default BarItem ;
