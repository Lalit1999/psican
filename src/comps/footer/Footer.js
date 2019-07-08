import React from 'react' ;
import './Footer.css' ;
import { faPhoneAlt, faEnvelope, faMap} from '@fortawesome/free-solid-svg-icons' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;


class Footer extends React.Component
{	
	constructor(props)
	{
		super(props) ;
		this.state = {
			data : {}
		}
	}
	componentDidMount = () => {
		fetch('https://b-tiles-api.herokuapp.com/data?name=Contact')
		.then( res => {
			    if ( res.ok )
	              return res.json() ;
	            else 
	              throw Error(res.statusText)
	          } )
	    .then( resp => {
	            // console.log(resp) ;
	            this.setState({data: resp});
	                	} )
	    .catch( err => console.log(err) ) ;
	}
	render()
	{
		return(
			<div>
				<div className = 'ic'>
					<div className = 'map'>
						<div className="mapouter">
							<div className="gmap_canvas">
								<iframe title = "map" width="600" height="400" id="gmap_canvas" 
								src="https://maps.google.com/maps?q=magolpuri%20market%20&t=&z=13&ie=UTF8&iwloc=&output=embed" 
								frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
							</div>
						</div>
					</div>
					<div>
						<div className = 'conte'>
							<h3><ins>Contact Information</ins></h3>
							<div>
								<p><FontAwesomeIcon icon = {faMap} />&nbsp;XYZ street, Main Road,ABC , Delhi - 45</p>
								<p><FontAwesomeIcon icon = {faPhoneAlt} />&nbsp;+91-9555-235-231</p>
								<p><FontAwesomeIcon icon = {faEnvelope} />&nbsp;psican@gmail.com</p>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		) ;
	}
}

export default Footer ;
								// <p><FontAwesomeIcon icon = {faMap} />&nbsp;{this.state.data.address}</p>
								// <p><FontAwesomeIcon icon = {faPhoneAlt} />&nbsp;{this.state.data.phone}</p>
								// <p><FontAwesomeIcon icon = {faEnvelope} />&nbsp;{this.state.data.email}</p>