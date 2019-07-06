import React from 'react' ;
import './Footer.css' ;

class Footer extends React.Component
{
	render()
	{
		return(
			<div>
				<div className = 'map'>
					<div className="mapouter">
						<div className="gmap_canvas">
							<iframe title = "map" width="1100" height="400" id="gmap_canvas" 
							src="https://maps.google.com/maps?q=magolpuri%20market%20&t=&z=13&ie=UTF8&iwloc=&output=embed" 
							frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
						</div>
					</div>
				</div>
				
			</div>
		) ;
	}
}

export default Footer ;