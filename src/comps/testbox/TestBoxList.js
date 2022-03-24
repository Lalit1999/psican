import TestBox from './TestBox.js' ;

const data = [
	{ 
		title: "Understanding Self Through Observed Perceptions (USTOP)",
		link: "/test/ustop",
		desc: "Anxiety test designed for evaluating anxiety levels of an individual.",
	}, { 
		title: "Learning Environment Trait Assessment (LETA)",
		link: "/test/leta",
		desc: "Test designed to measure the level of 30 personality traits in parents of children (2 - 12 years old)",
	}, { 
		title: "Assessment of COVID Cognitive Impact on Self (ACCIS)",
		link: "/test/accis",
		desc: "Test to help a person understand the impact of COVID-related anxiety on his/her behaviour & well-being",
	},
] ;

const TestBoxList = (/*{data}*/) => {
	return <div className="test-boxes">{data.map((one, i) => <TestBox key={i} {...one} />)}</div> ;
}

export default TestBoxList ;