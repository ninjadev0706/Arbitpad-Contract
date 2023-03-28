import "antd/dist/antd.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { HelmetTags } from './components/HelmetTags';  //k-k
import ScrolledButton from "./components/ScrolledButton";

const { ethers } = require("ethers");

function App(props) {

  return (
    <BrowserRouter>
        <div>
          <HelmetTags page='home' />
          <Switch>
            <Route exact path='/'>
              <ScrolledButton />
            </Route>
          </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
