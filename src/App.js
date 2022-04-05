import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom' ;

import Home from './comps/home/Home.js' ;
import About from './comps/about/About.js' ;
import Contact from './comps/contact/Contact.js' ;
import NotFound from './comps/home/NotFound.js' ; 
import TopBar from './comps/header/TopBar.js' ;
import DownBar from './comps/downbar/DownBar.js' ;
import Exam from './comps/tests/Exam.js' ;
import UstopPage from './comps/tests/ustop/UstopPage.js' ;
import LetaPage from './comps/tests/leta/LetaPage.js' ;
import AccisTestPage from './comps/tests/accis/AccisTestPage.js' ;
import Admin from './comps/admin/Admin.js' ;
import Footer from './comps/footer/Footer.js';
import { UserContextProvider } from './context/UserContext.js' ;
import Consult from './comps/consult/Consult.js' ;
import Login from './comps/login/Login.js' ;
import Register from './comps/register/Register.js' ;
import Profile from './comps/UserProfile/UserProfile.js' ;
import ScrollToTop from './comps/ScrollToTop.js' ;
import Planner from './comps/dr/Planner.js' ;
import './app.css' ;

const PrivacyPolicy = lazy(() => import('./comps/footer/privacyPolicy/PrivacyPolicy.js'));
const TermsCondition = lazy(() => import('./comps/footer/termsCondition/TermsCondition.js'));
const RefundPolicy = lazy(() => import('./comps/footer/refundPolicy/RefundPolicy.js'));

const App = () => {
	return(
		<UserContextProvider>
		<div className="App">
      <BrowserRouter>
      	<TopBar />
        <ScrollToTop>
        <Routes>
          <Route path='/' exact element={<Home />}/>
          <Route path='/about' exact element={<About />}/>
          <Route path='/contact' exact element={<Contact />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/consult' element={<Consult />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/test' exact element={<Exam/>} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/test/ustop' exact element={<UstopPage />} />
          <Route path='/test/leta' exact element={<LetaPage />} />
          <Route path='/test/accis' exact element={<AccisTestPage />} />
          <Route path='/planner' element={<Planner type="calendar" />} />
          <Route path='/planner2' element={<Planner type="calendar2" />} />
          <Route path='/privacy-policy' exact element={<Suspense fallback={<div> Loading... </div>}><PrivacyPolicy/></Suspense>}/>
          <Route path='/terms-condition' exact element={<Suspense fallback={<div> Loading... </div>}><TermsCondition/></Suspense>}/>
          <Route path='/refund-policy' exact element={<Suspense fallback={<div> Loading... </div>}><RefundPolicy/></Suspense>}/>
          <Route exact element={<NotFound />} />
        </Routes>
        </ScrollToTop>
        <Footer /> 
        <DownBar />
      </BrowserRouter>
    </div>
    </UserContextProvider>
	) ;
}

export default App;