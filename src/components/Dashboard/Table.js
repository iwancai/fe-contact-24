import React from 'react';

const Table = ({ contacts, handleEdit, handleDelete }) => {
  contacts?.forEach((contact, i) => {
    contact.id = i + 1;
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact, i) => (
              <tr key={contact.id}>
                <td>{i + 1}</td>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.age}</td>
                <td><img src={contact.photo} alt=''/></td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(contact.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No contacts</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
