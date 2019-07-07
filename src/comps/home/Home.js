import React from 'react' ;

import Banner from '../banner/Banner.js' ;
import Slider from '../slider/Slider.js' ;

import i1 from '../images/i1.jpg' ;
import i2 from '../images/i2.jpg' ;
import i3 from '../images/i3.jpg' ;

class Home extends React.Component
{	constructor()
	{
		super() ;
		this.data = [
            {	style : {
	            	backgroundImage: 'url(' + i2 + ')', 
            	},
	            title: 'Menta Morph',
	            link : '/mentamorph' ,
	            message: 'A generic description of Menta Morph Program',
         	},
            {	style : {
	            	backgroundImage: 'url(' + i3+ ')',
            	},
	            title: 'AEQS',
	            link : '/program/AEQS' ,
	            message: 'An Online E - Query System for various people',
         	},
            {	style : {
	            	backgroundImage: 'url(' + i1+ ')',
            	},
	            title: 'KFMP',
	            message: 'Kasturi Foundation Motivational Program' ,
	            link : '/program/KFMP'
	        } ,
	        {	style : {
	            	backgroundImage: 'url(' + i2+ ')',
            	},
	            title: 'Personal Consultation',
	            link : '/program/personal' ,
	            message: 'Get personal consultation and enjoy',
         	},
         	{	style : {
	            	backgroundImage: 'url(' + i1+ ')',
            	},
	            title: 'Online Tests',
	            link : '/test' ,
	            message: 'Another generic description of various tests we offer',
         	},
        ];
	}

	render()
	{
		return(
			<div>
				<Slider data={this.data} />
				<Banner name= "aeqs" clr="red" img="a" />
				<Banner name= "kfmp" clr="blue" img="b" />
				<Banner name= "mentamorph" clr="green" img="c" />
				 Add 2-3 more banners, colors and images
			</div>
		) ;
	}
}

export default Home ;