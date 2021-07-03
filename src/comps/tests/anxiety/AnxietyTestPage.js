import React from 'react' ;

import Title from '../../title/Title.js' ;
import SAAT from './SAAT.js' ;
import '../../program/program.css' ;

const AnxietyTestPage = ({user, token}) => {
	return(
		<div> 
			<Title name = 'Understanding Self Through Observed Perceptions (USTOP)' items={["Home -","Test -","USTOP"]}/>
			<p className="intro">Anxiety is defined as an emotional state characterised by feeling of tension, worrysome thoughts and bodily changes. Anxiety can impact an individual's well being, performance and responses.</p>
			<p className="intro">The following questionnaire is aimed at helping an individual express and understand his\her anxiety with the help of a mental health professional.</p>
			<p className="intro bold"> DISCLAIMER : The present assessment is a non-standard attempt to provide a basic understanding and interpretation of an individual's state of anxiety.<br/>The observations and findings of this test may be corelated to observed and presented symptoms by a mental health professional.</p>
			<SAAT user={user} token={token}/>
		</div>
	) ;
}

export default AnxietyTestPage ;