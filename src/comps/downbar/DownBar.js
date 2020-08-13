import React, { Component } from 'react';

import './downbar.css' ;

class DownBar extends Component {
	render() {
		return (
			<div className="downbar"> 
				<p> Copyright &copy; 2020 &ensp;|&ensp; Website Created by &emsp;
					<img className="myarth" src={'https://raw.githubusercontent.com/manan999/manan999.github.io/master/logo-black.png'} alt="myarth" />
				</p>
			</div>
		);
	}
}

export default DownBar ;