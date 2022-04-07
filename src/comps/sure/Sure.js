import Button from 'react-bootstrap/Button';

import './sure.css' ;

const Sure = ({descr, onYesClick, onNoClick}) => {
	return(
		<div className="sure-con">
			<h4 className="sure-heading"> Are you Sure? </h4> 
			<p className="sure-description">{descr}</p>
			<div className="sure-buttons">
			    <Button variant="danger" onClick={onYesClick}>I&apos;m Sure</Button>
				<Button variant="success" onClick={onNoClick}>Cancel</Button>
			</div>
		</div>
	) ;
}

export default Sure ;