import React, { Component } from 'react';
import {Link} from 'react-router-dom' ;

import './loginform.css' ;

class LoginForm extends Component 
{	
	state ={
		error : '' ,
		name : ''
	} ;

	checkB1 = () => {
		if(this.props.b1)
		{
			if(this.props.b1type === 'link')
				return <Link className="btn2" to={this.props.to}>{this.props.b1}</Link>
			else
				return <button onClick={this.props.onb1Click}>{this.props.b1} </button> 	
		}
		else
			return <button className="inv"> &lt;&nbsp; Prev </button> ;
	}

	checkB2 = () => {
		if(this.props.b2)
		{
			if(this.props.b2type === 'link')
				return <Link className="btn2" to={this.props.to}>{this.props.b2}</Link>
			else
				return <button onClick={this.props.onb2Click}>{this.props.b2} </button> 	
		}
		else
			return <button className="inv" disabled={true}> Next &gt;&nbsp; </button> ;
	}

	createButtons = () => {
		return (
			<div className="buttons">
				{this.checkB1()}
				{this.checkB2()}
			</div>
			) ;
	}

	render() {
		const err = (this.props.error)?"error":'' ;
		return (
			<div className="login-form">
				<div>
					<fieldset className="box">
						<legend className="box-title"> &nbsp;{this.props.title}&nbsp; </legend>
						<h3 className="heading">{this.props.heading}</h3>
						{this.props.children}
						<h5 className={err}>{this.props.error}</h5>
						{this.createButtons()}
					</fieldset>
				</div>
			</div>
		);
	}
}

export default LoginForm ;
