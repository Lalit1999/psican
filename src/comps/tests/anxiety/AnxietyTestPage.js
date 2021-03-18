import React from 'react' ;

import Title from '../../title/Title.js' ;
import SAAT from './SAAT.js' ;
import '../../program/program.css' ;
import Payment from '../payment/Payment.js' ;

import logo from '../../images/Psyment.webp' ;

class AnxietyTestPage extends React.Component {

	loadScript = (src) => {
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

	displayRazorpay = async () => {
		const {user, token} = this.props ;
	   
	    const res = await this.loadScript("https://checkout.razorpay.com/v1/checkout.js");

	    if (!res) {
	        alert("Payment Gateway failed to load");
	        return;
	    }

	    let result = await fetch("http://localhost:8000/saat-payment", {
			method : 'post' ,
			headers : { 'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '+ token
					  } ,
		});

	    if (!result) {
	        alert("Server Error");
	        return;
	    }
	    if(result.ok)
	    	result =  await result.json() ;

	    const { amount, id: order_id, currency } = result;

	    const options = {
	        key: "rzp_live_7U3eAyAgr3NCgu", // Enter the Key ID generated from the Dashboard
	        amount: amount.toString(),
	        currency: currency,
	        name: user.name,
	        description: "SAAT Test for "+user.name,
	        image: { logo },
	        order_id: order_id,
	        handler: async function (response) {
	            const data = {
	                orderCreationId: order_id,
	                razorpayPaymentId: response.razorpay_payment_id,
	                razorpayOrderId: response.razorpay_order_id,
	                razorpaySignature: response.razorpay_signature,
	            };

	            let result2 = await fetch("http://localhost:8000/saat-payment/success", {
					method : 'post' ,
					headers : { 'Content-Type' : 'application/json',
								'Authorization' : 'Bearer '+ token
						} ,
					body: JSON.stringify(data) ,
				});

				if(result2.ok)
			    	result2 =  await result2.json() ;
				// console.log(result2) ;

				// iski jagah successful payment ka setState lagana hai
				// herokuapp ki link change karni hai 
				// check bhi karna hai
	            console.log(result2.msg);
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

	render() {
		const {user, token} = this.props ;
		return(
			<div> 
				<Title name = 'Self Anxiety Assessment Test (SAAT)' items={["Home -","Test -","SAAT"]}/>
				<p className="intro">Anxiety is defined as an emotional state characterised by feeling of tension, worrysome thoughts and bodily changes. Anxiety can impact an individual's well being, performance and responses.</p>
				<p className="intro">The following questionnaire is aimed at helping an individual express and understand his\her anxiety with the help of a mental health professional.</p>
				<p className="intro bold"> DISCLAIMER : The present assessment is a non-standard attempt to provide a basic understanding and interpretation of an individual's state of anxiety.<br/>The observations and findings of this test may be corelated to observed and presented symptoms by a mental health professional.</p>
				<SAAT user={user} token={token}/>
				<Payment cost={500} display={this.displayRazorpay}/>
			</div>
		) ;
	}
}

export default AnxietyTestPage ;