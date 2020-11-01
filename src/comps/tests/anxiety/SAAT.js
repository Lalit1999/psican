import React from 'react' ;
import {Link} from 'react-router-dom' ;

import { addNotif } from '../../notif.js' ;
import './saat.css' ;

import {inst, quesData} from './langdata.js' ;
import {radioData} from './radioData.js' ;
import {saatQues} from './queData.js' ;

let ans = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,] ;

class Question extends React.Component
{	state = {
		checked : [false, false, false, false, false],
		warning : '',
		num: 0 ,
	} ;

	componentDidMount = () => {
		if(ans[0] !== 0)
		{	let arr = [false, false, false, false, false] ;
			arr[ans[0]- 1] = true ;
			this.setState({checked: arr})
		}
	}

	checkWarning = () => {
		if (this.state.warning.length > 0)
			return <p className="warn"> {this.state.warning} </p> ;
		else
			return null ;
	}

	generateRadioBtn = (x) => {
		const {lang} = this.props ;
		return radioData.map( (one,i) => <div className="radio-div" key={i}> <input type="radio" id={i} name={one[lang]} checked={this.state.checked[i]} onChange={() => this.onRadioClick(x, i)}/> {one[lang]} </div>)
	}

	onRadioClick = (no, opt) => {
		const tempArr = [false, false, false, false, false] ;
		tempArr[opt] = true ;
		this.setState({ checked : tempArr, warning: '' });
	}

	onNextClick = () => {
		const {checked, num} = this.state ;
		const {lang} = this.props ;
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
				this.setState({num: num+1, checked: arr}) ;
			}				
			else
				this.props.changeMode('confirm') ;
		}
		else
			this.setState({warning: quesData.error[lang]}) ;
	}

	onPrevClick = () => {
		const {num} = this.state ;
		let arr = [false, false, false, false, false] ;
		arr[ans[num-1]- 1] = true ;
		this.setState({num: num-1, checked: arr}) ;
	}

	render()
	{	const {num} = this.state ;
		const {lang} = this.props ;
		return (
			<div className="question"> 
				<p> {parseInt(num) + 1}. &nbsp; {saatQues[num][lang]} </p>
				<div className="radio-con"> 
					{this.generateRadioBtn(num)}
				</div>
				<div className="next-btn-con">
					{	(num===0)?null:<button className="sched-btn next-btn" onClick={this.onPrevClick}>
					 					&lt;&nbsp;{quesData.prevBtn[lang]} </button>
					} 
					<button className="sched-btn next-btn" onClick={this.onNextClick}>
					 {quesData.nextBtn[lang]}&nbsp;&gt; </button>
				</div>
				{ this.checkWarning() }
				<h4> {quesData.note[lang]} </h4>
			</div> 
		) ;
	}
}

