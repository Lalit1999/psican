import './pop.css' ;

const Popup  = ({open, onCloseClick, children}) => {	
	if (open)
	{	return (
			<div className="pop-con">
				<div className="popup">
					<p className="popup-close" onClick={onCloseClick}>x</p>
					{children}
				</div>
			</div>
		) ;
	}
	else 
		return null ;
}

export default Popup ; 