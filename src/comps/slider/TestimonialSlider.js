import React, { Component } from 'react';
import Swiper from 'react-id-swiper';

// import i1 from '../images/i1.jpg' ;
// import i2 from '../images/i2.jpg' ;
// import i3 from '../images/i3.jpg' ;
// import i4 from '../images/i5.jpg' ;
import Atul from '../images/atul.jpg' ;
import KP from '../images/KP.jpg' ;
import Shivangi from '../images/shivangi.jpg' ;
import Kiran from '../images/kiran.jpg' ;
import Sljain from '../images/sljain.jpg' ;
import Profile from '../images/profile.png' ;

import './testimonial.css' ;

class TestimonialSlider extends Component {
	checkImage = (str) => {
		switch(str)
		{	case 'Kiran' : return Kiran ;
			case 'Sljain' : return Sljain ;
			case 'Profile' : return Profile ;
			case 'Atul' : return Atul ;
			case 'KP' : return KP ;
			case 'Shivangi' : return Shivangi ;
			default : return Profile ;
		}
	}

	dataList = () => {
		return this.props.data.map( (item, i) => {
			return (
				<div className="testim-slide" key={i}>
					<div className="testim-up">
						<div>
							<img className="testim-img" src={this.checkImage(item.img)} 
								alt={item.msg} />
						</div>
						<div>
							<p className='testim-name'> {item.name} </p>
							<p className='testim-role'> {item.role} </p>
						</div>
					</div>
					<div className="testim-down">
						<p className="testim-msg">{item.msg} </p>
					</div>
				</div>
			) ;
		}) ;
	}

	render() {
		const params = {
            slidesPerView : 1,
            loop: true,
            speed: 1000,
            effect: 'fade',
            autoplay: {
            	disableOnInteraction: false ,
                delay: 10000
            },
            pagination: {
                el: '.testim-bullet',
                type: 'bullets',
                clickable: true
            },
            renderPagenation: () => (
                <div className="testim-bullet"></div>
              ),
        }

		return (
			<div className="testim-slider-parent">
				<Swiper {...params}>
                    {this.dataList()}
                </Swiper>
                <div className="testim-bullet"></div>
			</div>
		);
	}
}

export default TestimonialSlider ;