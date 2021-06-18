import React, {useState, useEffect } from 'react' ;
import {Link} from 'react-router-dom' ;

import RadioSet from '../radioset/RadioSet.js' ;
import Payment from '../payment/Payment.js' ;

import logo from '../../images/Psyment.webp' ;
import { addNotif } from '../../notif.js' ;
import { inst, subData, quesData, resultData } from './langData.js' ;
import { ttpQues } from './queData.js' ;
import './ttp.css' ;

const coupon_amount = {
    noPayment: 100,
    fullPayment: 0,
    quarterPayment: 25,
    halfPayment: 50,
    threeQuarter: 75,
}

let ansf = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,] ;
let ansm = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,] ;

const Question2 = ({lang, changeMode}) => {	

	const [warning, setWarning] = useState('') ;
	const [ans, setAns] = useState({f: -1, m: -1}) ;
	const [num, setNum] = useState(0) ;
	const [checkf, setCheckf] = useState([false, false, false, false, false, false]) ;
	const [checkm, setCheckm] = useState([false, false, false, false, false, false]) ;

	useEffect(	() => {
		if(ansf[0] !== -1)
		{	let arrf = [false, false, false, false, false, false] ;
			let arrm = [false, false, false, false, false, false] ;
			arrf[5-ansf[0]/2] = true ;
			arrm[5-ansm[0]/2] = true ;
			let obj = {f: 5-ansf[0]/2, m: 5-ansm[0]/2}
			setAns(obj) ;
			setCheckf(arrf) ;
			setCheckm(arrm) ;
		}
	}, []) ;

	const changeAnswer = (num, str) => {
		const {f, m} = ans ;
		let obj = {f, m} ;
		obj[str] = num ;
		setWarning('') ;
		setAns(obj) ;
	}

	const changeArray = (arr, str) => {
		if(str === 'f')
			setCheckf(arr) ;
		else if(str === 'm')
			setCheckm(arr) ; 
	}

	const checkWarning = () => {
		if (warning.length > 0)
			return <p className="warn"> {warning} </p> ;
		else
			return null ;
	}

	const onNextClick = () => {
		if( ans.f !== -1 && ans.m !== -1) 
		{	let arrf = [false, false, false, false, false, false] ;
			let arrm = [false, false, false, false, false, false] ;
			ansf[num]= (5-ans.f)*2 ;
			ansm[num]= (5-ans.m)*2 ;
			if(ttpQues[num+1])
			{	
				if(ansf[num+1] !== -1)
				{	arrf[5-ansf[num+1]/2] = true ;
					arrm[5-ansm[num+1]/2] = true ;
					setNum(num+1) ;
					setCheckf(arrf) ;
					setCheckm(arrm) ;
				}
				else
				{	setNum(num+1) ;
					setCheckf(arrf) ;
					setCheckm(arrm) ;
					setAns({f: -1, m: -1}) ;
				}
			}				
			else
				changeMode('confirm') ;
		}
		else
			setWarning(quesData.error[lang]) ;
	}

	const onPrevClick = () => {
		// Converting 10, 8, 6 etc into 0, 1, 2
		// console.log(5-ansf[num-1]/2, 5-ansm[num-1]/2) ;
		
		let arrf = [false, false, false, false, false, false] ;
		let arrm = [false, false, false, false, false, false] ;
		arrf[5-ansf[num-1]/2] = true ;
		arrm[5-ansm[num-1]/2] = true ;
		let obj = {f: 5-ansf[num-1]/2, m: 5-ansm[num-1]/2}

		setNum(num-1) ;
		setCheckf(arrf) ;
		setCheckm(arrm) ;
		setAns(obj) ; 
	}

	return (
		<div className="question2"> 
			<p> {parseInt(num,10) + 1}. &nbsp; {quesData.pre[lang]} &nbsp;&nbsp;
				<span className="ques-color">{ttpQues[num][lang]} 
			</span></p>
			<div className="radio-con ttp-radio-con">
				<div> <strong>{quesData.father[lang]}:</strong> 
					<RadioSet lang={lang} name={'f'} changeAnswer={changeAnswer} change={changeArray} num={num} check={checkf}/> 
				</div>
				<div> <strong>{quesData.mother[lang]}:</strong>
				 	<RadioSet lang={lang} name={'m'} changeAnswer={changeAnswer} change={changeArray} num={num} check={checkm}/> 
				 </div>
			</div>
			<div className="next-btn-con">
				{	(num===0)?null:<button className="sched-btn next-btn" onClick={onPrevClick}>
				 					&lt;&nbsp;{quesData.prevBtn[lang]} </button>
				} 
				<button className="sched-btn next-btn ttp-btn" onClick={onNextClick}>
				 {quesData.nextBtn[lang]}&nbsp;&gt; </button>
			</div>
			{ checkWarning() }
			<h4> {quesData.note[lang]} </h4>
		</div> 
	) ;
}

