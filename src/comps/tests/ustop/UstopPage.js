import Title from '../../title/Title.js' ;
import Ustop from './Ustop.js' ;

const UstopPage = () => {
	return(
		<div className="test-inner-page"> 
			<Title name = 'Understanding Self Through Observed Perceptions (USTOP)' items={["Home","Test","USTOP"]}/>
			<div className="test-con"> 
				<p className="intro">Anxiety is defined as an emotional state characterised by feeling of tension, worrysome thoughts and bodily changes. Anxiety can impact an individual's well being, performance and responses.</p>
				<p className="intro">The following questionnaire is aimed at helping an individual express and understand his\her anxiety with the help of a mental health professional.</p>
				<p className="intro bold"> DISCLAIMER : The present assessment is a non-standard attempt to provide a basic understanding and interpretation of an individual's state of anxiety.<br/>The observations and findings of this test may be corelated to observed and presented symptoms by a mental health professional.</p>
				<Ustop />
				<p className="intro bold support"> Having Technical issues? <a className="sched-btn" href="mailto:myarth.tech@gmail.com" target="_blank" rel="noopener noreferrer"> Contact Technical Support </a>
				</p>
			</div>
		</div>
	) ;
}

export default UstopPage ;