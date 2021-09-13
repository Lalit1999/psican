import React, {useState} from 'react' ;

import {quesData} from './langdata.js' ;
import {radioData, radioData2} from './radioData.js' ;
import {saatQues} from './queData.js' ;

const val = [ [1, 0], [0, 2, 3], [0, 1, 2, 3] ] ;

const AccisQuestion = ({changeMode, lang, ans}) => {
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
			if(saatQues[num+1])
			{	if(saatQues[num+1][lang] !== 0)
					arr[ val[ (num+1)%3 ][ ans[num+1] ] ] = true ;
				setNum(num+1);
				setChecked(arr) ;
			}				
			else
				changeMode('confirm') ;
		}
		else
			setWarning(quesData.error[lang]) ;
	}

	const radioMap = (one,i) => {
		return (
			<div className="radio-div" key={i}> 
				<input type="radio" id={i} name={one[lang]} checked={checked[i]} onChange={()=>onRadioClick(num, i)}/> 
					{one[lang]} 
			</div>
		) ;
	}

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
		<div className="question"> 
			<p> {parseInt(num,10) + 1}. &nbsp; {saatQues[num][lang]} </p>
			<div className="radio-con"> 
				{(num%3===0)?radioData.map(radioMap):radioData2.map(radioMap)}
			</div>
			<div className="next-btn-con">
				{	(num===0)?null:<button className="sched-btn next-btn" onClick={onPrevClick}>
				 					&lt;&nbsp;{quesData.prevBtn[lang]} </button>
				} 
				<button className="sched-btn next-btn" onClick={onNextClick}>
				 {quesData.nextBtn[lang]}&nbsp;&gt; </button>
			</div>
			{ checkWarning() }
			<h4> {quesData.note[lang]} </h4>
		</div>
	) ;
}

export default AccisQuestion ;