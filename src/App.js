import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Maps from './components/Maps'
import Dashboard from './components/Dashboard';





function App() {

  return (

    <>

      <div>


        <Switch>
          <Route exact from="/" render={props => <Sidebar {...props} />} />
          <Route exact from="/" render={props => <Dashboard {...props} />} />
          <Route exact from="/maps" render={props => <Maps {...props} />} />

        </Switch>

      </div>
    </>

  );
}

export default App;