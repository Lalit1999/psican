// import { useContext } from 'react' ;

// import { addNotif } from '../notif.js' ;

import logo from '../../images/Psyment.webp' ;
import './payment.css' ;

const Payment = ({success, user, price, receipt, title }) => {

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

	    // let result = await fetch("http://localhost:3001/app-payment", {
	    let result = await fetch("https://api.psyment.com/app-payment", {
			method : 'post' ,
			headers : { 'Content-Type' : 'application/json' } ,
			body : JSON.stringify({ amount: price*100, receipt }), 
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
	        description: `${title} from psyment app`,
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

	            let result2 = await fetch("https://api.psyment.com/app-payment/success", {
					method : 'post' ,
					headers : { 'Content-Type' : 'application/json' } ,
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
	            color: "#319B54",
	        },
	    };

	    const paymentObject = new window.Razorpay(options);
	    paymentObject.open();
		}
		catch (e) {
			console.log(e) ;
		}
	}

	return(			
		<div className="payment payment2">
			<button className='sched-btn' onClick={displayRazorpay}>Make Payment</button>
		</div>
	) ;
}

export default Payment ;