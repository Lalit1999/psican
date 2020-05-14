import React from 'react' ;

import Title from '../title/Title.js' ;
import DisplayDetailed from '../display/DisplayDetailed.js' ;
import Heading from '../Heading/Heading.js' ;
import LoginForm from '../signup/forms/LoginForm.js' ;
import TextArea from '../signup/text/TextArea.js' ;
import Dropdown from '../signup/dropdown/Dropdown.js' ;
import './program.css' ;

const arr = ['To provide customised support to students for various academic, behavioural, lifestyle' +
', emotional and attitude related issues',
' To provide soluions and guidance of students for various health, psychological, gender and interpersonal issues'] ;

const features = [
'Students studying in classes 11, 12 and UG, from any part of India can register with us and ask their query.',
'Upto 2 E-Mail Queries per month per student shall be answered.',
'All E-Queries shall be answered free of cost',
'If you require detailed or personalised assistance, it is advised to go for personal consultation.',
] ;

const types = ['', 'Academic', 'Behavioural', 'Lifestyle', 'Emotional', 'Health-Related', 'Psychological'] ;

class AQUESS extends React.Component
{	state = {
		error: '',
		type: '',
		title: '',
		message: '' ,
	} ;

	onScheduleClick = () => {
	  	if(this.state.error !== '')
			this.setState({error: 'You cannot proceed without fixing all the errors'});
		else if(this.state.type === '')
			this.setState({error: 'Type can not be blank'});
	  	else if(this.state.title === '')
			this.setState({error: 'Title can not be blank'});
		else if(this.state.message === '')
			this.setState({error: 'Message can not be blank'});
		else
			console.log(this.state) ;
	}

	onTypeChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Type can not be blank'}) ;
		else
		{	if(this.state.error === 'Type can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({type : event.target.value} ) ;
	}

	onTitleChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Title can not be blank'}) ;
		else
		{	if(this.state.error === 'Title can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({title : event.target.value}) ;
	}

	onMessageChange = (event) => {
		if(event.target.value === '')
			this.setState({error: 'Message can not be blank'}) ;
		else
		{	if(this.state.error === 'Message can not be blank') 
				this.setState({error: ''}) ;
		}
		this.setState({message : event.target.value}) ;
	}

	render()
	{	const {type, title, message} = this.state ;
		return(
			<div>
				<Title name = 'AQUESS Program' items={["Home -"," Programs -", "AQUESS"]}/>
				<h4 className="intro cen"> <span className="brand">AQUESS</span> is an 
				<span className="ngo">&nbsp;Online Query System for Students </span> which is 
				 free of cost.  </h4>
				<p className="intro"> Classes 11-12 & Under-Graduate level education lays the 
					foundation of an individual's "Take OFF" from the runway of life. </p>
				<p className="intro"> These years involve rigorous hardwork, guidance and 
					hand-holding at many times. Mental Health of Students is of utmost 
					importance during these years.</p>
				<p className="intro"> It shall be our endeavour to stand with all students
					who approach us like a true friend. We shall help them in their hour of
					need. </p>
				<p className="intro bold"> P.S. : Certain Queries may require more time in 
					getting answered. If we take longer than 5 days, to answer your query 
					we shall keep you informed. </p>	
				<DisplayDetailed title="Aim" lidata={arr} />
				<DisplayDetailed title="Features" lidata={features} />
				<Heading text="Send Your Query" />
				<div className="blue-bg">
					<LoginForm title=" Query " error={this.state.error} >
						<Dropdown label="Type" value={type} options={types} onChange={this.onTypeChange}/>
						<TextArea label="Title" value={title} r={1} c={20} onChange={this.onTitleChange} />
						<TextArea label="Query" value={message} r={5} c={20} onChange={this.onMessageChange} />
					</LoginForm>	<br/>
					<button onClick={this.onScheduleClick} className="sched-btn"> Send Query </button> 
				</div>
			</div>
		) ;
	}
}

export default AQUESS ;