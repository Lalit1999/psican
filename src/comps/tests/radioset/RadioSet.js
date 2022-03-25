import { radioData } from './radioData.js';

const RadioSet = ({changeAnswer, change, name, lang, check}) => {

	const onRadioClick = (option) => {
		const tempArr = [false, false, false, false, false, false] ;
		tempArr[option] = true ;
		changeAnswer(option, name) ;
		change(tempArr, name) ;
	}

	return radioData.map( (one,i) => <div className="radio-div" key={i}> <input type="radio" id={i} name={one[lang]+' '+name} checked={check[i]} onChange={() => onRadioClick(i)}/> {one[lang]} </div>)
}

export default RadioSet ; 