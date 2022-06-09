import {useState, useEffect, useContext, Fragment} from 'react' ;
import {Link} from 'react-router-dom' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons' ;

import CheckBtn from '../CheckBtn.js' ;
import { addNotif} from '../../notif.js' ;
import Payment from '../../payment/Payment.js' ;
import {UserContext} from '../../../context/UserContext.js' ;
import {inst, quesData, subData, resultData, evalData} from './langdata.js' ;
import {radioData} from './radioData.js' ;
import {ustopQues} from './queData.js' ;
import returnEngHindi from '../../returnEnglishHindi.js' ;
import './ustop.css' ;

let ans = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,] ;

const Question = ({changeMode}) => {
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

	const onRadioClick = (no, opt) => {
		const tempArr = [false, false, false, false, false] ;
		tempArr[opt] = true ;
		setChecked(tempArr) ;
		setWarning('');
	}

	const onNextClick = () => {
		// console.log(checked, ans) ;
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
			if(ustopQues[num+1])
			{	if(ustopQues[num+1].english !== 0)
					arr[ans[num+1]- 1] = true ;
				setNum(num+1);
				setChecked(arr) ;
			}				
			else
				changeMode('confirm') ;
		}
		else
			setWarning(returnEngHindi(quesData.error)) ;
	}

	const onPrevClick = () => {
		let arr = [false, false, false, false, false] ;
		arr[ans[num-1]- 1] = true ;
		setNum(num-1) ;
		setChecked(arr) ;
	}

	return (
		<div className="question"> 
			<p> {parseInt(num,10) + 1}. &nbsp; {returnEngHindi(ustopQues[num])} </p>
			<div className="radio-con"> 
			{	radioData.map( (one,i) => <CheckBtn key={i} styles="check-btn" onClick={()=>onRadioClick(num, i)} checked={checked[i]} text={returnEngHindi(one)} />)
			}
			</div>
			<div className="next-btn-con">
				{	(num===0)?null:<button className="sched-btn next-btn" onClick={onPrevClick}><FontAwesomeIcon icon={faChevronLeft}/>&nbsp;{returnEngHindi(quesData.prevBtn)} </button>
				} 
				<button className="sched-btn next-btn" onClick={onNextClick}>
					{returnEngHindi(quesData.nextBtn)}&nbsp;<FontAwesomeIcon icon={faChevronRight} /> 
				</button>
			</div>
			{ checkWarning() }
		</div> 
	) ;
}

const EvalDisplay = ({stage, type}) => {
	return (
		<Fragment>
			<p> {evalData[stage].l1.english}
				<span className={"eval "+type}>&nbsp;{evalData[stage].l2.english}&nbsp;</span>
				{evalData[stage].l3.english} 
			</p>
			<p> {evalData[stage].l1.hindi}
				<span className={"eval "+type}>&nbsp;{evalData[stage].l2.hindi}&nbsp;</span>
				{evalData[stage].l3.hindi} 
			</p>
			{returnEngHindi(evalData[stage].l4, 'p')}
		</Fragment>
	) ;
}


const Ustop = () => {
	const [mode, setMode] = useState('start') ;
	const [payment, setPayment] = useState(false) ;
	const {token} = useContext(UserContext) ;

	useEffect( () => {
		fetch("https://api.psyment.com/saat-payment/check", {
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

	const onSubmitClick = () => {
		let obj2 = {
			test: 'ustop',
			result: {
				s: calculateScore('s'), 
				a: calculateScore('a'), 
				e:calculateScore('e'), 
				t:calculateScore('t'),
				answers: ans 
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
		.then(() => setMode('finish'))
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
								<ul children={inst.l.map((one,i)=><Fragment key={i}>{returnEngHindi(one, 'li')}</Fragment>)} />
								<div className="start-btn-con">
									<button className="sched-btn" onClick={() => setMode('test')}>{returnEngHindi(inst.btnText)} </button>
								</div>
							</div> 
						);
		case 'test' : return <Question changeMode={setMode}/> ;
		case 'finish' : return (
							<div className="question result"> 
								<p> {returnEngHindi(resultData.sScore)} : {calculateScore('s')} </p> 
								<p> {returnEngHindi(resultData.aScore)} : {calculateScore('a')} </p> 
								<p> {returnEngHindi(resultData.eScore)} : {calculateScore('e')} </p> 
								<p> {returnEngHindi(resultData.tScore)} : {calculateScore('t')} </p> 
								<hr/>
								<p> {returnEngHindi(resultData.ustopKey)} </p>
								<p> <span className="evalNumber"> 0-30 </span> : <span className="low">{returnEngHindi(resultData.l[0])}</span> <br/>
									<span className="evalNumber"> 31-60 </span> : <span className="mild">{returnEngHindi(resultData.l[1])}</span> <br/>
									<span className="evalNumber"> 61-90 </span> : <span className="moderate">{returnEngHindi(resultData.l[2])}</span> <br/>
									<span className="evalNumber"> 91-120 </span> : <span className="high">{returnEngHindi(resultData.l[3])}</span> <br/>
								</p>
								<hr/>
								<p> {getEvaluation(calculateScore('t'))} </p>
								{resultData.p.map((one,i)=><Fragment key={i}>{returnEngHindi(one, 'p')}</Fragment>)}
							</div>
						) ;
		case 'confirm' : return (
							<div className="question">
								{returnEngHindi(subData.subNote, 'p')}
								<div className="next-btn-con proceed-con">
									<button className="sched-btn" onClick={()=>setMode('test')}>{returnEngHindi(subData.revBtn)} </button>
									<button className="sched-btn" onClick={onSubmitClick}>{returnEngHindi(subData.subBtn)}</button>
								</div>
							</div>   
						) ;
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
		if(payment)
			return (
				<div className="test-box-con">
					<div className="test-box" children={checkMode()} />
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

export default Ustop ;