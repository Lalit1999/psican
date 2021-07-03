import React, {useState, useEffect} from 'react' ;
import {Link} from 'react-router-dom' ;

import { addNotif } from '../../notif.js' ;
import './saat.css' ;
import Payment from '../payment/Payment.js' ;

import logo from '../../images/Psyment.webp' ;
import {inst, quesData, subData, resultData, evalData} from './langdata.js' ;
import {radioData} from './radioData.js' ;
import {saatQues} from './queData.js' ;

const coupon_amount = {
    noPayment: 500,
    fullPayment: 0,
    quarterPayment: 125,
    halfPayment: 250,
    threeQuarter: 375,
}

let ans = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,] ;

const Question = ({lang, changeMode}) => {
	const [checked, setChecked] = useState([false, false, false, false, false]) ;
	const [warning, setWarning] = useState('') ;	
	const [num, setNum] = useState(0) ;	

	useEffect(() => {
		if(ans[0] !== 0)
		{	let arr = [false, false, false, false, false] ;
			arr[ans[0]- 1] = true ;
			setChecked(arr) ;
		}
	}, []) ;

	const checkWarning = () => {
		if (warning.length > 0)
			return <p className="warn"> {warning} </p> ;
	}

	const generateRadioBtn = (x) => {
		return radioData.map( (one,i) => <div className="radio-div" key={i}> <input type="radio" id={i} name={one[lang]} checked={checked[i]} onChange={()=>onRadioClick(x, i)}/> {one[lang]} </div>)
	}

	const onRadioClick = (no, opt) => {
		const tempArr = [false, false, false, false, false] ;
		tempArr[opt] = true ;
		setChecked(tempArr) ;
		setWarning('');
	}

	const onNextClick = () => {
		if( checked[0] || checked[1] || checked[2] || checked[3] || checked[4] )
		{	let arr = [false, false, false, false, false] ;
			if(checked[0] || checked[1])
			{	if(checked[0])
					ans[num] = 1 ;
				else
					ans[num] = 2 ; 
			}
			else
			{	if(checked[3] || checked[4])
					if(checked[3])
						ans[num] = 4 ;
					else
						ans[num] = 5 ;
				else
					ans[num] = 3 ;
			}	
			if(saatQues[num+1])
			{	if(saatQues[num+1][lang] !== 0)
					arr[ans[num+1]- 1] = true ;
				setNum(num+1);
				setChecked(arr) ;
			}				
			else
				changeMode('confirm') ;
		}
		else
			setWarning(quesData.error[lang]) ;
	}

	const onPrevClick = () => {
		let arr = [false, false, false, false, false] ;
		arr[ans[num-1]- 1] = true ;
		setNum(num-1) ;
		setChecked(arr) ;
	}

	return (
		<div className="question"> 
			<p> {parseInt(num,10) + 1}. &nbsp; {saatQues[num][lang]} </p>
			<div className="radio-con"> 
				{generateRadioBtn(num)}
			</div>
			<div className="next-btn-con">
				{	(num===0)?null:<button className="sched-btn next-btn" onClick={onPrevClick}>
				 					&lt;&nbsp;{quesData.prevBtn[lang]} </button>
				} 
				<button className="sched-btn next-btn" onClick={onNextClick}>
				 {quesData.nextBtn[lang]}&nbsp;&gt; </button>
			</div>
			{ checkWarning() }
			<h4> {quesData.note[lang]} </h4>
		</div> 
	) ;
}

const EvalDisplay = (stage, type, lang) => {
	return (
		<React.Fragment>
			{evalData[stage].l1[lang]} 
			<span className={"eval "+type}>{evalData[stage].l2[lang]}</span>
			{evalData[stage].l3[lang]} <br/><br/>
			{evalData[stage].l4[lang]}
		</React.Fragment>
	) ;
}


const SAAT = ({token, user}) => {
	const [mode, setMode] = useState('start') ;
	const [lang, setLang] = useState('english') ;
	const [payment, setPayment] = useState(false) ;
	const [coupon, setCoupon] = useState('noPayment') ;

	useEffect( () => {
		fetch("https://psy-api.herokuapp.com/saat-payment/check", {
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
			ans = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
				 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,] ;
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

	    let result = await fetch("https://psy-api.herokuapp.com/saat-payment", {
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

	            let result2 = await fetch("https://psy-api.herokuapp.com/saat-payment/success", {
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

	const calculateScore = (type) => {
		switch(type)
		{	case 's' : return Math.floor((ans.slice(0, 30).reduce((x,y)=>x+y) - 30)/3);
			case 'a' : return ans.slice(30, 40).reduce((x,y)=>x+y) - 10 ;
			case 'e' : return ans.slice(40).reduce((x,y)=>x+y) - 10 ;
			case 't' : return Math.floor((ans.slice(0, 30).reduce((x,y)=>x+y) - 30)/3 + ans.slice(30).reduce((x,y)=>x+y) - 20) ;
			default : return null ;
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
		case 'test' : return <Question changeMode={setMode} lang={lang}/> ;
		case 'finish' : let S = calculateScore('s') ;
						let A = calculateScore('a') ;
						let E = calculateScore('e') ;
						let T = calculateScore('t') ;
						let obj2 = {
							test: 'saat',
							result: {
								s: S, a: A, e:E, t:T,
								answers: ans 
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
								<p> {resultData.sScore[lang]} : {S} </p> 
								<p> {resultData.aScore[lang]} : {A} </p> 
								<p> {resultData.eScore[lang]} : {E} </p> 
								<p> {resultData.tScore[lang]} : {T} </p> 
								<p> {getEvaluation(T)} </p>
								<p> {resultData.p1[lang]} </p>
								<p> {resultData.p2[lang]} <br/>
									{resultData.p3[lang]} </p>
							</div>
						) ;
		case 'confirm' : return (
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
					<h3> Understanding Self Through Observed Perceptions (USTOP) </h3> 
					<div className="lang-con"> Change Language: 
						<input type="radio" id={0} name={'lang'} checked={lang==='english'} onChange={() => setLang('english') } /> English 
						<input type="radio" id={1} name={'lang'} checked={lang==='hindi'} onChange={() => setLang('hindi') }/> हिन्दी 
					</div>
					{checkMode()}
				</div>
			) ;
		else 
			return <Payment cost={coupon_amount[coupon]} token={token} display={displayRazorpay} change={() => setPayment(true)} couponChange={changeCoupon} type='ustop'/> ;
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

export default SAAT ;