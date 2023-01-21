import {useRef} from 'react' ;

import Heading from '../../Heading/Heading.js' ;
import Test4 from './Test4.js' ;
import ImageTitle from '../../imagetitle/ImageTitle.js' ;

import test from '../../../images/nhapass.png' ;

const Test4TestPage = () => {
	const myRef = useRef(null) ;
	const itProps = {
		image: test,
		title: 'NHA PASS',
		subTitle: <h6><span className="green">N</span>ATURES&ensp;<span className="green">H</span>ABITS&ensp;<span className="green">A</span>TTITUDES&ensp;<span className="green">P</span>ERSONALITY&ensp;<span className="green">ASS</span>ESSMENT</h6>,
		btnText: 'Take Test Now',
		btnClick: () => myRef.current.scrollIntoView() ,
		p1: 'स्वभाव, आदत और सोचने का तरीका आपके व्यक्तित्व और व्यवहार को बनाते हैं... अपने इन त्रिगुणों को स्वयं जानें व समझें',
		p2: 'Natures, Habits and Attitudes make your personality & behaviours... Know this trinity Yourself',
	}

	return(
		<div className="test-inner-page"> 
			<ImageTitle {...itProps} />
			<div className="leta-text">
				<div className="leta-left">
					<Heading text="NHA PASS Test Features" />
					<p className="intro"><span className="bold">Test Cost :</span> ₹ 500 </p>
					<p className="intro"><span className="bold">Approximate Duration :</span> 10-15 Minutes </p>
					<p className="intro"> This Test is relevant if you are experiencing frustration, coping difficulties and stress leading to inadequate achievement or performance </p>
				</div>
				<div className="leta-right">
					<Heading text="About NHA PASS Test" />
					<p className="intro bold"> DISCLAIMER : The present assessment is a non-standardized attempt to provide a basic understanding and interpretation of an individual's interplay of their natures, habits and attitudes. </p>
					<p className="intro bold"> It is advised to understand and correlate the findings with clinical assessment or with presented symptoms, with the help of a healthcare Professional/Psychologist.
					</p>
				</div>
			</div>
			<Heading text="Take NHA PASS Test" ref={myRef}/>
			<Test4 />
		</div>
	) ;
}

export default Test4TestPage ;