import {useRef} from 'react' ;

import Heading from '../../Heading/Heading.js' ;
import ACCIS from './ACCIS.js' ;
import ImageTitle from '../../imagetitle/ImageTitle.js' ;
import '../../consult/program.css' ;

import test from '../../../images/test4.jpeg' ;

const AccisTestPage = () => {
	const myRef = useRef(null) ;
	const itProps = {
		image: test,
		title: 'ACCIS',
		subTitle: <h6><span className="green">A</span>SSESSMENT of&ensp;<span className="green">C</span>OGNITIVE&ensp;<span className="green">C</span>OVID&ensp;<span className="green">I</span>MPACT on&ensp;<span className="green">S</span>ELF</h6>,
		btnText: 'Take Test Now',
		btnClick: () => myRef.current.scrollIntoView() ,
		p1: 'COVID ने आपके सोच, व्यक्तिक्त्व और व्यवहार को प्रभावित किया है या नहीं... स्वयँ जाने',
		p2: 'Has COVID impacted your Thinking, Personality and Behavior... Know Yourself',
	}

	return(
		<div> 
			<ImageTitle {...itProps} />
			<div className="leta-text">
				<div className="leta-left">
					<Heading text="ACCIS Test Features" />
					<p className="intro"><span className="bold">Test Cost :</span> ₹ 200 </p>
					<p className="intro"><span className="bold">Approximate Duration :</span> 10-15 Minutes </p>
					<p className="intro"> This test is relevant to you if you are having coping issues in a post-COVID environment. </p>
				</div>
				<div className="leta-right">
					<Heading text="About ACCIS Test" />
					<p className="intro"> ACCIS is aimed at helping an individual to understand the impact of COVID environment and COVID-related anxiety on his/her behaviour, expression, functioning and well-being.</p>
					<p className="intro bold"> DISCLAIMER : The current assessment is a non-standard test. It may give only an assessment of few aspects and may only give a partial assessment. </p>
					<p className="intro bold"> It is advised to understand and correlate the findings with clinical assessment or with presented symptoms with the help of a healthcare Professional/Psychologist.
					</p>
				</div>
			</div>
			<Heading text="Take ACCIS Test" ref={myRef}/>
			<ACCIS />
			<p className="intro bold support"> Having Technical issues? <a className="sched-btn" href="mailto:myarth.tech@gmail.com" target="_blank" rel="noopener noreferrer"> Contact Technical Support </a>
			</p>
		</div>
	) ;
}

export default AccisTestPage ;