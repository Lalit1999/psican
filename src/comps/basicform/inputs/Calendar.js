import {useState, useEffect} from 'react' ;
import Col from 'react-bootstrap/Col';

import './calendar.css' ;

const times = ['11:00 am', '11:30 am', '12:00 pm', '12:30 pm', '01:00 pm']

const Calendar = ({data, onInputChange, value}) => {
	const [dates, setDates] = useState([]) ;
	const [selectedDate, setSelectedDate] = useState('') ;
	const [selectedTime, setSelectedTime] = useState('') ;
	const {name, options} = data ;

	useEffect(() => {
		//Dates ki array me se split use karke only date ko alag kar rahe hai, then usko "Set" (maths wala) banaya taaki duplicate dates hat jaye, then us "Set" ko ... use karke vapas array banaya, aur fir us array ko setDates me bhej kar set karwa rahe hai
		setDates([...new Set(options.map(one => one.split(' ')[1]+' '+one.split(' ')[2]))]) ;
	}, [options]) ;

	const returnTimes = () => {
		if(selectedDate !== '')
			return times.map((one, i) => {
				let sel = one === selectedTime?'selected':'' ;
				return <p key={i} className={`cal-time ${sel}`} onClick={()=>{
					setSelectedTime(one) ;
					onInputChange(name, selectedDate+' '+one) ;
				}}>{one}</p>
			}) ;
	}

	return (
		<Col md>
			<div className="calendar">
				<div className="calendar-left">
					{dates.map((one, i) => {
						let text = one.split(' ') ;
						let sel = one === selectedDate?'selected':'' ;
						return (
							<div key={i} className={`cal-date ${sel}`} onClick={()=>{
								setSelectedDate(one) ;
								setSelectedTime('') ;
							}}>
								<p className="date-num">{text[0]}</p>
								<p className="date-month">{text[1].slice(0, 3)}</p>
							</div>
						) ;
					})}
				</div>
				<div className="calendar-right">
					{returnTimes()}
				</div>
			</div>
		</Col>
	) ;
}

export default Calendar ;