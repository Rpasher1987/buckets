// // client.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';
// import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import '@src/client_fields/view_clients.scss';

class ViewClients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientsOfUser: [],
      total_pages: null,
      next_page: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.getUserClients();
  }

  getUserClients() {
    const username = this.props.data.username;

    fetch(`/api/users/${username}/clients?page=1`)
    .then(handleErrors)
    .then(data => {
      this.setState({
        clientsOfUser: data.clients,
        total_pages: data.total_pages,
        next_page: data.next_page,
        loading: false,
      })
    })
  }

  loadMore = () => {
    const username = this.props.data.username;
  
    if (this.state.next_page === null) {
      return;
    }
    this.setState({ loading: true });
    fetch(`/api/users/${username}/clients?page=${this.state.next_page}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          clientsOfUser: this.state.clientsOfUser.concat(data.clients),
          total_pages: data.total_pages,
          next_page: data.next_page,
          loading: false,
        })
      })
  }
  

  render() {
    const { clientsOfUser, next_page, loading } = this.state;
    return (
      <Layout centered={true}>
        <div className="client mb-3 container">
          <div className="row justify-content-center">
            {clientsOfUser.map(client => {
              return (
                <div key={client.id} id={client.id} className='col-md-10 col-lg-8 mb-4 client border'>
                  <a className='btn p-2 mx-2' role='button' href={`/${this.props.data.username}/clients/${client.id}`}>
                    <h5 className="card-title">
                      {`${client.last_name}, ${client.first_name}${client.spouse_first_name ? ` & ${client.spouse_first_name}` : ''}`}
                    </h5>
                    <p className="card-text">Retirement Year: {client.retirement_year}</p>
                  </a>
                </div>
              )
            })}
          </div>
          {loading && <p>loading...</p>}
          {(loading || next_page === null) ||
            <div className="text-center">
              <button
                className="btn btn-light mb-4"
                onClick={this.loadMore}
              >load more</button>
            </div>
          }
        </div>
      </Layout>
    )
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params');
  const data = JSON.parse(node.getAttribute('data-params'));

  ReactDOM.render(
      <ViewClients data={data} />,
      document.body.appendChild(document.createElement('div')),
  )
});