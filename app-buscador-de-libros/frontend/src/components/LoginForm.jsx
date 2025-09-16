import React, { useCallback } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validation/loginSchema';

function LoginForm({ onLogin, onRegisterView }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback((data) => {
    onLogin(data);
  }, [onLogin]);

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="userType">Tipo de Usuario</label>
          <select id="userType" {...register('userType')} defaultValue="cliente">
            <option value="cliente">Cliente</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            {...register('email')}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            {...register('password')}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>
        <button className="search-button" type="submit">Ingresar</button>
      </form>
      <div className="register-link">
        <p>¿No tienes una cuenta? <a href="#" onClick={onRegisterView}>Regístrate</a></p>
      </div>
    </div>
  );
}

export default React.memo(LoginForm);