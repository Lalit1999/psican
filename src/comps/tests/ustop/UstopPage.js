import {useRef} from 'react' ;

import Heading from '../../Heading/Heading.js' ;
import Ustop from './Ustop.js' ;
import ImageTitle from '../../imagetitle/ImageTitle.js' ;

import test from '../../../images/ustop1.jpg' ;

const UstopPage = () => {
	const myRef = useRef(null) ;
	const itProps = {
		image: test,
		title: 'USTOP',
		subTitle: <h6><span className="green">U</span>NDERSTANDING&ensp;<span className="green">S</span>ELF&ensp;<span className="green">T</span>HROUGH&ensp;<span className="green">O</span>BSERVABLE&ensp;<span className="green">P</span>ARAMETERS</h6>,
		btnText: 'Take Test Now',
		btnClick: () => myRef.current.scrollIntoView() ,
		p1: 'चिंता हमारे व्यवहार, स्वास्थ्य, मनोदशा और कार्य क्षमता पर अत्यधिक प्रभाव डालती है । अपनी चिंता को स्वयं जानें व उसके निदान को समझें ।',
		p2: 'Anxiety has deep impact on one\'s Behaviour, Health, Mental Status and Efficiency. Know your Anxiety level yourself and understand how you can help yourself.',
	}

	return(
		<div className="test-inner-page"> 
			<ImageTitle {...itProps} />
			<div className="leta-text">
				<div className="leta-left">
					<Heading text="USTOP Test Features" />
					<p className="intro"><span className="bold">Test Cost :</span> ₹ 500 </p>
					<p className="intro"><span className="bold">Approximate Duration :</span> 15-20 Minutes </p>
					<p className="intro"> Confidential & Convenient </p>
				</div>
				<div className="leta-right">
					<Heading text="About USTOP Test" />
					<p className="intro"> Anxiety is defined as an emotional state characterised by feeling of tension, worrysome thoughts and bodily changes. Anxiety can impact an individual's well being, performance and responses.</p>
					<p className="intro bold"> DISCLAIMER : The present assessment is a non-standardized attempt to provide a basic understanding and interpretation of an individual's state of anxiety. </p>
					<p className="intro bold"> It is advised to understand and correlate the findings with clinical assessment or with presented symptoms, with the help of a healthcare Professional/Psychologist.
					</p>
				</div>
			</div>
			<Heading text="Take USTOP Test" ref={myRef} />
			<Ustop />
			<p className="intro bold support"> Having Technical issues? <a className="sched-btn" href="mailto:myarth.tech@gmail.com" target="_blank" rel="noopener noreferrer"> Contact Technical Support </a>
			</p>
		</div>
	) ;
}

export default UstopPage ;