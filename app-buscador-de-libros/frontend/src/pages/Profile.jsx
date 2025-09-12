import React from 'react';

const Profile = () => {
  const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];

  return (
    <div>
      <h2>Mis Libros Guardados</h2>
      {savedBooks.length === 0 ? (
        <p>No tienes libros guardados.</p>
      ) : (
        <ul>
          {savedBooks.map((book, index) => (
            <li key={index}>
              <strong>{book.title}</strong> - {book.author}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;