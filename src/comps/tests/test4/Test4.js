import {useState, useEffect, useContext} from 'react' ;
import {Link} from 'react-router-dom' ;

import { addNotif} from '../../notif.js' ;
import Payment from '../../payment/Payment.js' ;
import Test4QuestionList from './Test4Question.js' ;
import {StartDisplay, ConfirmDisplay} from './T4Comps.js' ;
import {UserContext} from '../../../context/UserContext.js' ;
import {subData, resultData } from './langdata.js' ;
import returnEngHindi from '../../returnEnglishHindi.js' ;
import {test4Ques} from './queData.js' ;

const obj = {
	n: 0,
	h: 0,
	a: 0 
} ;

const checkGrade = (num) => {
  if(num>42) {
    if(num>48) {
      if(num>54 && num<=60)
        return 'A' ;
      else
        return 'B' ;
    }
    else
      return 'C' ;
  }
  else {
    if(num>30) {
      if(num>36)
        return 'D' ;
      else 
        return 'E' ;
    }
    else {
      if(num>24)
        return 'F' ;
      else
        return 'G' ;
    }
  }
}

const Test4 = () => {
	const [checkedValues, setCheckedValues] = useState({}) ;
	const [mode, setMode] = useState('start') ;
	const [answerObj, setAnswerObj] = useState({}) ;
	const [payment, setPayment] = useState(false) ;
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
								<div className="result "> 
									<p className="final-consult"> {returnEngHindi(resultData.score1)} : <span className="moderate" >{checkGrade(answerObj.result.t.n)}</span> </p> 
									<p className="final-consult"> {returnEngHindi(resultData.score2)} : <span className="moderate" >{checkGrade(answerObj.result.t.h)}</span> </p> 
									<p className="final-consult"> {returnEngHindi(resultData.score3)} : <span className="moderate" >{checkGrade(answerObj.result.t.a)}</span> </p> 
									<div className="nha-interpretation">
										<h6>General Interpretation</h6>
										<p className="nha-grade-one" >Grade 'A' :&emsp; Excellent</p>
										<p className="nha-grade-one" >Grade 'B' :&emsp; Good</p>
										<p className="nha-grade-two" >Grade 'C' :&emsp; Average</p>
										<p className="nha-grade-two" >Grade 'D' :&emsp; Below Average</p>
										<p className="nha-grade-three" >Grade 'E' :&emsp; Poor</p>
										<p className="nha-grade-three" >Grade 'F' :&emsp; Deficient</p>
										<p className="nha-grade-four" >Grade 'G' :&emsp; Critical Deficient</p><br/>
									</div>
									{resultData.p.map( one => returnEngHindi(one, 'p') )}
									<p className="final-consult" children={returnEngHindi(resultData.p1)} />
									<p className="final-consult" children={returnEngHindi(resultData.p2)} />
								</div>
							) ;

			case 'confirm': return <ConfirmDisplay onNoClick={()=>setMode('test')} onYesClick={onSubmitClick} /> ;

			default: return <div>{returnEngHindi(subData.error)} </div> ;
		}
	}

	const checkPayment = () => {
		if(payment)
			return (
				<div className="test-box-con">
					<div className="test-box test-box-4">
						{checkMode()}
					</div>
				</div>
			) ;
		else 
			return <Payment success={() => setPayment(true)} type='nhapass'/> ;
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