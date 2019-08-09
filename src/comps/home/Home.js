import React from 'react' ;

import Banner from '../banner/Banner.js' ;
import Slider from '../slider/Slider.js' ;
import Parallax from '../Parallax/Parallax.js' ;
import './home.css' ;
import BannerContent from '../banner/banner_content/BannerContent.js' ;

import i1 from '../images/i1.jpg' ;
import i2 from '../images/i2.jpg' ;
import i3 from '../images/i3.jpg' ;

const cont1 = [ 'Zero Cost Query System for Students',
				'Teenage comes with a lot of confusion and many questions',
				'We Promise a customised support and a prompt response' ] ;
const cont2 = [ 'Workshop Organising Program for educational institutions',
'Supported by The Kasturi Foundation',
'Choose a module from list of topics and schedule a workshop now' ] ;

const sec_arr = [ 'Ye hai the Pehli String', 'Ye hai meri dusri String', 'Aur ye hogi Teesri string' ] ;

class Home extends React.Component
{	constructor()
	{
		super() ;
		this.data = [
            {	style : {
	            	backgroundImage: 'url(' + i3+ ')',
            	},
	            title: 'AQueSS',
	            link : '/program/AQueSS' ,
	            message: 'An Online Free Query System for Students',
         	},
            {	style : {
	            	backgroundImage: 'url(' + i1+ ')',
            	},
	            title: 'Sarathi',
	            message: 'Workshop organising solution for Schools and Colleges' ,
	            link : '/program/Sarathi'
	        } ,
	        {	style : {
	            	backgroundImage: 'url(' + i2+ ')',
            	},
	            title: 'Personal Consultation',
	            link : '/program/personal' ,
	            message: 'Get personal consultation from our experts',
         	},
        ];
	}

	render()
	{
		return(
			<div>
				<Slider data={this.data} />
				<Banner clr="red_left" img="d" >
					<BannerContent title = 'AQueSS' lidata={cont1} 
								   left="left" link="/program/AQueSS"/>
				</Banner>
				<Banner clr="blue_right" img="e" >
					<BannerContent title = 'Sarathi' lidata={cont2} 
								   left="right" link="/program/Sarathi"/>
				</Banner>
				<Banner clr="green_left" img="c" >
					<BannerContent title = 'Personal Consult' lidata={sec_arr} 
								   left="left" link="/program/personal"/>
				</Banner>
				<Parallax>
					<div className="testim"> Our Testimonials </div>
				</Parallax>
			</div>
		) ;
	}
}

export default Home ;

				// Before Banner clr-green_right(changed to green_left now)
				// <Banner clr="green_left" img="c" >
				// 	<BannerContent title = 'MentaMorph' lidata={sec_arr} 
				// 				   left="left" link="/mentamorph"/>
				// </Banner>
				// <Banner clr="red_right" img="a" >
				// 	<BannerContent title = 'Psychometric Testing' lidata={sec_arr} 
				// 				   left="right" link="/test"/>
				// </Banner>
				// <Banner clr="blue_left" img="b" >
				// 	<BannerContent title = 'Parenting Strategies' lidata={sec_arr} 
				// 				   left="left" link="/parenting"/>
				// </Banner>

				// Before personal consultation object in array 
          //   {	style : {
	         //    	backgroundImage: 'url(' + i2 + ')', 
          //   	},
	         //    title: 'Menta Morph',
	         //    link : '/mentamorph' ,
	         //    message: 'Customise and Modify your personality traits',
         	// },
         	// {	style : {
	         //    	backgroundImage: 'url(' + i1+ ')',
          //   	},
	         //    title: 'Psychometric Tests',
	         //    link : '/test' ,
	         //    message: 'Online Tests to evaluate your personality',
         	// },
         	// {	style : {
	         //    	backgroundImage: 'url(' + i3+ ')',
          //   	},
	         //    title: 'Parenting Strategies',
	         //    link : '/parenting' ,
	         //    message: 'Ways of guiding your adolescents',
         	// },