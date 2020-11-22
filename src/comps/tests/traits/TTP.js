//LETA - Learning Environment Trait Assessment.
import React from 'react' ;
import {Link} from 'react-router-dom' ;

import { addNotif } from '../../notif.js' ;
import { inst, subData, quesData } from './langData.js' ;
// import { radioData } from './radioData.js';
import { ttpQues } from './queData.js' ;
import RadioSet from '../radioset/RadioSet.js' ;
import './ttp.css' ;


let ansf = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,] ;
let ansm = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,] ;

class Question2 extends React.Component
{	
	state = {
		warning : '',
		ans: {f: -1, m: -1},		 
		num: 0 ,
	} ;

	// componentDidMount = () => {
	// 	if(ans[0] !== 0)
	// 	{	let arr = [false, false, false, false, false, false] ;
	// 		arr[ans[0]- 1] = true ;
	// 		this.setState({checked: arr})
	// 	}
	// } 

	changeAnswer = (num, str) => {
		const {f, m} = this.state.ans ;
		let obj = {f, m} ;
		obj[str] = num ;
		this.setState({ans: obj, warning: ''}) ; 
	}

	checkWarning = () => {
		if (this.state.warning.length > 0)
			return <p className="warn"> {this.state.warning} </p> ;
		else
			return null ;
	}

	onNextClick = () => {
		const {ans, num} = this.state ;
		const {lang} = this.props ;
		console.log(ans, num) ;
		if( ans.f !== -1 && ans.m !== -1) 
		{	ansf[num]= (5-ans.f)*2 ;
			ansm[num]= (5-ans.m)*2 ;
			if(ttpQues[num+1])
			{	//if(ttpQues[num+1][lang] !== 0)
					//arr[ans[num+1]- 1] = true ;
				this.setState({num: num+1}) ;
			}				
			else
				this.props.changeMode('confirm') ;
		}
		else
			this.setState({warning: quesData.error[lang]}) ;
	}



	onPrevClick = () => {
		const {num} = this.state ;
		// let arr = [false, false, false, false, false, false] ;
		// arr[ans[num-1]- 1] = true ;
		this.setState({num: num-1}) ;
	}

	render()
	{	const {num} = this.state ;
		const {lang} = this.props ;
		return (
			<div className="question"> 
				<p> {parseInt(num) + 1}. &nbsp; {ttpQues[num][lang]} </p>
				<div className="radio-con ttp-radio-con">
					<div> <strong>{quesData.father[lang]}:</strong> 
						<RadioSet lang={lang} name={'f'} changeAnswer={this.changeAnswer} num={num}/> 
					</div>
					<div> <strong>{quesData.mother[lang]}:</strong>
					 	<RadioSet lang={lang} name={'m'} changeAnswer={this.changeAnswer} num={num}/> 
					 </div>
				</div>
				<div className="next-btn-con">
					{	(num===0)?null:<button className="sched-btn next-btn" onClick={this.onPrevClick}>
					 					&lt;&nbsp;{quesData.prevBtn[lang]} </button>
					} 
					<button className="sched-btn next-btn ttp-btn" onClick={this.onNextClick}>
					 {quesData.nextBtn[lang]}&nbsp;&gt; </button>
				</div>
				{ this.checkWarning() }
				<h4> {quesData.note[lang]} </h4>
			</div> 
		) ;
	}
}

class TTP extends React.Component
{
	state = {
		mode : 'start' ,
		quesNo: '0',
		lang: 'english' ,
		checked: [true, false]
	}

	changeMode = (newMode) => {
		this.setState({mode: newMode});
	}

	checkLoggedIn = () => {
		// if(this.props.token === "")
		// 	return (
		// 		<div className="blue-bg blue-form">
		// 			<p> You need to 
		// 				<Link to="/login" className="btn3"> Login </Link>
		// 				 or 
		// 				<Link to="/register" className="btn3"> Register </Link> 
		// 				to take this test (you will be redirected to home page) 
		// 			</p>
		// 		</div>
		// 	) ; 
		// else
			return (
				<div  className="test-box">
					<h3> Learning Environment Trait Assessment (LETA) </h3> 
					<div className="lang-con"> Change Language: 
						<input type="radio" id={0} name={'lang'} checked={this.state.checked[0]} onChange={() => this.setState({checked: [true, false], lang:'english'})}/> English 
						<input type="radio" id={1} name={'lang'} checked={this.state.checked[1]} onChange={() => this.setState({checked: [false, true], lang:'hindi'})}/> हिन्दी 
					</div>
					{this.checkMode()}
				</div>
			) ;
	}

	// calculateScore = (type) => {
	// 	switch(type)
	// 	{	case 's' : return Math.floor((ans.slice(0, 30).reduce((x,y)=>x+y) - 30)/3);
	// 					//eslint-disable-next-line
	// 				   break ;
	// 		case 'a' : return ans.slice(30, 40).reduce((x,y)=>x+y) - 10 ;
	// 					//eslint-disable-next-line
	// 				   break ;
	// 		case 'e' : return ans.slice(40).reduce((x,y)=>x+y) - 10 ;
	// 					//eslint-disable-next-line
	// 				   break ;
	// 		case 't' : return Math.floor((ans.slice(0, 30).reduce((x,y)=>x+y) - 30)/3 + ans.slice(30).reduce((x,y)=>x+y) - 20) ;
	// 					//eslint-disable-next-line
	// 					break ;
	// 		default : return null ;
	// 	}
	// }

