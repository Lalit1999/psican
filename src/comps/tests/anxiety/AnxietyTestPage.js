import React from 'react' ;

import Title from '../../title/Title.js' ;
import SAAT from './SAAT.js' ;
import '../../program/program.css' ;
import Payment from '../payment/Payment.js' ;

class AnxietyTestPage extends React.Component
{
	render() 
	{
		return(
			<div> 
				<Title name = 'Self Anxiety Assessment Test (SAAT)' items={["Home -","Test -","SAAT"]}/>
				<p className="intro">Anxiety is defined as an emotional state characterised by feeling of tension, worrysome thoughts and bodily changes. Anxiety can impact an individual's well being, performance and responses.</p>
				<p className="intro">The following questionnaire is aimed at helping an individual express and understand his\her anxiety with the help of a mental health professional.</p>
				<p className="intro bold"> DISCLAIMER : The present assessment is a non-standard attempt to provide a basic understanding and interpretation of an individual's state of anxiety.<br/>The observations and findings of this test may be corelated to observed and presented symptoms by a mental health professional.</p>
				<SAAT user={this.props.user} token={this.props.token}/>

			</div>
		) ;
	}

}

export default AnxietyTestPage ;
				// <Payment cost={500}/>