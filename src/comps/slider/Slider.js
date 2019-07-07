import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons' ;

import './slider.css' ;

class Slider extends Component 
{	
	dataList = () => {
		return this.props.data.map((item, i) => {
			return (
				<div className="swiper-slide" key={i}>
					<div className="slide" style={item.style}>
						<div className="cont">
							<div className="row">
								<h2 className="slide-heading"> {item.title} </h2>
								<p className="slide-message"> {item.message}</p>
							</div>
							<div className="row">
								<a href={item.link} className="slide-link"> Go </a>
							</div>
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
		        delay: 3000,
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