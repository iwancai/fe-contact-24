import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ contacts, selectedContacts, setContacts, setIsEditing }) => {
  const id = selectedContacts.id;

  const [firstName, setFirstName] = useState(selectedContacts.firstName);
  const [lastName, setLastName] = useState(selectedContacts.lastName);
  const [age, setAge] = useState(selectedContacts.age);
  const [photo, setPhoto] = useState(selectedContacts.photo);


  const handleUpdate = e => {
    e.preventDefault();
    const contacts = {
      id,
      firstName,
      lastName,
      age,
      photo
    };

    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].id === id) {
        contacts.splice(i, 1, contacts);
        break;
      }
    }

    localStorage.setItem('contacts_data', JSON.stringify(contacts));
    setContacts(contacts);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${contacts.firstName} ${contacts.lastName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Contact</h1>
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
          type="age"
          name="age"
          value={age}
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
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