const LETA = ({token, user}) => {
	
	const [mode, setMode] = useState('start') ;
	const [lang, setLang] = useState('english') ;
	const [checked, setChecked] = useState([true, false]) ;
	const [payment, setPayment] = useState(false) ;
	const [coupon, setCoupon] = useState('noPayment') ;

	useEffect( () => {
		
		fetch("https://psy-api.herokuapp.com/leta-payment/check", {
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

		return(	() => {
					ansf = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
						 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
						 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,] ;
					ansm = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
						 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
						 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,] ;
				}
		) ;
	}, []) ;

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

	    let result = await fetch("https://psy-api.herokuapp.com/leta-payment", {
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
	        description: "LETA Test for "+user.name,
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

	            let result2 = await fetch("https://psy-api.herokuapp.com/leta-payment/success", {
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
	
	const calculateScore = () => ansf.map( (x ,i) => (x+ansm[i])/4) 

	const checkMode = () => {
		switch(mode)
		{	
			case 'start' : return (
								<div className="start-div">
									<h2 className="start-title"> {inst.head[lang]} </h2>
									<ul>
										<li>{inst.l1[lang]}</li>
										<li>{inst.l2[lang]}</li>
										<li>{inst.l3[lang]}</li>
										<li>{inst.l4[lang]}</li>
										<li>{inst.l5[lang]}</li>
										<li>{inst.l6[lang]}</li>
									</ul>
									<div className="start-btn-con">
										<button className="sched-btn" onClick={() => setMode('test')}> {inst.btnText[lang]} </button>
									</div>
								</div> 
							) ;					
			case 'test' : return <Question2 changeMode={setMode} lang={lang}/> ;						
			case 'finish' : let total = calculateScore() ;
							let obj2 = {
								test: 'leta',
								result: {	ans: total, ansf, ansm,
											t: ansf.reduce((x,y)=>x+y) + ansm.reduce((x,y)=>x+y)
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
									<p> {resultData.p1[lang]} </p>
									<div> {getEvaluation(total)} </div>
									<p> {resultData.p2[lang]} <br/>
										{resultData.p3[lang]} </p>
								</div>
							) ;
			case 'confirm' : return (
								<div className="question">
									<p>{subData.subNote[lang]}</p>
									<div className="next-btn-con proceed-con">
										<button className="sched-btn" onClick={()=> setMode('test') }>{subData.revBtn[lang]} </button>
										<button className="sched-btn" onClick={()=> setMode('finish') }>{subData.subBtn[lang]}</button>
									</div>
								</div>   
							) ;
			default: return <div>{subData.error[lang]} </div> ;
		}
	}

	const getEvaluation = (total) => {
		return total.map( (one, i) => {
			return(
				<div key={i} className="result-row">
					<p className="res-sno">{i+1}.</p>
					<p className="res-ques">{ttpQues[i][lang]}</p>
					<p className="res-res">{one}</p>
					<p className="res-lvl">{returnLevel(one)}</p>
				</div>
			) ;
		} ) ;
	}

	const returnLevel = (score) => {
		if (score > 3)
		{	if(score > 4)
				return resultData.vh[lang] ;
			else
				return resultData.hi[lang] ;
		}
		else
		{	if(score > 2)
				return resultData.mod[lang] ;
			else
				if(score > 1)
					return resultData.lo[lang] ;
				else
					return resultData.vl[lang] ;					
		}
	}

	const checkPayment = () => {
		if(payment)
			return (
			<div  className="test-box">
				<h3> Learning Environment Trait Assessment (LETA) </h3> 
				<div className="lang-con"> Change Language: 
					<input type="radio" id={0} name={'lang'} checked={checked[0]} onChange={() => { setChecked([true, false]) ; setLang('english') ; } }/> English 
					<input type="radio" id={1} name={'lang'} checked={checked[1]} onChange={() => { setChecked([false, true]) ; setLang('hindi') ; } }/> हिन्दी 
				</div>
				{checkMode()}
			</div>
		) ;

		else 
			return <Payment cost={coupon_amount[coupon]} token={token} display={displayRazorpay} change={() => setPayment(true)} couponChange={changeCoupon} type='leta'/> ;
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

export default LETA ;