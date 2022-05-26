import Leta from './Leta.js' ;
import Heading from '../../Heading/Heading.js' ;
import ImageTitle from '../../imagetitle/ImageTitle.js' ;

import test from '../../../images/test.jpeg' ;

const LetaPage = () => {
	const itProps = {
		image: test,
		title: 'LETA',
		subTitle: <h6><span className="green">L</span>EARNING&ensp;<span className="green">E</span>NVIRONMENT&ensp;<span className="green">T</span>RAITS&ensp;<span className="green">A</span>SSESSMENT</h6>,
		btnText: 'Take Test Now',
		p1: 'माता पिता के कौन से गुण स्वभाविक रूप से बच्चो में आने की सम्भावना है... स्वयँ जाने',
		p2: 'Which parental qualities are likely to reflect in your children naturally... Know Yourself',
	}

	return(
		<div> 
			<ImageTitle {...itProps} />
			<div className="leta-text">
				<div className="leta-left">
					<Heading text="LETA Test Features" />
					<p className="intro"><span className="bold">Test Cost :</span> ₹ 200 </p>
					<p className="intro"><span className="bold">Approximate Duration :</span> 15 Minutes </p>
					<p className="intro"> Suited for aspiring parents or parents of children upto 12 years of age.</p>
					<p className="intro"><span className="bold">It is a Couple Test</span>&ensp;(For Both Parents Only)</p>
				</div>
				<div className="leta-right">
					<Heading text="About LETA Test" />
					<p className="intro">LETA is an attempt to measure the level of 30 personality traits in parents (both mother and father) of any growing child (2 - 12 years).</p>
					<p className="intro"> The observations and findings of this test may be corelated to observed and presented findings by a mental health professional.</p>
					<p className="intro bold"> DISCLAIMER : The present assessment is a non-standard attempt to provide a basic understanding of a child's probability to express traits based on his/her parents.</p>
				</div>
			</div>
			<Heading text="Take LETA Test" />
			<Leta />
			<p className="intro bold support"> Having Technical issues? <a className="sched-btn" href="mailto:myarth.tech@gmail.com" target="_blank" rel="noopener noreferrer"> Contact Technical Support </a>
			</p>
		</div>
	) ;
}

export default LetaPage ;