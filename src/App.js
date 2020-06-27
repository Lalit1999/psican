import React from 'react';
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
import AEQUESS from './comps/program/AEQUESS.js' ;
import Sarathi from './comps/program/Sarathi.js' ;
import Consult from './comps/program/Consult.js' ;
import Login from './comps/signup/login/Login.js' ;
import Register from './comps/signup/register/Register.js' ;
import Footer from './comps/footer/Footer.js' ;
import Profile from './comps/UserProfile/UserProfile.js' ;
import './App.css' ;

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
		              <Route path='/login' render={props=><Login {...props} user={user} 
		              		 loadUser={this.loadUser}/>}/>
		              <Route path='/register' render={props=><Register {...props} user={user} 
		              		 loadUser={this.loadUser}/>} />
		              <Route path='/program/Sarathi' render={props=><Sarathi user={user} 
		              		 token={userToken}/>}/>
		              <Route path='/program/AEQUESS' render={props=><AEQUESS user={user} 
		              		 token={userToken}/>}/>
		              <Route path='/consult' render={props=><Consult user={user} 
		              		 token={userToken}/>}/>
		              <Route path='/profile' render={props=><Profile user={user} 
		              		 token={userToken} loadUser={this.loadUser}/>}/>
		              <Route exact component={NotFound} />
		            </Switch>
			        <Footer footer={this.footer}/>
		          </div>
		        </ScrollContext>
		        </BrowserRouter>
		      </div>
		) ;
	}
}

export default App;