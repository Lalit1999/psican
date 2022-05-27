const inst = {
	head: {
		english : 'INSTRUCTIONS',
		hindi : 'निर्देश' 
	},
	l1: {
		english : 'Please read each statement carefully and answer as per your best understanding and true feelings.',
		hindi : 'कृपया सभी निर्देश ध्यानपूर्वक पढ़ें और सभी जवाब अपनी समझदारी और सच्ची भावनाओं के साथ दें |'
	},
	l2: {
		english : 'All statements must be answered (No Question can be left blank).',
		hindi : 'सभी सवालों का उत्तर देना अनिवार्य है ( कोई भी सवाल खाली न छोड़ें ) |'
	},
	l3: {
		english : 'There is no right or wrong answer to any question, everything is specific to each person.',
		hindi : 'किसी भी सवाल का कोई सही या गलत जवाब नहीं है, हर व्यक्ति के लिए सवाल का जवाब अलग होगा |'
	},
	l4: {
		english : 'There is no time limit for this test however people generally finish this test before 30 minutes.',
		hindi : 'इन सवालों का जवाब देने के लिए कोई निर्धारित समय सीमा नहीं है, परन्तु सामान्यतः लोग इसे 30 मिनट से पहले समाप्त कर लेतें हैं |'
	},
	l5: {
		english : 'The Score received at the end of the test should be saved by the taker of the test.',
		hindi : 'इन सवालों के जवाबों का परिणाम, कृपया अपने पास संभाल कर रखें |'
	},
	btnText: {
		english : 'Start Test',
		hindi : 'शुरू करें'
	}
} ;

const quesData = {
	prevBtn : {
		english: 'Previous' ,
		hindi: 'पिछला'
	},
	nextBtn : {
		english: 'Next' ,
		hindi: 'अगला'
	},
	error : {
		english: 'Selecting an option is compulsary for all qualities',
		hindi: 'सभी गुणों के लिए जवाब चुनना अनिवार्य है'
	},
} ;

const subData = {
	revBtn : {
		english: 'Review Answers ' ,
		hindi: 'उत्तर की समीक्षा करें'
	},
	subBtn : {
		english: 'Confirm & Proceed' ,
		hindi: 'पुष्टि करें & आगे बढ़ें'
	},
	subNote : {
		english: 'Your test will be submitted and result will be calculated, are you sure you want to proceed? You can also go back to the test and review your answers.' ,
		hindi: 'आपके जवाब जमा हो जायेंगे और परिणाम निकाला जायेगा, क्या आप आगे बढना चाहते है? आप वापस जाकर अपने उत्तरो की समीक्षा भी कर सकते हैं।'
	},
	error : {
		english: 'We have entered an unexpected mode',
		hindi: 'ये कहाँ आ गये हम'
	},
} ;

