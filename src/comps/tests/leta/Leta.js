import {useState, useEffect, useContext, Fragment} from 'react' ;
import {Link} from 'react-router-dom' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons' ;

import RadioSet from '../radioset/RadioSet.js' ;
import Payment from '../../payment/Payment.js' ;
import {UserContext} from '../../../context/UserContext.js' ;
import returnEngHindi from '../../returnEnglishHindi.js' ;
import { addNotif } from '../../notif.js' ;
import { inst, subData, resultData, quesData } from './langData.js' ;
import { letaQues } from './queData.js' ;
import './leta.css' ;

let ansf = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,] ;
let ansm = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,] ;

const Question2 = ({changeMode}) => {	

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
			if(letaQues[num+1])
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
			setWarning(returnEngHindi(quesData.error)) ;
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
			<p> {parseInt(num,10) + 1}. &nbsp; {returnEngHindi(quesData.pre)} &nbsp;&nbsp;
				<br/><span className="ques-color">{returnEngHindi(letaQues[num])} 
			</span></p>
			<div className="radio-con ttp-radio-con">
				<div> <strong>{returnEngHindi(quesData.father)}:</strong> 
					<RadioSet  name='f' changeAnswer={changeAnswer} change={changeArray} num={num} check={checkf}/> 
				</div>
				<div> <strong>{returnEngHindi(quesData.mother)}:</strong>
				 	<RadioSet name='m' changeAnswer={changeAnswer} change={changeArray} num={num} check={checkm}/> 
				 </div>
			</div>
			<div className="next-btn-con">
				{	(num===0)?null:<button className="sched-btn next-btn" onClick={onPrevClick}><FontAwesomeIcon icon={faChevronLeft} />&nbsp;{returnEngHindi(quesData.prevBtn)}</button>
				} 
				<button className="sched-btn next-btn ttp-btn" onClick={onNextClick}>{returnEngHindi(quesData.nextBtn)}&nbsp;<FontAwesomeIcon icon={faChevronRight} /> </button>
			</div>
			{ checkWarning() }
		</div> 
	) ;
}

const LETA = () => {
	const {token} = useContext(UserContext) ;
	const [mode, setMode] = useState('start') ;
	const [payment, setPayment] = useState(false) ;

	useEffect( () => {
		fetch("https://api.psyment.com/leta-payment/check", {
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
	}, [token]) ;

	const calculateScore = () => ansf.map( (x ,i) => (x+ansm[i])/4) 

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
			test: 'leta',
			result: {	ans: calculateScore(), ansf, ansm,
						t: ansf.reduce((x,y)=>x+y) + ansm.reduce((x,y)=>x+y)
		 	} 
		} ;

		fetch('https://api.psyment.com/test',{
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
		.then(() => setMode('finish') )
		.catch( err  => {
			console.log(err) ; 
			addNotif(err.message, 'error') ;
		}) ;
	}


	const checkMode = () => {
		switch(mode)
		{	
			case 'start' : return (
								<div className="start-div">
									<h2 className="start-title"> {returnEngHindi(inst.head)} </h2>
									<ul children={ inst.l.map( (one, i) =><Fragment key={i}>{returnEngHindi(one, 'li') } </Fragment> ) } />
									<div className="start-btn-con">
										<button className="sched-btn" onClick={() => setMode('test')}> {returnEngHindi(inst.btnText)} </button>
									</div>
								</div> 
							) ;					
			case 'test' : return <Question2 changeMode={setMode}/> ;						
			case 'finish' : return (
								<div className="question result"> 
									{returnEngHindi(resultData.p1, 'p')}
									<div> {getEvaluation(calculateScore())} </div>
									{returnEngHindi(resultData.p2,'p')} <br/>
									{returnEngHindi(resultData.p3,'p')} 
								</div>
							) ;
			case 'confirm' : return <ConfirmDisplay onNoClick={()=>setMode('test')} onYesClick={onSubmitClick} />
			default: return <div>{returnEngHindi(subData.error)} </div> ;
		}
	}

	const getEvaluation = (total) => {
		return total.map( (one, i) => {
			return(
				<div key={i} className="result-row">
					<p className="res-sno">{i+1}.</p>
					<p className="res-ques">{returnEngHindi(letaQues[i])}</p>
					<p className="res-res">{one}</p>
					<p className="res-lvl">{returnLevel(one)}</p>
				</div>
			) ;
		} ) ;
	}

	const returnLevel = (score) => {
		if (score > 3)
		{	if(score > 4)
				return returnEngHindi(resultData.vh) ;
			else
				return returnEngHindi(resultData.hi) ;
		}
		else
		{	if(score > 2)
				return returnEngHindi(resultData.mod) ;
			else
				if(score > 1)
					return returnEngHindi(resultData.lo) ;
				else
					return returnEngHindi(resultData.vl) ;					
		}
	}

	const checkPayment = () => {
		if(payment)
			return (
				<div className="test-box-con">
					<div  className="test-box">
						{checkMode()}
					</div>
				</div>
			) ;
		else 
			return <Payment success={() => setPayment(true)} type='leta'/> ;
	}

	if(token === "")
		return (
			<div className="blue-bg blue-form">
				<p> You need to 
					<Link to="/login?rdr=leta" className="btn3"> Login </Link>
					 or 
					<Link to="/register?rdr=leta" className="btn3"> Register </Link> 
					to take this test
				</p>
			</div>
		) ; 
	else
		return checkPayment() ;
}

export default LETA ;