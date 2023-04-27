// import React from 'react';
// import { safeCredentials, handleErrors } from '@utils/fetchHelper';

// class ReturnRates extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       toggleEdit: false,
//       client: {},
//       username: '',
//       return_rate: {
//         preservation: '',
//         income: '',
//         growth: '',
//         retirement_assets: '',
//       }
//     };
//   }

//   updateReturnRates = (return_rate) => {
//     const { client_id, username } = this.props;
//     fetch(`/api/users/${username}/clients/${client_id}/return_rates`, safeCredentials({
//       method: 'PUT',
//       body: JSON.stringify({ 
//         return_rate: {
//           preservation: return_rate.preservation,
//           income: return_rate.income,
//           growth: return_rate.growth,
//           retirement_assets: return_rate.retirement_assets,
//         }
//       }),
//       headers: { 
//         'Content-Type': 'application/json' 
//       },
//     }))    
//       .then(handleErrors)
//       .then((data) => {
//         this.setState({
//           return_rate: {
//             preservation: '',
//             income: '',
//             growth: '',
//             retirement_assets: '',
//           }
//         });
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   addReturnRate = () => {
//     const { return_rate, username, client_id } = this.props;
//     fetch(`/api/users/${username}/clients/${client_id}/return_rates`, safeCredentials({
//       method: 'POST',
//       body: JSON.stringify({ 
//         return_rate: {
//           preservation: return_rate.preservation,
//           income: return_rate.income,
//           growth: return_rate.growth,
//           retirement_assets: return_rate.retirement_assets,
//         }
//       }),
//       headers: { 
//         'Content-Type': 'application/json' 
//       },
//     }))    
//       .then(handleErrors)
//       .then((data) => {
//         this.setState({
//           toggleEdit: false,
//         });
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   handleSave = (e) => {
//     e.preventDefault();
//     const { return_rate } = this.props;
//     if (return_rate.id) {
//       this.updateReturnRates(return_rate);
//     } else {
//       this.addReturnRate();
//     }
//     this.toggleEditForm();
//   };
  
//   toggleEditForm = () => {
//     const { toggleEdit } = this.state;
//     this.setState({ toggleEdit: !toggleEdit });
//   };

//   handleRRFormChange = (e) => {
//     const { name, value } = e.target;
//     this.setState((prevState) => ({
//       return_rate: {
//         ...prevState.return_rate,
//         [name]: value,
//       },
//     }), () => {
//       // call the defined function here
//       const { return_rate } = this.state;
//       this.updateReturnRates(return_rate);
//     });
//   };
  
  

//   render() {
//     const { return_rate, client_id, username } = this.props; // Add this line
//     console.log(return_rate); // Add this line
//     const { toggleEdit } = this.state;
  
//     if (!return_rate || Object.keys(return_rate).length === 0) {
//       return <p>Loading...</p>;
//     }
//     return (
//       <div className="col-md-12">
//         <div className="card mb-4">
//           <div className="card-body">
//             <h5 className="card-title">Return Rates</h5>
//             {toggleEdit ? (
//               <div className="row mb-3">
//                 <div className="col-md-4">
//                   <input
//                     type="number"
//                     className="form-control"
//                     placeholder="Preservation"
//                     name="preservation"
//                     value={return_rate.preservation}
//                     onChange={this.handleRRFormChange}
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <input
//                     type="number"
//                     className="form-control"
//                     placeholder="Income"
//                     name="income"
//                     value={return_rate.income}
//                     onChange={this.handleRRFormChange}
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <input
//                     type="number"
//                     className="form-control"
//                     placeholder="Growth"
//                     name="growth"
//                     value={return_rate.growth}
//                     onChange={this.handleRRFormChange}
//                   />
//                 </div>
//                 <div className="col-md-12">
//                   <input
//                     type="number"
//                     className="form-control"
//                     placeholder="Retirement Assets"
//                     name="retirement_assets"
//                     value={return_rate.retirement_assets}
//                     onChange={this.handleRRFormChange}
//                   />
//                 </div>
//               </div>
//             ) : (
//               <div className="row mb-3">
//                 <div className="col-md-4">
//                   <p>Preservation:</p>
//                   <p>{return_rate.preservation}</p>
//                 </div>
//                 <div className="col-md-4">
//                   <p>Income:</p>
//                   <p>{return_rate.income}</p>
//                 </div>
//                 <div className="col-md-4">
//                   <p>Growth:</p>
//                   <p>{return_rate.growth}</p>
//                 </div>
//                 <div className="col-md-12">
//                   <p>Retirement Assets:</p>
//                   <p>{return_rate.retirement_assets}</p>
//                 </div>
//               </div>
//             )}
//             <button className="btn btn-primary mr-2" onClick={this.handleSave}>
//               {toggleEdit ? 'Save' : 'Edit'}
//             </button>
//           </div>
//         </div>
//       </div>
//       );
//     }
//   }
  
//   export default ReturnRates;


/////////////////// BACK UP AS OF 4/25    ////////////////////////////

import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import './widgets.scss';

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
    const isTemporaryId = data.id.startsWith('temp-');
  
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
  
    if (isTemporaryId) {
      // POST request to create a new cash flow
      fetch(`/api/users/${username}/clients/${client_id}/cash_flows`, safeCredentials({
        method: 'POST',
        body: JSON.stringify({ cash_flow: cfForm }),
        headers: { 'Content-Type': 'application/json' },
      }))
        .then(handleErrors)
        .then(() => {
          this.toggleEditForm();
          this.setState({ errors: [] });
          this.props.onUpdate();
        })
        .catch((error) => {
          console.error('Error:', error);
          this.setState({
            errors: ['Sorry, you can\'t create cash flow at this time.'],
          });
        });
    } else {
      // PUT request to update an existing cash flow
      fetch(`/api/users/${username}/clients/${client_id}/cash_flows/${data.id}`, safeCredentials({
        method: 'PUT',
        body: JSON.stringify({
          cash_flow: cfForm,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }))
        .then(handleErrors)
        .then(() => {
          this.toggleEditForm();
          this.setState({ errors: [] });
          this.props.onUpdate(); // call onUpdate prop
        })
        .catch((error) => {
          console.error('Error:', error);
          this.setState({
            errors: ['Sorry, you can\'t update cash flow at this time.'],
          });
        });
    }
  };
  
  

  handleDelete = () => {
    const { client_id, username, data } = this.props;
  
    if (typeof data.id === 'string' && data.id.startsWith('temp-')) {
      this.props.onDelete(data.id);
      return;
    }
  
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
                        <td><label htmlFor="type">Type</label></td>
                        <td>
                          {this.renderSelect('type', ['Income', 'Expense'])}
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
            const { associated_with, type, name, amount, cola, start_year, end_year } = data;
          
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
                    <td>{type}</td>
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
      

// CASHFLOWS
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
          id: Date.now(),
          isNew: false,
        },
      ],
    }));
  };

  addCashFlow = () => {
    const newCashFlow = {
      id: `temp-${Date.now()}`,
      associated_with: '',
      type: '',
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


////////////////////////////////////////

// Layout.js
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark mb-5" data-bs-them='dark'>
    <a className="navbar-brand ml-2" href="/">Buckets</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
      <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">PageA</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">PageB</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled">PageC</a>
        </li>
      </ul>
      </div>
    </nav>
  );
}

