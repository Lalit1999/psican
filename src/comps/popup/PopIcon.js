import React from 'react' ;
import Popup from 'reactjs-popup' ;

import './pop.css' ;

class PopIcon extends React.Component
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
				{this.props.children}

				<Popup open={this.state.open} closeOnDocumentClick onClose={this.closePopUp} closeOnEscape>
					<div className="modal popup" >
						{/*eslint-disable-next-line */}
						<a className="close" onClick={this.closePopUp} >
			              &times;
			            </a> <br/>
						<div className="popicon-div"> 
							<p>This website has been developed by &ensp;
								<img className="myarth" src={'https://raw.githubusercontent.com/manan999/manan999.github.io/master/logo-black.png'} alt="myarth" />
							</p>
							<p> <img className="myarth" src={'https://raw.githubusercontent.com/manan999/manan999.github.io/master/logo-black.png'} alt="myarth" /> builds websites, web applications, personal portfolio websites and commercial websites. They also provide Social Media & Google marketing Solutions.
							</p>
							<p> For business queries, <br/>
								<strong> E-Mail : </strong> myarth.tech@gmail.com <br/>
								<strong> Call / Whatsapp :</strong> +91-96251-04067, +91-96251-62446
							</p> 
						</div>
					</div>
				</Popup>
			</div>
			) ;
	}
}

export default PopIcon ; 