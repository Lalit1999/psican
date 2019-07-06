import React from 'react' ;
import Title from '../title/Title.js' ;
import './Contact.css' ;

class Contact extends React.Component
{
	render()
	{
		return(
			<div>
				<div>
					<Title name = 'Contact Us' items={["Home -", "Contact Us"]}/>
				</div>
				<div className = 'align'>
					<h3 className = 'size'>Leave Your Message</h3>
						<div>	
							<div>
								<input className = 'in' type = "text" placeholder = "Your Name" required/>
							</div>
							<div>
								<input className = 'in' type = "text" placeholder = "Your Email" required/>
							</div>
							<div>
								<input className = 'in' type = "text" placeholder = "Your Message" required/>
							</div>
							<div>
								<button className = 'but' type = "submit">Send</button>
							</div>
						</div>
				</div>
			</div>
		) ;
	}
}

export default Contact ;