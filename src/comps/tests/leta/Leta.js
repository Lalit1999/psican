import {useState, useEffect, useContext} from 'react' ;
import {Link} from 'react-router-dom' ;

import Payment from '../../payment/Payment.js' ;
import {UserContext} from '../../../context/UserContext.js' ;
import returnEngHindi from '../../returnEnglishHindi.js' ;
import { addNotif } from '../../notif.js' ;
import { inst, subData, resultData } from './langData.js' ;
import Question2 from './LetaQuestion.js' ;
import { letaQues } from './queData.js' ;
import './leta.css' ;

let ansf = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,] ;
let ansm = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,] ;


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

	const checkMode = () => {
		switch(mode)
		{	
			case 'start' : return (
								<div className="start-div">
									<h2 className="start-title"> {returnEngHindi(inst.head)} </h2>
									<ul>
										{returnEngHindi(inst.l1, 'li')}
										{returnEngHindi(inst.l2, 'li')}
										{returnEngHindi(inst.l3, 'li')}
										{returnEngHindi(inst.l4, 'li')}
										{returnEngHindi(inst.l5, 'li')}
										{returnEngHindi(inst.l6, 'li')}
									</ul>
									<div className="start-btn-con">
										<button className="sched-btn" onClick={() => setMode('test')}> {returnEngHindi(inst.btnText)} </button>
									</div>
								</div> 
							) ;					
			case 'test' : return <Question2 changeMode={setMode}/> ;						
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
									<p> {returnEngHindi(resultData.p1)} </p>
									<div> {getEvaluation(total)} </div>
									<p> {returnEngHindi(resultData.p2)} <br/>
										{returnEngHindi(resultData.p3)} </p>
								</div>
							) ;
			case 'confirm' : return (
								<div className="question">
									<p>{returnEngHindi(subData.subNote)}</p>
									<div className="next-btn-con proceed-con">
										<button className="sched-btn" onClick={()=> setMode('test') }>{returnEngHindi(subData.revBtn)} </button>
										<button className="sched-btn" onClick={()=> setMode('finish') }>{returnEngHindi(subData.subBtn)}</button>
									</div>
								</div>   
							) ;
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
		// if(payment)
			return (
				<div className="test-box-con">
					<div  className="test-box">
						{checkMode()}
					</div>
				</div>
			) ;
		// else 
		// 	return <Payment success={() => setPayment(true)} type='leta'/> ;
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