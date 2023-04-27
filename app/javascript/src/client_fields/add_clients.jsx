import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import '@src/client_fields/client_fields.scss';

class AddClient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      age: '',
      spouse_first_name: '',
      spouse_last_name: '',
      spouse_age: '',
      retirement_year: '',
      error: '',
      username: '',
    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  handleGoBack = () => {
    const params = new URLSearchParams(window.location.search);
        const redirect_url = params.get('redirect_url') || '/';
        window.location = redirect_url;
  };
  addClient = e => {
    e.preventDefault();
    const username = this.props;
    console.log(username);
    const clientData = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      age: this.state.age,
      spouse_first_name: this.state.spouse_first_name,
      spouse_last_name: this.state.spouse_last_name,
      spouse_age: this.state.spouse_age,
      retirement_year: this.state.retirement_year,
    };

    fetch(`/api/users/${username}/clients`, safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        client: clientData,
      })
    }))
    .then(handleErrors)
    .then((data) => {
      console.log('data:', data);
      this.setState({
        username: data.client.user.username,
      })

      const params = new URLSearchParams(window.location.search)
      // Use this.state.username instead of user.username
      const redirect_url = params.get('redirect_url') || `/${this.state.username}/clients/${data.client.id}`
      window.location = redirect_url;
    })
    .catch(error => {
      this.setState({
        error: 'Sorry, you cannot create a new client, Please try again.'
      })
    })
  }
  render() {
    const {
      first_name,
      last_name,
      age,
      spouse_first_name,
      spouse_last_name,
      spouse_age,
      retirement_year,
      error
    } = this.state;
  
    return (
      <Layout centered>
        <div className="container mt-5">
          <div className="card">
            <div className="card-header text-center">Add New Client</div>
            <form onSubmit={this.addClient}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header">Client Information</div>
                      <div className="card-body">
                        <div className="form-group">
                          <label htmlFor="first_name">First name</label>
                          <input
                            type="text"
                            name="first_name"
                            className="form-control"
                            value={first_name}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="last_name">Last name</label>
                          <input
                            type="text"
                            name="last_name"
                            className="form-control"
                            value={last_name}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="age">Age</label>
                          <input
                            type="number"
                            name="age"
                            className="form-control"
                            value={age}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header">Spouse Information</div>
                      <div className="card-body">
                        <div className="form-group">
                          <label htmlFor="spouse_first_name">Spouse's first name</label>
                          <input
                            type="text"
                            name="spouse_first_name"
                            className="form-control"
                            value={spouse_first_name}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="spouse_last_name">Spouse's last name</label>
                          <input
                            type="text"
                            name="spouse_last_name"
                            className="form-control"
                            value={spouse_last_name}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="spouse_age">Spouse's Age</label>
                          <input
                            type="number"
                            name="spouse_age"
                            className="form-control"
                            value={spouse_age}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12 text-center">
                    <div className="form-group">
                      <label htmlFor="retirement_year">Retirement year</label>
                      <input
                        type="number"
                        name="retirement_year"
                        className="form-control"
                        value={retirement_year}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12 text-center">
                  <button
                   type="button"
                   className="btn btn-secondary me-2"
                   onClick={this.handleGoBack}
                    >
                  Go Back
                  </button>
                  <button className="btn btn-primary">Add a new client</button>
                    {error && <p className="text-danger">{error}</p>}
                    </div>
                  </div>
                </div>
              </form>
              </div>
            </div>
        </Layout>
      );
    }  
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
      <AddClient />,
      document.body.appendChild(document.createElement('div')),
  )
});