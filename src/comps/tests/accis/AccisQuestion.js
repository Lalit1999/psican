import {useState} from 'react' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons' ;

import CheckBtn from '../CheckBtn.js' ;
import {quesData} from './langdata.js' ;
import {radioData, radioData2} from './radioData.js' ;
import returnEngHindi from '../../returnEnglishHindi.js' ;
import {accisQues} from './queData.js' ;

const val = [ [1, 0], [0, 2, 3], [0, 1, 2, 3] ] ;

const AccisQuestion = ({changeMode, ans}) => {
	const [checked, setChecked] = useState([false, false, false, false]) ;
	const [warning, setWarning] = useState('') ;	
	const [num, setNum] = useState(0) ;	

	const onPrevClick = () => {
		let arr = [false, false, false, false] ;
		arr[ val[ (num-1)%3 ][ ans[num-1] ] ] = true ;
		setNum(num-1) ;
		setChecked(arr) ;
	}

	const onNextClick = () => {
		if( checked[0] || checked[1] || checked[2] || checked[3])
		{	let arr = [false, false, false, false] ;
			if(checked[0] || checked[1])
			{	if(checked[0])
					ans[num] = (num%3===0?1:0) ;
				else
					ans[num] = (num%3===2?1:0) ; 
			}
			else
			{	
				if(checked[2])
					ans[num] = (num%3===2?2:1) ;
				else
					ans[num] = (num%3===2?3:2) ;
			}	
			if(accisQues[num+1])
			{	if(returnEngHindi(accisQues[num+1]) !== 0)
					arr[ val[ (num+1)%3 ][ ans[num+1] ] ] = true ;
				setNum(num+1);
				setChecked(arr) ;
			}				
			else
				changeMode('confirm') ;
		}
		else
			setWarning(returnEngHindi(quesData.error)) ;
	}

	const radioMap = (one,i) => <CheckBtn key={i} styles="check-btn" onClick={()=>onRadioClick(num, i)} checked={checked[i]} text={returnEngHindi(one)} />

	const onRadioClick = (no, opt) => {
		const tempArr = [false, false, false, false] ;
		tempArr[opt] = true ;
		setChecked(tempArr) ;
		setWarning('');
	}

	const checkWarning = () => {
		if (warning.length > 0)
			return <p className="warn"> {warning} </p> ;
	}

	return (
		<div className="question accis"> 
			<p> {parseInt(num,10) + 1}. &nbsp; {returnEngHindi(accisQues[num])} </p>
			<div className="radio-con"> 
				{(num%3===0)?radioData.map(radioMap):radioData2.map(radioMap)}
			</div>
			<div className="next-btn-con">
				{	(num===0)?null:<button className="sched-btn next-btn" onClick={onPrevClick}><FontAwesomeIcon icon={faChevronLeft} />&nbsp;{returnEngHindi(quesData.prevBtn)} </button>
				} 
				<button className="sched-btn next-btn" onClick={onNextClick}> {returnEngHindi(quesData.nextBtn)}&nbsp;<FontAwesomeIcon icon={faChevronRight} /> </button>
			</div>
			{ checkWarning() }
		</div>
	) ;
}

export default AccisQuestion ;