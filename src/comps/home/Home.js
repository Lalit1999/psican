import React from 'react' ;

import Banner from '../banner/Banner.js' ;
import Slider from '../slider/Slider.js' ;
import Parallax from '../Parallax/Parallax.js' ;
import './home.css' ;
import TestimonialSlider from '../slider/TestimonialSlider.js' ;

import i1 from '../images/i1.jpg' ;
import i2 from '../images/i2.jpg' ;
import i3 from '../images/i3.jpg' ;

const testim_arr = [
{ 	name: 'First Person' ,
  	img: 'i3' ,
	role: 'Student' ,
	msg: 'I am so excited about my life after these lessons'
},
{ 	name: 'Second Person' ,
  	img: 'i1' ,
	role: 'School Principal' ,
	msg: 'The Workshop was really nice and gave a really good message'
},
{ 	name: 'Third Person' ,
  	img: 'i4' ,
	role: 'Student' ,
	msg: 'I just took guidance and my whole life changed'
},
{ 	name: 'Fourth Person' ,
  	img: 'i2' ,
	role: 'Parent' ,
	msg: 'I am very satisfied becuase i am really satisfied.'
}
] ;

class Home extends React.Component
{	constructor()
	{
		super() ;
		this.data = [
            {	style : {
	            	backgroundImage: 'url(' + i3+ ')',
            	},
	            title: 'PSYMENT',
	            link : '/' ,
	            message: 'Welcome To the World of Self Discovery',
         	},
         	{	style : {
	            	backgroundImage: 'url(' + i3+ ')',
            	},
	            title: 'AQUESS',
	            link : '/program/AQUESS' ,
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
				<Banner clr="red_left" img="d" content="aquess" />
				<Banner clr="blue_right" img="e" content="sarathi" />
				<Banner clr="green_left" img="c" content="person" />
				<Parallax>
					<div className="testim"> Our Testimonials </div>
					<TestimonialSlider data={testim_arr}/>
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