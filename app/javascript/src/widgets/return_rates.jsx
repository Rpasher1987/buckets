// app/javascript/src/widgets/return_rates.jsx
import React, { Component } from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class ReturnRates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      returnRate: {},
      formData: {
        preservation: '',
        income: '',
        growth: '',
        retirement_assets: '',
      },
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchReturnRate();
  }

  fetchReturnRate = () => {
    const { client_id, username } = this.props;
    fetch(`/api/users/${username}/clients/${client_id}/return_rates`)
      .then(handleErrors)
      .then((data) => {
        this.setState({
          returnRate: data.return_rate || {},
          loading: false,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({ loading: false });
      });
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

    fetch(`/api/users/${username}/clients/${client_id}/return_rates`, safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        return_rate: formData,
      }),
    }))
      .then(handleErrors)
      .then((data) => {
        this.setState({
          returnRate: data.return_rate,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  render() {
        const { returnRate, formData, loading } = this.state;

        if (loading) {
          return <p>Loading...</p>;
        }

        return (
          <div>
            <h2>Return Rates</h2>
            <form onSubmit={this.handleSubmit}>
              <label>
                Preservation:
                <input
                  type="number"
                  name="preservation"
                  value={formData.preservation}
                  onChange={this.handleFormChange}
                  step="0.01"
                  placeholder={returnRate.preservation}
                />
              </label>
              <label>
                Income:
                <input
                  type="number"
                  name="income"
                  value={formData.income}
                  onChange={this.handleFormChange}
                  step="0.01"
                  placeholder={returnRate.income}
                />
              </label>
              <label>
                Growth:
                <input
                  type="number"
                  name="growth"
                  value={formData.growth}
                  onChange={this.handleFormChange}
                  step="0.01"
                  placeholder={returnRate.growth}
                />
              </label>
              <label>
                Retirement Assets:
                <input
                  type="number"
                  name="retirement_assets"
                  value={formData.retirement_assets}
                  onChange={this.handleFormChange}
                  step="0.01"
                  placeholder={returnRate.retirement_assets}
                />
              </label>
              <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default ReturnRates;
