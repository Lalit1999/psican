import React from 'react' ;

import Title from '../title/Title.js' ;
import TestBox from './testbox/TestBox.js' ;
import '../program/program.css' ;

const Exam = () => {
	return(
		<div> 
			<Title name = 'Self Assessment Tests' items={["Home -","Test "]}/>
			<p className="intro"> Human behavior and thinking constantly impact each other. 
				Our fundamental attributions for objects, events and relations around us make us
				emotionally susceptible. Here are some self-assessment tests to measure your emotional tendencies. </p>
			<TestBox title="Self Anxiety Assessment Test (SAAT)" link="/test/self-anxiety-assessment" desc="Anxiety test designed for evaluating anxiety levels of an individual."/>
			<TestBox title="Learning Environment Trait Assessment (LETA)" link="/test/trait-test" desc="Test designed to measure the level of 30 personality traits in parents of children (2 - 12 years old)"/>
		</div>
	) ;
}

export default Exam ;