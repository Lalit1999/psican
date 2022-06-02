import {useState, useEffect, useContext} from 'react' ;

import { addNotif} from '../notif.js' ;
import Text from '../basicform/inputs/Text.js' ;
import {UserContext} from '../../context/UserContext.js' ;

import logo from '../../images/Psyment.webp' ;
import './payment.css' ;

const inputData = {
	name: 'coupon',
	id: 'paymentCoupon',
	label: "Do you have a Coupon Code?",
}

const payData = {
	appoint : {
		couponAmount : {
		    noPayment: 1000,
		    fullPayment: 0,
		    quarterPayment: 250,
		    halfPayment: 500,
		    threeQuarter: 750,
		},
		checkUrl: "https://api.psyment.com/appoint-payment",
		gatewayDescr: "Psyment Appointment Booking",
		successUrl: "https://api.psyment.com/appoint-payment/success",
	},
	ustop : {
		couponAmount : {
		    noPayment: 500,
		    fullPayment: 0,
		    quarterPayment: 125,
		    halfPayment: 250,
		    threeQuarter: 375,
		},
		checkUrl: "https://api.psyment.com/ustop-payment",
		gatewayDescr: "Psyment USTOP Test",
		successUrl: "https://api.psyment.com/ustop-payment/success",
	},
	accis: {
		couponAmount : {
		    noPayment: 200,
		    fullPayment: 0,
		    quarterPayment: 50,
		    halfPayment: 100,
		    threeQuarter: 150,
		},
		checkUrl: "https://api.psyment.com/accis-payment",
		gatewayDescr: "Psyment ACCIS Test",
		successUrl: "https://api.psyment.com/accis-payment/success",
	},
	leta: {
		couponAmount : {
		    noPayment: 250,
		    fullPayment: 0,
		    quarterPayment: 65,
		    halfPayment: 125,
		    threeQuarter: 185,
		},
		checkUrl: "https://api.psyment.com/leta-payment",
		gatewayDescr: "Psyment LETA Test",
		successUrl: "https://api.psyment.com/leta-payment/success",
	},
	nhapass: {
		couponAmount : {
		    noPayment: 500,
		    fullPayment: 0,
		    quarterPayment: 125,
		    halfPayment: 250,
		    threeQuarter: 375,
		},
		checkUrl: "https://api.psyment.com/nhapass-payment",
		gatewayDescr: "Psyment NHAPASS Test",
		successUrl: "https://api.psyment.com/nhapass-payment/success",
	}
}

const Payment = ({success, type}) => {
	const {user, token} = useContext(UserContext) ;
	const [coupon, setCoupon] = useState('') ;
	const [status, setStatus] = useState('noPayment') ;
	const [cost, setCost] = useState(0) ;
	const [currentData, setCurrentData] = useState({}) ;

	useEffect( () => setCurrentData(payData[type]) ,[type])
	useEffect( () => setCost(payData[type].couponAmount[status]) ,[type, status])

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
		try {
	    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

	    if (!res) {
	        alert("Payment Gateway failed to load");
	        return;
	    }

	    let result = await fetch(currentData.checkUrl, {
			method : 'post' ,
			headers : { 'Content-Type' : 'application/json',
						'Authorization' : `Bearer ${token}`
					  } ,
			body : JSON.stringify({ coupon: status }) 
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
	        description: `${currentData.gatewayDescr} for ${user.name}`,
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

	            let result2 = await fetch(currentData.successUrl, {
					method : 'post' ,
					headers : { 'Content-Type' : 'application/json',
								'Authorization' : `Bearer ${token}`} ,
					body: JSON.stringify(data) ,
				});

				if(result2.ok)
			    	result2 =  await result2.json() ;

	            success() ;
	        },
	        prefill: {
	            name: user.name,
	            email: user.email,
	            contact: user.mobile,
	        },
	        notes: {
	            address: `${user.name} ${user.mobile} ${user.email}` ,
	        },
	        theme: {
	            color: "#61dafb",
	        },
	    };

	    const paymentObject = new window.Razorpay(options);
	    paymentObject.open();
		}
		catch (e) {
			console.log(e) ;
		}
	}

	const onInputChange = (event) => setCoupon(event.target.value)

	const checkCoupon = () => {
		
		fetch(`https://api.psyment.com/coupon?coupon=${coupon}&type=${type}`, {
			method : 'get' ,
			headers : { 'Content-Type' : 'application/json',
						'Authorization' : `Bearer ${token}` } ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			throw Error(res.statusText) ;
		})
		.then(data =>{	
			if(data === 'fullPayment') {
				addNotif('Coupon Applied Successfully', 'success') ;
				success() ;
			}
			else
			{	if(data === 'noPayment')
					addNotif('Coupon Invalid or already used', 'error') ;
				else
					addNotif('Coupon Applied Successfully', 'success') ;
				setStatus(data) ;
			}	
			
		})  
		.catch( err  => {
			addNotif('Coupon Code Not Found', 'error') ;
			console.log(err.message) 
		}) ;
	}

	return(			
		<div className="payment">
			<div className="payment-left">
				<p>Cost to be paid :  {cost}</p>
				<button className='sched-btn' onClick={displayRazorpay}>Make Payment</button>
			</div>
			<div className="payment-right">
				<Text data={inputData} value={coupon} onInputChange={onInputChange}/>
				<button className='sched-btn' onClick={checkCoupon}>Apply Coupon</button>
			</div>
		</div>
	) ;
}

export default Payment ;