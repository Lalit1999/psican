import React from 'react' ;
import Text from '../../signup/text/Text.js' ;
import './payment.css' ;

class Payment extends React.Component 
{
	state = {
		coupon: '' ,
		error : ''
	} ;

	onInputChange = (event) => {
		this.setState( { [event.target.name] : event.target.value, error: '' } ) ;
	}

	checkCoupon = () => {
		if(this.state.coupon === 'psyment_qaz_789')
			this.props.change() ;
	}

	render()
	{
		return(			
			<div className="test-box">
				<h3> Self Anxiety Assessment Test (SAAT) </h3> 
				<div className="payment">
					<div className="payment-left">
						<p>Cost of the Test :  {this.props.cost}</p>
						<button className='sched-btn' onClick={this.props.display}>Make Payment</button>
					</div>
					<div className="payment-center">
						<div className="OR-up">
							<div className="OR-left"></div>
							<div className="OR-right"></div>
						</div>
						<div className="OR">OR</div>
						<div className="OR-up">
							<div className="OR-left"></div>
							<div className="OR-right"></div>
						</div>
					</div>
					<div className="payment-right">
						<Text label="Coupon Code" name="coupon" value={this.state.coupon} onChange={this.onInputChange}/>
						<button className='sched-btn' onClick={this.checkCoupon}>Apply Coupon</button>
					</div>
				</div>
			</div>
		) ;
	}
}

export default Payment ;