////////////// LOG OUT ///////////////////////////////

const LogoutButton = () => {
  const logout = (e) => {
    e.preventDefault();
    fetch('api/sessions', safeCredentials({
      method: 'DELETE',
    }))
    .then(handleErrors)
    .then(data => {
      if(data.success) {
        const params = new URLSearchParams(window.location.search);
        const redirect_url = params.get('redirect_url') || '/';
        window.location = redirect_url;
      }
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <li className="nav-item">
      <button className="btn btn-sm btn-dark" onClick={logout}><small>Logout</small></button>
    </li>
  );
};

//////////////////// LAYOUT ///////////////////////////////////////////////


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom fixed-top">
      <div className="container">
        <a className="navbar-brand" href="/">CG Advisor Network</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/overview"><small>Overview</small></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/models"><small>Models</small></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/strategies"><small>UMA Strategies</small></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/methodology"><small>Methodology</small></a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true"><small>Updates</small></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/faq"><small>FAQ</small></a>
            </li>
          </ul>
          <div className="text-right">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
        <div className="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar">
          <ul className="navbar-nav ms-auto flex-nowrap">
            <LogoutButton />
          </ul>
        </div>
      </div>
    </nav>
  );
};





const Footer = props => {
  return(
    <div className="container-fluid bg-dark mt-auto">
      <footer className="py-2 my-2">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
              <li className="nav-item navFoot"><a href="main.php" target="_top" className="nav-link px-2 text-muted bi bi-house-fill"></a></li>
              <li className="nav-item navFoot"><a href="https://cgadvisornetwork.com/" className="nav-link px-2 text-muted bi bi-building"></a></li>
              <li className="nav-item navFoot"><a href="https://www.linkedin.com/company/cg-advisor-network" className="nav-link px-2 text-muted bi bi-linkedin"></a></li>
              <li className="nav-item navFoot"><a href="https://www.facebook.com/CGFinancialServices/" className="nav-link px-2 text-muted bi bi-facebook"></a></li>
              <li className="nav-item navFoot"><a href="mailto:rasher@cgadvisornetwork.com" className="nav-link px-2 text-muted bi bi-envelope"></a></li>
            </ul>
            <div className="text-muted">
            <p className="text-center text-muted">&copy; 2022 CG Advisor Network</p>
            <p className="text-center"><small><em>ADVISOR USE ONLY: Not intended for the public</em></small></p>
            <p><small><em>Advisory services are offered through Capital Asset Advisory Services, LLC, a Registered Investment Advisor doing business as CG Advisory Services. Securities are offered through Geneos Wealth Management, Inc. Member <a href="https://www.finra.org/#/" target="_blank">FINRA</a>/<a href="https://www.sipc.org/" target="_blank">SIPC.</a>
            Historical performance cannot guarantee future performance due to variations in market conditions over time. Investing involves the risk of loss, including loss of principal. Different types of investments involve varying degrees of risk, and there can be no assurance that any specific investment will be profitable for a clients investment portfolio.
            The topics discussed in this material are for general financial education and are not intended to provide specific investment advice or recommendations. The information is from publicly available sources believed to be reliable; however, we cannot assure the accuracy or completeness of these materials. Capital Asset Advisory Services & Geneos Wealth Management do not provide tax or legal services. Individuals are encouraged to consult their own financial, legal or tax advisor regarding their specific financial situation before acting on any information provided.</em></small></p>
          </div>
      </footer>
    </div>
  )
}

