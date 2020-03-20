import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Car from 'pages/Car'
import Home from 'pages/Home'
import Store from 'pages/store'
import 'antd/dist/antd.css'

ReactDOM.render(<Provider {...Store}>
  <BrowserRouter>
    <Switch>
      <Route exact={true} key="/" path="/" component={Home} />
      <Route exact={true} key="/car" path="/car" component={Car} />
    </Switch>
  </BrowserRouter>
</Provider>, document.getElementById('root'));
