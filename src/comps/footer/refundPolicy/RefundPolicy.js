import React, { Component } from 'react';

import Title from '../../title/Title.js' ;
import DisplayDetailed from '../../display/DisplayDetailed.js' ;

const refund = [
'All payments are only done before accessing the psychometric tests, only on successful completion of payment, will the aforementioned tests be opened.',
'Once a Payment is made and test has started, no provision of cancellation is provided.',
'No Refund/Cancellation of the payment is allowed, once user has started the test/made the payment',
'htmlFor any kind of grievance or queries related to Payments / Refund / Cancellation, write to us at: <b>info.psyment@gmail.com</b>'
] ;

class RefundPolicy extends Component {
	render() {
		return (
			<div>
				<Title name = 'Refund/Cancellation Policy' items={["Home -","Refund Policy"]}/>
				<DisplayDetailed title="PSYMENT Refund/Cancellation Policy" lidata={refund} />
			</div>
		);
	}
}

export default RefundPolicy ;