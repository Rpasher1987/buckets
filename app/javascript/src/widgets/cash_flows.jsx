import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './widgets.scss';

// COMPONENT ONE CASH FLOWS

class CashFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showEditForm: false,
      errors: [],
      cfForm: {
        associated_with: '',
        cf_type: '',
        name: '',
        amount: '',
        cola: '',
        start_year: '',
        end_year: '',
      },
    };
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  toggleEditForm = () => {
    const { showEditForm } = this.state;
    const { data } = this.props;

    if (!showEditForm) {
      this.setState({
        cfForm: {
          associated_with: data.associated_with || '',
          cf_type: data.cf_type || '',
          name: data.name || '',
          amount: data.amount || '',
          cola: data.cola || '',
          start_year: data.start_year || '',
          end_year: data.end_year || '',
        },
      });
    } else {
      this.setState({
        cfForm: {
          associated_with: '',
          cf_type: '',
          name: '',
          amount: '',
          cola: '',
          start_year: '',
          end_year: '',
        },
      });
    }
    this.setState((prevState) => ({ showEditForm: !prevState.showEditForm }));
  };

  handleFormChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      cfForm: {
        ...prevState.cfForm,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { client_id, username, data } = this.props;
    const { cfForm } = this.state;
  
    // Check if any fields are empty
    if (
      !cfForm.associated_with ||
      !cfForm.cf_type ||
      !cfForm.name ||
      !cfForm.amount ||
      !cfForm.cola ||
      !cfForm.start_year ||
      !cfForm.end_year
    ) {
      this.setState({
        errors: ['All fields are required.'],
      });
      return;
    }
  
    const url = data.isNew ? `/api/users/${username}/clients/${client_id}/cash_flows` : `/api/users/${username}/clients/${client_id}/cash_flows/${data.id}`;
  
    const method = data.isNew ? 'POST' : 'PUT';
  
    fetch(url, safeCredentials({
      method: method,
      body: JSON.stringify({
        cash_flow: cfForm,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }))
      .then(handleErrors)
      // ...
      .then(() => {
        this.toggleEditForm();
        this.setState({ errors: [] });
        if (data.isNew) {
          this.props.onSaveNew(cfForm);
        } else {
          this.props.onUpdate(); // call onUpdate prop
        }
      })
      // ...
      .catch((error) => {
        console.error('Error:', error);
        this.setState({
          errors: ['Sorry, you can\'t update cash flow at this time.'],
        });
      });
  };
  

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { client_id, username, data } = this.props;
  //   const { cfForm } = this.state;
  
  //   // Check if any fields are empty
  //   if (
  //     !cfForm.associated_with ||
  //     !cfForm.cf_type ||
  //     !cfForm.name ||
  //     !cfForm.amount ||
  //     !cfForm.cola ||
  //     !cfForm.start_year ||
  //     !cfForm.end_year
  //   ) {
  //     this.setState({
  //       errors: ['All fields are required.'],
  //     });
  //     return;
  //   }
  
  //   fetch(`/api/users/${username}/clients/${client_id}/cash_flows/${data.id}`, safeCredentials({
  //     method: 'PUT',
  //     body: JSON.stringify({
  //       cash_flow: cfForm,
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }))
  //   .then(handleErrors)
  //   // ...
  //     .then(() => {
  //       this.toggleEditForm();
  //       this.setState({ errors: [] });
  //       this.props.onUpdate(); // call onUpdate prop
  //     })
  //     // ...
  //   .catch((error) => {
  //     console.error('Error:', error);
  //     this.setState({
  //       errors: ['Sorry, you can\'t update cash flow at this time.'],
  //     });
  //   });
  // };
  

  handleDelete = () => {
    const { client_id, username, data } = this.props;

    fetch(`/api/users/${username}/clients/${client_id}/cash_flows/${data.id}`, safeCredentials({
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }))    
      .then((response) => response.json())
      .then(() => {
        // Remove cash flow from state
        this.props.onDelete(data.id);
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({
          errors: ['Sorry, you cant delete cash flow at this time.'],
        });
      });
  };

  renderSelect(name, options) {
    const { showEditForm, cfForm } = this.state;
    const selectedValue = cfForm[name];
      if (!showEditForm) {
      return <p>{selectedValue}</p>;
      }
      return (
        <select name={name} value={selectedValue} onChange={this.handleFormChange} className="form-select">
          <option value="">Select {name}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }      
    render() {
      const { loading, showEditForm, errors, cfForm } = this.state;
      if (loading) {
        return <p>loading...</p>;
      }
      
      if (showEditForm) {
        return (
          <div className="container mb-3">
            <div className="card">
              <div className="card-header text-center">Edit Cash Flow</div>
              <form onSubmit={this.handleSubmit}>
                <div className="card-body">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>
                          <label htmlFor="associated_with">Ownership?</label>
                        </td>
                        <td>
                          {this.renderSelect('associated_with', ['Client', 'Spouse'])}
                        </td>
                      </tr>
                      <tr>
                        <td><label htmlFor="cf_type">Type</label></td>
                        <td>
                          {this.renderSelect('cf_type', ['Income', 'Expense'])}
                        </td>
                      </tr>
                      <tr>
                        <td><label htmlFor="name">Name</label></td>
                        <td>
                          <input type="text" name="name" value={cfForm.name} onChange={this.handleFormChange} className="form-control" />
                        </td>
                      </tr>
                      <tr>
                        <td><label htmlFor="amount">Amount</label></td>
                        <td>
                          <input type="number" name="amount" value={cfForm.amount} onChange={this.handleFormChange} className="form-control" />
                        </td>
                      </tr>
                      <tr>
                        <td><label htmlFor="cola">Cola</label></td>
                        <td>
                          <input type="number" name="cola" value={cfForm.cola} onChange={this.handleFormChange} className="form-control" />
                        </td>
                      </tr>
                      <tr>
                        <td><label htmlFor="start_year">Start Year</label></td>
                        <td>
                          <input type="number" name="start_year" value={cfForm.start_year} onChange={this.handleFormChange} className="form-control" />
                        </td>
                      </tr>
                      <tr>
                        <td><label htmlFor="end_year">End Year</label></td>
                        <td>
                          <input type="number" name="end_year" value={cfForm.end_year} onChange={this.handleFormChange} className="form-control" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="card-footer text-center">
                  <button className="btn btn-success">Save</button>
                  <button type="button" onClick={this.toggleEditForm} className="btn btn-secondary mx-2">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        );
      } else {
            const { data } = this.props;
            const { associated_with, cf_type, name, amount, cola, start_year, end_year } = data;
          
            return (
              <div className="container mb-3">
                <div className="card">
                  <div className="card-header text-center">Cash Flow</div>
            <div className="card-body">
              <table className="table">
                <tbody>
                  <tr>
                    <td><strong>Ownership?</strong></td>
                    <td>{associated_with}</td>
                  </tr>
                  <tr>
                    <td><strong>Type</strong></td>
                    <td>{cf_type}</td>
                  </tr>
                  <tr>
                    <td><strong>Name</strong></td>
                    <td>{name}</td>
                  </tr>
                  <tr>
                    <td><strong>Amount</strong></td>
                    <td>{amount}</td>
                  </tr>
                  <tr>
                    <td><strong>Cola</strong></td>
                    <td>{cola}</td>
                  </tr>
                  <tr>
                    <td><strong>Start Year</strong></td>
                    <td>{start_year}</td>
                  </tr>
                  <tr>
                    <td><strong>End Year</strong></td>
                    <td>{end_year}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="card-footer text-center">
            <button type="button" onClick={this.toggleEditForm} className="btn btn-sm btn-primary mx-2">Edit</button>
              <button type="button" onClick={this.handleDelete} className="btn btn-sm btn-danger">Delete</button>
            </div>
          </div>
        </div>
      );
    }
  }
}
      

