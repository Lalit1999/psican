import React, {lazy, Suspense} from 'react' ;

import BannerTwo from '../banner/BannerTwo.js' ;
import Parallax from '../Parallax/Parallax.js' ;
import './home.css' ;
import TestimonialSlider from '../slider/TestimonialSlider.js' ;

import i5 from '../images/i5.webp' ;
import stress from '../images/stress.webp' ;
import sar2 from '../images/sar2.webp' ;
import pc2 from '../images/pc2.webp' ;
import Image from '../images/Psyment.webp' ;

const Slider = lazy(() => import('../slider/Slider.js') ) ;

const testim_arr = [
{ 	name: 'Dr. Kiran Modi' ,
  	img: 'Kiran' ,
	role: 'Founder & Trustee, Udayan Care - NGO' ,
	msg: 'Ashish always had a great insight into human behaviour and motivation. Since the last 15 years that I know him, I have seen him as an astute business man, a self made person, a great motivator, coach and a trainer and as such he has trained hundreds of our girls, who hail from government schools to aspire for higher education, and higher calling. Armed with qualifications in psychology, he has further honed his skills in understanding human psyche and motivational coaching to lead them onto greater resilience and a higher purpose. I wish him all the best in this not so new role, as he always functioned as such, to a new height.'
},
{ 	name: 'Dr. Gayatri Ahuja' ,
  	img: 'Profile' ,
	role: 'Faculty- Dept. of Education, AYJNISHD(D), Mumbai' ,
	msg: 'Mr Ashish Aggarwal is one of the most sensitive, non-judgemental and honest individual. His feedback and insight are very intuitive. He speaks from the heart and can truly be a supporter as well as a mentor. He has vast experience in handling concerns related to personal and professional life. I feel he has a right balance of scaffolding and has nice empathetic stance. It is really admirable when you see your friend grow in his projects through conception to completion.'
},
{ 	name: 'Shri. S L Jain' ,
  	img: 'Sljain' ,
	role: 'Director, Mahavir Senior Model School, Delhi' ,
	msg: 'PSYMENT is wonderful program and need of the hour for education system as a whole. The program has been concieved by Mahavirian Ashish Aggarwal who is now a very dear friend. He is a very creative and highly sensitive person, who is conscious of the pitfalls of present education system and is working towards corrective course of action. After a lot of study and research he has come out with PSYMENT which will address the issues of students, parents and teachers in a very sensitive and collaborative manner. I am proud of Ashish Aggarwal and feel assured that his venture will meet its objectives. My best wishes and blessings and feel proud of my student Ashish Aggarwal.'
},
{ 	name: 'Shri K. P. Raizada' ,
  	img: 'KP' ,
	role: 'Ex. Deputy Director of Education' ,
	msg: 'I know Ashish Aggarwal as a sensitive , honest, creative young man. He stands for value based human personality & Education. He always strives to improve good things into better. In my experience he is trustworthy and dependable.'
},
{ 	name: 'Shivangi Gupta' ,
  	img: 'Shivangi' ,
	role: 'Student & Psyment beneficiary' ,
	msg: 'I, Shivangi Gupta, working as a mathematics teacher in a private school, I had always been clear about my goals but what path to take always landed me in confusion. As I know Mr. Ashish Aggarwal since my childhood, I shared my concern with him and found the right direction. Signing up for PSYMENT was one of the best decisions I made for myself. PSYMENT has given me the focus to make decisions to fulfill my short term and long term goals. Guided by the best mentor, who helped me to map my capabilities. I am sure they will do the same for everyone else.'
},
{ 	name: 'Atul Jain' ,
  	img: 'Atul' ,
	role: 'Advocate, Delhi High Court' ,
	msg: 'Mr. Ashish Aggarwal is a wonderful Counsellor and Mentor. Since I am a practicing lawyer, I get a lot of cases where the parties involved in litigation are suffering from mental trauma/distress. For past sometime, I have been referring my clients who are mentally troubled because of their pending litigations to Mr. Ashish and I have received wonderful feedbacks about his expertise. The main aspect of his prowess that is common in all such feedbacks is that Mr. Ashish deals with his patients with a pure humanitarian approach and is most of the times successful in resolving their concerns with his innovative techniques. I wish him and PSYMENT a wonderful future ahead.'
},
{ 	name: 'Shri Suneet Malik' ,
  	img: 'Profile' ,
	role: 'Pharma Marketing Expert' ,
	msg: 'I have known Ashish Aggarwal as a sincere learner and a person with bold initiatives. Compassion, empathy and working towards helping others comes naturally to him. He is one of my dear students and cherished friends. I have always known him as a go to person in any hour of need.I wish him success in his new endeavours.'
},
] ;

const data = [ { link :'/' },	{	style : {
        	backgroundImage: 'url(' + i5+ ')',
    	},
        message: 'Welcome to the world of',
        link : '/' ,
        message2: 'Realisation ( तत् त्वमसि ) - Mentoring',
        message3: '&' ,
        message4: 'Actualisation ( अहम् ब्रह्मास्मि ) - Psychology',
        title: 'PSYMENT'
 	},{	style : {
        	backgroundImage: 'url(' + sar2+ ')',
    	},
        subtitle: 'PSYMENT : Program 1',
        title: 'Sarathi',
        message: 'School Academic Attitude Training & Health Initiative' ,
        message2: 'A Mentoring Program for Educational Instituitions' ,
        link : '/program/Sarathi'
    },{	style : {
        	backgroundImage: 'url(' + stress+ ')',
    	},
        title: 'AEQUESS',
        subtitle: 'PSYMENT : Program 2',
        link : '/program/AEQUESS' ,
        message: 'Abhinav E-Query System for Students',
        message2 : 'An E-Counselling System for Classes 11-12 & UG level students',
 	},{	style : {
        	backgroundImage: 'url(' + pc2+ ')',
    	},
        subtitle: 'PSYMENT : Program 3',
        title: 'Personal Consultation',
        link : '/consult' ,
        message: 'Get PSYCHOLOGICAL MENTORING and COUNSELLING personally',
        message2: 'Schedule your appointment NOW'
 	},
];

class Home extends React.Component
{
	render()
	{	return(
			<div>
                <Suspense fallback={<div className="row logo-slide"><img src={Image} alt="psyment logo"/></div>} > 
                    <Slider data={data} />
                </Suspense>
                <BannerTwo content="leta" color="blue"/>
                <BannerTwo content="saat" left="yes" color="blue"/>
				<BannerTwo content="aequess" color="blue"/>
				<BannerTwo content="sarathi" left="yes" color="blue"/>
				<BannerTwo content="person" color="blue"/>
				<Parallax>
					<div className="testim"> Our Testimonials </div>
					<TestimonialSlider data={testim_arr}/>
				</Parallax>
			</div>
		) ;
	}
}

export default Home ;