import {useState, useEffect} from 'react' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons' ;

import CheckBtn from '../CheckBtn.js' ;
import {quesData} from './langdata.js' ;
import {test4Ques} from './queData.js' ;

import './test4.css' ;
 
const optionData = [0, 1, 2, 3, 4, 5] ;

const returnEngHindi = (value) => `${value.english} / ${value.hindi}` 

const Test4Question = ({setWarning, checkedValues, setCheckedValues, num}) => {
	const [checked, setChecked] = useState([false, false, false, false, false, false]) ;

	useEffect( () => {
		let arr = [false, false, false, false, false, false] ;
		arr[checkedValues[num]] = true ;
		setChecked(arr) ;
		//eslint-disable-next-line
	}, [num]) ; 

	const onRadioClick = (opt) => {
		const tempArr = [false, false, false, false, false, false] ;
		tempArr[opt] = true ;
		setChecked(tempArr) ;
		setWarning('') ;
		setCheckedValues({ ...checkedValues, [num]:opt}) ;
	}

	const radioMap = (one,i) => <CheckBtn key={i} styles="check-btn test4-check-btn" onClick={()=>onRadioClick(i)} checked={checked[i]} text={one} />

	return (
		<div className="radio-con test4-radio-con"> 
			<p> {num+1}. &nbsp; {returnEngHindi(test4Ques[num])} </p>
			<div className="test4-radio">{optionData.map(radioMap)}</div>
		</div>
	) ;
}

const Test4QuestionList = ({changeMode, checkedValues, setCheckedValues}) => {
	const [warning, setWarning] = useState('') ;	
	const [page, setPage] = useState(0) ;	

	const onPrevClick = () => setPage(page-6)

	const onNextClick = () => {
		if(Object.keys(checkedValues).filter(one =>(one >= page)&&(one < page+6)).length > 5) {	
			if(test4Ques[page+6]) 
				setPage(page+6);
			else
				changeMode('confirm') ;
		}
		else
			setWarning(returnEngHindi(quesData.error)) ;
	}

	const checkWarning = () => {
		if (warning.length > 0)
			return <p className="warn"> {warning} </p> ;
	}

	const t4qProps = {setWarning, setCheckedValues, checkedValues} ;

	return (
		<div className="question test4">
			{   // iska optionData se lena dena nahi hai, kyonki same array thi isilye use map kara hai
				optionData.map( one => <Test4Question key={one} num={page+one} {...t4qProps} />)
			} 
			<div className="next-btn-con">
				{	(page===0)?null:<button className="sched-btn next-btn" onClick={onPrevClick}><FontAwesomeIcon icon={faChevronLeft} />&nbsp;{returnEngHindi(quesData.prevBtn)} </button>
				} 
				<button className="sched-btn next-btn" onClick={onNextClick}> {returnEngHindi(quesData.nextBtn)}&nbsp;<FontAwesomeIcon icon={faChevronRight} /> </button>
			</div>
			{ checkWarning() }
		</div>
	) ;
}

export default Test4QuestionList ;