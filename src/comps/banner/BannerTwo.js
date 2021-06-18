import React from 'react' ;

import BannerContent from './banner_content/BannerContent.js' ;
import './BannerTwo.css' ;

const cont1 = [ 
'Zero Cost Query System for Students',
'Teenage comes with a lot of confusion and many questions',
'We promise a customised support and a prompt response' ] ;

const cont2 = [ 
'Workshop Organising Program for educational institutions',
'Supported by The Kasturi Foundation',
'Contact Us and schedule your workshop now' ] ;

const cont3 = [ 
'Some events disturb the flow of our life',
'Our personal mentoring can guide you through such situations',
'Schedule your Appointment Now' ] ;

const cont4 = [ 
'SAAT(Self-Assessment Anxiety Test)',
'Take this test to get your anxiety score',
'Get evaluation of your anxiety level' ] ;

const cont5 = [ 
'LETA(Learning Environment Traits Assessment)',
'Only for Parents having children 2-12 years old',
'Take this test to find probability of your traits getting expressed in your child' ] ;

// is object me sara data store ho raha hai
const obj = {
	aequess : {
		title : 'AEQUESS System',
		lidata : cont1,
		link : "/program/AEQUESS"
	} ,
	sarathi : {
		title : 'Sarathi Program' , 
		lidata : cont2 , 
		link : "/program/Sarathi"
	} ,
	person : {
		title : 'Personal Consultation' ,
		lidata : cont3 ,
		link : "/consult"	
	} ,
	saat : {
		title : 'Anxiety Test' ,
		lidata : cont4 ,
		test : 'test',
		link : "/test/self-anxiety-assessment"
	} ,
	leta :{
		title : 'Traits Test for Parents' ,
		lidata : cont5 ,
		test : 'test' ,
		link : "/test/trait-test"
	}
}

const BannerTwo = ({content, color, left}) => {	
	let classcolor = 'ban2_main ' + color ;
	if(left === 'yes')
	{	return(
			<div className='BannerTwo '>
				<div className= {"ban2-" + content}></div>
				<div className = {classcolor}>
					{/*content se banner ka name pata lag raha hai uske hisab se display karwa rahe hai*/}
					<BannerContent title={obj[content].title} lidata={obj[content].lidata} test={obj[content].test} link={obj[content].link}/>				
				</div>
			</div>
		) ;
	}
	else
	{	
		return(
			<div className='BannerTwo '>
				<div className = {classcolor}>
					<BannerContent title={obj[content].title} lidata={obj[content].lidata} test={obj[content].test} link={obj[content].link}/>				
				</div>
				<div className={"ban2-" + content}></div>
			</div>
		) ;
	}
}

export default BannerTwo ;