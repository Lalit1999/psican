import {useState, useContext} from 'react' ;
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom' ;

import ConsultForm from './ConsultForm.js' ;
import Payment from '../payment/Payment.js' ;
// import Title from '../title/Title.js' ;
import DisplayDetailed from '../display/DisplayDetailed.js' ;
import Heading from '../Heading/Heading.js' ;
import {pData, ptData, mData, features} from './consultData.js' ; 
import {UserContext} from '../../context/UserContext.js' ;
import ImageTitle from '../imagetitle/ImageTitle.js' ;
import test from '../../images/consult1.jpg' ;

import './program.css' ;

const Consult = () => {
	const [payment, setPayment] = useState(false) ;
	const [choice , setChoice] = useState('blank') ;
	const {user} = useContext(UserContext) ;

	const checkPayment = () => {
		if((choice === 'noAdvance') || ((choice === 'withAdvance') && payment))
			return <div className="blue-bg"> <ConsultForm choice={choice}/> </div> ;
		else 
			return <Payment success={() => setPayment(true)} type='appoint'/> ;
	}	

	const checkLogin = () => {
		if(user.name) {
			if(choice === 'blank')
				return(
					<div className="check-appointment">
						<Button className="sched-btn" onClick={()=> setChoice('noAdvance')}>Request Appointment (No advance payment)</Button>
						<Button className="sched-btn" onClick={()=> setChoice('withAdvance')}>Book Appointment (With advance payment)</Button>
					</div>
				) ;
			else
				return checkPayment() ;
		}
		else
			return (
				<div className="blue-bg blue-form consult-login">
					<p> Please
						<Link to="/login?rdr=consult" className="sched-btn"> Login </Link>
						 or 
						<Link to="/register?rdr=consult" className="sched-btn"> Register </Link> 
						 to book an Appointment 
					</p>
				</div>
		) ; 
	}

	const itProps = {
		image: test,
		title: 'Personal Consultation',
		p1: `Human behavior and thinking constantly impact each other. Our fundamental attributions for objects, events and relations around us make us emotionally susceptible`,
		p2: `This may lead to cognitive dissonance and inept self-appraisal. Such events often disturb the flow of our capability.`,
		value: `consult`,
	}

	return(
		<div className="consult-page">
			<ImageTitle {...itProps} />
			<p className="intro"> <span className="ngo"> PERSONAL PSYCHOLOGICAL COUNSELLING</span> &nbsp;and <span className="ngo"> MENTORING </span> is of prime help in such situations.
			</p>
			<p className="intro"> You may consult us for all such needs. <strong>All Personal Queries and details shall be kept confidential. They will never be shared with any third-person.</strong> </p> 
			<div className="consult-flex ">
				<DisplayDetailed title="Personality Appraisal Counselling" small="yes" lidata={pData} />
				<DisplayDetailed title="Post Trauma Counselling" small="yes" lidata={ptData} />
				<DisplayDetailed title="Metamorphosis Counselling" small="yes" lidata={mData} />
			</div>
			<div className="consult-flex">
				<DisplayDetailed title="Features" lidata={features} />
				<div className="consult-flex-ch">
					<Heading text="Counselling Given By" />
					<p className="consult-flex-text">
						<span className="brand"> Mr. Ashish Aggarwal</span><br/>M.Sc. (Applied Psychology) <br/> PG Diploma in Guidance & Counselling <br/>D. Pharmacy 
					</p>
				</div>
				<div className="consult-flex-ch">
					<Heading text="Venue" />
					<p className="consult-flex-text"> Unit No. 4, First Floor, CSC, Pocket B & C, Phase-4, Ashok Vihar, Delhi-110052 </p>
				</div>
			</div>			
			<Heading text="Schedule Your Appointment" />
			{ checkLogin() }
		</div>
	) ;
}

export default Consult ;