const resultData = {
	score :{
		english :'Your Score is' ,
		hindi :'आपके अंक हैं'
	},
	p1 :{
		english: 'If you score anywhere in the range of A - C on Nature, Habit and Attitute grade, then you may work on it on your own and try to move up to a better grade.' ,
		hindi: 'आपसे अनुरोध है कि, आप अपने समापक अंको को सम्भाल कर रखे क्योंकि अगर आप किसी मनोविशेषज्ञ की सलाह  लेते हैं तो ये उनकी सहायता करेंगे।'
	} ,
	p2 :{
		english: 'If you score D or lower grade on any domain then it is advised to take a personal consultation to cope up with the deficiency.' ,
		hindi: 'आपसे अनुरोध है कि, आप अपने समापक अंको को सम्भाल कर रखे क्योंकि अगर आप किसी मनोविशेषज्ञ की सलाह  लेते हैं तो ये उनकी सहायता करेंगे।'
	} ,
	p3 :{
		english: 'If you wish to discuss your grades on a video call you may do so by booking a video call session(10 minutes or more) by paying Rs. 500 or more on Whatsapp Number 9555235231.' ,
		hindi: 'आपसे अनुरोध है कि, आप अपने समापक अंको को सम्भाल कर रखे क्योंकि अगर आप किसी मनोविशेषज्ञ की सलाह  लेते हैं तो ये उनकी सहायता करेंगे।'
	} ,
	p4 :{
		english: 'For further consultations/support, Call' ,
		hindi: 'आगे के परामर्श/समर्थन के लिये, फोन करे '
	} ,
	p5 :{
		english: 'Mr. Ashish Aggarwal +91-95552-35231' ,
		hindi: 'श्री आशीष अग्रवाल +91-95552-35231 '
	} ,
	l1 :{
		english : ' No Major Impact ' ,
		hindi : ' कोई प्रमुख प्रभाव नहीं'
	} ,
	l2 : {
		english : ' Mild Impact' ,
		hindi : 'हल्का प्रभाव '
	} ,
	l3 : {
		english : ' Severe Impact ' ,
		hindi : 'गंभीर प्रभाव'
	} ,
	l4 : {
		english : ' Critical Impact ' ,
		hindi : 'विकट प्रभाव'
	} ,
	accisKey: {
		english: 'ACCIS Score Interpretation Key',
		hindi: 'स्कोर व्याख्या कुंजी'
	} ,
} ;

const evalData = {
	you : {
		english : 'You have' ,
		hindi : 'आप पर, आपकी सोच और व्यवहार पर COVID का ',
	},
	sugg : {
		english : 'Suggestions' ,
		hindi: 'सुझाव',
	},
	stage1 :{
		l1 :{
			english : ' No Major Impact ' ,
			hindi : ' कोई प्रमुख प्रभाव नहीं'
		} ,
		l2 :{
			english : ' of COVID. You are your normal self.' ,
			hindi : ' हुआ है. आप अपनी सामान्य स्थिति में ही है. '
		} ,
	},
	stage2 :{
		l1 :{
			english : ' Mild Impact' ,
			hindi : 'हल्का प्रभाव '
		}	,
		l2 :{
			english : ' of COVID, on your self, thinking and behaviors.' ,
			hindi : ' हुआ है. '
		} ,
		s1 :{
			english : ' Yoga, Pranayam or Walk.' ,
			hindi : 'योग, प्राणायाम या वॉक'
		} ,
		s2 :{
			english : 'Venting with a Partner ' ,
			hindi : 'पार्टनर के साथ अपनी भावनाओं को साझा करना'
		}
	},
	stage3 :{
		l1 :{
			english : ' Severe Impact ' ,
			hindi : 'गंभीर प्रभाव'
		}	,
		l2 :{
			english : 'of COVID, on your self, thinking and behaviors. ' ,
			hindi : ' हुआ है. '
		} ,
		s1 :{
			english : 'Short-term psychological counselling & support.' ,
			hindi : ' अल्पकालिक मनोवैज्ञानिक परामर्श और सहयोग'
		} ,
		s2 :{
			english : 'You may also require doctor\'s consultation.' ,
			hindi : ' आपको डॉक्टर के परामर्श की भी आवश्यकता हो सकती है '
		}
	},
	stage4 :{
		l1 :{
			english : ' Critical Impact ' ,
			hindi : 'विकट प्रभाव'
		}	,
		l2 :{
			english : 'of COVID, on your self, thinking and behaviors. ' ,
			hindi : ' हुआ है. '
		} ,
		s1 :{
			english : 'Long-term psychological counselling & support.' ,
			hindi : ' दीर्घकालिक मनोवैज्ञानिक परामर्श और सहयोग'
		} ,
		s2 :{
			english : 'You require Doctor\'s consultation and medical management.' ,
			hindi : ' आपको डॉक्टर के परामर्श और चिकित्सा प्रबंधन की आवश्यकता है '
		}
	}
} ; 

export {inst, quesData, subData, resultData, evalData} ;						 