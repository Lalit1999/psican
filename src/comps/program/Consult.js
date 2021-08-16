import React, {useState, useEffect} from 'react' ;
import DatePicker from 'react-datepicker' ;
import "react-datepicker/dist/react-datepicker.css";
import {Link} from 'react-router-dom' ;

import Payment from '../tests/payment/Payment.js' ;
import { addNotif } from '../notif.js' ;
import Title from '../title/Title.js' ;
import DisplayDetailed from '../display/DisplayDetailed.js' ;
import Heading from '../Heading/Heading.js' ;
import LoginForm from '../signup/forms/LoginForm.js' ;
import TextArea from '../signup/text/TextArea.js' ;
import Text from '../signup/text/Text.js' ;
import logo from '../images/Psyment.webp' ;

import {pData, ptData, mData, features} from './consultData.js' ; 
import './program.css' ;

const coupon_amount = {
    noPayment: 1000,
    fullPayment: 0,
    quarterPayment: 250,
    halfPayment: 500,
    threeQuarter: 750,
}

const initData = {
	reason: '',
	title: ''
} ;

const Personal = ({token, user}) => {
	const [error, setError] = useState('') ;
	const [data, setData] = useState(initData) ;
	const [payment, setPayment] = useState(false) ;
	const [coupon, setCoupon] = useState('noPayment') ;
	const [date, setDate] = useState(new Date()) ;
	const [minTime, setMinTime] = useState(17.5) ;
	const [maxTime, setMaxTime] = useState(19) ;
	const [avail, setAvail] = useState('') ;

	useEffect(() => {
		setDate(returnTomorrow());

		fetch("https://psy-api.herokuapp.com/appoint-payment/check", {
			method : 'get' ,
			headers : { 'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+ token} ,
		}) 
		.then(res => {
			if(res.ok)
				return res.json() ;
			else
				throw Error(res.statusText) ;
		})
		.then(data => setPayment(data.answer) )  
		.catch( err  => console.log(err, err.message) ) ;
	}, [] );	

	const returnTomorrow = () => {
		const tom = new Date() ;
		tom.setDate(tom.getDate() + 2) ;
		if(tom.getDay() === 0)
		{	tom.setDate(tom.getDate() + 1) ;
			tom.setHours(18) ;
			tom.setMinutes(0) ;
		}
		else if(tom.getDay() === 6)
		{	tom.setMinutes(0) ;
			tom.setHours(9) ;
		}
		else
		{	tom.setHours(18) ;
			tom.setMinutes(0) ;
		}
		return tom ;
	}

	const returnTime = (hour) => {
		const tim = new Date() ;
		tim.setHours(hour) ;
		return tim ;
	}

	const onScheduleClick = () => {
		const {title, reason} = data ;
	  	if(error !== '')
			setError('You cannot proceed without fixing all the errors');
	  	else if(title === '')
			setError('Title can not be blank');
		else if(reason === '')
			setError('Reason can not be blank');
		else if(date.getDay() === 6)
		{	if(date.getHours() < 9 || date.getHours() > 14)
				setError('Invalid Date or Time range');
			else 
				callBackend() ;
		}
		else if(date.getDay() === 0)
			setError('Invalid Date or Time range');
		else if(date.getHours() < 18 || date.getHours() > 20)
			setError('Invalid Date or Time range');
		else
			callBackend() ;			
	}

	const callBackend = () => {
		addNotif('Please Wait...') ;

		if(this.state.avail === 'yes')
		{	
			fetch('https://psy-api.herokuapp.com/consult',{
				method : 'post' ,
				headers : { 'Content-Type' : 'application/json' ,
							'Authorization' : 'Bearer ' + token} ,
				body : JSON.stringify({date, reason: data.reason, title: data.title}) ,
			})
			.then(res => {
				if(res.ok)
					return res.json() ;
				else
					throw Error(res.statusText) ;
			})
			.then(data => {	
				setDate( returnTomorrow() ) ;
				setAvail('') ;
				addNotif('Successfully Received Consultation Appointment', 'success') ;
			}) 
			.catch( err  => {
				console.log(err) ; 
				addNotif('Error Creating Appointment' , 'error') ;
			}) ;
		}
		else
		{	
			fetch('https://psy-api.herokuapp.com/consult/check',{
				method : 'post' ,
				headers : { 'Content-Type' : 'application/json' ,
							'Authorization' : 'Bearer ' + token} ,
				body : JSON.stringify({date, reason: data.reason, title: data.title}) ,
			})
			.then(res => {
				if(res.ok)
					return res.json() ;
				else
					throw Error(res.statusText) ;
			})
			.then(data => {
				if(data === 'Available')
				{	setAvail('yes');
					addNotif('Appointment Available', 'success') ;
				}	
				else
					throw new Error('Appointment Unavailable') ;
			}) 
			.catch( err  => {
				setError('Unavailable, for negotiation Call +91-9555235231');
				addNotif(err.message, 'error') ;
			}) ;
		}
	}

	const filterDates = (date) => {
    	const day = date.getDay();
    	return day !== 0 ;
	}

	const onDateChange = (date) => {
		if(date.getDay() === 6) {
			setMinTime(8) ;
			setMaxTime(13) ;
		}
		else {
			setMinTime(17) ;
			setMaxTime(19) ;
		}
		setDate(date) ;
		setError('') ;
	}

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

	const onInputChange = (event) => {
		setData({ ...data, [event.target.name] : event.target.value}) ;
		setError('') ;
	}

	const checkPayment = () => {
		const {reason, title} = data ;

		if(payment)
			return (
				<div className="blue-bg">
					<LoginForm title=" Schedule " error={error} >
						<Text label="Title" value={title} onChange={onInputChange} />
						<TextArea label="Consultation&nbsp;&nbsp; Reason" value={reason} r={4} c={20} onChange={onInputChange} />
						<div className="date-cont">
							<label className="lbel">Select Date&nbsp; : </label>
							<DatePicker selected={date} onChange={onDateChange}
						      showTimeSelect timeFormat="HH:mm" timeIntervals={30} 
						      filterDate={filterDates} minDate={returnTomorrow()}
						      minTime={returnTime(minTime)} maxTime={returnTime(maxTime)}
						      timeCaption="Time" dateFormat="MMMM d, yyyy h:mm aa" />
					    </div>
					</LoginForm>	<br/>
					<button onClick={onScheduleClick} className="sched-btn">
					 { avail==='yes'?'Confirm Appointment!':'Check Availablity !' } 
					</button> 
				</div>
			) ;
		else 
			return <Payment cost={coupon_amount[coupon]} token={token} display={displayRazorpay} change={() => setPayment(true)} couponChange={changeCoupon} type='appoint'/> ;
	}	

	const checkLogin = () => {

		if(user.name)
			return checkPayment() ;
		else
			return (
				<div className="blue-bg blue-form">
					<p> You need to 
						<Link to="/login" className="btn3"> Login </Link>
						 or 
						<Link to="/register" className="btn3"> Register </Link> 
						 to book an Appointment 
					</p>
				</div>
		) ; 
	}

	return(
		<div>
			<Title name = 'Personal Consultation' items={["Home -"," Programs -", "Consult"]}/>
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
			<DisplayDetailed title="Features" lidata={features} />
			<Heading text="Counselling Given By" />
			<p className="intro"><span className="brand"> Mr. Ashish Aggarwal</span><br/>
				M.Sc. (Applied Psychology) <br/> PG Diploma in Guidance & Counselling <br/>
				D. Pharmacy </p>
			<Heading text="Venue" />
			<p className="intro"> Unit No. 4 , First Floor , CSC , Pocket B & C , Phase - 4 ,
				 Ashok Vihar , Delhi - 110052. </p>
			<Heading text="Counselling Domains" /> <br/>
			<DisplayDetailed title="Personality Appraisal Counselling" small="yes" lidata={pData} />
			<DisplayDetailed title="Post Trauma Counselling" small="yes" lidata={ptData} />
			<DisplayDetailed title="Metamorphosis Counselling" small="yes" lidata={mData} />
			<Heading text="Schedule Your Appointment" />
			{ checkLogin() }
			<p className="intro bold support"> Having Technical issues? <a className="sched-btn" href="mailto:myarth.tech@gmail.com" target="_blank" rel="noopener noreferrer"> Contact Technical Support </a>
			</p>
		</div>
	) ;
}

export default Personal ;