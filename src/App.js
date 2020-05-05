import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom' ;

import Home from './comps/home/Home.js' ;
import AboutPerson from './comps/about/Aboutperson.js' ;
import AboutPsican from './comps/about/Aboutpsican.js' ;
import AboutVision from './comps/about/Aboutvision.js' ;
import Contact from './comps/contact/Contact.js' ;
import NotFound from './comps/home/NotFound.js' ;
import Header from './comps/header/Header.js' ;
import TopBar from './comps/header/TopBar.js' ;
import AEQUESS from './comps/program/AQES.js' ;
import Sarathi from './comps/program/KFMP.js' ;
import Consult from './comps/program/Personal.js' ;
import Login from './comps/signup/login/Login.js' ;
import Register from './comps/signup/register/Register.js' ;
import Footer from './comps/footer/Footer.js' ;
import './App.css' ;

class App extends React.Component
{	state = {
		user: {} ,
		userToken: '' ,
	}

	resize = () => this.forceUpdate()

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
	}
	
	render()
	{	//console.log(this.state) ;
		return(
			<div className="App">
		        <BrowserRouter>
		          <div>
		          	<TopBar />
		            <Header user={this.state.user} token={this.state.userToken}/>
		            <Switch>
		              <Route path='/' exact component={Home} />
		              <Route path='/about/leader' exact component={AboutPerson}/>
		              <Route path='/about/vision' exact component={AboutVision}/>
		              <Route path='/about/psyment' exact component={AboutPsican}/>
		              <Route path='/contact' exact component={Contact}/>
		              <Route path='/login' render={props=><Login {...props} user={this.state.user} loadUser={this.loadUser}/>}/>
		              <Route path='/register' render={props=><Register {...props} user={this.state.user} loadUser={this.loadUser}/>} />
		              <Route path='/program/Sarathi' component={Sarathi}/>
		              <Route path='/program/AEQUESS' component={AEQUESS}/>
		              <Route path='/consult' component={Consult}/>
		              <Route exact component={NotFound} />
		            </Switch>
			        <Footer />
		          </div>
		        </BrowserRouter>
		      </div>
		) ;
	}
}

export default App;
