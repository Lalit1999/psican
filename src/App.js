import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom' ;

import Home from './comps/home/Home.js' ;
import About from './comps/about/About.js' ;
import Contact from './comps/contact/Contact.js' ;
import NotFound from './comps/home/NotFound.js' ; 
import TopBar from './comps/header/TopBar.js' ;
import DownBar from './comps/downbar/DownBar.js' ;
import Exam from './comps/tests/Exam.js' ;
import AnxietyTestPage from './comps/tests/anxiety/AnxietyTestPage.js' ;
import TraitTest from './comps/tests/traits/TraitTest.js' ;
import AccisTestPage from './comps/tests/accis/AccisTestPage.js' ;
import Admin from './comps/admin/Admin.js' ;
const Footer = lazy(() => import('./comps/footer/Footer.js'));
const PrivacyPolicy = lazy(() => import('./comps/footer/privacyPolicy/PrivacyPolicy.js'));
const TermsCondition = lazy(() => import('./comps/footer/termsCondition/TermsCondition.js'));
const RefundPolicy = lazy(() => import('./comps/footer/refundPolicy/RefundPolicy.js'));
const Consult = lazy(() => import('./comps/consult/Consult.js')) ;
const Login = lazy(() => import('./comps/signup/login/Login.js')) ;
const Register = lazy(() => import('./comps/signup/register/Register.js')) ;
const Profile = lazy(() => import('./comps/UserProfile/UserProfile.js')) ;

class App extends React.Component
{	state = {
		user: localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):{} ,
		userToken: localStorage.getItem('userToken')?localStorage.getItem('userToken'):'' ,
	}

	loadUser = (user) => {
		if(user.user)
		{
			this.setState({user: user.user, userToken: user.token});
			localStorage.setItem('user', JSON.stringify(user.user) );
			localStorage.setItem('userToken', user.token);
		}
		else if(user.name)
		{
			this.setState({user: user}) ;
			localStorage.setItem('user', JSON.stringify(user.user) );
		}
		else
			this.setState({user : {}, userToken: ''}) ;
	}
	 
	render()
	{	const {user, userToken} = this.state ;
		return(
			<div className="App">
		        <BrowserRouter>
		          <div>
		          	<TopBar user={user} token={userToken} loadUser={this.loadUser}/>
		            <Routes>
		              <Route path='/' exact element={<Home />}/>
		              <Route path='/about' exact element={<About />}/>
		              <Route path='/contact' exact element={<Contact />}/>
		              <Route path='/login' element={<Suspense fallback={<div> Loading... </div>}><Login user={user} loadUser={this.loadUser}/></Suspense>}/>
		              <Route path='/register' element={<Suspense fallback={<div> Loading... </div>}><Register user={user} loadUser={this.loadUser}/></Suspense>} />
		              <Route path='/consult' element={<Suspense fallback={<div> Loading... </div>}><Consult user={user} token={userToken}/></Suspense>}/>
		              <Route path='/profile' element={<Suspense fallback={<div> Loading... </div>}><Profile user={user} token={userToken} loadUser={this.loadUser}/></Suspense>}/>
		              <Route path='/test' exact element={<Suspense fallback={<div> Loading... </div>}><Exam/></Suspense>}/>
		              <Route path='/admin' element={<Suspense fallback={<div> Loading... </div>}><Admin user={user} token={userToken} /></Suspense>}/>
		              <Route path='/test/ustop' exact element={<Suspense fallback={<div> Loading... </div>}><AnxietyTestPage user={user} token={userToken} /></Suspense>}/>
		              <Route path='/test/leta' exact element={<Suspense fallback={<div> Loading... </div>}><TraitTest user={user} token={userToken} /></Suspense>}/>
		              <Route path='/test/accis' exact element={<Suspense fallback={<div> Loading... </div>}><AccisTestPage user={user} token={userToken}/></Suspense>}/>
		              <Route path='/privacy-policy' exact element={<Suspense fallback={<div> Loading... </div>}><PrivacyPolicy/></Suspense>}/>
		              <Route path='/terms-condition' exact element={<Suspense fallback={<div> Loading... </div>}><TermsCondition/></Suspense>}/>
		              <Route path='/refund-policy' exact element={<Suspense fallback={<div> Loading... </div>}><RefundPolicy/></Suspense>}/>
		              <Route exact element={<NotFound />} />
		            </Routes>
		            <Suspense fallback={<div> Loading... </div>}>	<Footer /> </Suspense> 
		            <DownBar />
		          </div>
		        </BrowserRouter>
		      </div>
		) ;
	}
}

export default App;