import React, {useEffect, useState } from "react";
import loginService from "../services/login.service";
import clientService from "../services/client.service";
import { Link, useParams } from "react-router-dom";
import { TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

   
  
    const handleLogin = (e) => {
      e.preventDefault();
  
      // Aquí puedes llamar a tu servicio de inicio de sesión
      clientService
        .loginClient({ email, password })
        .then((response) => {
          // Manejar la respuesta y redirigir al usuario
          console.log('Inicio de sesión exitoso:', response.data);

          localStorage.setItem('userData', JSON.stringify(response.data));

          navigate('/profile'); // Redirigir a la página perfil
        })
        .catch((error) => {
          console.error('Error en inicio de sesión:', error);
          setError('Credenciales incorrectas. Intenta de nuevo.'); // Mostrar error
        });
    };
  
    return (
      <Container maxWidth="xs">
        <Typography variant="h5" gutterBottom>
          Iniciar Sesión
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Iniciar Sesión
          </Button>
        </form>
      </Container>
    );
  };
  
  export default Login;


