import { radioData } from './radioData.js';
import returnEngHindi from '../../returnEnglishHindi.js' ;

const RadioSet = ({changeAnswer, change, name, check}) => {

	const onRadioClick = (option) => {
		const tempArr = [false, false, false, false, false, false] ;
		tempArr[option] = true ;
		changeAnswer(option, name) ;
		change(tempArr, name) ;
	}

	return radioData.map( (one,i) => <div className="radio-div" key={i}> <input type="radio" id={i} name={returnEngHindi(one)+' '+name} checked={check[i]} onChange={() => onRadioClick(i)}/> {returnEngHindi(one)} </div>)
}

export default RadioSet ; 