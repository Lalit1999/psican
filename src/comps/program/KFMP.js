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

const sArr = ['Student Motivation', 'Guidance For Adolescents', 'Behavioural Guidance for Students',
			'Health & Body Guidance for Adolescents'] ;

const tArr= ['Teachers Training', 'Teaching Strategies'] ;

const pArr = ['Parental Education', 'Parenting Strategies For Adolescents'] ;

const features = [
'htmlCOMPLEMENTARY WORKSHOPS<a href="#one"><sup>[1]</sup></a> for partner Schools and Educational Institutions. <a href="#two"><sup>[2]</sup></a>',
'html<ul>Coverage of core areas like: <li>Student Motivation & Skillset</li><li>Parental Awareness & Orientation</li><li>Teacher Training & Co-Working</li></ul>',
'All programs shall be funded by KASTURI FOUNDATION',
'Only travel support needs to be provided by partner organisations',
] ;

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

	createOptions = () => {
		return this.props.data.map( option=> <option key={option} value={option}> {option} </option>) ;
	}

	render()
	{
		return (
			<div className="choice-con">
				<select className="select" onChange={this.onSelectChange} value={this.state.selected}>
				    <option selected hidden value> -- Choose a Topic -- </option>
				    {this.createOptions()}
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
				<DisplayDetailed title="Features" lidata={features} />
				<Heading text="Choose Your Topic" />
				<ContentChoice choices={['Students', 'Parents', 'Teachers']} 
				 Parents={<DetailContent data={pArr}/>}
				 Students={<DetailContent data={sArr}/>}
				 Teachers={<DetailContent data={tArr}/>}/>
				<p className="intro bold" id="one"> Note #1 : Maximum 4 workshops may be scheduled in a 
					financial year </p>  
				<p className="intro bold" id="two"> Note #2 : To partner with us please "Register" with
					us </p>
				<p className="intro bold" id="three"> Note #3: For further discussion/assistance, you may
					"Contact Us" </p>
			</div>
		) ;
	}
}

export default Sarathi ;