import React, { useState, useEffect } from "react";
import loanService from "../services/loan.service";
import { Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AllSolicitudes = () => {
    const [allSolicitudes, setAllSolicitudes] = useState([]);
    const [showSolicitudes, setShowSolicitudes] = useState(false);
    const navigate = useNavigate();
    const userExecutive = JSON.parse(localStorage.getItem('userExecutive'));

    useEffect(() => {
        loadSolicitude();
    }, []);
    
    const loadSolicitude = async () => {
        const response = await loanService.getAllSolicitudes();
        setAllSolicitudes(response.data);
    };

    const handleShowSolicitudes = () => setShowSolicitudes(true);

    const handleEvaluate = (e, solicitudId) => {
        e.preventDefault();
        loanService.modificateSolicitude(solicitudId, userExecutive)
            .then((response) => {
                console.log('Solicitud modificada:', response.data);
                localStorage.setItem('solicitudCliente', JSON.stringify(response.data));
                navigate("/evaluate");
            })
            .catch((error) => console.error('Error al evaluar solicitud:', error));
    };

    const handleNavigate = () => {
        navigate("/");
    }

    return (
        <Container maxWidth="xl">
            <Button 
                onClick={handleShowSolicitudes} 
                variant="contained" 
                color="primary" 
                style={{ position: 'fixed', top: '20px', right: '50px', left: '50px' }}>
                Ver todos solicitudes
            </Button>

            {showSolicitudes && (
                <TableContainer component={Paper} style={{ marginTop: '40px' }}>
                    <Table style={{ minWidth: '1200px' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>N</TableCell>
                                <TableCell>Tipo de Préstamo</TableCell>
                                <TableCell>Monto</TableCell>
                                <TableCell>Tasa de Interés</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Acción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allSolicitudes.map((solicitud, index) => (
                                <TableRow key={solicitud.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{solicitud.loanType.type}</TableCell>
                                    <TableCell>{solicitud.amount.toLocaleString()} CLP</TableCell>
                                    <TableCell>{(solicitud.interestRate * 100).toFixed(2)}%</TableCell>
                                    <TableCell>{new Date(solicitud.date).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={(e) => handleEvaluate(e, solicitud.id)}
                                        >
                                            Evaluar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={handleNavigate}
                        style={{ marginTop: '20px' }}
                    >
                        Volver
                    </Button>
                </TableContainer>
                
            )}
        </Container>
    );
};

export default AllSolicitudes;
