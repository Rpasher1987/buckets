import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from "@utils/fetchHelper";

import './login.scss';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    authenticated: false,
    success: '',
    error: '',
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  loginSubmit = e => {
    e.preventDefault();
    fetch('api/sessions', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
        }
      })
    }))
    .then(handleErrors)
    .then(data => {
      console.log("data:", data);
      if(data.success) {
        this.setState({
          email: '',
          password: '',
          authenticated: true,
          success: 'Log in Successful!',
        })
        const params = new URLSearchParams(window.location.search);
        const redirect_url = params.get('redirect_url') || '/';
        window.location = redirect_url;
      }
    })
    .catch(error => {
      this.setState({
        error: 'Could not log in.',
      })
    })
  }
  render() {
    const { email, error, password, success} = this.state;
    return (
      <React.Fragment>
      <form onSubmit={this.loginSubmit} className='mt-5 align-middle'>
        <input name="email" type="text" className="form-control form-control-lg mb-3" placeholder="Email" value={email} onChange={this.handleChange} required />
        <input name="password" type="password" className="form-control form-control-lg mb-3" placeholder="Password" value={password} onChange={this.handleChange} required />
        <button type="submit" className="btn btn-dark btn-block btn-lg">Log in</button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
      <hr/>
      <p className="mb-0">Don't have an account? Contact the Administrator</p>
    </React.Fragment>
    )
  }
}

export default Login