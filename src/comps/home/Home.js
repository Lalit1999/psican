import {lazy, Suspense} from 'react' ;

import BannerTwo from '../banner/BannerTwo.js' ;
import Parallax from '../Parallax/Parallax.js' ;
import './home.css' ;
import TestimonialSlider from '../slider/TestimonialSlider.js' ;

import {testimArr, sliderData} from './homeData.js' ;
import Image from '../images/Psyment.webp' ;

const Slider = lazy(() => import('../slider/Slider.js') ) ;

const Home = () => {
	return(
		<div>
            <Suspense fallback={<div className="row logo-slide"><img src={Image} alt="psyment logo"/></div>} > 
                <Slider data={sliderData} />
            </Suspense>
            <BannerTwo content="leta" color="blue"/>
            <BannerTwo content="saat" left="yes" color="blue"/>
			<BannerTwo content="person" color="blue"/>
			<Parallax>
				<div className="testim"> Our Testimonials </div>
				<TestimonialSlider data={testimArr}/>
			</Parallax>
		</div>
	) ;
}

export default Home ;