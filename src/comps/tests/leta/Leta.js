import {useState, useEffect, useContext} from 'react' ;
import {Link} from 'react-router-dom' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons' ;

import CheckBtn from '../CheckBtn.js' ;
import RadioSet from '../radioset/RadioSet.js' ;
import Payment from '../../payment/Payment.js' ;
import {UserContext} from '../../../context/UserContext.js' ;
import { addNotif } from '../../notif.js' ;
import { inst, subData, quesData, resultData } from './langData.js' ;
import { letaQues } from './queData.js' ;
import './leta.css' ;

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
				<span className="ques-color">{letaQues[num][lang]} 
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
				{	(num===0)?null:<button className="sched-btn next-btn" onClick={onPrevClick}><FontAwesomeIcon icon={faChevronLeft} />&nbsp;{quesData.prevBtn[lang]}</button>
				} 
				<button className="sched-btn next-btn ttp-btn" onClick={onNextClick}>{quesData.nextBtn[lang]}&nbsp;<FontAwesomeIcon icon={faChevronRight} /> </button>
			</div>
			{ checkWarning() }
			<h4> {quesData.note[lang]} </h4>
		</div> 
	) ;
}

const LETA = () => {
	const {token} = useContext(UserContext) ;
	const [mode, setMode] = useState('start') ;
	const [lang, setLang] = useState('english') ;
	const [checked, setChecked] = useState([true, false]) ;
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
					<p className="res-ques">{letaQues[i][lang]}</p>
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
				<div className="test-box-con">
					<div  className="test-box">
						<div className="lang-con">
							<CheckBtn styles="check-btn" onClick={() => { setChecked([true, false]) ; setLang('english') ; }} checked={checked[0]} text="English" />
							<CheckBtn styles="check-btn" onClick={() => { setChecked([false, true]) ; setLang('hindi') ; } } checked={checked[1]} text="हिन्दी" />
						</div>
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