import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;

class BarItemBig extends Component 
{
	render = () => {
		if(window.screen.availWidth > 600)
			return (
				<div className='bar-item'> 
					 <div> 
					 	<FontAwesomeIcon icon={this.props.icon} />
					 	<div className="item-txt">
					 		<div> {this.props.msg} </div>
					 		<div> <a href={this.props.link}>{this.props.text}</a> </div>
					 	</div>
					</div>
				</div>
			);
		else
			return (
				<div className='bar-item'> 
					<div>
						<a href={this.props.link}> <FontAwesomeIcon icon={this.props.icon} /> </a>
					</div>
				</div>
			);
	}
}

export default BarItemBig ;