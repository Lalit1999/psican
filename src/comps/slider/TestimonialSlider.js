import React, { Component } from 'react';
import Swiper from 'react-id-swiper';

import Atul from '../images/atul.webp' ;
import KP from '../images/KP.webp' ;
import Shivangi from '../images/shivangi.webp' ;
import Kiran from '../images/kiran.webp' ;
import Sljain from '../images/sljain.webp' ;
import Profile from '../images/profile.webp' ;

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
								alt={item.name} />
						</div>
						<div className="testim-up-right">
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
                delay: 15000
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