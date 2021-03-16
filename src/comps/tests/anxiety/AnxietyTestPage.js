import React from 'react' ;

import Title from '../../title/Title.js' ;
import SAAT from './SAAT.js' ;
import '../../program/program.css' ;
import Payment from '../payment/Payment.js' ;

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

//Isko theek karna hai

async function displayRazorpay() {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
        alert("Razorpay SDK failed to load.");
        return;
    }

    const result = await axios.post("http://localhost:5000/payment/orders");

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
        key: "rzp_test_r6FiJfddJh76SI", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Soumya Corp.",
        description: "Test Transaction",
        image: { logo },
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
            };

            const result = await axios.post("http://localhost:5000/payment/success", data);

            alert(result.data.msg);
        },
        prefill: {
            name: "Soumya Dey",
            email: "SoumyaDey@example.com",
            contact: "9999999999",
        },
        notes: {
            address: "Soumya Dey Corporate Office",
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}

const AnxietyTestPage = () => {
	return(
		<div> 
			<Title name = 'Self Anxiety Assessment Test (SAAT)' items={["Home -","Test -","SAAT"]}/>
			<p className="intro">Anxiety is defined as an emotional state characterised by feeling of tension, worrysome thoughts and bodily changes. Anxiety can impact an individual's well being, performance and responses.</p>
			<p className="intro">The following questionnaire is aimed at helping an individual express and understand his\her anxiety with the help of a mental health professional.</p>
			<p className="intro bold"> DISCLAIMER : The present assessment is a non-standard attempt to provide a basic understanding and interpretation of an individual's state of anxiety.<br/>The observations and findings of this test may be corelated to observed and presented symptoms by a mental health professional.</p>
			<SAAT user={this.props.user} token={this.props.token}/>
			<Payment cost={500}/>
		</div>
	) ;
}

export default AnxietyTestPage ;