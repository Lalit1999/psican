import React, { Component } from 'react';

import PopIcon from '../popup/PopIcon.js' ;
import './downbar.css' ;

class DownBar extends Component {
	render() {
		return (
			<div className="downbar"> 
				<div> Copyright &copy; 2020 &ensp;|&ensp; Website Created by &emsp;
					<PopIcon>
						<img className="myarth" src={'https://raw.githubusercontent.com/manan999/manan999.github.io/master/logo-black.png'} alt="myarth" />
					</PopIcon>
				</div>
			</div>
		);
	}
}

export default DownBar ;