// import Parallax from '../Parallax/Parallax.js' ;
// import TestimonialSlider from '../slider/TestimonialSlider.js' ;
// import {testimArr} from './homeData.js' ;
import TestBoxList from '../testbox/TestBoxList.js' ;
import Image from '../images/Psyment.webp' ;
import './home.css' ;

const Home = () => {
	return(
		<div className="home">
			<div className="home-top">
            	<img src={Image} alt="psyment logo"/>
            </div>
            <div className="home-float">
            	<TestBoxList />
            </div>
			{/*<Parallax>
				<div className="testim"> Our Testimonials </div>
				<TestimonialSlider data={testimArr}/>
			</Parallax>*/}
		</div>
	) ;
}

export default Home ;