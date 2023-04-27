import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from '@src/dashboard';
import Layout from '@src/layout';
import Client from '@src/widgets/client';
import EditForm from '@src/widgets/edit_form';
import CashFlows from "@src/widgets/cash_flows";
import ReturnRates from "@src/widgets/return_rates";
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class ClientProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      client: {},
      username: '',
      loading: true,
      showEditForm: false,
      formData: {
        first_name: '',
        last_name: '',
        age: '',
        spouse_first_name: '',
        spouse_last_name: '',
        spouse_age: '',
        retirement_year: '',
      },
      cash_flows: [],
    };
  }

  componentDidMount() {
    this.viewClient();
    this.fetchCashFlows();
  }

  viewClient() {
    const { client_id, username } = this.props;
    fetch(`/api/users/${username}/clients/${client_id}`)
      .then(handleErrors)
      .then((data) => {
        this.setState({
          client: data.client,
          username: username, // Add this line
          loading: false,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  fetchCashFlows = () => {
    const { client_id, username } = this.props;
    // Fetch the cash flows from the server and update the state
    fetch(`/api/users/${username}/clients/${client_id}/cash_flows`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched cash flows:', data); // Add this line to log fetched cash flows
        this.setState({
          cash_flows: data.cash_flows || [], // Use data.cash_flows instead of data, and add a fallback if data.cash_flows is undefined
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({ cash_flows: [] }); // Update the state with an empty array if there is an error
      });      
  };
  
  toggleEditForm = () => {
    const { showEditForm, client } = this.state;
    if (!showEditForm) {
      this.setState({
        formData: {
          first_name: client.first_name || '',
          last_name: client.last_name || '',
          age: client.age || '',
          spouse_first_name: client.spouse_first_name || '',
          spouse_last_name: client.spouse_last_name || '',
          spouse_age: client.spouse_age || '',
          retirement_year: client.retirement_year || '',
        },
      });
    } else {
      this.setState({
        formData: {
          first_name: '',
          last_name: '',
          age: '',
          spouse_first_name: '',
          spouse_last_name: '',
          spouse_age: '',
          retirement_year: '',
        },
      });
    }
    this.setState({ showEditForm: !showEditForm });
  };

  handleFormChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { client_id, username } = this.props;
    const { formData } = this.state;

    fetch(`/api/users/${username}/clients/${client_id}`, safeCredentials({
      method: 'PUT',
      body: JSON.stringify({
        client: formData,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }))
      .then(handleErrors)
      .then((data) => {
        this.setState({
          client: data.client,
          showEditForm: false,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  render() {
    const { client, loading, showEditForm, formData, cash_flows } = this.state;
    const { client_id, username } = this.props;
  
    if (loading) {
      return <p>loading...</p>;
    }
  
    return (
      <Layout>
        {showEditForm ? (
          <EditForm
            formData={formData}
            handleFormChange={this.handleFormChange}
            handleSubmit={this.handleSubmit}
            toggleEditForm={this.toggleEditForm}
          />
        ) : (
          <>
            <Client client={client} toggleEditForm={this.toggleEditForm} />
            <CashFlows
              cash_flows={cash_flows}
              client_id={client_id}
              username={username}
            />
          </>
        )}
      </Layout>
    );
  }
  
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params');
  const data = JSON.parse(node.getAttribute('data-params'));
  ReactDOM.render(
    <ClientProfile client_id={data.client_id} username={data.username} />,
    document.body.appendChild(document.createElement('div')),
  );
});

