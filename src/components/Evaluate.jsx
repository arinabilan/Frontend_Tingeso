import React, { useState, useEffect } from "react";
import loanService from "../services/loan.service";
import documentService from "../services/document.service";
import clientService from "../services/client.service";
import { Typography, Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Evaluate = () => {

    const [clientDocuments, setClientDocument] = useState([]);
    const [clientSavingCapacity, setClientSavingCapacity] = useState({});
    const [clientDates, setClientDates] = useState({});
    const [clientSolicitude, setClientSolicitude] = useState({});
    const [client, setClient] = useState({});

    const navigate = useNavigate();
    const solicitudCliente = JSON.parse(localStorage.getItem('solicitudCliente'));
    
    useEffect(() => {
        loadEverythingIneed();
    }, []);

    const loadEverythingIneed = async () => {
        try {
            const response = await clientService.getClientDates(solicitudCliente.client.id);
            setClientDates(response.data);

            const responseClient = await clientService.getClient(solicitudCliente.client.id);
            setClient(responseClient.data);

            const responseCapacity = await clientService.getClientCapacity(solicitudCliente.client.id);
            setClientSavingCapacity(responseCapacity.data);

            console.log("Datos del cliente cargados:", response.data); // Verifica que los datos se están cargando correctamente
            console.log("lalala: ", clientSavingCapacity);
        } catch (error) {
            console.error("Error al cargar los datos del cliente:", error);
        }
    };
    

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Evaluación de Solicitud
            </Typography>
            
            <Typography>Nombre: {client.name} {client.surname}</Typography>
            <Typography>Fecha de nacimiento: {client.birthday}</Typography>
            <br/>
            <Typography>Ingreso Mensual: {clientDates.monthSalary} CLP</Typography>
            <Typography>Años con banco: {Math.floor(clientDates.date / 12)} años </Typography>
            <Typography>Años trabajando: {Math.floor(clientDates.initialContract / 12)} años </Typography>
            <Typography>Esta en Dicom: {clientDates.dicom ? "Sí" : "No"} </Typography>
            <Typography>Tipo de trabajador: {clientDates.type === 1 ? "Independiente" : "Con contrato"} </Typography>
            <Typography>Promedio de ingresos en ultimos 2 años: {clientDates.mediaSalary} CLP</Typography>
            <Typography>Deuda mensual: {clientDates.monthlyDebt} CLP</Typography>
            <br/>
            <Typography>Saldo enn cuenta ahorro: {clientSavingCapacity.balance} CLP</Typography>
            <Typography>Suma de retiros en ultimos 12 meses: {clientSavingCapacity.withdrawals} CLP </Typography>
            <Typography>Historial de ahorro consistente: {clientSavingCapacity.withdrawal ? "Sí" : "No"} </Typography>
            <Typography>Suma de depositos mensuales de ultimos 12 meses: {clientSavingCapacity.deposits} CLP </Typography>
            <Typography>Años de antiguidad de la cuenta de ahorro: {clientSavingCapacity.yearsSavings} años</Typography>
            <Typography>Suma de retiros en ultimos 6 meses: {clientSavingCapacity.recentWithdrawals} CLP</Typography>
            <Button
                variant="contained"
                color="secondary"
                
            >
                Evaluar
            </Button>
        </Container>
    );


}

export default Evaluate;