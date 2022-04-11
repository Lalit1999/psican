import TestBox from './TestBox.js' ;

const data = [
	{ 
		title: "USTOP : Understanding Self Through Observed Perceptions",
		link: "/test/ustop",
		desc: "Anxiety test designed for evaluating anxiety levels of an individual.",
	}, { 
		title: "LETA : Learning Environment Trait Assessment",
		link: "/test/leta",
		desc: "Test designed to measure the level of 30 personality traits in parents of children (2 - 12 years old)",
	}, { 
		title: "ACCIS : Assessment of COVID Cognitive Impact on Self",
		link: "/test/accis",
		desc: "Test to help a person understand the impact of COVID-related anxiety on his/her behaviour & well-being",
	}, { 
		title: "Test4 : Assessment of Test 4",
		link: "/test/test4",
		desc: "Test 4 ki dscription",
	},
] ;

const TestBoxList = (/*{data}*/) => {
	return <div className="test-boxes">{data.map((one, i) => <TestBox key={i} {...one} />)}</div> ;
}

export default TestBoxList ;