class SAAT extends React.Component
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
					<h3> Self Anxiety Assessment Test (SAAT) </h3> 
					<div className="lang-con"> Change Language: 
						<input type="radio" id={0} name={'lang'} checked={this.state.checked[0]} onChange={() => this.setState({checked: [true, false], lang:'english'})}/> English 
						<input type="radio" id={1} name={'lang'} checked={this.state.checked[1]} onChange={() => this.setState({checked: [false, true], lang:'hindi'})}/> हिन्दी 
					</div>
					{this.checkMode()}
				</div>
			) ;
	}

	calculateScore = (type) => {
		switch(type)
		{	case 's' : return Math.floor((ans.slice(0, 30).reduce((x,y)=>x+y) - 30)/3);
						//eslint-disable-next-line
					   break ;
			case 'a' : return ans.slice(30, 40).reduce((x,y)=>x+y) - 10 ;
						//eslint-disable-next-line
					   break ;
			case 'e' : return ans.slice(40).reduce((x,y)=>x+y) - 10 ;
						//eslint-disable-next-line
					   break ;
			case 't' : return Math.floor((ans.slice(0, 30).reduce((x,y)=>x+y) - 30)/3 + ans.slice(30).reduce((x,y)=>x+y) - 20) ;
						//eslint-disable-next-line
						break ;
			default : return null ;
		}
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
					</ul>
					<div className="start-btn-con">
						<button className="sched-btn" onClick={() => this.setState({mode: 'test'})}> {inst.btnText[lang]} </button>
					</div>
				</div> 
			);
						//eslint-disable-next-line
			break ;
		case 'test' : return <Question changeMode={this.changeMode} lang={this.state.lang}/> ;
						//eslint-disable-next-line
					  break ;
		case 'finish' : let S = this.calculateScore('s') ;
						let A = this.calculateScore('a') ;
						let E = this.calculateScore('e') ;
						let T = this.calculateScore('t') ;
						let obj2 = {
							test: 'saat',
							result: {
								s: S, a: A, e:E, t:T,
								answers: ans 
							} 
						} ;
						
						// fetch('https://psy-api.herokuapp.com/test?name=saat',{
						// 	method : 'post' ,
						// 	headers : { 'Content-Type' : 'application/json' ,
						// 				'Authorization' : 'Bearer ' + this.props.token} ,
						// 	body : JSON.stringify(obj2) ,
						// })
						// .then(res => {
						// 	if(res.ok)
						// 		return res.json() ;
						// 	else
						// 		throw Error(res.statusText) ;
						// })
						// .catch( err  => {
						// 	console.log(err) ; 
						// 	addNotif(err.message, 'error') ;
						// }) ;
						return (
						<div className="question result"> 
							<p> Your S Score is : {S} </p> 
							<p> Your A Score is : {A} </p> 
							<p> Your E Score is : {E} </p> 
							<p> Your Total Score & Anxiety Level is : {T} </p> 
							<p> {this.getEvaluation(T)} </p>
							<p> We request you to remember your S, A and E score (they are stored in your profile) as they may be useful in further consultations with mental health professionals. </p>
							<p> For further consultations/support, Call <br/>
								Mr. Ashish Aggarwal +91-95552-35231 </p>
						</div>
						) ;
						//eslint-disable-next-line
						break ;
		case 'confirm' : return (
				<div className="question">
					<p> Your test will be submitted and result will be calculated, are you sure you want to proceed?. You can also go back to the test and review your answers. </p>
					<div className="next-btn-con proceed-con">
						<button className="sched-btn" onClick={()=>this.setState({mode:'test'})}> Review Answers </button>
						<button className="sched-btn" onClick={()=>this.setState({mode:'finish'})}> Submit&nbsp;&amp;&nbsp;Proceed </button>
					</div>
				</div>   
			) ;
						//eslint-disable-next-line
			break ;
		default: return <div> We have entered an unexpected mode </div> ;
		}
	}

	getEvaluation = (t) => {
		if(t <= 60)
		{	if( t <= 30)
			{	return (
					<React.Fragment>
						You have <span className="eval low"> Optimum Functional Anxiety </span>, which means you have anxiety within normal range and at an optimum level. <br/><br/>

						No intervention in your lifestyle is required. You do not need any counselling.
					</React.Fragment>
				) ;
			}
			else
			{	return (
					<React.Fragment>
						You have <span className="eval mild"> Mild Anxiety </span>, which means you have anxiety slightly above the normal range. Your anxiety may sometimes cause problems in your day-to-day activites. <br/><br/>

						A few Lifestyle changes are needed for you to have lower anxiety levels. You have a little need for Counselling (4-6 sessions in an year). 
					</React.Fragment>
				) ;
			}
		}
		else
		{	if(t <= 90)
			{	return (
					<React.Fragment>
						You have <span className="eval moderate"> Moderate Anxiety </span>, which means you have high anxiety levels which are above the normal range. Your anxiety may be affecting your health and causing problems in your day-to-day life. <br/><br/>

						You require training of Relaxation Techniques to bring down your anxiety levels. You require regular counselling(twice per month) for a short time. 
					</React.Fragment>
				) ;
			}
			else
			{	return (
					<React.Fragment>
						You have <span className="eval high"> Severe Anxiety </span>, which means your anxiety levels are very high as compared to the normal range. Your anxiety may lead to other serious health problems if not taken action against.<br/><br/>

						You should immediately start detailed counselling(once in a week) and continue it for a longer time.
					</React.Fragment>
				) ;
			}
		} 
	}

	componentWillUnmount = () =>{
		ans = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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

export default SAAT ;