import React from 'react' ;

import Title from '../title/Title.js' ;
import DisplayDetailed from '../display/DisplayDetailed.js' ;
import Heading from '../Heading/Heading.js' ;
import './program.css' ;

const features = [
'All Sessions within this programs are PAID BASIS ONLY',
'htmlFee for each session of 30 minutes is &#8377; 2000 Only',
'Timings: 6pm to 8pm (Weekdays) and 9am to 1pm (Saturday) '
] ;

const pData = [ 'Career & Self-Esteem', 'Financial Self-Esteem', 'Goal Setting', 
'Personality Trait Development', 'Adjustment of Traits' ]; 

const ptData = [ 'Bereavement Adjustment', 'Accident / Disease', 
'Relationship Break (Divorce / Break-up)', 'Exploitation / Abuse (Domestic Violence, Rape, etc)' , 
'Financial Bankruptcy / Earning / Theft', 'Academic (Failure / Performance)' ];

const mData = [ 'Personality Re-Modelling', 'Relational Re-Modelling' ];

class Personal extends React.Component
{
	render()
	{
		return(
			<div>
				<Title name = 'Personal Consultation' items={["Home -"," Programs -", "Consult"]}/>
				<p className="intro"> Human behavior and thinking constantly impact each other. 
					Our fundamental attributions for objects, events and relations around us make us
					emotionally susceptible</p>
				<p className="intro"> This may lead to cognitive dissonance and inept self-appraisal.
					Such events often disturb the flow of our capability.</p>
				<p className="intro"> <span className="ngo"> PERSONAL PSYCHOLOGICAL COUNSELLING</span>
				 	and <span className="ngo"> MENTORING </span> is of prime help in such situations.
				</p>
				<p className="intro"> You may consult us for all such needs. </p> 
				<DisplayDetailed title="Features" lidata={features} />
				<Heading text="Counselling Given By" />
				<p className="intro"><span className="brand"> Mr. Ashish Aggarwal</span><br/>
					M.Sc. (Applied Psychology) <br/> PG Diploma in Guidance & Counselling <br/>
					D. Pharmacy </p>
				<Heading text="Venue" />
				<p className="intro"> Unit No. 4 , First Floor , CSC , Pocket B & C , Phase - 4 ,
					 Ashok Vihar , Delhi - 110052. </p>
				<Heading text="Counselling Domains" /> <br/>
				<DisplayDetailed title="Personality Appraisal Counselling" small="yes" lidata={pData} />
				<DisplayDetailed title="Post Trauma Counselling" small="yes" lidata={ptData} />
				<DisplayDetailed title="Metamorphosis Counselling" small="yes" lidata={mData} />
			</div>
		) ;
	}
}

export default Personal ;