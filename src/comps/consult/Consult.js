import {useState, useContext} from 'react' ;
import {Link} from 'react-router-dom' ;

import ConsultForm from './ConsultForm.js' ;
import Payment from '../payment/Payment.js' ;
import Title from '../title/Title.js' ;
import DisplayDetailed from '../display/DisplayDetailed.js' ;
import Heading from '../Heading/Heading.js' ;
import {pData, ptData, mData, features} from './consultData.js' ; 
import {UserContext} from '../../context/UserContext.js' ;

import './program.css' ;

const Consult = () => {
	const [payment, setPayment] = useState(false) ;
	const {user} = useContext(UserContext) ;

	const checkPayment = () => {
		if(payment)
			return <div className="blue-bg"> <ConsultForm /> </div> ;
		else 
			return <Payment success={() => setPayment(true)} type='appoint'/> ;
	}	

	const checkLogin = () => {
		if(user.name)
			return checkPayment() ;
		else
			return (
				<div className="blue-bg blue-form">
					<p> You need to 
						<Link to="/login?rdr=consult" className="btn3"> Login </Link>
						 or 
						<Link to="/register?rdr=consult" className="btn3"> Register </Link> 
						 to book an Appointment 
					</p>
				</div>
		) ; 
	}

	return(
		<div className="consult-page">
			<Title name = 'Personal Consultation' items={["Home", "Consult"]}/>
			<p className="intro"> Human behavior and thinking constantly impact each other. Our fundamental attributions for objects, events and relations around us make us emotionally susceptible</p>
			<p className="intro"> This may lead to cognitive dissonance and inept self-appraisal. Such events often disturb the flow of our capability.</p>
			<p className="intro"> <span className="ngo"> PERSONAL PSYCHOLOGICAL COUNSELLING</span> &nbsp;and <span className="ngo"> MENTORING </span> is of prime help in such situations.
			</p>
			<p className="intro"> You may consult us for all such needs. </p> 
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
			<div className="consult-flex">
				<DisplayDetailed title="Personality Appraisal Counselling" small="yes" lidata={pData} />
				<DisplayDetailed title="Post Trauma Counselling" small="yes" lidata={ptData} />
				<DisplayDetailed title="Metamorphosis Counselling" small="yes" lidata={mData} />
			</div>
			<p className="intro bold"> Note : All Personal Queries and details shall be kept confidential. They will never be shared with any third-person. </p>
			<Heading text="Schedule Your Appointment" />
			{ checkLogin() }
			<p className="intro bold support"> Having Technical issues? <a className="sched-btn" href="mailto:myarth.tech@gmail.com" target="_blank" rel="noopener noreferrer"> Contact Technical Support </a>
			</p>
		</div>
	) ;
}

export default Consult ;