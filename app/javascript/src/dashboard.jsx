// home.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { setDate } from '@utils/customFunctions.js';
import { safeCredentials, handleErrors } from "@utils/fetchHelper";

import '@src/home.scss';


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  logout = e => {
    e.preventDefault();
    fetch('api/sessions', safeCredentials({
      method: 'DELETE',
    }))
    .then(handleErrors)
    .then(data => {
      if(data.success) {
        this.setState({
          authenticated: false,
          // If the request is successful, the authenticated state is set to false to indicate that the user is no longer logged in, and the page is redirected to the default homepage ('/') or to the URL specified in the redirect_url parameter in the query string. If the request fails, an error message is displayed to the user. 
        })
        const params = new URLSearchParams(window.location.search);
        const redirect_url = params.get('redirect_url') || '/';
        window.location = redirect_url;
      }
    })
    .catch(error => {
      this.setState({
          error: 'You could not sign out.',
      })
    })
  }
  // The render method is responsible for rendering the user's profile information and the logout button. It takes in the username and email props and displays them on the page. The logout method is called when the user clicks the logout button. <
  render() {
    const {username, email} = this.props;
    return(
      <div className='d-flex flex-column vh-100'>
          <div className='align-items-center'>
            <div>
              <nav className='navbar d-flex flex-column'>
                <ul className='navbar-nav'>
                  <li className='nav-item active'>
                    {/* <a className='navbar-brand' href='/'><span>Home</span></a> */}
                  </li>
                </ul>
              </nav>
              <div id='sidebar-wrapper' className='sidebar-wrapper border-top border-primary'>
                <div id='sidebar' className='text-center mb-5 mt-5'>
                <div className='user-logout'></div>
                <div>
                  <h6>@{username}</h6>
                </div>
              <form onSubmit={this.logout} className="d-flex justify-content-center">
              <button className="btn-primary btn-sm rounded-pill" type="submit" variant="link" size="sm">
              Log out
              </button>
            </form>
          </div>
        </div>
       </div>
       </div>
      </div>
    )
  }
}


class ClientSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      results: [],
    };
  }

  handleSearchChange = (e) => {
    const search = e.target.value;
    this.setState({ search });

    if (search.trim()) {
      this.fetchSearchResults(search);
    } else {
      this.setState({ results: [] });
    }
  };

  fetchSearchResults = (search) => {
    const { username } = this.props;
    fetch(`/api/users/${username}/clients/search?query=${search}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ results: data.clients });
      });
  };

  render() {
    const { search, results } = this.state;
    const { username } = this.props;
    return (
      <div>
        <input
          type="text"
          value={search}
          onChange={this.handleSearchChange}
          placeholder="Search clients..."
        />
        <div>
          {results.map((client) => (
            <div key={client.id} className="search-result">
              <a href={`/${username}/clients/${client.id}`}>
                {client.last_name}, {client.first_name} & {client.spouse_first_name}
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// export default ClientSearch;


// DASHBOARD COMPONENT
class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: true,
    }
  }
  componentDidMount() {
    this.userAuthenticated()
  }
  userAuthenticated() {
    fetch('/api/authenticated')
    .then(handleErrors)
    .then(data => {
       console.log('data', data)
      this.setState({
        authenticated: data.authenticated,
        username: data.username,
        email: data.email,
      })
    })
  }
      getYear() {
        return new Date().getFullYear();
    }
    toggleSearch = () => {
      this.setState((prevState) => ({
        showSearch: !prevState.showSearch,
      }));
    };
    render() {
      const { authenticated, username, email, showSearch } = this.state;
    if (authenticated) {
      return (
        <div className="container-fluid border border-dark border-5">
          <div className="row">
            <div className="col-2 justify-content-end border border-dark border-5 left-box vh-100">
              <Sidebar username={username} email={email}/>
            </div>
            <div className="col-10">{/*  */}
                <div className="row d-flex flex-row px-3 py-4  border border-dark border-4 border-start-0 border-end-0 bg-success p-2 text-white bg-opacity-50">
                  <div className='fw-bold'>{setDate(`${username}`)}</div> 
                </div>
                    {/* Next row here  */}
                    <div className="card-header mt-5 border">
                      Select Client Options
                    </div>
                    <div className="card" id="client-options">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item"><a href={`/${username}/add_clients`} className="text-body text-decoration-none">Add New Client</a></li>
                        <li className="list-group-item"><a href={`/${username}/view_clients`} className="text-body text-decoration-none">View Clients</a></li>
                        <li className="list-group-item">
                          <button type="button" className="btn btn-outline-primary" onClick={this.toggleSearch}>Search Clients</button>
                        </li>
                        {showSearch && <ClientSearch username={username} />}
                      </ul>
                      <div className="card-footer">
                        Contact
                      </div>
                    </div>
                    {/* Next row here  */}
                </div>{/* Need to add new flex row below to go with flow, that rhymms motha fucka */}  
              </div>
            </div>
            );
          };
    return (
      <Home />
    )
  }
}

export default Dashboard


{/* FOR sidebar state, checkback to see if you need later <div className="col-2 justify-content-end border border-dark border-5 left-box vh-100"> */}
