import React,{ lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom' ;
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ScrollContext } from 'react-router-scroll-4';

import Home from './comps/home/Home.js' ;
import AboutPerson from './comps/about/Aboutperson.js' ;
import AboutPsican from './comps/about/Aboutpsican.js' ;
import Contact from './comps/contact/Contact.js' ;
import NotFound from './comps/home/NotFound.js' ;
import Header from './comps/header/Header.js' ;
import TopBar from './comps/header/TopBar.js' ;
import DownBar from './comps/downbar/DownBar.js' ;
import Exam from './comps/tests/Exam.js' ;
import AnxietyTest from './comps/tests/anxiety/AnxietyTest.js' ;
import './App.css' ;
const AEQUESS = lazy(() => import('./comps/program/AEQUESS.js')) ;
const Sarathi = lazy(() => import('./comps/program/Sarathi.js')) ;
const Footer = lazy(() => import('./comps/footer/Footer.js'));
const Consult = lazy(() => import('./comps/program/Consult.js')) ;
const Login = lazy(() => import('./comps/signup/login/Login.js')) ;
const Register = lazy(() => import('./comps/signup/register/Register.js')) ;
const Profile = lazy(() => import('./comps/UserProfile/UserProfile.js')) ;

class App extends React.Component
{	state = {
		user: {} ,
		userToken: '' ,
	}

	footer = React.createRef() ;

	handleScroll = e => {
    e.preventDefault();
    const footer = this.footer.current;
    window.scrollTo({
      top: footer.offsetTop,
      left: 0,
      behavior: "smooth"
    	});
  	};

	resize = () => this.forceUpdate() ;

	componentDidMount() {
	  window.addEventListener('resize', this.resize)
	}

	componentWillUnmount() {
	  window.removeEventListener('resize', this.resize)
	}

	loadUser = (user) => {
		if(user.user)
			this.setState({user: user.user, userToken: user.token});
		else if(user.school)
			this.setState({user: user.school, userToken: user.token});
		else if(user.name)
			this.setState({user: user}) ;
		else
			this.setState({user : {}, userToken: ''}) ;
	}
	 
	render()
	{	const {user, userToken} = this.state ;
		return(
			<div className="App">
				<ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false}
						newestOnTop={false} closeOnClick rtl={false} pauseOnHover />
		        <BrowserRouter>
		        <ScrollContext>
		          <div>
		          	<TopBar scroll={this.handleScroll}/>
		            <Header user={user} token={userToken} loadUser={this.loadUser} />
		            <Switch>
		              <Route path='/' exact render={props=><Home {...props} />}/>
		              <Route path='/about/leader' exact component={AboutPerson}/>
		              <Route path='/about/psyment' exact component={AboutPsican}/>
		              <Route path='/contact' exact component={Contact}/>
		              <Route path='/login' render={props=><Suspense fallback={<div> Loading... </div>}><Login {...props} user={user} loadUser={this.loadUser}/></Suspense>}/>
		              <Route path='/register' render={props=><Suspense fallback={<div> Loading... </div>}><Register {...props} user={user} loadUser={this.loadUser}/></Suspense>} />
		              <Route path='/program/Sarathi' render={props=><Suspense fallback={<div> Loading... </div>}><Sarathi user={user} token={userToken}/></Suspense>}/>
		              <Route path='/program/AEQUESS' render={props=><Suspense fallback={<div> Loading... </div>}><AEQUESS user={user} token={userToken}/></Suspense>}/>
		              <Route path='/consult' render={props=><Suspense fallback={<div> Loading... </div>}><Consult user={user} token={userToken}/></Suspense>}/>
		              <Route path='/profile' render={props=><Suspense fallback={<div> Loading... </div>}><Profile user={user} token={userToken} loadUser={this.loadUser}/></Suspense>}/>
		              <Route path='/test' exact render={props=><Suspense fallback={<div> Loading... </div>}><Exam/></Suspense>}/>
		              <Route path='/test/self-anxiety-assessment' exact render={props=><Suspense fallback={<div> Loading... </div>}><AnxietyTest user={user} token={userToken} /></Suspense>}/>
		              <Route exact component={NotFound} />
		            </Switch>
		            <Suspense fallback={<div> Loading... </div>}>	<Footer footer={this.footer}/> </Suspense> 
		            <DownBar />
		          </div>
		        </ScrollContext>
		        </BrowserRouter>
		      </div>
		) ;
	}
}

export default App;