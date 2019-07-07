import React from 'react' ;
import './Display.css' ;

class Display extends React.Component
{
	render() 
	{	let classcolor = 'dis_main ' + this.props.clr ;
	
		return(
			<div className = 'display ' >
				<div className = {classcolor}>
					<div className = 'dis_text'>
						{this.props.name}	
						<div className = 'content'>
							<div>
								{this.props.content}
							</div>
							<div className = 'imge'>
								<img src = {this.props.img} alt = 'img' />
							</div>
						</div>
					</div>
				</div>
			</div>
		) ;
	}
}

export default Display ;