// CASHFLOWS COMPONENT 2 WHICH USES CASHFLOW COMPONENT ONE

class CashFlows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cashFlows: [],
      error: '',
    };
  }

  componentDidMount() {
    const { client_id, username } = this.props;
    fetch(`/api/users/${username}/clients/${client_id}/cash_flows`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          cashFlows: data.cash_flows,
        });
      })
      .catch((error) => {
        this.setState({
          error: 'Sorry, we could not load your cash flows at this time.',
        });
      });
  }

  handleDelete = (id) => {
    this.setState((prevState) => ({
      cashFlows: prevState.cashFlows.filter((cashFlow) => cashFlow.id !== id),
    }));
  };

  handleSaveNewCashFlow = (cashFlowData) => {
    this.setState((prevState) => ({
      cashFlows: [
        ...prevState.cashFlows,
        {
          ...cashFlowData,
          id: -Date.now(),
          isNew: false,
        },
      ],
    }));
  };
  

  addCashFlow = () => {
    const newCashFlow = {
      id: -Date.now(),
      associated_with: '',
      cf_type: '',
      name: '',
      amount: '',
      cola: '',
      start_year: '',
      end_year: '',
      isNew: true,
    };
    this.setState((prevState) => ({
      cashFlows: [...prevState.cashFlows, newCashFlow],
    }));
  };
  
  

  handleUpdate = () => {
    const { client_id, username } = this.props;
    fetch(`/api/users/${username}/clients/${client_id}/cash_flows`, safeCredentials({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        },
      }))    
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          cashFlows: data.cash_flows,
        });
      })
      .catch((error) => {
        this.setState({
          error: 'Sorry, we could not load your cash flows at this time.',
        });
      });
  }

  render() {
    const { cashFlows, error } = this.state;

    return (
      <div className="card">
      <div className="card-body">
        <h5 className="card-title text-center">Cash Flows</h5>
        {error && <p>{error}</p>}
        {cashFlows.map((cashFlow, index) => (
            <CashFlow
            key={`${cashFlow.id}-${index}`}
            data={cashFlow}
            onDelete={this.handleDelete}
            isNew={cashFlow.isNew}
            onSaveNew={this.handleSaveNewCashFlow}
            onUpdate={this.handleUpdate}
            client_id={this.props.client_id}
            username={this.props.username}
          />
          ))}
        <div className="text-center">
            <button className="btn btn-primary" onClick={this.addCashFlow}>Add Additional Cash Flow</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CashFlows;