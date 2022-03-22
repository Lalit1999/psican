import {useState, useEffect} from 'react' ;

import ConsultForm from './ConsultForm.js' ;
import Payment from '../tests/payment/Payment.js' ;
import { addNotif } from '../notif.js' ;
import Title from '../title/Title.js' ;
import DisplayDetailed from '../display/DisplayDetailed.js' ;
import Heading from '../Heading/Heading.js' ;
import {pData, ptData, mData, features} from './consultData.js' ; 

import logo from '../images/Psyment.webp' ;
import './program.css' ;

const coupon_amount = {
    noPayment: 1000,
    fullPayment: 0,
    quarterPayment: 250,
    halfPayment: 500,
    threeQuarter: 750,
}

const Personal = ({token, user}) => {
	const [payment, setPayment] = useState(false) ;
	const [coupon, setCoupon] = useState('noPayment') ;

	const loadScript = (src) => {
	    return new Promise((resolve) => {
	        const script = document.createElement("script");
	        script.src = src;
	        script.onload = () => {
	            resolve(true);
	        };
	        script.onerror = () => {
	            resolve(false);
	        };
	        document.body.appendChild(script);
	    });
	}

	const displayRazorpay = async () => {
	    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

	    if (!res) {
	        alert("Payment Gateway failed to load");
	        return;
	    }

	    let result = await fetch("https://psy-api.herokuapp.com/appoint-payment", {
			method : 'post' ,
			headers : { 'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '+ token
					  } ,
			body : JSON.stringify({ coupon }) 
		});

	    if(result.ok)
	    	result =  await result.json() ;
	    else
			throw Error(result.statusText) ;

	    const { amount, id: order_id, currency } = result;

	    const options = {
	        key: "rzp_live_7U3eAyAgr3NCgu", // Enter the Key ID generated from the Dashboard
	        amount: amount.toString(),
	        currency: currency,
	        name: user.name,
	        description: "Appointment for "+user.name,
	        image: { logo },
	        order_id: order_id,
	        handler: async (response) => {
	            const data = {
	                orderCreationId: order_id,
	                razorpayPaymentId: response.razorpay_payment_id,
	                razorpayOrderId: response.razorpay_order_id,
	                razorpaySignature: response.razorpay_signature,
	                amount ,
	            };

	            let result2 = await fetch("https://psy-api.herokuapp.com/appoint-payment/success", {
					method : 'post' ,
					headers : { 'Content-Type' : 'application/json',
								'Authorization' : 'Bearer '+ token
						} ,
					body: JSON.stringify(data) ,
				});

				if(result2.ok)
			    	result2 =  await result2.json() ;

	            this.setState({payment: true}) ;
	        },
	        prefill: {
	            name: user.name,
	            email: user.email,
	            contact: user.mobile,
	        },
	        notes: {
	            address: user.name + ' ' + user.mobile + ' ' + user.email ,
	        },
	        theme: {
	            color: "#61dafb",
	        },
	    };

	    const paymentObject = new window.Razorpay(options);
	    paymentObject.open();
	}

	const changeCoupon = (str) => {
		if(str === 'fullPayment')
		{
			addNotif('Coupon Applied Successfully', 'success') ;
			setPayment(true) ;
		}
		else
		{	if(str === 'noPayment')
				addNotif('Coupon Invalid or already used', 'error') ;
			else
				addNotif('Coupon Applied Successfully', 'success') ;
			setCoupon(str) ;
		}					
	}

	const checkPayment = () => {
		// if(payment)
			return (
				<div className="blue-bg">
					<ConsultForm token={token}/>
				</div>
			) ;
		// else 
		// 	return <Payment cost={coupon_amount[coupon]} token={token} display={displayRazorpay} change={() => setPayment(true)} couponChange={changeCoupon} type='appoint'/> ;
	}	

	const checkLogin = () => {

		// if(user.name)
			return checkPayment() ;
		// else
		// 	return (
		// 		<div className="blue-bg blue-form">
		// 			<p> You need to 
		// 				<Link to="/login?rdr=consult" className="btn3"> Login </Link>
		// 				 or 
		// 				<Link to="/register?rdr=consult" className="btn3"> Register </Link> 
		// 				 to book an Appointment 
		// 			</p>
		// 		</div>
		// ) ; 
	}

	return(
		<div className="consult-page">
			<Title name = 'Personal Consultation' items={["Home", "Programs", "Consult"]}/>
			<p className="intro"> Human behavior and thinking constantly impact each other. 
				Our fundamental attributions for objects, events and relations around us make us
				emotionally susceptible</p>
			<p className="intro"> This may lead to cognitive dissonance and inept self-appraisal.
				Such events often disturb the flow of our capability.</p>
			<p className="intro"> <span className="ngo"> PERSONAL PSYCHOLOGICAL COUNSELLING</span>
			 	&nbsp;and <span className="ngo"> MENTORING </span> is of prime help in such situations.
			</p>
			<p className="intro"> You may consult us for all such needs. </p> 
			<p className="intro bold"> Note : All Personal Queries and details shall be kept 
				confidential. They will never be shared with any third-person. </p>
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
			<Heading text="Schedule Your Appointment" />
			{ checkLogin() }
			<p className="intro bold support"> Having Technical issues? <a className="sched-btn" href="mailto:myarth.tech@gmail.com" target="_blank" rel="noopener noreferrer"> Contact Technical Support </a>
			</p>
		</div>
	) ;
}

export default Personal ;