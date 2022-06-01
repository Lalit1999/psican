import {inst, subData} from './langdata.js' ;

const returnEngHindi = (value) => `${value.english} / ${value.hindi}` 

const StartDisplay = ({onBtnClick}) => {
	return (
		<div className="start-div">
			<h2 className="start-title"> {returnEngHindi(inst.head)} </h2>
			<ul>
				<li>{returnEngHindi(inst.l1)}</li>
				<li>{returnEngHindi(inst.l2)}</li>
				<li>{returnEngHindi(inst.l3)}</li>
				<li>{returnEngHindi(inst.l4)}</li>
				<li>{returnEngHindi(inst.l5)}</li>
			</ul>
			<div className="start-btn-con">
				<button className="sched-btn" onClick={onBtnClick} children={returnEngHindi(inst.btnText)} />
			</div>
		</div> 
	)
}

const ConfirmDisplay = ({onNoClick, onYesClick}) => {
	return (
		<div className="question">
			<p>{returnEngHindi(subData.subNote)}</p>
			<div className="next-btn-con proceed-con">
				<button className="sched-btn" onClick={onNoClick} children={returnEngHindi(subData.revBtn)} />
				<button className="sched-btn" onClick={onYesClick} children={returnEngHindi(subData.subBtn)} />
			</div>
		</div>   
	) ;
}

export {StartDisplay, ConfirmDisplay} ;