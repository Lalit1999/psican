import React from 'react' ;
import { Link } from'react-router-dom' ;

import Title from '../title/Title.js' ;
import '../program/program.css' ;

class Exam extends React.Component
{
	render() 
	{
		return(
			<div> 
				<Title name = 'Self Assessment Tests' items={["Home -","Test "]}/>
				<p className="intro"> Human behavior and thinking constantly impact each other. 
					Our fundamental attributions for objects, events and relations around us make us
					emotionally susceptible. Here are some self-assessment tests to measure your emotional tendencies. </p>
				<Link className="test-item" to='/test/self-anxiety-assessment'> Self Anxiety Assessment Test (SAAT) </Link>

			</div>
		) ;
	}

}

export default Exam ;