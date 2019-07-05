import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom' ;

import Home from './comps/Home/Home.js' ;
import About from './comps/about/About.js' ;
import Contact from './comps/contact/Contact.js' ;
import NotFound from './comps/Home/NotFound.js' ;
import Header from './comps/Header/Header.js' ;
import TopBar from './comps/Header/TopBar.js' ;
// import './app.css' ;

class App extends React.Component
{
	
	render()
	{
		return(
			<div className="App">
		        <BrowserRouter>
		          <div>
		          	<TopBar />
		            <Header />
		            <Switch>
		              <Route path='/' exact component={Home} />
		              <Route path='/about/leader' exact component={}/>
		              <Route path='/about/vision' exact component={}/>
		              <Route path='/about/psican' exact component={}/>
		              <Route path='/contact' exact component={}/>
		              <Route path='/mentamorph' component={}/>
		              <Route path='/login' component={} />
		              <Route path='/register' component={} />
		              <Route path='/program/KFMP' component={}/>
		              <Route path='/program/AEQS' component={}/>
		              <Route path='/program/test' component={}/>
		              <Route path='/program/personal' component={}/>
		              <Route exact component={NotFound} />
		            </Switch>
		          </div>
		        </BrowserRouter>
		      </div>
		) ;
	}
}

export default App;
