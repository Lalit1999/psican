import React from 'react' ;

import Banner from '../banner/Banner.js' ;
import Slider from '../slider/Slider.js' ;
import Parallax from '../Parallax/Parallax.js' ;
import './home.css' ;
import BannerContent from '../banner/banner_content/BannerContent.js' ;

import i1 from '../images/i1.jpg' ;
import i2 from '../images/i2.jpg' ;
import i3 from '../images/i3.jpg' ;

const sec_arr = [ 'Ye hai Pehlis String', 'Ye hai meri dusri String', 'Aur ye hogi Teesri string' ] ;

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
	            	backgroundImage: 'url(' + i2 + ')', 
            	},
	            title: 'Menta Morph',
	            link : '/mentamorph' ,
	            message: 'Customise and Modify your personality traits',
         	},
         	{	style : {
	            	backgroundImage: 'url(' + i1+ ')',
            	},
	            title: 'Psychometric Tests',
	            link : '/test' ,
	            message: 'Online Tests to evaluate your personality',
         	},
         	{	style : {
	            	backgroundImage: 'url(' + i3+ ')',
            	},
	            title: 'Parenting Strategies',
	            link : '/parenting' ,
	            message: 'Ways of guiding your adolescents',
         	},
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
				<Banner clr="red" img="a" >
					<BannerContent title = 'AQueSS' lidata={sec_arr}/>
				</Banner>
				<Banner clr="blue" img="b" >
					<BannerContent title = 'Sarathi' lidata={sec_arr}/>
				</Banner>
				<Banner clr="green" img="c" >
					<BannerContent title = 'MentaMorph' lidata={sec_arr}/>
				</Banner>
				<Banner clr="red" img="a" >
					<BannerContent title = 'Psychometric Testing' lidata={sec_arr}/>
				</Banner>
				<Banner clr="blue" img="b" >
					<BannerContent title = 'Parenting Strategies' lidata={sec_arr}/>
				</Banner>
				<Banner clr="green" img="c" >
					<BannerContent title = 'Personal Consult' lidata={sec_arr}/>
				</Banner>
				<Parallax text="Our Testimonials" />
			</div>
		) ;
	}
}

export default Home ;