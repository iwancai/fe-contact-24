import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ contacts, setContacts, setIsAdding }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [photo, setPhoto] = useState('');

  const handleAdd = e => {
    e.preventDefault();

    const id = contacts.length + 1;
    const newEmployee = {
      id,
      firstName,
      lastName,
      age,
      photo
    };

    contacts.push(newEmployee);
    localStorage.setItem('contacts_data', JSON.stringify(contacts));
    setContacts(contacts);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${firstName} ${lastName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add New Contact</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          name="age"
          onChange={e => setAge(e.target.value)}
        />
        <label htmlFor="photo">Photo</label>
        <input
          id="photo"
          type="file"
          name="photo"
          value={photo}
          onChange={e => setPhoto(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
