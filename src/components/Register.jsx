import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import clientService from '../services/client.service';

const Register = () => {
    const [rut, setRut] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); // Declarar navigate para redirección

    const handleRegister = (e) => {
        e.preventDefault();
    
        // Aquí puedes llamar a tu servicio de inicio de sesión
        clientService
          .clientRegister({ rut, name, surname, birthday, email, password })
          .then((response) => {
            // Manejar la respuesta y redirigir al usuario
            console.log('Inicio de sesión exitoso:', response);
            navigate('/'); // Redirigir a la página principal
          })
          .catch((error) => {
            console.error('Error en inicio de sesión:', error);
            setError('Credenciales incorrectas. Intenta de nuevo.'); // Mostrar error
          });
      };

    return (
        <div>
            <h2>Registro de Cliente</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="RUT"
                    value={rut}
                    onChange={(e) => setRut(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Apellido"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    required
                />
                <input
                    type="date"
                    placeholder="Fecha de Nacimiento"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;