import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons' ;

import Image from '../images/Psyment.jpg' ;

import './slider.css' ;

class Slider extends Component 
{	
	createButton = (str) => {
		if(str !== '/')
			return (
				<div className="row">
					<a href={str} className="slide-link"> Go </a>
				</div>
				) ;
	}

	checkOpeningSlide = (item) => {
		if(item.message4)
			return (
				<div className="row front">
					<p className="slide-message"> {item.message}</p>
					<p className="slide-message"> {item.message2}</p>
					<p className="slide-message"> {item.message3}</p>
					<p className="slide-message"> {item.message4}</p>
					<h2 className="slide-heading"> {item.title} </h2>
				</div>
				) ;
		else if(item.title)
			return (
				<div className="row">
					<p className="slide-subtitle"> {item.subtitle} </p>
					<h2 className="slide-heading"> {item.title} </h2>
					<p className="slide-message"> {item.message}</p>
					<p className="slide-message"> {item.message2}</p>
				</div>
			) ;
		else
			return (
				<div className="row logo-slide">
					<img src={Image} alt="psyment logo" />
				</div>
			) ;
	}

	dataList = () => {
		return this.props.data.map((item, i) => {
			return (
				<div className="swiper-slide" key={i}>
					<div className="slide" style={item.style}>
						<div className="cont">
							{this.checkOpeningSlide(item)}
							{this.createButton(item.link)}
						</div>
					</div>
				</div> ) ;
		}) ;
	}
	render() {
		const params = {
		    slidesPerView : 1,
		    loop: true,
		    speed: 1000,
		    watchSlidesVisibility: true,
		    effect: 'fade',
		    navigation: {
			        nextEl: '.next',
			        prevEl: '.prev'
		    	},
		    renderPrevButton: () => (
                <div className="prev arrow">
			 		<FontAwesomeIcon icon={faArrowLeft} />
                </div>
              ),
              renderNextButton: () => (
                <div className="next arrow">
                	<FontAwesomeIcon icon={faArrowRight} />
                </div>
              ),
		    autoplay: {
		        delay: 7000,
                disableOnInteraction: false
		    }
		}

		return (
			<div className="slider-parent">
				<Swiper {...params}>
                    {this.dataList()}
                </Swiper>
			</div>
		);
	}
}

export default Slider ;