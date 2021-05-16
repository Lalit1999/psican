import React from 'react' ;
import Popup from 'reactjs-popup' ;

import './pop.css' ;

class Pop extends React.Component
{	
	state = {
		open : false ,
	} ;

	openPopUp = () => {
		if(this.state.open === true)
			this.setState({ open: false }) ;
		else
			this.setState({ open: true })
  	}

  	closePopUp = () => {
    	this.setState({ open: false })
  	}

	render()
	{	//console.log(this.state) ;
		return (
			<div onClick={this.openPopUp} className="pop self">
				<button onClick={this.openPopUp} className={this.props.classes}> {this.props.btn} </button>
				<Popup open={this.state.open} closeOnDocumentClick onClose={this.closePopUp} closeOnEscape>
					<div className="modal popup" >
						{/*eslint-disable-next-line */}
						<a className="close" onClick={this.closePopUp} >
			              &times;
			            </a> <br/>
						{this.props.children}
					</div>
				</Popup>
			</div>
			) ;
	}
}

export default Pop ;  