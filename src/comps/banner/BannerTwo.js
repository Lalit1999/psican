import React from 'react' ;

import BannerContent from './banner_content/BannerContent.js' ;
import './BannerTwo.css' ;

const cont1 = [ 
'Zero Cost Query System for Students',
'Teenage comes with a lot of confusion and many questions',
'We Promise a customised support and a prompt response' ] ;

const cont2 = [ 
'Workshop Organising Program for educational institutions',
'Supported by The Kasturi Foundation',
'Choose a module from list of topics and schedule a workshop now' ] ;

const cont3 = [ 
'Some events disturb the flow of our life',
'Our personal Mentoring to guide you through such situations',
'Schedule your Appointment Now' ] ;

class BannerTwo extends React.Component
{	createBannerContent = () => {
		switch(this.props.content)
		{
			case 'aquess' : return (
			 	<BannerContent title = 'AEQUESS System' lidata={cont1} link="/program/AEQUESS"/>
			 	) ;
			case 'sarathi' : return (
				<BannerContent title = 'Sarathi Program' lidata={cont2} link="/program/Sarathi"/>
			 	) ;
			case 'person' : return (
				<BannerContent title = 'Personal Consultation' lidata={cont3} link="/consult"/>
			 	) ;
			default : return null ;
		}
	}

	render()
	{	let classcolor = 'ban2_main ' + this.props.color ;
		if(this.props.left === 'yes')
		{
			return(
				<div className={'BannerTwo '}>
					<div className="ban2-image">
					</div>
					<div className = {classcolor}>
						{this.createBannerContent()}				
					</div>
				</div>
				) ;
		}
		else
		{	return(
				<div className={'BannerTwo '}>
					<div className = {classcolor}>
						{this.createBannerContent()}				
					</div>
					<div className="ban2-image">
					</div>
				</div>
			) ;
		}
	}
}

export default BannerTwo ;