import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from 'pages/Login'
import Home from 'pages/Home'
import Layout from 'pages/layout'
import Store from 'pages/store'
import 'antd/dist/antd.css'
import './index.less'

const pages = [
  {
    name: '登录注册页面',
    key: 'login',
    path: '/login',
    component: Login,
    isLoginPage: true,
  },
]

ReactDOM.render(<Provider {...Store}>
  <BrowserRouter>
    <Switch>
      {
        pages.map(item => {
          return (
            <Route
              exact={true}
              key={item.key}
              path={item.path}
              render={() => (
                <Layout isLoginPage={item.isLoginPage}>
                  <item.component />
                </Layout>
              )}
            />
          )
        })
      }
    </Switch>
  </BrowserRouter>
</Provider>, document.getElementById('root'));
