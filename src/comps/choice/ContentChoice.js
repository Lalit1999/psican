import React, { Component } from 'react';

import './contentchoice.css' ;

class ContentChoice extends Component {
	constructor()
	{
		super() ;
		this.state = {
			current : '' ,
		} ;
	}

	componentDidMount = () => {
		this.setState({current: this.props.choices[0]});
	}

	checkActive = (strx) => {
		let str = 'choice-box ' ;
		if(strx === this.state.current)
			str += 'c-active' ;
		return str ;
	}

	createChoices = () => {
		return this.props.choices.map(choice => <div className={this.checkActive(choice)} 
			onClick={() => {
			this.setState({current: choice});
			}} key={choice}> {choice} </div>) ;
	}

	render() {
		// console.log(this.props) ;
		return (
			<div className="cont-choice">
				<div className="choices">
					{this.createChoices()}
				</div>
				<div className="ch-cont">
					{this.props[this.state.current]}
				</div> 
			</div>
		);
	}
}

export default ContentChoice ;