	checkMode = () => {
		const {lang} = this.state ;
		switch(this.state.mode)
		{	case 'start' : return (
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
						<button className="sched-btn" onClick={() => this.setState({mode: 'test'})}> {inst.btnText[lang]} </button>
					</div>
				</div> 
			);
						//eslint-disable-next-line
			break ;
		case 'test' : return <Question2 changeMode={this.changeMode} lang={this.state.lang}/> ;
						//eslint-disable-next-line
					  break ;
		// case 'finish' : let S = this.calculateScore('s') ;
		// 				let A = this.calculateScore('a') ;
		// 				let E = this.calculateScore('e') ;
		// 				let T = this.calculateScore('t') ;
		// 				let obj2 = {
		// 					test: 'saat',
		// 					result: {
		// 						s: S, a: A, e:E, t:T,
		// 						answers: ans 
		// 					} 
		// 				} ;
						
		// 				fetch('https://psy-api.herokuapp.com/test',{
		// 					method : 'post' ,
		// 					headers : { 'Content-Type' : 'application/json' ,
		// 								'Authorization' : 'Bearer ' + this.props.token} ,
		// 					body : JSON.stringify(obj2) ,
		// 				})
		// 				.then(res => {
		// 					if(res.ok)
		// 						return res.json() ;
		// 					else
		// 						throw Error(res.statusText) ;
		// 				})
		// 				.catch( err  => {
		// 					console.log(err) ; 
		// 					addNotif(err.message, 'error') ;
		// 				}) ;
		// 				return (
		// 				<div className="question result"> 
		// 					<p> {resultData.sScore[lang]} : {S} </p> 
		// 					<p> {resultData.aScore[lang]} : {A} </p> 
		// 					<p> {resultData.eScore[lang]} : {E} </p> 
		// 					<p> {resultData.tScore[lang]} : {T} </p> 
		// 					<p> {this.getEvaluation(T)} </p>
		// 					<p> {resultData.p1[lang]} </p>
		// 					<p> {resultData.p2[lang]} <br/>
		// 						{resultData.p3[lang]} </p>
		// 				</div>
		// 				) ;
		// 				//eslint-disable-next-line
		// 				break ;
		case 'confirm' : return (
				<div className="question">
					<p>{subData.subNote[lang]}</p>
					<div className="next-btn-con proceed-con">
						<button className="sched-btn" onClick={()=>this.setState({mode:'test'})}>{subData.revBtn[lang]} </button>
						<button className="sched-btn" onClick={()=>this.setState({mode:'finish'})}>{subData.subBtn[lang]}</button>
					</div>
				</div>   
			) ;
						//eslint-disable-next-line
			break ;
		default: return <div>{subData.error[lang]} </div> ;
		}
	}

	// getEvaluation = (t) => {
	// 	const {lang} = this.state ;
	// 	if(t <= 60)
	// 	{	if( t <= 30)
	// 		{	return (
	// 				<React.Fragment>
	// 					{evalData.stage1.l1[lang]} <span className="eval low">{evalData.stage1.l2[lang]}</span>{evalData.stage1.l3[lang]} <br/><br/>
	// 					{evalData.stage1.l4[lang]}
	// 				</React.Fragment>
	// 			) ;
	// 		}
	// 		else
	// 		{	return (
	// 				<React.Fragment>
	// 					{evalData.stage2.l1[lang]} <span className="eval mild"> {evalData.stage2.l2[lang]}</span>{evalData.stage2.l3[lang]} <br/><br/>
	// 					{evalData.stage2.l4[lang]} 
	// 				</React.Fragment>
	// 			) ;
	// 		}
	// 	}
	// 	else
	// 	{	if(t <= 90)
	// 		{	return (
	// 				<React.Fragment>
	// 					{evalData.stage3.l1[lang]} <span className="eval moderate"> {evalData.stage3.l2[lang]} </span>{evalData.stage3.l3[lang]}<br/><br/>
	// 					{evalData.stage3.l4[lang]} 
	// 				</React.Fragment>
	// 			) ;
	// 		}
	// 		else
	// 		{	return (
	// 				<React.Fragment>
	// 					{evalData.stage4.l1[lang]} <span className="eval high">{evalData.stage4.l2[lang]} </span>{evalData.stage4.l3[lang]}<br/><br/>
	// 					{evalData.stage4.l4[lang]}
	// 				</React.Fragment>
	// 			) ;
	// 		}
	// 	} 
	// }

	componentWillUnmount = () =>{
		ansf = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,] ;
		ansm = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,] ;
	}

	render()
	{	return(
			<div>
				{this.checkLoggedIn()}
			</div>
		) ;
	}
}

export default TTP ;