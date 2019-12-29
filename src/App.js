import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom' ;

import Home from './comps/home/Home.js' ;
import AboutPerson from './comps/about/Aboutperson.js' ;
import AboutPsican from './comps/about/Aboutpsican.js' ;
import AboutVision from './comps/about/Aboutvision.js' ;
import Contact from './comps/contact/Contact.js' ;
import NotFound from './comps/home/NotFound.js' ;
import Header from './comps/header/Header.js' ;
import Program from './comps/program/Program.js' ;
import TopBar from './comps/header/TopBar.js' ;
import MentaMorph from './comps/program/Mentamorph.js' ;
import AQueSS from './comps/program/AQES.js' ;
import Sarathi from './comps/program/KFMP.js' ;
import Personal from './comps/program/Personal.js' ;
import Test from './comps/program/Test.js' ;
import Login from './comps/signup/login/Login.js' ;
import Register from './comps/signup/register/Register.js' ;
import Footer from './comps/footer/Footer.js' ;
import './App.css' ;

class App extends React.Component
{	state = {
		user: {} ,
		logged: 'no'
	}

	resize = () => this.forceUpdate()

	componentDidMount() {
	  window.addEventListener('resize', this.resize)
	}

	componentWillUnmount() {
	  window.removeEventListener('resize', this.resize)
	}

	loadUser = (user) => {
		this.setState({user: user, logged: 'yes'});
	}
	
	render()
	{	console.log(this.state) ;
		return(
			<div className="App">
		        <BrowserRouter>
		          <div>
		          	<TopBar />
		            <Header user={this.state.user} logged={this.state.logged}/>
		            <Switch>
		              <Route path='/' exact component={Home} />
		              <Route path='/about/leader' exact component={AboutPerson}/>
		              <Route path='/about/vision' exact component={AboutVision}/>
		              <Route path='/about/psyment' exact component={AboutPsican}/>
		              <Route path='/contact' exact component={Contact}/>
		              <Route path='/mentamorph' component={MentaMorph}/>
		              <Route path='/login' render={props=><Login {...props} loadUser={this.loadUser}/>}/>
		              <Route path='/register' component={Register} />
		              <Route path='/program' exact component={Program}/>
		              <Route path='/program/Sarathi' component={Sarathi}/>
		              <Route path='/program/AQueSS' component={AQueSS}/>
		              <Route path='/test' component={Test}/>
		              <Route path='/program/personal' component={Personal}/>
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
