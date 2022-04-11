import {useState, useEffect, useContext, Fragment} from 'react' ;
import {Link} from 'react-router-dom' ;

import CheckBtn from '../CheckBtn.js' ;
import { addNotif} from '../../notif.js' ;
import Payment from '../../payment/Payment.js' ;
import Test4Question from './Test4Question.js' ;
import {UserContext} from '../../../context/UserContext.js' ;
import {inst, subData, resultData, evalData } from './langdata.js' ;

import '../accis/accis.css' ;
// import './test4.css' ;

let ans = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
		 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,] ;

const EvalDisplay = ({stage, type, lang}) => {
	return (
		<Fragment>
			{evalData.you[lang]} 
			<span className={"eval "+type}>{evalData[stage].l1[lang]}</span>
			{evalData[stage].l2[lang]}
			{ 	(stage !== 'stage1')?
				<ul> {evalData.sugg[lang]}:
					<li> {evalData[stage].s1[lang]} </li>
					<li> {evalData[stage].s2[lang]} </li>
				</ul>:null 
			}
		</Fragment>
	) ;
}

const Test4 = () => {
	const [mode, setMode] = useState('start') ;
	const [lang, setLang] = useState('english') ;
	const [payment, setPayment] = useState(false) ;
	const {token} = useContext(UserContext) ;

	useEffect( () => {
		// fetch("https://api.psyment.com/test4-payment/check", {
		fetch("https://api.psyment.com/accis-payment/check", {
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
	}, [token] ) ;

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

		case 'test' : return <Test4Question changeMode={setMode} lang={lang} ans={ans}/> ;

		case 'finish' : let obj2 = {
							// test: 'test4',
							test: 'accis',
							result: {
								answers: ans,
								t: ans.reduce((a,b)=>a+b),
							}
						} ;
						
						fetch('https://api.psyment.com/test',{
						// fetch('http://localhost:8000/test',{
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
								{/*<p> {resultData.test4Key[lang]} </p>*/}
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
				<div className="test-box-con">
					<div className="test-box">
						<div className="lang-con">
							<CheckBtn styles="check-btn" onClick={() => setLang('english')} checked={lang==='english'} text="English" />
							<CheckBtn styles="check-btn" onClick={() => setLang('hindi')} checked={lang==='hindi'} text="हिन्दी" />
						</div>
						{checkMode()}
					</div>
				</div>
			) ;
		else 
			return <Payment success={() => setPayment(true)} type='accis'/> ;
			// return <Payment success={() => setPayment(true)} type='test4'/> ;
	}

	if(token === "")
		return (
			<div className="blue-bg blue-form">
				<p> You need to 
					{/*<Link to="/login?rdr=test4" className="btn3"> Login </Link>*/}
					<Link to="/login?rdr=accis" className="btn3"> Login </Link>
					 or 
					{/*<Link to="/register?rdr=test4" className="btn3"> Register </Link>*/} 
					<Link to="/register?rdr=accis" className="btn3"> Register </Link> 
					to take this test
				</p>
			</div>
		) ; 
	else
		return checkPayment() ;
}

export default Test4 ;