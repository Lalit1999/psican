import React from 'react' ;
import {Link} from 'react-router-dom' ;

import './saat.css' ;

const radio = ['Never' ,'Rarely', 'Sometimes', 'Mostly', 'Always'] ;

const ques = ["I am alert about my surroundings and my neighbourhood",
 "I can become easily irritated by others", "I am rejected by people around me",
 "I am restless about things and activites that are happening around me",
 "I am not easily satisfied by others' explanation of things or events",
 "I am misunderstood by people around me", "I feel nervous while doing things",
 "I am unable to decide easily about things and events",
 "I resort to crying while talking and explaining things to others",
 "I want to be in the company of others so that  I feel secure",
 "I am unable to concentrate on the task that I am doing",
 "I feel surrounded by unwanted negative thoughts in everything I do",
 "I keep thinking about things long after they are over and done with",
 "I am fearful about day to day events and harms they may cause", 
 "I think my performance in my tasks and responsibilities is below my actual level",
 "I avoid things and events that I am not comfortable about",
 "I am not able to let go of things and events of the past",
 "Events and things stay in my mind and heart forever",
 "I often feel its not me but someone else inside me who is doing things",
 "I am conscious about losing control of things and events around me",
 "I feel tired and drained out", "I experience sudden profuse sweating",
 "I can feel my heart thumping in my chest", "I experienced disturbed sleep or no sleep at all",
 "I can feel visible trembling in my hands and legs", "I feel faint while doing things", 
 "I run out of breath and need to sit calmly to become normal again", 
 "I expreienced discomfort in my tummy/gas/constipation or loosemotions",
 "I feel cold & numb in my toes & fingers", "I feel like my chest is tight & I may choke",
 "Certain People, things or behaviours make me freak out and tensed",
 "I get tensed few times in a day", "My tensions stay with me for some time then they go away", 
 "Some events and situations make me concerned and apprehensive",
 "I think I am a tense and uneasy person", "My tense state affects my daily routine",
 "I think I am worthless and Non-contributing", 
 "Life is a constant struggle and there is nothing much you can do about it",
 "I feel there is no point in showing your capabilities, its better to shut yourself down",
 "I give up on things beyond a point and call it quits",
 "I do fingers tapping on flat surface and shake me legs while sitting",
 "I eat the skin around my nails or bite my lips",
 "I bite my nails to keep them short", 
 "I experience situations where I am not able to speak. Even if I try to, my words just don't come out",
 "I end up eating extra and then I regret doing that", "I resort to pricking, cutting or injuring self",
 "I experience relief in some situations only after having a smoke/whiskey/beverage",
 "I absent myself from events and social engagements", "I pull my hair around my forehead, face or hands",
 "I am not able to go along well with friends and realtives long term"] ;

const ans = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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
		return radio.map( (one,i) => <div key={i}> <input type="radio" id={i} name={one} checked={this.state.checked[i]} onChange={() => this.onRadioClick(x, i)}/> {one} </div>)
	}

	onRadioClick = (no, opt) => {
		const tempArr = [false, false, false, false, false] ;
		tempArr[opt] = true ;
		this.setState({ checked : tempArr, warning: '' });
	}

	onNextClick = () => {
		const {checked, num} = this.state ;
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
			if(ques[num+1])
			{	if(ques[num+1] !== 0)
					arr[ans[num+1]- 1] = true ;
				this.setState({num: num+1, checked: arr}) ;
			}				
			else
				this.props.changeMode('confirm') ;
		}
		else
			this.setState({warning: 'You must select at least 1 option'}) ;
	}

	onPrevClick = () => {
		const {num} = this.state ;
		let arr = [false, false, false, false, false] ;
		arr[ans[num-1]- 1] = true ;
		this.setState({num: num-1, checked: arr}) ;
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
					{	(num===0)?null:<button className="sched-btn next-btn" onClick={this.onPrevClick}>
					 					&lt;&nbsp;Previous </button>
					} 
					<button className="sched-btn next-btn" onClick={this.onNextClick}>
					 Save&nbsp;&amp;&nbsp;Next&nbsp;&gt; </button>
				</div>
				{ this.checkWarning() }
				<h4> *Note: Your answers will not be recorded if you do not click "Save & Next" </h4>
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

	calculateScore = (type) => {
		console.log(ans) ;
		switch(type)
		{	case 's' : return Math.floor((ans.slice(0, 30).reduce((x,y)=>x+y) - 30)/3);
					   break ;
			case 'a' : return ans.slice(30, 40).reduce((x,y)=>x+y) - 10 ;
					   break ;
			case 'e' : return ans.slice(40).reduce((x,y)=>x+y) - 10 ;
					   break ;
			case 't' : return Math.floor((ans.slice(0, 30).reduce((x,y)=>x+y) - 30)/3 + ans.slice(30).reduce((x,y)=>x+y) - 20) ;
						break ;
			default : return undefined ;
		}
	}

	checkMode = () => {
		switch(this.state.mode)
		{	case 'start' : return (
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
			break ;
		case 'test' : return <Question changeMode={this.changeMode} /> ;
					  break ;
		case 'finish' : let S = this.calculateScore('s') ;
						let A = this.calculateScore('a') ;
						let E = this.calculateScore('e') ;
						let T = this.calculateScore('t') ;
						//store in backend
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
			break ;
		default: return <div> We have entered an unexpected mode </div> ;
		}
	}

	getEvaluation = (t) => {
		if(t <= 60)
		{	if( t <= 30)
			{	return (
					<React.Fragment>
						You have <span className="eval low"> Optimum Functional Anxiety </span>, which means you have anxiety within normal range and at an optimum level. Your anxiety is causing no problems to your day-to-day activites. <br/><br/>

						No intervention in your lifestyle is required. You do not need any counselling.
					</React.Fragment>
				) ;
			}
			else
			{	return (
					<React.Fragment>
						You have <span className="eval mild"> Mild Anxiety </span>, which means you have anxiety slightly above the normal range. Your anxiety sometimes causes problems in your day-to-day activites. <br/><br/>

						A few Lifestyle changes are needed for you to have lower anxiety levels. You have a little to moderate Counselling need (4-6 sessions in an year). 
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

						You should immediately start regular counselling(once in a fortnight) and continue it for a longer time.
					</React.Fragment>
				) ;
			}
		} 
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