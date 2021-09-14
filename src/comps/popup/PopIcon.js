import React, {useState} from 'react' ;
import Popup from 'reactjs-popup' ;

import './pop.css' ;

const PopIcon = ({children}) => {
	const [open, setOpen] = useState(false) ;

	return (
		<div onClick={() => setOpen(!open)} className="pop self">
			{children}

			<Popup open={open} closeOnDocumentClick onClose={() => setOpen(false)} closeOnEscape>
				<div className="modal popup" >
					<p className="close" onClick={() => setOpen(false)}> &times; </p>
					<div className="popicon-div"> 
						<p>This website has been developed by &ensp;
							<img className="myarth" src={'https://raw.githubusercontent.com/manan999/manan999.github.io/master/logo-black.png'} alt="myarth" />
						</p>
						<p> <img className="myarth" src={'https://raw.githubusercontent.com/manan999/manan999.github.io/master/logo-black.png'} alt="myarth" /> builds websites, web applications, personal portfolio websites and commercial websites. They also provide Social Media & Google marketing Solutions.
						</p>
						<p> For business queries, <br/>
							<strong> E-Mail : </strong> myarth.tech@gmail.com <br/>
							<strong> Call / Whatsapp :</strong> +91-96251-04067, +91-96251-62446
						</p> 
					</div>
				</div>
			</Popup>
		</div>
		) ;
}

export default PopIcon ; 