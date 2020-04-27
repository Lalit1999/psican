import React from 'react' ;

import Title from '../title/Title.js' ;
import DisplayDetailed from '../display/DisplayDetailed.js' ;
import Heading from '../Heading/Heading.js' ;
import ContentChoice from '../choice/ContentChoice.js' ;
import './program.css' ;

const arr = ['To provide customised support to students for various academic, behavioural, lifestyle' +
', emotional and attitude related issues',
' To provide soluions and guidance o studentsd for various health, psychological, gender and interpersonal issues'] ;

const features = [
'Students studying in classes 11, 12 and UG, from any part of India can register with us and ask their query.',
'Upto 2 E-Mail Queries per month per student shall be answered.',
'All E-Queries shall be answered free of cost',
'If you require detailed or personalised assistance, it is advised to go for personal consultation.',
] ;

class AQUESS extends React.Component
{
	render()
	{
		return(
			<div>
				<Title name = 'AQUESS Program' items={["Home -"," Programs -", "AQUESS"]}/>
				<h4 className="intro cen"> <span className="brand">AQUESS</span> is an 
				<span className="ngo">&nbsp;Online Query System for Students </span> which is 
				 free of cost.  </h4>
				<p className="intro"> Classes 11-12 & Under-Graduate level education lays the 
					foundation of an individual's "Take OFF" from the runway of life. </p>
				<p className="intro"> These years involve rigorous hardwork, guidance and 
					hand-holding at many times. Mental Health of Students is of utmost 
					importance during these years.</p>
				<p className="intro"> It shall be our endeavour to stand with all students
					who approach us like a true friend. We shall help them in their hour of
					need. </p>
				<p className="intro bold"> P.S. : Certain Queries may require more time in 
					getting answered. If we take longer than 5 days, to answer to answer your
					we shall keep you informed. </p>	
				<DisplayDetailed title="Aim" lidata={arr} />
				<DisplayDetailed title="Features" lidata={features} />
				<Heading text="Send Your Query" />
				<ContentChoice choices={['Type-1', 'Type-2']} 
				 Type-1={<div> This is a Type-1 Query</div>}
				 Type-2={<div> This is a Type-2 Query</div>}/>
			</div>
		) ;
	}
}

export default AQUESS ;