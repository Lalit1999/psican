import {useState, useEffect, useContext, Fragment} from 'react' ;
import {Link} from 'react-router-dom' ;

import CheckBtn from '../CheckBtn.js' ;
import { addNotif} from '../../notif.js' ;
// import Payment from '../../payment/Payment.js' ;
import Test4QuestionList from './Test4Question.js' ;
import {UserContext} from '../../../context/UserContext.js' ;
import {inst, subData, resultData, evalData } from './langdata.js' ;
import {test4Ques} from './queData.js' ;

const obj = {
	n: 0,
	h: 0,
	a: 0 
} ;

const returnEngHindi = (value) => `${value.english} / ${value.hindi}` 

const EvalDisplay = ({stage, type, lang}) => {
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

const Test4 = () => {
	const [checkedValues, setCheckedValues] = useState({}) ;
	const [mode, setMode] = useState('start') ;
	const [lang, setLang] = useState('english') ;
	// const [payment, setPayment] = useState(false) ;
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
		// .then(data => setPayment(data.answer))  
		.catch(err => console.log(err, err.message) ) ;

	}, [token] ) ;

	const checkMode = () => {
		switch(mode)
		{	
			case 'start' : return (
							<div className="start-div">
								<h2 className="start-title"> {returnEngHindi(inst.head)} </h2>
								<ul>
									<li>{returnEngHindi(inst.l1)}</li>
									<li>{returnEngHindi(inst.l2)}</li>
									<li>{returnEngHindi(inst.l3)}</li>
									<li>{returnEngHindi(inst.l4)}</li>
									<li>{returnEngHindi(inst.l5)}</li>
								</ul>
								<div className="start-btn-con">
									<button className="sched-btn" onClick={() => setMode('test')}>{returnEngHindi(inst.btnText)} </button>
								</div>
							</div> 
						);

			case 'test' : let objProps = {checkedValues, setCheckedValues, changeMode:setMode }
					  	return <Test4QuestionList {...objProps} /> ;

			case 'finish' : let checkedArr = Object.keys(checkedValues).map(one => checkedValues[one]) ;
							checkedArr.forEach((one,i)=>{
								console.log(one, test4Ques[i].type) ;
								obj[test4Ques[i].type] += one ;
							}) ;
							console.log(obj) ;
							let obj2 = {
								// test: 'test4',
								test: 'nhapass',
								result: {
									answers: checkedArr,
									t: obj,
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
									<p> {returnEngHindi(resultData.score)} : {/*obj2.result.t*/} </p> 
									<p> {getEvaluation(obj2.result.t)} </p>
									<hr/>
									<p> {returnEngHindi(resultData.accisKey)} </p>
									{/*<p> {returnEngHindi(resultData.test4Key)} </p>*/}
									<p> <span className="evalNumber"> 0-30 </span> : <span className="low">{returnEngHindi(resultData.l1)}</span> <br/>
										<span className="evalNumber"> 31-60 </span> : <span className="mild">{returnEngHindi(resultData.l2)}</span> <br/>
										<span className="evalNumber"> 61-90 </span> : <span className="moderate">{returnEngHindi(resultData.l3)}</span> <br/>
										<span className="evalNumber"> 91-120 </span> : <span className="high">{returnEngHindi(resultData.l4)}</span> <br/>
									</p>
									<hr/>
									<p> {returnEngHindi(resultData.p1)} </p>
									<p> {returnEngHindi(resultData.p2)} <br/>
										{returnEngHindi(resultData.p3)} </p>
								</div>
							) ;

			case 'confirm': return (
								<div className="question">
									<p>{returnEngHindi(subData.subNote)}</p>
									<div className="next-btn-con proceed-con">
										<button className="sched-btn" onClick={()=>setMode('test')}>{returnEngHindi(subData.revBtn)} </button>
										<button className="sched-btn" onClick={()=>setMode('finish')}>{returnEngHindi(subData.subBtn)}</button>
									</div>
								</div>   
							) ;

			default: return <div>{returnEngHindi(subData.error)} </div> ;
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
		// if(payment)
			return (
				<div className="test-box-con">
					<div className="test-box test-box-4">
						<div className="lang-con">
							<CheckBtn styles="check-btn" onClick={() => setLang('english')} checked={lang==='english'} text="English" />
							<CheckBtn styles="check-btn" onClick={() => setLang('hindi')} checked={lang==='hindi'} text="हिन्दी" />
						</div>
						{checkMode()}
					</div>
				</div>
			) ;
		// else 
		// 	return <Payment success={() => setPayment(true)} type='accis'/> ;
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