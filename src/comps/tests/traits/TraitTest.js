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
				<Title name = 'Trait Test for Parents (TTP)' items={["Home -","Test -","TTP"]}/>
				<p className="intro">Some more description about the test.</p>
				<p className="intro">The following questionnaire is aimed at helping the parents of a child who is less than 12 years to decide which traits are being expressed in their child and due to the role of which parent. </p>
				<p className="intro bold"> DISCLAIMER : This test is only meant for Parents having children less than 12 years of age.<br/> This test will give the most accurate results if both parents take the test together. Therefore, it is recommended that both parents give the test.</p>
				<TTP user={this.props.user} token={this.props.token}/>

			</div>
		) ;
	}

}

export default AnxietyTest ;