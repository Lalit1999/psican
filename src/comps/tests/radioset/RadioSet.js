import React, { Component } from 'react';

import { radioData } from './radioData.js';

const initState = {	check : [false, false, false, false, false, false] , }

class RadioSet extends Component {
	state = initState ;

	componentDidUpdate = (prevProps) => {
		let {num} = this.props ;
		let {num: prevNum} = prevProps ;

		if(num > prevNum) 
		{	this.setState(initState) ;
			console.log('next') ;
		}	
		else if ( num < prevNum)
			console.log('prev') ;
	}

	onRadioClick = (option) => {
		const tempArr = [false, false, false, false, false, false] ;
		tempArr[option] = true ;
		this.props.changeAnswer(option, this.props.name) ;
		this.setState({ check : tempArr});
	}

	generateRadioBtn = () => {
		const {lang, name} = this.props ;
		return radioData.map( (one,i) => <div className="radio-div" key={i}> <input type="radio" id={i} name={one[lang]+' '+name} checked={this.state.check[i]} onChange={() => this.onRadioClick(i)}/> {one[lang]} </div>)
	}

	render() {
		return (
			<React.Fragment>
				{this.generateRadioBtn()}
			</React.Fragment>
		);
	}
}

export default RadioSet ; 