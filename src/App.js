import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom' ;
import ReactNotification from 'react-notifications-component' ;
import 'react-notifications-component/dist/theme.css' ;

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

	resize = () => this.forceUpdate()

	componentDidMount() {
	  window.addEventListener('resize', this.resize)
	}

	componentWillUnmount() {
	  window.removeEventListener('resize', this.resize)
	}

	loadUser = (user) => {
			this.setState({user: user.user, userToken: user.token});
	}
	
	render()
	{	console.log(this.state) ;
		return(
			<div className="App">
				<ReactNotification />
		        <BrowserRouter>
		          <div>
		          	<TopBar />
		            <Header user={this.state.user} token={this.state.userToken}/>
		            <Switch>
		              <Route path='/' exact component={Home} />
		              <Route path='/about/leader' exact component={AboutPerson}/>
		              <Route path='/about/psyment' exact component={AboutPsican}/>
		              <Route path='/contact' exact component={Contact}/>
		              <Route path='/login' render={props=><Login {...props} user={this.state.user} loadUser={this.loadUser}/>}/>
		              <Route path='/register' render={props=><Register {...props} user={this.state.user} loadUser={this.loadUser}/>} />
		              <Route path='/program/Sarathi' render={props=><Sarathi user={this.state.user} token={this.state.userToken}/>}/>
		              <Route path='/program/AEQUESS' render={props=><AEQUESS user={this.state.user} token={this.state.userToken}/>}/>
		              <Route path='/consult' render={props=><Consult user={this.state.user} token={this.state.userToken}/>}/>
		              <Route path='/profile' render={props=><Profile user={this.state.user} token={this.state.userToken}/>}/>
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
