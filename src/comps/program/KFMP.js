import React from 'react' ;

import Title from '../title/Title.js' ;
import './program.css' ;
import './detailcontent.css' ;
import DisplayDetailed from '../display/DisplayDetailed.js' ;
import ContentChoice from '../choice/ContentChoice.js' ;
import Heading from '../Heading/Heading.js' ;

const arr = ['To provide workshops to schools and colleges for:' , 'Student Motivation',
'Student Career', 'Health related guidance for students',
'Behaviour related guidance for students', 'Parental Education', 'Teachers Training'] ;

class DetailContent extends React.Component
{	constructor()
	{
		super() ;
		this.state = {
			selected: '' 
		}	
	}

	onSelectChange = (event) => {
		this.setState({selected: event.target.value});
	}

	onButtonClick = () => {
		console.log(this.state.selected) ;
	}

	render()
	{
		return (
			<div className="choice-con">
				<select className="select" onChange={this.onSelectChange} value={this.state.selected}>
				    <option selected hidden value> -- Choose a Topic -- </option>
				    <option value="option-1">Option-1</option>
				    <option value="option-2">Option-2</option>
				    <option value="option-3">Option-3</option>
				</select>
				<button onClick={this.onButtonClick} className="sched-btn"> Schedule ! </button> 
			</div>
		) ;
	}
} ;

class Sarathi extends React.Component
{
	render()
	{
		return(
			<div>
				<Title name = 'Sarathi Program'
				 items={["Home -"," Programs -", "Sarathi"]}/>
				<h4 className="intro"> <span className='brand'>Sarathi</span> is a program, supported
				 by <span className="ngo"> The Kasturi Foundation</span>. It provides workshop
				 organising facilities to schools and colleges. </h4> 
				<DisplayDetailed title="Aim" lidata={arr}/>
				<Heading text="Choose Your Topic" />
				<ContentChoice choices={['Parents', 'Students', 'Teachers']} 
				 Parents={<DetailContent/>}
				 Students={<DetailContent/>} Teachers={<DetailContent/>}/>
			</div>
		) ;
	}
}

export default Sarathi ;