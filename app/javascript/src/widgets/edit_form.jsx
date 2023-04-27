import React from 'react';
import ReactDOM from 'react-dom';

const EditForm = ({ formData, handleFormChange, handleSubmit, toggleEditForm }) => {
  return (
    <div className="client-edit-form mb-3 mt-4 container">
      <h2>Edit Client</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleFormChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleFormChange}
          placeholder="Last Name"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleFormChange}
          placeholder="Age"
        />
        <input
          type="text"
          name="spouse_first_name"
          value={formData.spouse_first_name}
          onChange={handleFormChange}
          placeholder="Spouse First Name"
        />
        <input
          type="text"
          name="spouse_last_name"
          value={formData.spouse_last_name}
          onChange={handleFormChange}
          placeholder="Spouse Last Name"
        />
        <input
          type="number"
          name="spouse_age"
          value={formData.spouse_age}
          onChange={handleFormChange}
          placeholder="Spouse Age"
        />
        <input
          type="number"
          name="retirement_year"
          value={formData.retirement_year}
          onChange={handleFormChange}
          placeholder="Retirement Year"
        />
        <button type="submit" className="btn btn-primary">Save Changes</button>
        <button type="button" className="btn btn-secondary" onClick={toggleEditForm}>Cancel</button>
      </form>
    </div>
  );
};

export default EditForm;
