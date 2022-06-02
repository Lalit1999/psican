 const accisQues = [
 	{ english : "Life is uncertain",
	hindi:'जिंदगी अनिश्चित है'},
 	{ english : "I experienced uncertainty of life during COVID times",
	hindi:'COVID काल में मैंने जिंदगी की अनिश्चितता को महसूस करा'},
	{ english : "I think I will be cautious and well-planned after COVID",
	hindi:'मुझे लगता है कि COVID काल के बाद मैं सुनियोजित और सतर्क रहूंगा/रहूँगी'},
	{ english : "I am afraid of death",
	hindi:'मुझे मौत से डर लगता है'},
	{ english : "I experienced fear of death during COVID times",
	hindi:'मैंने COVID काल में मौत के डर को अनुभव किया'},
	{ english : "Once Covid is over, I think of writing a will for myself and advice others too",
	hindi:'COVID खत्म हो जाने के बाद, मैं अपने लिए एक वसीयत लिखने के बारे में सोचता/सोचती हूं और दूसरों को भी सलाह देता/देती हूँ'},
	{ english : "I am worried for finances due to COVID in general",
	hindi:'मैं सामान्य रूप से COVID के कारण पैसों/खर्चे के लिए चिंतित हूँ'},
	{ english : "I experienced health expense worries during lockdown",
	hindi:'मैंने लॉकडाउन के दौरान स्वास्थ्य खर्चे की चिंताओं का अनुभव किया'},
	{ english : "I think of increasing our medical insurance after COVID and advise others too to do so",
	hindi:'COVID के बाद, मैं अपना चिकित्सा बीमा बढ़ाने के बारे में सोचता/सोचती हूं और दूसरों को भी ऐसा करने की सलाह देता/देती हूँ'},
	{ english : "I am afraid of losing my loved ones",
	hindi:'मुझे अपनों को खोने से डर लगता है'},
	{ english : "I experienced the fear of losing loved ones during COVID",
	hindi:'मैंने COVID के दौरान अपनों को खोने के डर का अनुभव किया'},
	{ english : "I cry sliently when alone for fear of losing my loved ones",
	hindi:' मैं जब अकेला होता/होती हूँ तो अपनों को खोने के डर से चुपचाप रोता/रोती हूँ'},
	{ english : "COVID-like events can cause permanent health loss",
	hindi:' COVID जैसी घटनाएँ स्थायी स्वास्थ्य हानि का कारण बन सकती हैं'},
	{ english : "I experienced fear of permanent health loss during lockdown", 
	hindi:'मैंने लॉकडाउन के दौरान स्थायी स्वास्थ्य हानि का डर अनुभव किया'},
	{ english : "I think of having a better fitness routine after COVID and advise others too to do so",
	hindi:' मैं COVID के बाद एक बेहतर फिटनेस रूटीन के बारे में सोचता/सोचती हूं और दूसरों को भी ऐसा करने की सलाह देता/देती हूँ '},
	{ english : "Lockdowns made everyone dependant on phones & computers",
	hindi:' लॉकडाउन ने सभी को फोन और कंप्यूटर पर निर्भर कर दिया'},
	{ english : "During COVID, I spent my time on phone and computer",
	hindi:' COVID के दौरान, मैंने अपना समय फ़ोन और कंप्यूटर पर बिताया'},
	{ english : "I found this machine time pressurizing and exhausting",
	hindi:' मुझे यह मशीनी समय दबावपूर्ण और थकाऊ लगा'},
	{ english : "During pandemic the count of my phone calls increased",
	hindi:' महामारी के दौरान मेरे फोन कॉल की संख्या में वृद्धि हुई'},
	{ english : "I was required to work on phone during pandemic",
	hindi:' महामारी के दौरान मुझे फोन पर काम करना पड़ता था'},
	{ english : "I experience pain/heaviness in my ears", 
	hindi:' मुझे अपने कानों में दर्द/भारीपन का अनुभव होता है'},
	{ english : "My screen time increased during pandemic",
	hindi:' महामारी के दौरान मेरा स्क्रीन टाइम बढ़ गया'},
	{ english : "I made and saw many videos/movies during pandemic", 
	hindi:' मैंने महामारी के दौरान कई वीडियो / फिल्में बनाई और देखीं'},
	{ english : "I experience pain or discomfort in eyes and headaches ",
	hindi:' मुझे आंखों और सिर में दर्द या असहजता का अनुभव होता है'},
	{ english : "Loneliness increased during the pandemic", 
	hindi:' महामारी के दौरान अकेलापन बढ़ा है'},
	{ english : "I found loneliness during COVID challenging",
	hindi:' मुझे COVID के दौरान अकेलापन चुनौतीपूर्ण लगा '},
	{ english : "My mood varies from happy to irritated nowadays", 
	hindi:' मेरा मूड आजकल खुश और चिड़चिड़े के बीच झूलता रहता है'},
	{ english : "I spent time in isolation during the pandemic",
	hindi:' मैंने महामारी के दौरान अलगाव में समय बिताया'},
	{ english : "Being isolated during COVID was worrisome for me", 
	hindi:' COVID के दौरान अलग रहना मेरे लिए चिंताजनक था'},
	{ english : "I experience nightmares/daydreams frequently during post-COVID times",
	hindi:' मुझे COVID के बाद के समय में अक्सर बुरे सपने/दिवास्वप्न का अनुभव होता है'},
	{ english : "I can usually relate to other people's pain and suffering",
	hindi:' मैं आमतौर पर अन्य लोगों के दर्द और पीड़ा को समझ सकता/सकती हूं '},
	{ english : "My ability to relate to others' suffering has changed after COVID", 
	hindi:' COVID के बाद दूसरों की पीड़ा को समझने की मेरी क्षमता बदल गई है'},
	{ english : "People usually exaggerate their suffering to get money & attention post-COVID", 
	hindi:' लोग आमतौर पर COVID के बाद पैसा और ध्यान पाने के लिए अपनी पीड़ा को बढ़ा-चढ़ाकर पेश करते हैं'},
	{ english : "My view towards my job/work has changed post-COVID",
	hindi:' मेरी नौकरी/कार्य के प्रति मेरा दृष्टिकोण COVID के बाद बदल गया है'},
	{ english : "I do not have the same priority for my job/work post-COVID", 
	hindi:' COVID के बाद, मेरी नौकरी/कार्य के प्रति मेरी प्राथमिकता पहले जैसी नहीं रही'},
	{ english : "I feel bosses and organisations are often over-demanding; its better always to be ready for change in job/work",
	hindi:' मुझे लगता है कि बॉस और कंपनी अक्सर अधिक कार्य की मांग करते हैं; नौकरी/काम को बदलने के लिए हमेशा तैयार रहना बेहतर है'},
	{ english : "It was not difficult for me to accept all restrictions during COVID",
	hindi:' मेरे लिए COVID के दौरान सभी प्रतिबंधों को स्वीकार करना मुश्किल नहीं था'},
	{ english : "Accepting restrictions during COVID did not impact me much",
	hindi:' COVID के दौरान पाबंदियों को स्वीकार करने से मुझ पर ज़्यादा असर नहीं पड़ा'},
	{ english : "The living ways are set to change post-COVID. There is little one can do about this, therefore it's easy for me to adjust to this.",
	hindi:' जीने के तरीके COVID के बाद बदलने वाले हैं | इस बारे में हम बहुत कम कर सकते हैं, इसलिए मेरे लिए संतुलन बनाना आसान है।'},
	{ english : "The way I express my emotions has changed post-COVID",
	hindi:' जिस तरीक़े से मैं अपनी भावनाओं को व्यक्त करता/करती हूं, वह COVID के बाद बदल गया है'},
	{ english : "I can now express emotions different from what I am actually feeling at that moment",
	hindi:' किसी पल में वास्तव में जो महसूस कर रहा/रही हूं मैं अब भावनाओं को उससे अलग व्यक्त कर सकता/सकती हूं'},
	{ english : "I feel saying some exaggerated words or texting some extra emojis doesn't cost so what is the harm in showing extra emotions",
	hindi:' मुझे लगता है कि कुछ शब्द बढ़ा-चढ़ाकर कहने या कुछ अतिरिक्त इमोजी को टेक्स्ट करने में कोई हरज नहीं है तो अतिरिक्त भावनाओं को दिखाने में भी क्या हर्ज है'},
	{ english : "I think after COVID is over, I will be extravagant in my ways", 
	hindi:' मुझे लगता है कि COVID के खत्म होने के बाद, मैं अपने तरीके से फिजूलखर्ची करूंगा/करुंगी'},
	{ english : "I have suffered a lot so I feel what is the harm in indulging a bit more in the pleasures of life post-COVID",
	hindi:' मैंने बहुत कुछ सहा है इसलिए मुझे लगता है कि COVID के बाद जीवन के सुखों में थोड़ा और लिप्त होने में क्या हर्ज है'},
	{ english : "I feel the times have changed now, we must live the moment and make the most of the available opportunities post-COVID. There is no point in restricting oneself", 
	hindi:' मुझे लगता है कि अब समय बदल गया है, हमें इस पल को जीना चाहिए और कोविड के बाद उपलब्ध अवसरों का अधिकतम लाभ उठाना चाहिए। खुद को प्रतिबंधित करने का कोई मतलब नहीं है '},
	{ english : "Taking doctor's consultation is a normal way of life for most people.", 
	hindi:'अधिकांश लोगों के लिए डॉक्टर की सलाह लेना जीवन का एक सामान्य तरीका है।'},
	{ english : "Everybody has to take doctor's consultation post-COVID", 
	hindi:'COVID के बाद सभी को डॉक्टर की सलाह लेनी पड़ती है '},
	{ english : "My Doctor visit/consultation have significantly increased post-COVID", 
	hindi:'मेरे डॉक्टर से भेंट/परामर्श में COVID के बाद काफी वृद्धि हुई है '},
	{ english : "Breathing Problems usually occur to almost all people", 
	hindi:'सांस की समस्या आमतौर पर लगभग सभी लोगों को होती है'},
	{ english : "Everyone is facing breathing problems post-COVID", 
	hindi:'COVID के बाद सभी को सांस की समस्या का सामना करना पड़ता है'},
	{ english : "I am regularly taking medicines for breathing difficulties post-COVID", 
	hindi:'मैं COVID के बाद सांस लेने में तकलीफ के लिए नियमित रूप से दवाएं ले रहा/रही हूं '},
	{ english : "Sleeping difficulties are usually experienced by all", 
	hindi:'नींद न आने की समस्या आमतौर पर सभी को होती है'},
	{ english : "Everyone is experiencing sleeping difficulties post-COVID", 
	hindi:'COVID के बाद सभी को नींद न आने की समस्या हो रही है'},
	{ english : "I am experiencing sleep disturbance post-COVID", 
	hindi:'COVID के बाद मुझे नींद लेने में खलल पड़ रहा है '},
	{ english : "Checking Blood Pressure(BP)/Pulse/ECG has always been a routine for all people", 
	hindi:'रक्तचाप(बीपी)/नाड़ी/ईसीजी की जांच कराना हमेशा से सभी लोगों के लिए सामान्य रहा है '},
	{ english : "People around me are regularly checking Blood Pressure(BP)/Pulse/ECG post-COVID ", 
	hindi:'मेरे आस-पास के लोग COVID के बाद नियमित रूप से रक्तचाप(बीपी)/नाड़ी/ईसीजी की जांच करवा रहे हैं '},
	{ english : "I am regularly checking my Blood Pressure(BP)/Pulse/ECG post-COVID", 
	hindi:'COVID के बाद मैं नियमित रूप से अपने रक्तचाप(बीपी)/नाड़ी/ईसीजी की जांच करवा रहा/रही हूं'},
	{ english : "People are generally lethargic and less active", 
	hindi:'लोग आम तौर पर सुस्त और कम सक्रिय हैं '},
	{ english : "People around me are having more pain and reduced activity post-COVID", 
	hindi:'मेरे आस-पास के लोगों को COVID के बाद अधिक दर्द और कम गतिविधि महसूस हो रही है '},
	{ english : "I experience painful movement and reduced activity post-COVID ", 
	hindi:'मुझे COVID के बाद दर्दनाक और कम गतिविधि महसूस हो रही है '},
];
export {accisQues} ;