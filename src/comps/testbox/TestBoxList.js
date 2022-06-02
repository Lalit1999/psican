import TestBox from './TestBox.js' ;

const data = [
	{ 
		hin: { __html: "अपने मन में <p class=\"moderate\"> चिंता </p> के स्तर को स्वयं जानें"},
		eng: { __html: "Know your mental level of <p class=\"moderate\"> ANXIETY </p> yourself."},
		link: "/test/ustop",
		title : "USTOP"
	}, { 
		hin: { __html: "कौन से <p class=\"low\"> आपके गुण </p> आपके बच्चों में आ सकते हैं स्वयं जानें"},
		eng: { __html: "Which <p class=\"low\"> Qualities of Yours </p> have higher chances to reflect in your children"},
		link: "/test/leta",
		title : "LETA"
	}, { 
		hin: { __html: "क्या आपके व्यक्तित्व या व्‍यवहार पर <p class=\"high\"> COVID - 19 </p> का कोई प्रभाव प्रभाव हुआ है"},
		eng: { __html: "Has <p class=\"high\"> COVID - 19 </p> affected your personality / behaviour"},
		link: "/test/accis",
		title : "ACCIS"
	}, { 
		hin: { __html: "अपने गुणों और आदतों से <p class=\"low\"> व्यक्तित्व का आकलन </p> स्वयं करें"},
		eng: { __html: "Do your <p class=\"low\"> Personality Study </p> yourself from your natures & habits"},
		link: "/test/nhapass",
		title : "NHAPASS"
	},
] ;

const TestBoxList = (/*{data}*/) => {
	return <div className="test-boxes">{data.map((one, i) => <TestBox key={i} {...one} />)}</div> ;
}

export default TestBoxList ;