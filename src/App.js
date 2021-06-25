import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
function App() {

  return (

    <>

      <div>


        <Switch>
          <Route exact from="/" render={props => <Sidebar {...props} />} />


        </Switch>

      </div>
    </>

  );
}

export default App;