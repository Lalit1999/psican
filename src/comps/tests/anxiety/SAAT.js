import React from 'react' ;
import {Link} from 'react-router-dom' ;

import './saat.css' ;

const radio = ['Never' ,'Rarely', 'Sometimes', 'Mostly', 'Always'] ;

const ques = ["I am alert about my surroundings and my neighbourhood",
 "I can become easily irritated by others", "I am rejected by people around me",
 "I am restless about things and activites that are happening around me",
 "I am not easily satisfied by others' explanation of things or events",
 "I am misunderstood by people around me",
 "I am unable to decide easily about things and events"] ;

const ans = [0, 0, 0, 0, 0, 0, 0] ;

const tempArr = [false, false, false, false, false];

class Question extends React.Component
{	state = {
		checked : [false, false, false, false, false],
		warning : '',
		num: 0 ,
	} ;

	checkWarning = () => {
		if (this.state.warning.length > 0)
			return <p className="warn"> {this.state.warning} </p> ;
		else
			return null ;
	}

	generateRadioBtn = (x) => {
		return radio.map( (one,i) => <div key={i}> <input type="radio" id={i} name={one} checked={this.state.checked[i]} onChange={() => this.onRadioClick(x, i)}/> {one} </div>)
	}

	onRadioClick = (no, opt) => {
		tempArr[0] = tempArr[1] = tempArr[2] = tempArr[3] = tempArr[4] = false ;
		tempArr[opt] = true ;
		this.setState({ checked : tempArr, warning: '' });
	}

	onNextClick = () => {
		const {checked, num} = this.state ;
		console.log(ques[num+1], checked) ;
		if( checked[0] || checked[1] || checked[2] || checked[3] || checked[4] )
			//store bhi karana hai
			this.setState({num: num+1, checked: [false, false, false, false, false]}) ;
		else
			this.setState({warning: 'You must select at least 1 option'}) ;
	}

	render()
	{	const {num} = this.state ;
		return (
			<div className="question"> 
				<p> {parseInt(num) + 1}. &nbsp; {ques[num]} </p>
				<div className="radio-con"> 
					{this.generateRadioBtn(num)}
				</div>
				<div className="next-btn-con">
					<button className="sched-btn next-btn" onClick={this.onNextClick}>
					 Next&nbsp;&gt; </button> 
				</div>
				{ this.checkWarning() }
			</div> 
		) ;
	}
}

class SAAT extends React.Component
{
	state = {
		mode : 'start' ,
		checked: false ,
		warning : '',
		quesNo: '0'
	}

	onCheck = () => {
		let str = (this.state.checked)?false:true ;
		this.setState({checked: str, warning: ''});
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
					{this.checkMode()}
				</div>
			) ;
	}

	onStartClick = () => {
		if(this.state.checked)
			this.setState({mode: 'test'});
		else
			this.setState({warning: 'You must read instructions and give your consent before starting the test'})
	}

	checkWarning = () => {
		if (this.state.warning.length > 0)
			return <p className="warn"> {this.state.warning} </p> ;
		else
			return null ;
	}

	checkMode = () => {
		if (this.state.mode === 'start')
			return (
				<div className="start-div">
					<h2 className="start-title"> INSTRUCTIONS </h2>
					<ul>
						<li>Please read each statement carefully and answer as per your best understanding and true feelings. </li>
						<li>All statements must be answered (No Question can be left blank) </li>
						<li>There is no right or wrong answer to any question, everything is specific to each person. </li>
						<li>There is no time limit for this test however do not take longer than 30 minutes because it reduces the quality of results. </li>
						<li>The Score received at the end of the test should be saved by the taker of the test. This is because in case of future consultations with a mental health professional, those scores will help a lot with their diagnosis.</li>
					</ul>
					<div className="check-con"> 
						<input type="checkbox" name="ok" onChange={this.onCheck} value={this.state.checked}/> &nbsp;
						I have read all the instructions and understood them. I will answer all the questions honestly and truthfully.
					</div> 
					<div className="start-btn-con">
						{ this.checkWarning() }
						<button className="sched-btn" onClick={this.onStartClick}> Start Test </button>
					</div>
				</div> 
			);
		else if(this.state.mode==='test')
			return <Question /> ;
		//result dikhana hai
	}

	render()
	{
		return(
			<div>
				{this.checkLoggedIn()}
			</div>
		) ;
	}
}

export default SAAT ;