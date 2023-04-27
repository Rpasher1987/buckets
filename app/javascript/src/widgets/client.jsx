// client.jsx
import React from 'react';
import ReactDOM from 'react-dom';

const Client = ({ client, toggleEditForm }) => {
  return (
    <div className="container">
  <div className="card mb-3">
    <div className="card-body">
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">
                {client.first_name} {client.last_name}
              </h5>
              <p className="card-text">Age: {client.age}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">
                {client.spouse_first_name} {client.spouse_last_name}
              </h5>
              <p className="card-text">Spouse Age: {client.spouse_age}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <p className="card-text">Retirement Year: {client.retirement_year}</p>
        </div>
      </div>

      <div className="advisor mt-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Your Advisor</h5>
            <p className="card-text">{client.user.username}</p>
            <button className="btn btn-sm btn-primary" onClick={toggleEditForm}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  );
};

export default Client;
