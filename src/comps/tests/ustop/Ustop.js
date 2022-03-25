import {useState, useEffect, useContext, Fragment} from 'react' ;
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faSquareCheck, faSquare } from '@fortawesome/free-solid-svg-icons' ;

import { addNotif} from '../../notif.js' ;
import Payment from '../../payment/Payment.js' ;
import {UserContext} from '../../../context/UserContext.js' ;
import {inst, quesData, subData, resultData, evalData} from './langdata.js' ;
import {radioData} from './radioData.js' ;
import {saatQues} from './queData.js' ;
import './ustop.css' ;

const CheckBtn = ({styles, onClick, checked, text}) => {
	const icon = checked?faSquareCheck:faSquare ;

	return <Button className={styles} onClick={onClick}><FontAwesomeIcon icon={icon}/>&nbsp;{text}&nbsp;</Button>
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

const EvalDisplay = ({stage, type, lang}) => {
	return (
		<Fragment>
			{evalData[stage].l1[lang]} 
			<span className={"eval "+type}>{evalData[stage].l2[lang]}</span>
			{evalData[stage].l3[lang]} <br/><br/>
			{evalData[stage].l4[lang]}
		</Fragment>
	) ;
}


const SAAT = () => {
	const [mode, setMode] = useState('start') ;
	const [lang, setLang] = useState('english') ;
	const [payment, setPayment] = useState(false) ;
	const {token, user} = useContext(UserContext) ;

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
	}, [token] ) ;

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
			return <Payment success={() => setPayment(true)} type='ustop'/> ;
	}	

	if(token === "")
		return (
			<div className="blue-bg blue-form">
				<p> You need to 
					<Link to="/login?rdr=ustop" className="btn3"> Login </Link>
					 or 
					<Link to="/register?rdr=ustop" className="btn3"> Register </Link> 
					to take this test 
				</p>
			</div>
		) ; 
	else
		return checkPayment() ;
}

export default SAAT ;