import {useState, useEffect} from 'react' ;
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import './calendar.css' ;

const times = ['11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '01:00 pm']

const Calendar = ({data, onInputChange, value}) => {
	const [dates, setDates] = useState([]) ;
	const {name, label, options} = data ;

	useEffect(() => {
		//Dates ki array me se split use karke only date ko alag kar rahe hai, then usko "Set" (maths wala) banaya taaki duplicate dates hat jaye, then us "Set" ko ... use karke vapas array banaya, aur fir us array ko setDates me bhej kar set karwa rahe hai
		setDates([...new Set(options.map(one => one.split(' ')[1]+' '+one.split(' ')[2]))]) ;
	}, [options]) ;

	const returnTimes = (str) => {
		return times.map((one, i) => {
			let sel = (str+' '+one) === value?'select2':'' ;
			return <p key={i} className={`cal2-time ${sel}`} onClick={()=>onInputChange(name,str+' '+one)}>{one}</p>
		}) ;
	}

	return (
		<Col md>
			<div className="calendar cal2">
				{ dates.slice(0, 7).map((one, i) => {
					return (
						<div key={i} className="cal2-date">
							<p className="cal2-left"> {one}</p>
							<div className="cal2-right">{returnTimes(one)}</div>
						</div>
					) ;
				})}
			</div>
		</Col>
	) ;
}

export default Calendar ;