const Layout = (props) => {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
        <div>
          <div className='main'>
            <div className='container'>
              <div className='row'>
                <div className='front-card col-xs-10 col-xs-offset-1'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-10 align-middle'>
                        <div className="content">
                            {props.children}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <Footer />
      </div>
  )
}

export default Layout;



////////////////////////// 4/25 10:30pm //////////////// client profile ///////////////////

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
      return_rate: {
        preservation: '',
        income: '',
        growth: '',
        retirement_assets: '',
      },
      selectedName: 'first_name' // default to first_name
    };
  }

  componentDidMount() {
    this.viewClient();
    this.fetchCashFlows();
    this.viewReturnRates();
  }

  viewClient() {
    const { client_id, username } = this.props;
    fetch(`/api/users/${username}/clients/${client_id}`)
      .then(handleErrors)
      .then((data) => {
        this.setState({
          client: data.client,
          username: username,
          loading: false,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  fetchCashFlows = () => {
    const { client_id, username } = this.props;
    fetch(`/api/users/${username}/clients/${client_id}/cash_flows`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched cash flows:', data);
        this.setState({
          cash_flows: data.cash_flows || [],
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({ cash_flows: [] });
      });      
  };

  viewReturnRates = () => {
    const { client_id, username } = this.props;
    fetch(`/api/users/${username}/clients/${client_id}/return_rates`)
      .then(handleErrors)
      .then((data) => {
        console.log('Return Rates:', data);
        this.setState({
          return_rate: data.return_rate || {
            preservation: '',
            income: '',
            growth: '',
            retirement_assets: '',
          },
        });            
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({
          return_rate: {
            preservation: '',
            income: '',
            growth: '',
            retirement_assets: '',
          },
        });
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

    handleNameChange = (e) => {
      const { value } = e.target;
      this.setState({ selectedName: value });
    };

  // ... Rest of the code remains the same

  render() {
    const { client, loading, showEditForm, formData, cash_flows, return_rate, selectedName } = this.state;
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
          {/* Clients */}
            <Client client={client} toggleEditForm={this.toggleEditForm} />
            {/* CashFlows */}
            <div>
            <h2>{client.first_name} {client.spouse_first_name}</h2>
            <label>
              <input
                type="radio"
                name="name"
                value="first_name"
                checked={selectedName === 'first_name'}
                onChange={this.handleNameChange}
              />
              First Name
            </label>
            <label>
              <input
                type="radio"
                name="name"
                value="spouse_first_name"
                checked={selectedName === 'spouse_first_name'}
                onChange={this.handleNameChange}
              />
              Spouse First Name
            </label>
        </div>
            <CashFlows
              cash_flows={cash_flows}
              client_id={client_id}
              username={username}
              associated_with={client[selectedName]}
            />
        {/* render other widgets */}
            <ReturnRates
              return_rate={return_rate}
              username={username}
              client_id={client_id}
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
  
