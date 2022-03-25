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
		english: 'Save & Next' ,
		hindi: 'दर्ज & अगला'
	},
	note : {
		english: '*Note: Your answers will not be recorded if you do not click "Save & Next"' ,
		hindi: '*नोट: अगर आप "दर्ज & अगला" पर क्लिक नहीं करेंगे तो आपका जवाब मान्य नहीं होगा'
	},
	error : {
		english: 'Selecting an option is compulsary',
		hindi: 'जवाब चुनना अनिवार्य है'
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
	sScore :{
		english :'Your S Score is' ,
		hindi :'आपके S अंक हैं'
	},
	eScore :{
		english :'Your E Score is' ,
		hindi :'आपके E अंक हैं'
	},
	aScore :{
		english :'Your A Score is' ,
		hindi :'आपके A अंक हैं'
	},
	tScore :{
		english :'Your Total Score is' ,
		hindi :'आपके कुल अंक हैं'
	},
	p1 :{
		english: 'We request you to remember your S, A and E score (they are stored in your profile) as they may be useful in further consultations with mental health professionals.' ,
		hindi: 'आपसे अनुरोध है कि, आप अपने S , A , E और कुल अंको को सम्भाल कर रखे क्योंकि अगर आप किसी मनोविशेषज्ञ की सलाह  लेते हैं तो ये उनकी सहायता करेंगे।'
	} ,
	p2 :{
		english: 'For further consultations/support, Call' ,
		hindi: 'आगे के परामर्श/समर्थन के लिये, फोन करे '
	} ,
	p3 :{
		english: 'Mr. Ashish Aggarwal +91-95552-35231' ,
		hindi: 'श्री आशीष अग्रवाल +91-95552-35231 '
	} 
} ;

const evalData = {
	stage1 :{
		l1 :{
			english : 'You have' ,
			hindi : 'आपका'
		} ,
		l2 :{
			english : ' Optimum Functional Anxiety' ,
			hindi : ' तनाव अनुकूल स्तर '
		} ,
		l3 :{
			english : ',which means you have anxiety within normal range and at an optimum level.' ,
			hindi : 'पर है। जिसका मतलब है कि आपका तनाव सामान्य सीमा में ही है।'
		} ,
		l4 :{
			english : 'No intervention in your lifestyle is required. You do not need any counselling.' ,
			hindi : ' आपकी जीवन शैली में किसी बदलाव की कोई आवश्यक्ता नहीं है, न ही आपको किसी मनोविशेषज्ञ की सलाह लेने की ज़रुरत है।'
		}
	},
	stage2 :{
		l1 :{
			english : 'You have' ,
			hindi : 'आपको'
		}	,
		l2 :{
			english : 'Mild Anxiety' ,
			hindi : ' हल्का तनाव '
		} ,
		l3 :{
			english : ', which means you have anxiety slightly above the normal range. Your anxiety may sometimes cause problems in your day-to-day activites.' ,
			hindi : 'है। जिसका मतलब है कि आपका तनाव सामान्य सीमा से थोडा ज़्यादा है। कभी-कभी आपका तनाव आपकी रोज़मर्र्रा की ज़िंद्गी पर बुरा प्रभाव डाल सकता है।'
		} ,
		l4 :{
			english : 'A few Lifestyle changes are needed for you to have lower anxiety levels. You have a little need for Counselling (4-6 sessions in an year).' ,
			hindi : 'आपको तनाव का स्तर घटाने के लिये अपनी जीवन शैली में थोडे बदलाव की आवश्यक्ता है, आपको मनोविशेषज्ञ से सलाह लेने की थोडी ज़रुरत है(साल में 4-6 बार)।'
		}
	},
	stage3 :{
		l1 :{
			english : 'You have' ,
			hindi : 'आपका'
		}	,
		l2 :{
			english : 'Moderate Anxiety ' ,
			hindi : ' तनाव मध्यम स्तर '
		} ,
		l3 :{
			english : ', which means you have high anxiety levels which are above the normal range. Your anxiety may be affecting your health and causing problems in your day-to-day life.' ,
			hindi : 'पर है। जिसका मतलब है कि आपका तनाव सामान्य सीमा से काफी ज़्यादा है। आपका तनाव आपकी ज़िंद्गी और सेहत पर बुरा प्रभाव डाल सकता है। '
		} ,
		l4 :{
			english : 'You require training of Relaxation Techniques to bring down your anxiety levels. You require regular counselling(twice per month) for a short time.' ,
			hindi : 'आपको खुद को शांत रखने के लिये प्रशिक्शण की आवश्यक्ता है। आपको थोडे समय के लिये मनोविशेषज्ञ की सलाह लेने की ज़रुरत है(महीने मे 2 बार)।'
		}
	},
	stage4 :{
		l1 :{
			english : 'You have' ,
			hindi : 'आपका'
		}	,
		l2 :{
			english : 'Severe Anxiety' ,
			hindi : ' तनाव गम्भीर स्तर '
		} ,
		l3 :{
			english : ', which means your anxiety levels are very high as compared to the normal range. Your anxiety may lead to other serious health problems if not taken action against.' ,
			hindi : ' पर है, जो बिल्कुल भी सामान्य नही है। अगर आप इस पर ध्यान नही देते है तो आपको सेहत से जुडी गम्भीर समस्या का सामना करना पड सकता है'
		} ,
		l4 :{
			english : 'You should immediately start detailed counselling(once in a week) and continue it for a longer time.' ,
			hindi : 'आपको लम्बे समय तक मनोविशेषज्ञ की सलाह लेने की ज़रुरत है(हफ्ते में 1 बार)।'
		}
	}
} ; 

export {inst, quesData, subData, resultData, evalData} ;


  
								 