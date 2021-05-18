import React from 'react' ;
import {Link} from 'react-router-dom' ;

import { addNotif } from '../../notif.js' ;
import './saat.css' ;
import Payment from '../payment/Payment.js' ;

import logo from '../../images/Psyment.webp' ;
import {inst, quesData, subData, resultData, evalData} from './langdata.js' ;
import {radioData} from './radioData.js' ;
import {saatQues} from './queData.js' ;

const coupon_amount = {
    noPayment: 500,
    fullPayment: 0,
    quarterPayment: 125,
    halfPayment: 250,
    threeQuarter: 375,
}

let ans = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,] ;

class Question extends React.Component
{	
	state = {
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
				<p> {parseInt(num,10) + 1}. &nbsp; {saatQues[num][lang]} </p>
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
		payment: false ,
		coupon: 'noPayment' ,
		checked: [true, false]
	}

	componentDidMount = () => {
		fetch("https://psy-api.herokuapp.com/saat-payment/check", {
			method : 'get' ,
			headers : { 'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '+ this.props.token
					  } ,
		}) 
		.then(res => {
			if(res.ok)
				return res.json() ;
			else
				throw Error(res.statusText) ;
		})
		.then(data =>{	
			this.setState({payment: data.answer});
		})  
		.catch( err  => console.log(err, err.message) ) ;
	}

	changeMode = (newMode) => {
		this.setState({mode: newMode});
	}

	loadScript = (src) => {
	    return new Promise((resolve) => {
	        const script = document.createElement("script");
	        script.src = src;
	        script.onload = () => {
	            resolve(true);
	        };
	        script.onerror = () => {
	            resolve(false);
	        };
	        document.body.appendChild(script);
	    });
	}

	displayRazorpay = async () => {
		const {user, token} = this.props ;
	   
	    const res = await this.loadScript("https://checkout.razorpay.com/v1/checkout.js");

	    if (!res) {
	        alert("Payment Gateway failed to load");
	        return;
	    }

	    let result = await fetch("https://psy-api.herokuapp.com/saat-payment", {
			method : 'post' ,
			headers : { 'Content-Type' : 'application/json',
						'Authorization' : 'Bearer '+ token
					  } ,
			body : JSON.stringify({ coupon: this.state.coupon }) 
		});

	    if(result.ok)
	    	result =  await result.json() ;
	    else
			throw Error(result.statusText) ;

	    const { amount, id: order_id, currency } = result;

	    const options = {
	        key: "rzp_live_7U3eAyAgr3NCgu", // Enter the Key ID generated from the Dashboard
	        amount: amount.toString(),
	        currency: currency,
	        name: user.name,
	        description: "SAAT Test for "+user.name,
	        image: { logo },
	        order_id: order_id,
	        handler: async (response) => {
	            const data = {
	                orderCreationId: order_id,
	                razorpayPaymentId: response.razorpay_payment_id,
	                razorpayOrderId: response.razorpay_order_id,
	                razorpaySignature: response.razorpay_signature,
	                amount ,
	            };

	            let result2 = await fetch("https://psy-api.herokuapp.com/saat-payment/success", {
					method : 'post' ,
					headers : { 'Content-Type' : 'application/json',
								'Authorization' : 'Bearer '+ token
						} ,
					body: JSON.stringify(data) ,
				});

				if(result2.ok)
			    	result2 =  await result2.json() ;

	            this.setState({payment: true}) ;
	        },
	        prefill: {
	            name: user.name,
	            email: user.email,
	            contact: user.mobile,
	        },
	        notes: {
	            address: user.name + ' ' + user.mobile + ' ' + user.email ,
	        },
	        theme: {
	            color: "#61dafb",
	        },
	    };

	    const paymentObject = new window.Razorpay(options);
	    paymentObject.open();
	}

	changeCoupon = (str) => {
		if(str === 'fullPayment')
		{
			addNotif('Coupon Applied Successfully', 'success') ;
			this.setState({payment:true}) ;
		}
		else
		{	if(str === 'noPayment')
				addNotif('Coupon expired or already used', 'error') ;
			else
				addNotif('Coupon Applied Successfully', 'success') ;
			this.setState({coupon:str}) ;
		}					
	}

	changePayment = () => {
		this.setState({payment:true}) ;
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
							<p> {resultData.sScore[lang]} : {S} </p> 
							<p> {resultData.aScore[lang]} : {A} </p> 
							<p> {resultData.eScore[lang]} : {E} </p> 
							<p> {resultData.tScore[lang]} : {T} </p> 
							<p> {this.getEvaluation(T)} </p>
							<p> {resultData.p1[lang]} </p>
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

	getEvaluation = (t) => {
		const {lang} = this.state ;
		if(t <= 60)
		{	if( t <= 30)
			{	return (
					<React.Fragment>
						{evalData.stage1.l1[lang]} <span className="eval low">{evalData.stage1.l2[lang]}</span>{evalData.stage1.l3[lang]} <br/><br/>
						{evalData.stage1.l4[lang]}
					</React.Fragment>
				) ;
			}
			else
			{	return (
					<React.Fragment>
						{evalData.stage2.l1[lang]} <span className="eval mild"> {evalData.stage2.l2[lang]}</span>{evalData.stage2.l3[lang]} <br/><br/>
						{evalData.stage2.l4[lang]} 
					</React.Fragment>
				) ;
			}
		}
		else
		{	if(t <= 90)
			{	return (
					<React.Fragment>
						{evalData.stage3.l1[lang]} <span className="eval moderate"> {evalData.stage3.l2[lang]} </span>{evalData.stage3.l3[lang]}<br/><br/>
						{evalData.stage3.l4[lang]} 
					</React.Fragment>
				) ;
			}
			else
			{	return (
					<React.Fragment>
						{evalData.stage4.l1[lang]} <span className="eval high">{evalData.stage4.l2[lang]} </span>{evalData.stage4.l3[lang]}<br/><br/>
						{evalData.stage4.l4[lang]}
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

	checkPayment = () => {
		if(this.state.payment)
			return (
				<div className="test-box">
					<h3> Self Anxiety Assessment Test (SAAT) </h3> 
					<div className="lang-con"> Change Language: 
						<input type="radio" id={0} name={'lang'} checked={this.state.checked[0]} onChange={() => this.setState({checked: [true, false], lang:'english'})}/> English 
						<input type="radio" id={1} name={'lang'} checked={this.state.checked[1]} onChange={() => this.setState({checked: [false, true], lang:'hindi'})}/> हिन्दी 
					</div>
					{this.checkMode()}
				</div>
			) ;
		else 
			return <Payment cost={coupon_amount[this.state.coupon]} token={this.props.token} display={this.displayRazorpay} change={this.changePayment} couponChange={this.changeCoupon} type='saat'/> ;
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
			return this.checkPayment() ;
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