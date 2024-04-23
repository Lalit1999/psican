import { Link } from 'react-router-dom' ;

import './tb.css' ;

const TestBox = ({title, hin, eng, link, image}) => {

	return(
		<div className = 'testbox'>
			<h2>{title}</h2>
			<img className="tb-img" src={image} alt={title} />
			<p className="tb-hin" dangerouslySetInnerHTML={hin} />
			<p dangerouslySetInnerHTML={eng} />
			<Link className="sched-btn" to={link}> Take the Test / टेस्ट लें </Link> 
		</div>
	) ;
}

export default TestBox ;