import {useState, useEffect} from 'react' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons' ;

import RadioSet from '../radioset/RadioSet.js' ;
import returnEngHindi from '../../returnEnglishHindi.js' ;
import { addNotif } from '../../notif.js' ;
import { quesData } from './langData.js' ;
import { letaQues } from './queData.js' ;

let ansf = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,] ;
let ansm = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
			 -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,] ;


const Question2 = ({changeMode}) => {	

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
			setWarning(returnEngHindi(quesData.error)) ;
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
			<p> {parseInt(num,10) + 1}. &nbsp; {returnEngHindi(quesData.pre)} &nbsp;&nbsp;
				<br/><span className="ques-color">{returnEngHindi(letaQues[num])} 
			</span></p>
			<div className="radio-con ttp-radio-con">
				<div> <strong>{returnEngHindi(quesData.father)}:</strong> 
					<RadioSet  name={'f'} changeAnswer={changeAnswer} change={changeArray} num={num} check={checkf}/> 
				</div>
				<div> <strong>{returnEngHindi(quesData.mother)}:</strong>
				 	<RadioSet name={'m'} changeAnswer={changeAnswer} change={changeArray} num={num} check={checkm}/> 
				 </div>
			</div>
			<div className="next-btn-con">
				{	(num===0)?null:<button className="sched-btn next-btn" onClick={onPrevClick}><FontAwesomeIcon icon={faChevronLeft} />&nbsp;{returnEngHindi(quesData.prevBtn)}</button>
				} 
				<button className="sched-btn next-btn ttp-btn" onClick={onNextClick}>{returnEngHindi(quesData.nextBtn)}&nbsp;<FontAwesomeIcon icon={faChevronRight} /> </button>
			</div>
			{ checkWarning() }
		</div> 
	) ;
}

export default Question2 ;