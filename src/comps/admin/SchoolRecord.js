import React from 'react' ;

import './admin.css' ;

class SchoolRecord extends React.Component 
{ 	
	state = {
		more: 'close',
	}

	checkMore = () => {
		if(this.state.more === 'open')
			return <div>This is check more </div> ;
		else
			return null ;
	} 

	render() {
		const {ki, data} = this.props ;
		return (
			<React.Fragment>
				<div key={ki} className={"record school " + this.props.lite}> 
					<p className="slim">{ki+ 1}</p>
					<p>{data.name}</p>
					<p className="fat">{data.email}</p>
					<p>{data.mobile}</p>
					<p className="record-btn slim" onClick={() => this.setState({more: (this.state.more==='close'?'open':'close')})}> {this.state.more==='close'?'More':'Less'} </p>
				</div>
				<div> {this.checkMore()} </div>
			</React.Fragment>
		) ;	
	}
}


export default SchoolRecord ;