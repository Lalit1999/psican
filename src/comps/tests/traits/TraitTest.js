//LETA - Learning Environment Trait Assessment.
import React from 'react' ;

import TTP from './TTP.js' ;
import Title from '../../title/Title.js' ;
import '../../program/program.css' ;

class AnxietyTest extends React.Component
{
	render() 
	{
		return(
			<div> 
				<Title name = 'Learning Environment Trait Assessment (LETA)' items={["Home -","Test -","LETA"]}/>
				<p className="intro">LETA is an attempt to measure the level of 30 personality traits in parents (both mother and father) of any growing child (2 - 12 years).</p>
				<p className="intro">This assessment involves assigning a numerical value to the self-assessed level of the 30 traits by each parent. </p>
				<p className="intro">The assessment will then attempt to predict the transferance of a given trait to the child by calculating and summing the numerical values of all the 30 traits. </p>
				<p className="intro bold"> DISCLAIMER : This test is only meant for Parents having children less than 12 years of age.<br/> This test will give the most accurate results if both parents take the test together. Therefore, it is recommended that both parents give the test.</p>
				<TTP user={this.props.user} token={this.props.token}/>

			</div>
		) ;
	}

}

export default AnxietyTest ;