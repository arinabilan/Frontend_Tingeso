import React, { useState, useEffect } from "react";
import loanService from "../services/loan.service";
import documentService from "../services/document.service";
import clientService from "../services/client.service";
import { Typography, TextField, MenuItem,Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Link,Switch } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';

const Evaluate = () => {

    const [clientDocuments, setClientDocument] = useState([]);
    const [clientSavingCapacity, setClientSavingCapacity] = useState({});
    const [clientDates, setClientDates] = useState({
        monthSalary: 0,
        date: 0,
        initialContract: 0,
        dicom: false,
        type: 2,
        mediaSalary: 0,
        monthlyDebt: 0
    });
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

            const responseDocuments = await documentService.getDocumentsByClientId(solicitudCliente.client.id);
            setClientDocument(responseDocuments.data);

            console.log("Datos del cliente cargados:", response.data); // Verifica que los datos se están cargando correctamente
            console.log("lalala: ", clientSavingCapacity);
        } catch (error) {
            console.error("Error al cargar los datos del cliente:", error);
        }
    };

    const findDocument = (documentId) => { // Busca un documento por su id
        return clientDocuments.find(document => document.document.id === documentId);
    }
    

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Evaluación de Solicitud
            </Typography>
            
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table style={{ minWidth: '1000px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight:'bold'}}>Cliente</TableCell>
                            <TableCell style={{fontWeight:'bold'}}>Tipo de Préstamo</TableCell>
                            <TableCell style={{fontWeight:'bold'}}>Monto</TableCell>
                            <TableCell style={{fontWeight:'bold'}}>Tasa de Interés</TableCell>
                            <TableCell style={{fontWeight:'bold'}}>Fecha</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={solicitudCliente.id}>
                        <TableCell>{client.name} {client.surname}</TableCell>
                        <TableCell>{solicitudCliente.loanType.type}</TableCell>
                            <TableCell>{solicitudCliente.amount.toLocaleString()} CLP</TableCell>
                            <TableCell>{(solicitudCliente.interestRate * 100).toFixed(2)}%</TableCell>
                            <TableCell>{new Date(solicitudCliente.date).toLocaleDateString()}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>

            <Typography variant="h5" gutterBottom>
                Datos del Cliente
            </Typography>

            <Grid container rowSpacing={0} columnSpacing={2}>
                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Ingreso Mensual:</Grid>
                <Grid size={4} style={{textAlign: 'left'}}>
                    <TextField
                        type="number"
                        value={clientDates.monthSalary}
                        required
                        size="small"
                    />                    
                 CLP</Grid>
                <Grid size={4}>
                { (findDocument(1)) ? ( // 1 es el id del documento que se solicita tener
                    <Link>Ver documento</Link>
                ) : (
                    <span style={{color:'red'}}>Sin documento</span>
                )}
                </Grid>

                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Años con banco:</Grid>
                <Grid size={4} style={{textAlign: 'left'}}>
                    <TextField
                        type="number"
                        value={clientDates.date}
                        required
                        size="small"
                    />                         
                     meses </Grid>
                <Grid size={4}><Link>Ver documento</Link></Grid>

                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Años trabajando:</Grid>
                <Grid size={4} style={{textAlign: 'left'}}>
                    <TextField
                        type="number"
                        value={clientDates.initialContract}
                        required
                        size="small"
                    />                         
                     meses </Grid>
                <Grid size={4}><Link>Ver documento</Link></Grid>

                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Esta en Dicom:</Grid>
                <Grid size={4} style={{textAlign: 'left'}}>
                    No <Switch checked={clientDates.dicom} /> Si
                </Grid>
                <Grid size={4}><Link>Ver documento</Link></Grid>

                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Tipo de trabajador:</Grid>
                <Grid size={4} style={{textAlign: 'left'}}>
                    <TextField
                        select
                        value={clientDates.type}
                        size="small"
                    >
                        <MenuItem key={1} value={1}>
                            Independiente
                        </MenuItem>
                        <MenuItem key={2} value={2}>
                            Con contrato
                        </MenuItem>
                    </TextField>                    
                    </Grid>
                <Grid size={4}><Link>Ver documento</Link></Grid>

                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Promedio de ingresos en ultimos 2 años:</Grid>
                <Grid size={4} style={{textAlign: 'left'}}>
                    <TextField
                        type="number"
                        value={clientDates.mediaSalary}
                        required
                        size="small"
                    />                         
                     CLP</Grid>
                <Grid size={4}><Link>Ver documento</Link></Grid>

                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Deuda mensual:</Grid>
                <Grid size={4} style={{textAlign: 'left'}}>
                <TextField
                        type="number"
                        value={clientDates.monthlyDebt}
                        required
                        size="small"
                    />                         
                     CLP</Grid>
                <Grid size={4}><Link>Ver documento</Link></Grid>
            </Grid>
            <br/>

            <Typography variant="h5" gutterBottom>
                Capacidad de Ahorro
            </Typography>

            <Grid container rowSpacing={1} columnSpacing={2}>
                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Saldo en cuenta ahorro:</Grid>
                <Grid size={4}>
                    {clientSavingCapacity.balance} CLP
                    </Grid>
                <Grid size={4}><Link>Ver documento</Link></Grid>

                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Suma de retiros en ultimos 12 meses:</Grid>
                <Grid size={4}>{clientSavingCapacity.withdrawals} CLP </Grid>
                <Grid size={4}><Link>Ver documento</Link></Grid>

                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Historial de ahorro consistente:</Grid>
                <Grid size={4}>{clientSavingCapacity.withdrawal ? "Sí" : "No"} </Grid>
                <Grid size={4}><Link>Ver documento</Link></Grid>

                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Suma de depositos mensuales de ultimos 12 meses:</Grid>
                <Grid size={4}>{clientSavingCapacity.deposits} CLP </Grid>
                <Grid size={4}><Link>Ver documento</Link></Grid>

                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Años de antiguidad de la cuenta de ahorro:</Grid>
                <Grid size={4}>{clientSavingCapacity.yearsSavings} años</Grid>
                <Grid size={4}><Link>Ver documento</Link></Grid>

                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Suma de retiros en ultimos 6 meses:</Grid>
                <Grid size={4}>{clientSavingCapacity.recentWithdrawals} CLP</Grid>
                <Grid size={4}><Link>Ver documento</Link></Grid>
            </Grid>
            <br/>

            <Button
                variant="contained"
                color="secondary"
            >
                Evaluar
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate('/allsolicitudes')}
            >
                Volver
            </Button>
        </Container>
    );


}

export default Evaluate;