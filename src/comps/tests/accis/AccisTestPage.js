import React from 'react';

import Title from '../../title/Title.js' ;
import ACCIS from './ACCIS.js' ;
import '../../program/program.css' ;

const AccisTestPage = ({user, token}) => {
	return(
		<div> 
			<Title name = 'Assessment of COVID Cognitive Impact on Self (ACCIS)' items={["Home -","Test -","ACCIS"]}/>
			<p className="intro">COVID-19 has impacted almost everybody in all sections of society causing widespread impact on individual's behaviour, cognition and personality.</p>
			<p className="intro">Anxiety due to COVID may operate at both conscious and unconscious level impacting one's overall functioning and well-being. Those who got infected with COVID and recovered show a different set of symptoms while those who did not get infected themselves but experienced or observed COVID patients all around them also show a bit different type of COVID anxiety symptoms.</p>
			<p className="intro">It is therefore very important to objectively assess this impact of COVID on an individual's cognition and in altering his/her behaviour, expression, functioning and well-being.</p>
			<p className="intro">ACCIS is an attempt to provide a psychometric assessment tool to study this aspect of human cognition.</p>
			<p className="intro bold"> AIM: The present questionnaire is aimed at helping an individual to understand the impact of COVID environment and COVID-related anxiety on his/her behaviour, expression, functioning and well-being.</p>
			<p className="intro bold"> DISCLAIMER : The current assessment is a non-standard test.<br/> It may give only an assessment of few aspects and may only give a partial assessment.<br/> It is advised to understand and correlate the findings with clinical assessment or with presented symptoms with the help of a healthcare Professional/Psychologist.
			</p>
			<ACCIS token={token}/>
		</div>
	) ;
}

export default AccisTestPage ;