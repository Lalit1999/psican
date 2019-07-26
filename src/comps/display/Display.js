import React from 'react' ;
import './Display.css' ;

class Display extends React.Component
{	checkLeft = () => {
		if(this.props.left==='yes')
		{
			return (
				<div className = 'content'>
					<div className = 'imge'>
						<img src = {this.props.img} alt = 'img' />
					</div>
					<div>
						{this.props.content}
					</div>
				</div>
			) ;
		}
		else
		{
			return (
				<div className = 'content'>
					<div>
						{this.props.content}
					</div>
					<div className = 'imge'>
						<img src = {this.props.img} alt = 'img' />
					</div>
				</div>
			) ;
		}
	}
	render() 
	{	return(
			<div className = 'display ' >
				<div className = 'dis_text'>
					{this.checkLeft()}
				</div>
			</div>
		) ;
	}
}

export default Display ;