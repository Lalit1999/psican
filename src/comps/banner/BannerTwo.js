import React from 'react' ;

import BannerContent from './banner_content/BannerContent.js' ;
import './BannerTwo.css' ;

const cont1 = [ 
'Zero Cost Query System for Students',
'Teenage comes with a lot of confusion and many questions',
'We promise a customised support and a prompt response' ] ;

const cont2 = [ 
'Workshop Organising Program for educational institutions',
'Supported by The Kasturi Foundation',
'Contact Us and schedule your workshop now' ] ;

const cont3 = [ 
'Some events disturb the flow of our life',
'Our personal mentoring can guide you through such situations',
'Schedule your Appointment Now' ] ;

const cont4 = [ 
'SAAT(Self-Assessment Anxiety Test)',
'Take this free test to get your anxiety score',
'Get evaluation of your anxiety level' ] ;

const cont5 = [ 
'LETA(Learning Environment Traits Assessment)',
'Only for Parents having children 2-12 years old',
'Take this free test to find probability of your traits getting expressed in your child' ] ;

class BannerTwo extends React.Component
{	createBannerContent = () => {
		switch(this.props.content)
		{
			case 'aequess' : return (
			 	<BannerContent title = 'AEQUESS System' lidata={cont1} link="/program/AEQUESS"/>
			 	) ;
			case 'sarathi' : return (
				<BannerContent title = 'Sarathi Program' lidata={cont2} link="/program/Sarathi"/>
			 	) ;
			case 'person' : return (
				<BannerContent title = 'Personal Consultation' lidata={cont3} link="/consult"/>
			 	) ;
			case 'saat' : return (
				<BannerContent title = 'Anxiety Test' lidata={cont4} test = 'test' link="/test/self-anxiety-assessment"/>
				) ;
			case 'leta' : return (
				<BannerContent title = 'Traits Test for Parents' lidata={cont5} test = 'test' link="/test/trait-test"/>
				) ;
			default : return null ;
		}
	}

	render()
	{	let classcolor = 'ban2_main ' + this.props.color ;
		if(this.props.left === 'yes')
		{	return(
				<div className={'BannerTwo '}>
					<div className= {"ban2-" + this.props.content}></div>
					<div className = {classcolor}>
						{this.createBannerContent()}				
					</div>
				</div>
			) ;
		}
		else
		{	
			return(
				<div className={'BannerTwo '}>
					<div className = {classcolor}>
						{this.createBannerContent()}				
					</div>
					<div className={"ban2-" + this.props.content}></div>
				</div>
			) ;
		}
	}
}

export default BannerTwo ;