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
								<iframe title = "map" width="1100" height="400" id="gmap_canvas" 
								src="https://maps.google.com/maps?q=magolpuri%20market%20&t=&z=13&ie=UTF8&iwloc=&output=embed" 
								frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
							</div>
						</div>
					</div>
					<div>
						<h3>Contact Information</h3>
						<div>
							<p><FontAwesomeIcon icon = {faMap} />&nbsp;{this.state.data.address}</p>
							<p><FontAwesomeIcon icon = {faPhoneAlt} />&nbsp;{this.state.data.phone}</p>
							<p><FontAwesomeIcon icon = {faEnvelope} />&nbsp;{this.state.data.email}</p>
						</div>
					</div>
				</div>
				
			</div>
		) ;
	}
}

export default Footer ;