import {useState, useEffect, useContext, Fragment} from 'react' ;
import {Link} from 'react-router-dom' ;

import { addNotif} from '../../notif.js' ;
import Payment from '../../payment/Payment.js' ;
import AccisQuestion from './AccisQuestion.js' ;
import {UserContext} from '../../../context/UserContext.js' ;
import returnEngHindi from '../../returnEnglishHindi.js' ;
import {inst, subData, resultData, evalData } from './langdata.js' ;

import './accis.css' ;

let ans = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
		 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,] ;

const EvalDisplay = ({stage, type}) => {
	return (
		<Fragment>
			{returnEngHindi(evalData.you)} 
			<span className={"eval "+type}>{returnEngHindi(evalData[stage].l1)}</span>
			{returnEngHindi(evalData[stage].l2)}
			{ 	(stage !== 'stage1')?
				<ul> {returnEngHindi(evalData.sugg)}:
					<li> {returnEngHindi(evalData[stage].s1)} </li>
					<li> {returnEngHindi(evalData[stage].s2)} </li>
				</ul>:null 
			}
		</Fragment>
	) ;
}

const ACCIS = () => {
	const [mode, setMode] = useState('start') ;
	const [answerObj, setAnswerObj] = useState({}) ;
	const [payment, setPayment] = useState(false) ;
	const {token} = useContext(UserContext) ;

	useEffect( () => {
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

	const ConfirmDisplay = ({onNoClick, onYesClick}) => {
		return (
			<div className="question">
				{returnEngHindi(subData.subNote, 'p')}
				<div className="next-btn-con proceed-con">
					<button className="sched-btn" onClick={onNoClick} children={returnEngHindi(subData.revBtn)} />
					<button className="sched-btn" onClick={onYesClick} children={returnEngHindi(subData.subBtn)} />
				</div>
			</div>   
		) ;
	}

	const onSubmitClick = () => {
		let obj2 = {
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
		.then(() => {
			setAnswerObj(obj2) ;
			setMode('finish') ; 
		})
		.catch( err  => {
			console.log(err) ; 
			
			addNotif(err.message, 'error') ;
		}) ;
	}

	const checkMode = () => {
		switch(mode)
		{	case 'start' : return (
							<div className="start-div">
								<h2 className="start-title"> {returnEngHindi(inst.head)} </h2>
								<ul children={inst.l.map( one => returnEngHindi(one, 'li') )} />
								<div className="start-btn-con">
									<button className="sched-btn" onClick={() => setMode('test')} children={returnEngHindi(inst.btnText)} />
								</div>
							</div> 
						);

		case 'test' : return <AccisQuestion changeMode={setMode} ans={ans}/> ;

		case 'finish' : return (
							<div className="question result">							 
								<p> {returnEngHindi(resultData.score)} : {answerObj.result.t} </p> 
								<p> {getEvaluation(answerObj.result.t)} </p>
								<hr/>
								<p> {returnEngHindi(resultData.accisKey)} </p>
								<p> <span className="evalNumber"> 0-30 </span> : <span className="low">{returnEngHindi(resultData.l1)}</span> <br/>
									<span className="evalNumber"> 31-60 </span> : <span className="mild">{returnEngHindi(resultData.l2)}</span> <br/>
									<span className="evalNumber"> 61-90 </span> : <span className="moderate">{returnEngHindi(resultData.l3)}</span> <br/>
									<span className="evalNumber"> 91-120 </span> : <span className="high">{returnEngHindi(resultData.l4)}</span> <br/>
								</p>
								<hr/>
								{resultData.p.map( one => returnEngHindi(one, 'p') )}
								<p className="final-consult" children={returnEngHindi(resultData.p1)} />
								<p className="final-consult" children={returnEngHindi(resultData.p2)} />
							</div>
						) ;

		case 'confirm': return <ConfirmDisplay onNoClick={()=>setMode('test')} onYesClick={onSubmitClick} />

		default: return <div>{returnEngHindi(subData.error)} </div> ;
		}
	}

	const getEvaluation = (t) => {
		if(t <= 60)
		{	if( t <= 30)
				return <EvalDisplay stage="stage1" type="low" /> ; 
			else
				return <EvalDisplay stage="stage2" type="mild" /> ; 
		}
		else
		{	if(t <= 90)
				return <EvalDisplay stage="stage3" type="moderate" /> ; 
			else
				return <EvalDisplay stage="stage4" type="high" /> ; 
		} 
	}

	const checkPayment = () => {
		// if(payment)
			return (
				<div className="test-box-con">
					<div className="test-box test-box-4">
						{checkMode()}
					</div>
				</div>
			) ;
		// else 
		// 	return <Payment success={() => setPayment(true)} type='accis'/> ;
	}

	if(token === "")
		return (
			<div className="blue-bg blue-form">
				<p> You need to 
					<Link to="/login?rdr=accis" className="btn3"> Login </Link>
					 or 
					<Link to="/register?rdr=accis" className="btn3"> Register </Link> 
					to take this test
				</p>
			</div>
		) ; 
	else
		return checkPayment() ;
}

export default ACCIS ;