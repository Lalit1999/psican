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
			<div className = 'ic'>
				<div className = 'map'>
					<div className="mapouter">
						<div className="gmap_canvas">
							<iframe title = "map" width="600" height="300" id="gmap_canvas" 
							src="https://maps.google.com/maps?q=orn%20remandies%20private%20limited%20deep%20enclave%20ashok%20vihar%20&t=&z=13&ie=UTF8&iwloc=&output=embed" 
							frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
						</div>
					</div>
				</div>
				<div>
					<div className = 'conte'>
						<h3><ins>Contact Information</ins></h3>
						<div>
							<p><FontAwesomeIcon icon = {faMap} />&nbsp;Unit No. 4 , First Floor , CSC ,
											Pocket B & C , Phase - 4 , Ashok Vihar , Delhi - 110052.</p>
							<p><FontAwesomeIcon icon = {faPhoneAlt} />&nbsp;+91-9555-235-231</p>
							<p><FontAwesomeIcon icon = {faEnvelope} />&nbsp;psyment@gmail.com</p>
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
// Unit No.%204%20First%20Floor%20CSC%20Pocket%20B%20&%20C%20Phase%20-%204%20Ashok%20Vihar%20Delhi%20-%20110052

