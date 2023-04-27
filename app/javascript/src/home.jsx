// home.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Login from '@src/login/login';
import Layout from '@src/layout';
import Dashboard from '@src/dashboard';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';


class Home extends React.Component {
  state = {
    authenticated: false,
    error: false,
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
      })
  }

  render() {
    const { authenticated } = this.state;
    if (!authenticated) {
      return (
        <Layout centered>
          <div className="login-card">
            <Login />
          </div>
        </Layout>
      );
    }
    return(
        <Dashboard />
    )
  }

}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
