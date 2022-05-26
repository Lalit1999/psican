import Image from 'react-bootstrap/Image' ;
import Button from 'react-bootstrap/Button' ;

import './imagetitle.css' ;

const ImageTitle = ({image, title, subTitle, btnText, p1, p2}) => {
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
					<Button className="sched-btn"> Take Test Now </Button>
				</div>
			</div>
			<div className="it-image">
				<div className="it-img-con" children={<Image src={image} />} />
			</div>
		</div>
	) ;
}

export default ImageTitle ;