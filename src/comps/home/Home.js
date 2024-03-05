import { Link } from 'react-router-dom' ;
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';

import TestBoxList from '../testbox/TestBoxList.js' ;
import Image from '../../images/Psyment.webp' ;
import LeaderImage from '../../images/leader.webp' ;
import './home.css' ;

// const sliderArr = [
// 	"https://web.myarthhardware.com/static/images/cupro-slider.webp", 
// ] ;

const Home = () => {
	return(
		<div className="home">
			{/*<Carousel showStatus={false} showArrows={false} autoPlay={true} infiniteLoop={true} interval={4000} stopOnHover={false} showThumbs={false}>
                { sliderArr.map( (one, i)=> <div className="homeImageCon" key={i}><img className="homeImg" src={one.image} alt={one.name} /></div> )
                }
            </Carousel>*/}
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
		</div>
	) ;
}

export default Home ;