import React from 'react' ;

import BannerTwo from '../banner/BannerTwo.js' ;
import Slider from '../slider/Slider.js' ;
import Parallax from '../Parallax/Parallax.js' ;
import './home.css' ;
import TestimonialSlider from '../slider/TestimonialSlider.js' ;

import i1 from '../images/i1.jpg' ;
import i2 from '../images/i2.jpg' ;
import i3 from '../images/i3.jpg' ;

const testim_arr = [
{ 	name: 'Shri. S L Jain' ,
  	img: 'i3' ,
	role: 'Director, Mahavir Senior Model School' ,
	msg: 'this is the wonderful message given by out testimonial. We like it. But we are only testing how it will be diaplyed, so this paragraph is needlessly long. I hope it is long enough'
},
{ 	name: 'Dr. Kiran Modi' ,
  	img: 'i1' ,
	role: 'Founder & Trustee, The Udayan Care' ,
	msg: 'The Workshop was really nice and gave a really good message'
},
{ 	name: 'Tanya Gomber' ,
  	img: 'i4' ,
	role: 'Student' ,
	msg: 'I just took guidance and my whole life changed'
},
{ 	name: 'Shivangi Goel' ,
  	img: 'i2' ,
	role: 'Student' ,
	msg: 'I am very satisfied becuase i am really satisfied.'
},
{ 	name: 'Dr. Vinay Gupta' ,
  	img: 'i4' ,
	role: 'HOD Orthopedic, Saroj Hospital' ,
	msg: 'I just took guidance and my whole life changed'
},
] ;

class Home extends React.Component
{	constructor()
	{
		super() ;
		this.data = [
            {	style : {
	            	backgroundImage: 'url(' + i3+ ')',
            	},
	            message: 'Welcome to the world of',
	            link : '/' ,
	            message2: 'Realisation ( तत् त्वमसि ) - Mentoring',
	            message3: '&' ,
	            message4: 'Actualisation ( अहम् ब्रह्मास्मि ) - Psychology',
	            title: 'PSYMENT'
         	},
            {	style : {
	            	backgroundImage: 'url(' + i1+ ')',
            	},
	            subtitle: 'PSYMENT : Program 1',
	            title: 'Sarathi',
	            message: 'School Academic Attitude Training & Health Initiative' ,
	            message2: 'A Mentoring Prgoram for Educational Instituitions' ,
	            link : '/program/Sarathi'
	        } ,
         	{	style : {
	            	backgroundImage: 'url(' + i3+ ')',
            	},
	            title: 'AEQUESS',
	            subtitle: 'PSYMENT : Program 2',
	            link : '/program/AEQUESS' ,
	            message: 'Abhinav E-Query System for Students',
	            message2 : 'An E-Counselling System for Classes 11-12 & UG level students',
         	},
	        {	style : {
	            	backgroundImage: 'url(' + i2+ ')',
            	},
	            subtitle: 'PSYMENT : Program 3',
	            title: 'Personal Consultation',
	            link : '/consult' ,
	            message: 'Get PSYCHOLOGICAL MENTORING and COUNSELLING personally',
	            message2: 'Schedule your appointment NOW'
         	},
        ];
	}

	render()
	{
		return(
			<div>
				<Slider data={this.data} />
				<BannerTwo content="aquess" color="blue"/>
				<BannerTwo content="sarathi" left="yes" color="blue"/>
				<BannerTwo content="person" color="blue"/>
				<Parallax>
					<div className="testim"> Our Testimonials </div>
					<TestimonialSlider data={testim_arr}/>
				</Parallax>
			</div>
		) ;
	}
}

export default Home ;