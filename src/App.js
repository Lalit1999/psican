import { lazy, Suspense, useContext } from 'react';
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
import Popup from './comps/popup/Popup.js' ;
import Footer from './comps/footer/Footer.js';
import { AppContextProvider, AppContext } from './context/AppContext.js' ;
import { UserContextProvider } from './context/UserContext.js' ;
const PrivacyPolicy = lazy(() => import('./comps/footer/privacyPolicy/PrivacyPolicy.js'));
const TermsCondition = lazy(() => import('./comps/footer/termsCondition/TermsCondition.js'));
const RefundPolicy = lazy(() => import('./comps/footer/refundPolicy/RefundPolicy.js'));
const Consult = lazy(() => import('./comps/consult/Consult.js')) ;
const Login = lazy(() => import('./comps/login/Login.js')) ;
const Register = lazy(() => import('./comps/register/Register.js')) ;
const Profile = lazy(() => import('./comps/UserProfile/UserProfile.js')) ;

const returnContent = {
	// login: <Login />,
	// register: <Register />,
	// checkout: <Checkout />
} ;

const AppRoutes = () => {
	const {popContent, popOpen, togglePop} = useContext(AppContext) ;

	return (
		<div>
          	<TopBar />
            <Routes>
              <Route path='/' exact element={<Home />}/>
              <Route path='/about' exact element={<About />}/>
              <Route path='/contact' exact element={<Contact />}/>
              <Route path='/login' element={<Suspense fallback={<div> Loading... </div>}><Login /></Suspense>}/>
              <Route path='/register' element={<Suspense fallback={<div> Loading... </div>}><Register /></Suspense>} />
              <Route path='/consult' element={<Suspense fallback={<div> Loading... </div>}><Consult /></Suspense>}/>
              <Route path='/profile' element={<Suspense fallback={<div> Loading... </div>}><Profile /></Suspense>}/>
              <Route path='/test' exact element={<Suspense fallback={<div> Loading... </div>}><Exam/></Suspense>}/>
              <Route path='/admin' element={<Suspense fallback={<div> Loading... </div>}><Admin /></Suspense>}/>
              <Route path='/test/ustop' exact element={<Suspense fallback={<div> Loading... </div>}><AnxietyTestPage /></Suspense>}/>
              <Route path='/test/leta' exact element={<Suspense fallback={<div> Loading... </div>}><TraitTest /></Suspense>}/>
              <Route path='/test/accis' exact element={<Suspense fallback={<div> Loading... </div>}><AccisTestPage /></Suspense>}/>
              <Route path='/privacy-policy' exact element={<Suspense fallback={<div> Loading... </div>}><PrivacyPolicy/></Suspense>}/>
              <Route path='/terms-condition' exact element={<Suspense fallback={<div> Loading... </div>}><TermsCondition/></Suspense>}/>
              <Route path='/refund-policy' exact element={<Suspense fallback={<div> Loading... </div>}><RefundPolicy/></Suspense>}/>
              <Route exact element={<NotFound />} />
            </Routes>
            <Footer /> 
            <DownBar />
            <Popup open={popOpen} onCloseClick={togglePop}>
				<div className="psyment-popup"> 
					{returnContent[popContent]}
				</div> 
	        </Popup>
        </div>
	) ;
}

const App = () => {
	return(
		<UserContextProvider>
		<AppContextProvider>
		<div className="App">
	        <BrowserRouter>
	        	<AppRoutes />
	        </BrowserRouter>
	    </div>
	    </AppContextProvider>
	    </UserContextProvider>
	) ;
}

export default App;