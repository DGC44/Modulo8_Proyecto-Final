import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

export default function UserManagement({ users, onDeleteUser, onChangeRole }) {
  const navigate = useNavigate(); // Inicializa el hook de navegación

  const handleBackClick = () => {
    navigate('/admin'); // Redirige a la página principal del administrador
  };

  const clients = users.filter(user => user.role === 'cliente');

  return (
    <div className="user-management-container">
      <div className="user-management-header">
        <button onClick={handleBackClick} className="back-btn">
          &larr; Volver
        </button>
        <h2>Gestión de Clientes</h2>
      </div>
      
      {clients.length === 0 ? (
        <p>No hay clientes registrados.</p>
      ) : (
        <ul className="user-list">
          {clients.map(user => (
            <li key={user.email} className="user-item">
              <div className="user-info">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Nombre:</strong> {user.username}</p>
              </div>
              <div className="user-actions">
                <button 
                  onClick={() => onDeleteUser(user.email)} 
                  className="delete-btn"
                >
                  Eliminar
                </button>
                <button 
                  onClick={() => onChangeRole(user.email)} 
                  className="change-role-btn"
                >
                  Hacer Admin
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}