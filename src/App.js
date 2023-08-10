import React from 'react';
import {Switch, Route} from 'react-router-dom';
import  ReloadOnBackButton from "./services/ReloadOnBackButton";

import LoginPage from "./components/pages/login";
import ViewTable from "./components/pages/view";
import DataUploadForm from "./components/pages/preference";
import SignUpPage from "./components/pages/signup"
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact> <Redirect to="/login" /> </Route>
        <Route path='/login' component={LoginPage} />
        <Route path='/signup' component={SignUpPage} />
        <Route path='/table' component={ViewTable} />
        <Route path='/upload' component={DataUploadForm} />
      </Switch>
      <ReloadOnBackButton />
    </div>
  );
  
}

export default App;
