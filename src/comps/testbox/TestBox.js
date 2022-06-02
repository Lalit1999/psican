import { Link } from'react-router-dom' ;

import './tb.css' ;

const TestBox = ({title, hin, eng, link}) => {

	return(
		<div className = 'testbox'>
			<p className="tb-hin" dangerouslySetInnerHTML={hin} />
			<Link className="sched-btn" to={link}> Take the Test / टेस्ट लें </Link> 
			<p dangerouslySetInnerHTML={eng} />
			<h2 children={title} />
		</div>
	) ;
}

export default TestBox ;