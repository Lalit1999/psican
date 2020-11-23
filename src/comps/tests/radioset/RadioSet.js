import React, { Component } from 'react';

import { radioData } from './radioData.js';

class RadioSet extends Component {

	onRadioClick = (option) => {
		const tempArr = [false, false, false, false, false, false] ;
		tempArr[option] = true ;
		this.props.changeAnswer(option, this.props.name) ;
		this.props.change(tempArr, this.props.name) ;
	}

	generateRadioBtn = () => {
		const {lang, name, check} = this.props ;
		return radioData.map( (one,i) => <div className="radio-div" key={i}> <input type="radio" id={i} name={one[lang]+' '+name} checked={check[i]} onChange={() => this.onRadioClick(i)}/> {one[lang]} </div>)
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