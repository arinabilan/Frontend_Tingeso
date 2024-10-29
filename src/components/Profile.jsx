import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Container, Button } from '@mui/material';

const Profile = () => {
    const navigate = useNavigate();
    // Obtener los datos del usuario desde el almacenamiento local
    const userData = JSON.parse(localStorage.getItem('userData'));

    const handleSimulateLoan = () => {
        // Redirigir a la página de simulación de crédito
        navigate('/simulateloan');
    };

    const handleSolicitude = () => {
        // Redirigir a la página de solicitud
        navigate('/solicitude');
    };

    const handleClienDates = () => {
        navigate("/solicitude2");
    };

    const handleSavingCapacity = () => {
        navigate("/solicitude3");
    };

    const handleDocuments = () => {
        navigate("/documents");
    };

    const handleNavigate = () => {
        navigate("/");
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Perfil de Usuario
            </Typography>
            {userData ? (
                <>
                    <Typography variant="h6">Email: {userData.email}</Typography>
                    {/* Muestra otros datos del usuario según sea necesario */}
                    
                    <Typography variant="h6">Name: {userData.name}</Typography>
                    {/* Muestra otros datos del usuario según sea necesario */}


                    {/* Botón para simular el crédito */}
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleSimulateLoan}
                        style={{ marginTop: '20px' }}
                    >
                        Simular el crédito
                    </Button>

                    {/* Botón para solicitud del crédito */}
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleSolicitude}
                        style={{ marginTop: '20px' }}
                    >
                        Solicitud de credito
                    </Button>

                    <br/>
                    <br/>
                    <br/>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleClienDates}
                        style={{ marginTop: '20px' }}
                    >
                        Ingresar datos
                    </Button>

                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleSavingCapacity}
                        style={{ marginTop: '20px' }}
                    >
                        Cuenta ahorro
                    </Button>

                    <br/>

                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleDocuments}
                        style={{ marginTop: '20px' }}
                    >
                        Subir documentos
                    </Button>

                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={handleNavigate}
                        style={{ marginTop: '20px' }}
                    >
                        Volver
                    </Button>
                    
                </>
            ) : (
                <Typography variant="body1">No hay datos del usuario disponibles.</Typography>
            )}
        </Container>
    );
};

export default Profile;
