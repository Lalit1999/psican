import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom' ;

import Home from './comps/Home/Home.js' ;
import AboutPerson from './comps/about/Aboutperson.js' ;
import AboutPsican from './comps/about/Aboutpsican.js' ;
import AboutVision from './comps/about/Aboutvision.js' ;
import Contact from './comps/contact/Contact.js' ;
import NotFound from './comps/Home/NotFound.js' ;
import Header from './comps/Header/Header.js' ;
// import TopBar from './comps/Header/TopBar.js' ;
import MentaMorph from './comps/program/Mentamorph.js' ;
import Program from './comps/program/Program.js' ;
import AEQS from './comps/program/AQES.js' ;
import KFMP from './comps/program/KFMP.js' ;
import Personal from './comps/program/Personal.js' ;
import Test from './comps/program/Test.js' ;
import Login from './comps/signup/login/Login.js' ;
import Register from './comps/signup/register/Register.js' ;

// import './app.css' ;

class App extends React.Component
{
	
	render()
	{
		return(
			<div className="App">
		        <BrowserRouter>
		          <div>
		          	
		            <Header />
		            <Switch>
		              <Route path='/' exact component={Home} />
		              <Route path='/about/leader' exact component={AboutPerson}/>
		              <Route path='/about/vision' exact component={AboutVision}/>
		              <Route path='/about/psican' exact component={AboutPsican}/>
		              <Route path='/contact' exact component={Contact}/>
		              <Route path='/mentamorph' component={MentaMorph}/>
		              <Route path='/login' component={Login} />
		              <Route path='/register' component={Register} />
		              <Route path='/program/KFMP' component={KFMP}/>
		              <Route path='/program/AEQS' component={AEQS}/>
		              <Route path='/test' component={Test}/>
		              <Route path='/program/personal' component={Personal}/>
		              <Route exact component={NotFound} />
		            </Switch>
		          </div>
		        </BrowserRouter>
		      </div>
		) ;
	}
}

export default App;
