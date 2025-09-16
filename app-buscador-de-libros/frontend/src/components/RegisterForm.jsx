import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../validation/loginSchema';

export default function RegisterForm({ onRegister, onLoginView }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    onRegister(data);
  };

  return (
    <div className="login-container">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button type="submit">Registrarme</button>
      </form>
      <div className="register-link">
        <p>¿Ya tienes una cuenta? <a href="#" onClick={onLoginView}>Ingresar</a></p>
      </div>
    </div>
  );
}