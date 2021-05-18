import React,{useState} from 'react' ;

import { addNotif } from '../../notif.js' ;
import Text from '../../signup/text/Text.js' ;
import './payment.css' ;

const Payment = ({cost, token, display, change, couponChange, type}) => {

	const [coupon, setCoupon] = useState('') ;

	const onInputChange = (event) => {
		setCoupon(event.target.value) ;
	}

	const checkCoupon = () => {
		
		fetch(`https://psy-api.herokuapp.com/coupon?coupon=${coupon}&type=${type}`, {
			method : 'get' ,
			headers : { 'Content-Type' : 'application/json',
						'Authorization' : `Bearer ${token}`
					  } ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			else
				throw Error(res.statusText) ;
		})
		.then(data =>{	
			couponChange(data) ;
			// console.log(data) ;
		})  
		.catch( err  => {
			addNotif('Coupon Code Not Found', 'error') ;
			console.log(err.message) 
		}) ;
	}

	const returnH3 = () => {
		if(type === 'saat')
			return	<h3> Self Anxiety Assessment Test (SAAT) </h3> ;
		else if(type === 'appoint') 
			return	<h3> Book your Appointment</h3> ;
	}

	return(			
		<div className="test-box">
			{returnH3()}
			<div className="payment">
				<div className="payment-left">
					<p>Cost to be paid :  {cost}</p>
					<button className='sched-btn' onClick={display}>Make Payment</button>
				</div>
				<div className="payment-center">
					<div className="OR-up">
						<div className="OR-left"></div>
						<div className="OR-right"></div>
					</div>
					<div className="OR">OR</div>
					<div className="OR-up">
						<div className="OR-left"></div>
						<div className="OR-right"></div>
					</div>
				</div>
				<div className="payment-right">
					<Text label="Coupon Code" name="coupon" value={coupon} onChange={onInputChange}/>
					<button className='sched-btn' onClick={checkCoupon}>Apply Coupon</button>
				</div>
			</div>
		</div>
	) ;
}

export default Payment ;