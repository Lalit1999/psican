import {Link} from 'react-router-dom' ;

// import Parallax from '../Parallax/Parallax.js' ;
// import TestimonialSlider from '../slider/TestimonialSlider.js' ;
// import {testimArr} from './homeData.js' ;
import TestBoxList from '../testbox/TestBoxList.js' ;
import Image from '../images/Psyment.webp' ;
import LeaderImage from '../images/leader.webp' ;
import './home.css' ;

const Home = () => {
	return(
		<div className="home">
			<div className="home-top">
            	<img className="home-logo" src={Image} alt="psyment logo"/>
            	<div className="home-top-middle">
            		<h3>Make <span className="mental-health">Mental Health</span> your priority</h3>
            		<Link className="sched-btn home-btn" to='/consult'> Book Appointment </Link>
				</div>
            	<div className='leader'>
					<img src={LeaderImage} alt="Leader"/>
					<p className='leader-name'>Ashish Aggarwal</p>
					<p className="leader-data" >Counsellor, Mentor, Motivator</p>
				</div>
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