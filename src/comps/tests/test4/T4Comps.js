import {inst, subData} from './langdata.js' ;

import returnEngHindi from '../../returnEnglishHindi.js' ;

const StartDisplay = ({onBtnClick}) => {

	return (
		<div className="start-div">
			<h2 className="start-title"> {returnEngHindi(inst.head)} </h2>
			<ul children={inst.l.map( one => returnEngHindi(one, 'li') )} />
			<div className="start-btn-con">
				<button className="sched-btn" onClick={onBtnClick} children={returnEngHindi(inst.btnText)}/>
			</div>
		</div> 
	)
}

const ConfirmDisplay = ({onNoClick, onYesClick}) => {
	return (
		<div className="question">
			{returnEngHindi(subData.subNote, 'p')}
			<div className="next-btn-con proceed-con">
				<button className="sched-btn" onClick={onNoClick} children={returnEngHindi(subData.revBtn)} />
				<button className="sched-btn" onClick={onYesClick} children={returnEngHindi(subData.subBtn)} />
			</div>
		</div>   
	) ;
}

export {StartDisplay, ConfirmDisplay} ;