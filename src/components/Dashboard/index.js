import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { contactsData } from '../../data';

const Dashboard = ({ setIsAuthenticated }) => {
  const [contacts, setContacts] = useState(contactsData);
  const [selectedContacts, setSelectedContacts] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('contacts_data'));
    if (data !== null && Object.keys(data).length !== 0) setContacts(data);
  }, []);

  const handleEdit = id => {
    const [contact] = contacts.filter(contact => contact.id === id);

    setSelectedContacts(contact);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [contact] = contacts.filter(contact => contact.id === id);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${contact.firstName} ${contact.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const contactCopy = contacts.filter(contact => contact.id !== id);
        localStorage.setItem('contact_data', JSON.stringify(contactCopy));
        setContacts(contactCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            contacts={contacts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          contacts={contacts}
          setContacts={setContacts}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          contacts={contacts}
          selectedContacts={selectedContacts}
          setContacts={setContacts}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
