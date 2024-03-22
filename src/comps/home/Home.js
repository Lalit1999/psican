
import TestBoxList from '../testbox/TestBoxList.js' ;
import Image from '../../images/banner.webp' ;
import './home.css' ;

const Home = () => {
	return(
		<div className="home">
			<div className="home-top">
				<a href="https://play.google.com/store/apps/details?id=com.myarth.psyment">
            		<img className="home-logo" src={Image} alt="psyment logo"/>
            	</a>
				{/* <div className="home-top-middle">
            		<h3>Make Mental Health your priority</h3>
            		<a href="https://play.google.com/store/apps/details?id=com.myarth.psyment" className="sched-btn home-btn"> Book Appointment </a>
				</div>
            	<div className='leader'>
					<img src={LeaderImage} alt="Leader"/>
					<p className='leader-name'>Ashish Aggarwal</p>
					<p className="leader-data">Counsellor, Mentor, Motivator</p>
				</div> */}
            </div>
            <div className="home-float">
				<h3> Self Assessment Tests </h3>
				<TestBoxList />
            </div>
		</div>
	) ;
}

export default Home ;