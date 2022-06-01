import {useState, useEffect, useContext} from 'react' ;
import {Link} from 'react-router-dom' ;

// import CheckBtn from '../CheckBtn.js' ;
import { addNotif} from '../../notif.js' ;
// import Payment from '../../payment/Payment.js' ;
import Test4QuestionList from './Test4Question.js' ;
import {StartDisplay, ConfirmDisplay} from './T4Comps.js' ;
import {UserContext} from '../../../context/UserContext.js' ;
import {subData, resultData } from './langdata.js' ;
import {test4Ques} from './queData.js' ;

const obj = {
	n: 0,
	h: 0,
	a: 0 
} ;

const returnEngHindi = (value) => `${value.english} / ${value.hindi}` 

const Test4 = () => {
	const [checkedValues, setCheckedValues] = useState({}) ;
	const [mode, setMode] = useState('start') ;
	const [answerObj, setAnswerObj] = useState({}) ;
	// const [payment, setPayment] = useState(false) ;
	const {token} = useContext(UserContext) ;

	useEffect( () => {
		fetch("https://api.psyment.com/nhapass-payment/check", {
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

	}, [token] ) ;

	const onSubmitClick = () => {
		let checkedArr = Object.keys(checkedValues).map(one => checkedValues[one]) ;
		checkedArr.forEach((one,i)=>{
			obj[test4Ques[i].type] += one ;
		}) ;
		
		let obj2 = {
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
		{	
			case 'start' : 	return <StartDisplay onBtnClick={() => setMode('test')} /> ;

			case 'test' : 	let objProps = {checkedValues, setCheckedValues, changeMode:setMode }
					  		return <Test4QuestionList {...objProps} /> ;

			case 'finish' : return (
								<div className="question result"> 
									<p> {returnEngHindi(resultData.score1)} : {answerObj.result.t.n} </p> 
									<p> {returnEngHindi(resultData.score2)} : {answerObj.result.t.h} </p> 
									<p> {returnEngHindi(resultData.score3)} : {answerObj.result.t.a} </p> 
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

			case 'confirm': return <ConfirmDisplay onNoClick={()=>setMode('test')} onYesClick={onSubmitClick} /> ;

			default: return <div>{returnEngHindi(subData.error)} </div> ;
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
			// return <Payment success={() => setPayment(true)} type='nhapass'/> ;
	}

	if(token === "")
		return (
			<div className="blue-bg blue-form">
				<p> You need to 
					<Link to="/login?rdr=nhapass" className="btn3"> Login </Link>
					 or 
					<Link to="/register?rdr=nhapass" className="btn3"> Register </Link> 
					to take this test
				</p>
			</div>
		) ; 
	else
		return checkPayment() ;
}

export default Test4 ;