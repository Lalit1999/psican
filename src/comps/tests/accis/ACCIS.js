import React, {useState} from 'react' ;
import {Link} from 'react-router-dom' ;

import { addNotif } from '../../notif.js' ;
import Payment from '../payment/Payment.js' ;
import AccisQuestion from './AccisQuestion.js' ;

import {inst, quesData, subData } from './langdata.js' ;
import logo from '../../images/Psyment.webp' ;

const ACCIS = ({user, token}) => {
	const [mode, setMode] = useState('start') ;
	const [lang, setLang] = useState('english') ;
	const [payment, setPayment] = useState(false) ;
	const [coupon, setCoupon] = useState('noPayment') ;

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
		case 'test' : return <AccisQuestion changeMode={setMode} lang={lang}/> ;
		case 'finish' : return null ;
						// let obj2 = {
						// 	test: 'accis',
						// } ;
						
						// fetch('https://psy-api.herokuapp.com/test',{
						// 	method : 'post' ,
						// 	headers : { 'Content-Type' : 'application/json' ,
						// 				'Authorization' : 'Bearer ' + token} ,
						// 	body : JSON.stringify(obj2) ,
						// })
						// .then(res => {
						// 	if(res.ok)
						// 		return res.json() ;
						// 	else
						// 		throw Error(res.statusText) ;
						// })
						// .catch( err  => {
						// 	console.log(err) ; 
						// 	addNotif(err.message, 'error') ;
						// }) ;

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

	const checkPayment = () => {
		// if(payment)
			return (
				<div className="test-box">
					<h3> Assessment of COVID Cognitive Impact on Self (ACCIS) </h3> 
					<div className="lang-con"> Change Language: 
						<input type="radio" id={0} name={'lang'} checked={lang==='english'} onChange={() => setLang('english') }/> English 
						<input type="radio" id={1} name={'lang'} checked={lang==='hindi'} onChange={() => 
							setLang('hindi') }/> हिन्दी 
					</div>
					{checkMode()}
				</div>
			) ;
		// else 
		// 	return <Payment cost={coupon_amount[coupon]} token={token} display={displayRazorpay} change={() => setPayment(true)} couponChange={changeCoupon} type='accis'/> ;
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