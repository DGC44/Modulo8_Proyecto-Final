import { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import AdminPage from './components/AdminPage';
import ClientPage from './components/ClientPage';
import RegisterForm from './components/RegisterForm'; 
import { Routes, Route, useNavigate } from 'react-router-dom';

const initialUsers = [
  { email: 'admin@test.com', username: 'admin', password: 'Admin01', role: 'administrador' },
  { email: 'cliente1@test.com', username: 'cliente1', password: 'Lector05', role: 'cliente' },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [bookOfTheMonth, setBookOfTheMonth] = useState(null);
  const navigate = useNavigate();

  const [users, setUsers] = useState(initialUsers);
  const [currentView, setCurrentView] = useState('login'); // 'login' o 'register'

  const handleLogin = (data) => {
    const user = users.find(u => u.email === data.email && u.password === data.password && u.role === data.userType);
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
    // Verificar si el usuario ya existe
    const userExists = users.some(u => u.email === data.email);
    if (userExists) {
      alert('Este correo electrónico ya está registrado.');
      return;
    }

    // Agregar el nuevo usuario a la lista. Todos son tipo 'cliente'.
    const newUser = { 
      email: data.email, 
      username: data.email.split('@')[0], // Usar la parte del correo como nombre de usuario
      password: data.password, 
      role: 'cliente' 
    };
    setUsers([...users, newUser]);
    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    setCurrentView('login'); // Regresar a la vista de login
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/');
    setCurrentView('login');
  };

  
  // Renderizado condicional basado en la vista actual
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
        {/* Rutas protegidas */}
        {isLoggedIn && userRole === 'administrador' && <Route path="/admin" element={<AdminPage onSetBookOfTheMonth={setBookOfTheMonth} />} />}
        {isLoggedIn && userRole === 'cliente' && <Route path="/client" element={<ClientPage bookOfTheMonth={bookOfTheMonth} />} />}
        <Route path="*" element={<h1>404: Página no encontrada</h1>} />
      </Routes>
      {isLoggedIn && <button onClick={logout} className="logout-button">Cerrar Sesión</button>}
    </div>
  );
}

export default App;