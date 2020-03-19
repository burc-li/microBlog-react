import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import 'antd/dist/antd.css'

ReactDOM.render(<Provider>
  <BrowserRouter>
    <Switch>
      <Route exact={true} key="/home" path="/home" component={Home} />
    </Switch>
  </BrowserRouter>
</Provider>, document.getElementById('root'));
