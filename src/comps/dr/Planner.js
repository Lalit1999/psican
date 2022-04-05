import {useState, useContext} from 'react' ;
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom' ;

import PlannerForm from './PlannerForm.js' ;
import Payment from '../payment/Payment.js' ;
import Title from '../title/Title.js' ;
import DisplayDetailed from '../display/DisplayDetailed.js' ;
import Heading from '../Heading/Heading.js' ;
// import {pData, ptData, mData, features} from './consultData.js' ; 
import {UserContext} from '../../context/UserContext.js' ;

import '../consult/program.css' ;
import './planner.css' ;

const features = [
'Doctor is friendly and compassionate. Neat & Clean environment.',
'He is a member of Association of Otolaryngologists of India (AOI).',
'Timings: (Mon-Sat) 09:00 AM - 10:00 AM and 06:00 PM - 09:00 PM',
'htmlFees : &#8377; 500 '
] ;

const Planner = () => {
	const [payment, setPayment] = useState(false) ;
	const [choice , setChoice] = useState('blank') ;
	const {user} = useContext(UserContext) ;

	// const checkPayment = () => {
	// 	// if((choice === 'noAdvance') || ((choice === 'withAdvance') && payment))
	// 		return <div className="blue-bg"> <ConsultForm choice={choice}/> </div> ;
	// 	// else 
	// 	// 	return <Payment success={() => setPayment(true)} type='appoint'/> ;
	// }	

	return(
		<div className="consult-page">
			<Title name = 'Book Appointment' items={["Home", "Appintment"]}/>
			<p className="intro"> Dr. Anil Jain's ENT Clinic is an Ear-Nose-Throat (ENT) Clinic in Kamla Nagar, Delhi. The clinic is visited by doctors like Dr. Anil Jain. The timings of Dr. Anil Jain's ENT Clinic are: Mon-Sat: 09:00-10:00, 18:00-21:00. Some of the services provided by the Clinic are: Hearing Aid Fitting,Adenoid / Tonsil Surgery,Nasal Endoscopy,Microsurgery of the Larynx and Consultation etc. Click on map to find directions to reach Dr. Anil Jain's ENT Clinic.
			</p>
			<div  className="consult-flex ">
				<div className="consult-flex-ch">
					<Heading text="Counselling Given By" />
					<p className="consult-flex-text">
						<span className="brand"> Dr. Anil Jain</span><br/>MBBS, Diploma in Otorhinolaryngology (DLO) <br/> 29 years experience overall <br/>ENT/ Otorhinolaryngologist 
					</p>
				</div>
				<div className="consult-flex-ch">
					<Heading text="Venue" />
					<p className="consult-flex-text"> Dr. Anil Jain's ENT Clinic, 121-E, Landmark: Near Traingle Park & Delhi University, Kamla Nagar, Delhi </p>
				</div>
				<DisplayDetailed title="Features" lidata={features} />
			</div>
			<div className="blue-bg"> 
				<PlannerForm choice={choice}/> 
			</div>
		</div>
	) ;
}

export default Planner ;