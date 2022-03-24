import Title from '../title/Title.js' ;
import TestBoxList from '../testbox/TestBoxList.js' ;
import './exam.css' ;

const Exam = () => {
	return(
		<div className="test-page"> 
			<Title name = 'Self Assessment Tests' items={["Home","Test "]}/>
			<p className="intro"> Human behavior and thinking constantly impact each other. 
				Our fundamental attributions for objects, events and relations around us make us
				emotionally susceptible. Here are some self-assessment tests to measure your emotional tendencies. </p>
			<TestBoxList />
		</div>
	) ;
}

export default Exam ;