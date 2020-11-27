//LETA - Learning Environment Trait Assessment.
import React from 'react' ;
import {Link} from 'react-router-dom' ;

import { addNotif } from '../../notif.js' ;
import { inst, subData, quesData, resultData } from './langData.js' ;
// import { radioData } from './radioData.js';
import { ttpQues } from './queData.js' ;
import RadioSet from '../radioset/RadioSet.js' ;
import './ttp.css' ;


let ansf = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,] ;
let ansm = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,] ;

class Question2 extends React.Component
{	
	state = {
		warning : '',
		ans: {f: -1, m: -1},		 
		num: 0 ,
		checkf: [false, false, false, false, false, false],
		checkm: [false, false, false, false, false, false]
	} ;

	componentDidMount = () => {
		if(ansf[0] !== -1)
		{	let arrf = [false, false, false, false, false, false] ;
			let arrm = [false, false, false, false, false, false] ;
			arrf[5-ansf[0]/2] = true ;
			arrm[5-ansm[0]/2] = true ;
			let obj = {f: 5-ansf[0]/2, m: 5-ansm[0]/2}
			this.setState({checkf: arrf, checkm: arrm, ans: obj})
		}
	} 

	changeAnswer = (num, str) => {
		const {f, m} = this.state.ans ;
		let obj = {f, m} ;
		obj[str] = num ;
		this.setState({ans: obj, warning: ''}) ; 
	}

	changeArray = (arr, str) => {
		if(str === 'f')
			this.setState({checkf: arr}) ; 
		else if(str === 'm')
			this.setState({checkm: arr}) ; 
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
		// console.log(ans, num) ;
		if( ans.f !== -1 && ans.m !== -1) 
		{	let arrf = [false, false, false, false, false, false] ;
			let arrm = [false, false, false, false, false, false] ;
			ansf[num]= (5-ans.f)*2 ;
			ansm[num]= (5-ans.m)*2 ;
			if(ttpQues[num+1])
			{	//console.log(ansf, ansm) ;
				if(ansf[num+1] !== -1)
				{	arrf[5-ansf[num+1]/2] = true ;
					arrm[5-ansm[num+1]/2] = true ;
					this.setState({num: num+1, checkf: arrf, checkm: arrm }) ;
				}
				else
					this.setState({num: num+1, checkf: arrf, checkm: arrm, ans: {f: -1, m: -1} }) ;
			}				
			else
				this.props.changeMode('confirm') ;
		}
		else
			this.setState({warning: quesData.error[lang]}) ;
	}



	onPrevClick = () => {
		const {num} = this.state ;
		
		// Converting 10, 8, 6 etc into 0, 1, 2
		// console.log(5-ansf[num-1]/2, 5-ansm[num-1]/2) ;
		
		let arrf = [false, false, false, false, false, false] ;
		let arrm = [false, false, false, false, false, false] ;
		arrf[5-ansf[num-1]/2] = true ;
		arrm[5-ansm[num-1]/2] = true ;
		let obj = {f: 5-ansf[num-1]/2, m: 5-ansm[num-1]/2}

		// console.log(arrf, arrm) ;
		this.setState({num: num-1, checkf: arrf, checkm: arrm, ans: obj }) ; 
	}

	render()
	{	const {num} = this.state ;
		const {lang} = this.props ;
		return (
			<div className="question"> 
				<p> {parseInt(num) + 1}. &nbsp; {quesData.pre[lang]} &nbsp;&nbsp;
					<span className="ques-color">{ttpQues[num][lang]} 
				</span></p>
				<div className="radio-con ttp-radio-con">
					<div> <strong>{quesData.father[lang]}:</strong> 
						<RadioSet lang={lang} name={'f'} changeAnswer={this.changeAnswer} change={this.changeArray} num={num} check={this.state.checkf}/> 
					</div>
					<div> <strong>{quesData.mother[lang]}:</strong>
					 	<RadioSet lang={lang} name={'m'} changeAnswer={this.changeAnswer} change={this.changeArray} num={num} check={this.state.checkm}/> 
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
		if(this.props.token === "")
			return (
				<div className="blue-bg blue-form">
					<p> You need to 
						<Link to="/login" className="btn3"> Login </Link>
						 or 
						<Link to="/register" className="btn3"> Register </Link> 
						to take this test (you will be redirected to home page) 
					</p>
				</div>
			) ; 
		else
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

	calculateScore = (type) => {
		return ansf.map( (x ,i) => (x+ansm[i])/4 );
	}

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
		case 'finish' : let total = this.calculateScore() ;

						let obj2 = {
							test: 'leta',
							result: {	ans: total, ansf, ansm,
										t: ansf.reduce((x,y)=>x+y) + ansm.reduce((x,y)=>x+y)
						 	} 
						} ;
						
						console.log(obj2) ;

						fetch('https://psy-api.herokuapp.com/test',{
							method : 'post' ,
							headers : { 'Content-Type' : 'application/json' ,
										'Authorization' : 'Bearer ' + this.props.token} ,
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
							<div> {this.getEvaluation(total)} </div>
							<p> {resultData.p2[lang]} <br/>
								{resultData.p3[lang]} </p>
						</div>
						) ;
						//eslint-disable-next-line
						break ;
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

	getEvaluation = (total) => {
		const {lang} = this.state ;
		return total.map( (one, i) => <div key={i} className="result-row"><p className="res-sno">{i+1}.</p><p className="res-ques">{ttpQues[i][lang]}</p><p className="res-res">{one}</p><p className="res-lvl">{this.returnLevel(one)}</p></div>) ;
	}

	returnLevel = (score) => {
		const {lang} = this.state ;
		if (score > 3)
		{	if(score > 4)
				return resultData.vh[lang] ;
			else
				return resultData.hi[lang] ;
		}
		else
		{	if(score > 2)
				return resultData.md[lang] ;
			else
				if(score > 1)
					return resultData.lo[lang] ;
				else
					return resultData.vl[lang] ;					
		}
	}

	componentWillUnmount = () =>{
		ansf = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,] ;
		ansm = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,] ;
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