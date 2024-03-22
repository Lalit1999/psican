import TestBox from './TestBox.js' ;

import nhapassImg from '../../images/nhapass.webp' ;
import ustopImg from '../../images/ustop.webp' ;
import letaImg from '../../images/leta.webp' ;
import accisImg from '../../images/accis.webp' ;

const data = [
	{ 
		hin: { __html: "अपने मन में <span class=\"moderate\"> चिंता </span> के स्तर को स्वयं जानें"},
		eng: { __html: "Know the level of your mental <span class=\"moderate\"> ANXIETY </span> yourself."},
		link: "/test/ustop",
		title : "USTOP",
		image: ustopImg,
	}, { 
		hin: { __html: "कौन से <span class=\"low\"> आपके गुण </span> आपके बच्चों में आ सकते हैं स्वयं जानें"},
		eng: { __html: "Your which <span class=\"low\"> Qualities </span> have higher chances of reflecting in your children"},
		link: "/test/leta",
		title : "LETA",
		image: letaImg,
	}, { 
		hin: { __html: "क्या आपके व्यक्तित्व या व्‍यवहार पर <span class=\"high\"> COVID - 19 </span> का कोई प्रभाव हुआ है"},
		eng: { __html: "Has <span class=\"high\"> COVID - 19 </span> affected your personality / behaviour"},
		link: "/test/accis",
		title : "ACCIS",
		image: accisImg,
	}, { 
		hin: { __html: "अपने गुणों और आदतों से <span class=\"low\"> व्यक्तित्व का आकलन </span> स्वयं करें"},
		eng: { __html: "Do your <span class=\"low\"> Personality Study </span> yourself from your natures & habits"},
		link: "/test/nhapass",
		title : "NHAPASS",
		image: nhapassImg,
	},
] ;

const TestBoxList = () => {
	return <div className="test-boxes">{data.map((one, i) => <TestBox key={i} {...one} />)}</div> ;
}

export default TestBoxList ;