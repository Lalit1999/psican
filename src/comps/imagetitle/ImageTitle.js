import Image from 'react-bootstrap/Image' ;
import Button from 'react-bootstrap/Button' ;

import './imagetitle.css' ;

const ImageTitle = ({image, title, subTitle, btnText, btnClick, p1, p2, value="test"}) => {

	return(
		<div className="image-title">
			<div className="it-left">
				<div className="it-left-top">
					<h4>{title}</h4>
					{ subTitle }
				</div>
				<div className="it-left-bottom">
					<p children={p1} />
					<p children={p2} /> 
					{value==="test"?(<Button className="sched-btn" onClick={btnClick}> Take Test Now </Button>):null}
				</div>
			</div>
			<div className="it-image">
				<div className="it-img-con" children={<Image src={image} />} />
			</div>
		</div>
	) ;
}

export default ImageTitle ;