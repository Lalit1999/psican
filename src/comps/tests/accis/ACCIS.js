import React, {useState, useEffect} from 'react' ;
import {Link} from 'react-router-dom' ;

import { addNotif } from '../../notif.js' ;
import Payment from '../payment/Payment.js' ;
import AccisQuestion from './AccisQuestion.js' ;

import {inst, subData, resultData, evalData } from './langdata.js' ;
import logo from '../../images/Psyment.webp' ;

import './accis.css' ;

let ans = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
		 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,] ;

const coupon_amount = {
    noPayment: 200,
    fullPayment: 0,
    quarterPayment: 50,
    halfPayment: 100,
    threeQuarter: 150,
}

const EvalDisplay = ({stage, type, lang}) => {
	return (
		<React.Fragment>
			{evalData.you[lang]} 
			<span className={"eval "+type}>{evalData[stage].l1[lang]}</span>
			{evalData[stage].l2[lang]}
			{ 	(stage !== 'stage1')?
				<ul> {evalData.sugg[lang]}:
					<li> {evalData[stage].s1[lang]} </li>
					<li> {evalData[stage].s2[lang]} </li>
				</ul>:null 
			}
		</React.Fragment>
	) ;
}

const ACCIS = ({user, token}) => {
	const [mode, setMode] = useState('start') ;
	const [lang, setLang] = useState('english') ;
	const [payment, setPayment] = useState(false) ;
	const [coupon, setCoupon] = useState('noPayment') ;

	useEffect( () => {
		fetch("https://psy-api.herokuapp.com/accis-payment/check", {
			method : 'get' ,
			headers : { 'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '+ token
					  } ,
		}) 
		.then(res => {
			if(res.ok)
				return res.json() ;
			else
				throw Error(res.statusText) ;
		})
		.then(data => setPayment(data.answer))  
		.catch(err => console.log(err, err.message) ) ;

		return (() =>{
			ans = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
				 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
				 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,] ;
		}) ;
	}, [] ) ;

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

	    let result = await fetch("https://psy-api.herokuapp.com/accis-payment", {
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
	        description: "SAAT Test for "+user.name,
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

	            let result2 = await fetch("https://psy-api.herokuapp.com/accis-payment/success", {
					method : 'post' ,
					headers : { 'Content-Type' : 'application/json',
								'Authorization' : 'Bearer '+ token
						} ,
					body: JSON.stringify(data) ,
				});

				if(result2.ok)
			    	result2 =  await result2.json() ;

	            setPayment(true) ;
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

	const checkMode = () => {
		switch(mode)
		{	case 'start' : return (
							<div className="start-div">
								<h2 className="start-title"> {inst.head[lang]} </h2>
								<ul>
									<li>{inst.l1[lang]}</li>
									<li>{inst.l2[lang]}</li>
									<li>{inst.l3[lang]}</li>
									<li>{inst.l4[lang]}</li>
									<li>{inst.l5[lang]}</li>
								</ul>
								<div className="start-btn-con">
									<button className="sched-btn" onClick={() => setMode('test')}>{inst.btnText[lang]} </button>
								</div>
							</div> 
						);

		case 'test' : return <AccisQuestion changeMode={setMode} lang={lang} ans={ans}/> ;

		case 'finish' : let obj2 = {
							test: 'accis',
							result: {
								answers: ans,
								t: ans.reduce((a,b)=>a+b),
							}
						} ;
						
						fetch('https://psy-api.herokuapp.com/test',{
							method : 'post' ,
							headers : { 'Content-Type' : 'application/json' ,
										'Authorization' : 'Bearer ' + token} ,
							body : JSON.stringify(obj2) ,
						})
						.then(res => {
							if(res.ok)
								return res.json() ;
							else
								throw Error(res.statusText) ;
						})
						.catch( err  => {
							console.log(err) ; 
							addNotif(err.message, 'error') ;
						}) ;
						return (
							<div className="question result"> 
								<p> {resultData.score[lang]} : {obj2.result.t} </p> 
								<p> {getEvaluation(obj2.result.t)} </p>
								<hr/>
								<p> {resultData.accisKey[lang]} </p>
								<p> <span className="evalNumber"> 0-30 </span> : <span className="low">{resultData.l1[lang]}</span> <br/>
									<span className="evalNumber"> 31-60 </span> : <span className="mild">{resultData.l2[lang]}</span> <br/>
									<span className="evalNumber"> 61-90 </span> : <span className="moderate">{resultData.l3[lang]}</span> <br/>
									<span className="evalNumber"> 91-120 </span> : <span className="high">{resultData.l4[lang]}</span> <br/>
								</p>
								<hr/>
								<p> {resultData.p1[lang]} </p>
								<p> {resultData.p2[lang]} <br/>
									{resultData.p3[lang]} </p>
							</div>
						) ;

		case 'confirm': return (
							<div className="question">
								<p>{subData.subNote[lang]}</p>
								<div className="next-btn-con proceed-con">
									<button className="sched-btn" onClick={()=>setMode('test')}>{subData.revBtn[lang]} </button>
									<button className="sched-btn" onClick={()=>setMode('finish')}>{subData.subBtn[lang]}</button>
								</div>
							</div>   
						) ;

		default: return <div>{subData.error[lang]} </div> ;
		}
	}

	const getEvaluation = (t) => {
		if(t <= 60)
		{	if( t <= 30)
				return <EvalDisplay stage="stage1" type="low" lang={lang}/> ; 
			else
				return <EvalDisplay stage="stage2" type="mild" lang={lang}/> ; 
		}
		else
		{	if(t <= 90)
				return <EvalDisplay stage="stage3" type="moderate" lang={lang}/> ; 
			else
				return <EvalDisplay stage="stage4" type="high" lang={lang}/> ; 
		} 
	}

	const checkPayment = () => {
		if(payment)
			return (
				<div className="test-box">
					<h3> Assessment of COVID Cognitive Impact on Self (ACCIS) </h3> 
					<div className="lang-con"> Change Language: 
						<input type="radio" id={0} name={'lang'} checked={lang==='english'} onChange={() => setLang('english') }/> English 
						<input type="radio" id={1} name={'lang'} checked={lang==='hindi'} onChange={() => setLang('hindi') }/> हिन्दी 
					</div>
					{checkMode()}
				</div>
			) ;
		else 
			return <Payment cost={coupon_amount[coupon]} token={token} display={displayRazorpay} change={() => setPayment(true)} couponChange={changeCoupon} type='accis'/> ;
	}

	if(token === "")
		return (
			<div className="blue-bg blue-form">
				<p> You need to 
					<Link to="/login" className="btn3"> Login </Link>
					 or 
					<Link to="/register" className="btn3"> Register </Link> 
					to take this test (you will be redirected to home page) 
				</p>
			</div>
		) ; 
	else
		return checkPayment() ;
}

export default ACCIS ;