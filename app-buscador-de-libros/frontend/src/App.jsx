import { useEffect, useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import AdminPage from './components/AdminPage';
import ClientPage from './components/ClientPage';
import RegisterForm from './components/RegisterForm';
import UserManagement from './components/UserManagement'; // Asegúrate de importar este componente
import { Routes, Route, useNavigate } from 'react-router-dom';

const initialUsers = [
  { email: 'admin@test.com', username: 'admin', password: 'Password', role: 'administrador' },
  { email: 'HollowSilk@test.com', username: 'Hollow', password: 'Hornet66', role: 'administrador' },
  { email: 'cliente1@test.com', username: 'cliente1', password: 'Lector05', role: 'cliente' },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [bookOfTheMonth, setBookOfTheMonth] = useState(() => {
    const savedBook = localStorage.getItem('bookOfTheMonth');
    return savedBook ? JSON.parse(savedBook) : null;
  });
  const navigate = useNavigate();

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('registeredUsers');
    const registeredUsers = savedUsers ? JSON.parse(savedUsers) : [];
    
    const filteredInitialUsers = initialUsers.filter(initialUser => 
      !registeredUsers.some(registeredUser => registeredUser.email === initialUsers.email)
    );

    return [...filteredInitialUsers, ...registeredUsers];
  });
  
  const [currentView, setCurrentView] = useState('login');

  useEffect(() => {
    if (bookOfTheMonth) {
      localStorage.setItem('bookOfTheMonth', JSON.stringify(bookOfTheMonth));
    } else {
      localStorage.removeItem('bookOfTheMonth');
    }
  }, [bookOfTheMonth]);

  useEffect(() => {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  }, [users]);
  
  const deleteUser = (emailToDelete) => {
    setUsers(users.filter(user => user.email !== emailToDelete));
    alert('Usuario eliminado con éxito.');
  };
  
  const changeUserRole = (emailToChange) => {
    const updatedUsers = users.map(user => {
      if (user.email === emailToChange) {
        return { ...user, role: 'administrador' };
      }
      return user;
    });
    setUsers(updatedUsers);
    alert('Rol de usuario actualizado.');
  };

  const handleLogin = (data) => {
    const user = users.find(u => u.email === data.email && u.password === data.password);
    if (user) {
      setIsLoggedIn(true);
      setUserRole(user.role);
      alert(`¡Bienvenido, ${user.username}!`);
      if (user.role === 'administrador') {
        navigate('/admin');
      } else {
        navigate('/client');
      }
    } else {
      alert('Credenciales inválidas. Intenta de nuevo.');
    }
  };

  const handleRegister = (data) => {
    const userExists = users.some(u => u.email === data.email);
    if (userExists) {
      alert('Este correo electrónico ya está registrado.');
      return;
    }
    const newUser = { 
      email: data.email, 
      username: data.email.split('@')[0],
      password: data.password, 
      role: 'cliente' 
    };
    setUsers([...users, newUser]);
    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    setCurrentView('login');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/');
    setCurrentView('login');
  };

  const renderAuthForm = () => {
    if (currentView === 'login') {
      return <LoginForm onLogin={handleLogin} onRegisterView={() => setCurrentView('register')} />;
    } else {
      return <RegisterForm onRegister={handleRegister} onLoginView={() => setCurrentView('login')} />;
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={!isLoggedIn ? renderAuthForm() : <p>Ya has iniciado sesión.</p>} />
        {/* Ruta para la página principal del administrador */}
        {isLoggedIn && userRole === 'administrador' && (
          <Route 
            path="/admin" 
            element={<AdminPage onSetBookOfTheMonth={setBookOfTheMonth} />} 
          />
        )}
        {/* Nueva ruta para la gestión de usuarios */}
        {isLoggedIn && userRole === 'administrador' && (
          <Route 
            path="/admin/users" 
            element={<UserManagement 
              users={users}
              onDeleteUser={deleteUser}
              onChangeRole={changeUserRole}
            />} 
          />
        )}
        {isLoggedIn && userRole === 'cliente' && <Route path="/client" element={<ClientPage bookOfTheMonth={bookOfTheMonth} />} />}
        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
      </Routes>
      {isLoggedIn && <button onClick={logout} className="logout-button">Cerrar Sesión</button>}
    </div>
  );
}

export default App;