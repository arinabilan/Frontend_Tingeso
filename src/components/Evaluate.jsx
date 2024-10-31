import React, { useState, useEffect } from "react";
import loanService from "../services/loan.service";
import documentService from "../services/document.service";
import clientService from "../services/client.service";
import { Typography, TextField, MenuItem,Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Link,Switch } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';


const Evaluate = () => {

    const [clientDocuments, setClientDocument] = useState([]);
    //const [clientSavingCapacity, setClientSavingCapacity] = useState({});

    const [clientSavingCapacity, setClientSavingCapacity] = useState({
        balance: 0,
        withdrawals: 0,
        withdrawal: false,
        deposits: 0,
        yearsSavings: 0,
        recentWithdrawals: 0,
    });

    const [clientDates, setClientDates] = useState({
        monthSalary: 0,
        date: 0,
        initialContract: 0,
        dicom: false,
        type: 2,
        mediaSalary: 0,
        monthlyDebt: 0
    });
    //const [clientSolicitude, setClientSolicitude] = useState({});
    const [client, setClient] = useState({});

    const navigate = useNavigate();
    const solicitudCliente = JSON.parse(localStorage.getItem('solicitudCliente'));
    
    useEffect(() => {
        loadEverythingIneed();
    }, []);


    const loadEverythingIneed = async () => {
        try {
            const response = await clientService.getClientDates(solicitudCliente.client.id);
            setClientDates(response.data); //obtengo datos del cliente

            const responseClient = await clientService.getClient(solicitudCliente.client.id);
            setClient(responseClient.data); //obtengo cliente

            const responseCapacity = await clientService.getClientCapacity(solicitudCliente.client.id);
            setClientSavingCapacity(responseCapacity.data); //obtengo capacidad de ahorro del cliente

            const responseDocuments = await documentService.getDocumentsByClientId(solicitudCliente.client.id);
            setClientDocument(responseDocuments.data); //obtengo documentos del cliente

            //console.log("Datos del cliente cargados:", response.data); // Verifica que los datos se están cargando correctamente
            //console.log("lalala: ", responseCapacity.data);
        } catch (error) {
            console.error("Error al cargar los datos del cliente:", error);
        }
    };

    const saveDocumentState = (e, documentId) => {
        var cd = clientDocuments.find(d => d.document.id === documentId);
        cd.estado = e.target.checked;
        documentService.putDocument(cd);
        loadEverythingIneed();
    }

    const showOnlyName = (ruta) => {
        return ruta.split('_')[1]
    }

    const findDocumentbyTitle = (documentTitle) => { // Busca un documento por su id
        return clientDocuments.find(document => document.document.title === documentTitle);
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
                            <TableCell style={{fontWeight:'bold'}}>Plazo solicitado</TableCell>
                            <TableCell style={{fontWeight:'bold'}}>Fecha</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={solicitudCliente.id}>
                        <TableCell>{client.name} {client.surname}</TableCell>
                        <TableCell>{solicitudCliente.loanType.type}</TableCell>
                            <TableCell>{solicitudCliente.amount.toLocaleString()} CLP</TableCell>
                            <TableCell>{(solicitudCliente.interestRate * 100).toFixed(2)}%</TableCell>
                            <TableCell>{(solicitudCliente.deadline / 12)} años</TableCell>
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
                 CLP
                </Grid>
                <Grid size={4}>
                { (findDocumentbyTitle('Comprobante de ingresos')) ? ( // 1 es el id del documento que se solicita tener
                    <Container>
                        <Link>{showOnlyName(findDocumentbyTitle('Comprobante de ingresos').rutaDocumento)}</Link><br/>
                        No aprobado <Switch checked={findDocumentbyTitle('Comprobante de ingresos').estado} onClick={(e) => {saveDocumentState(e, findDocumentbyTitle('Comprobante de ingresos').document.id)}}  /> Aprobado
                    </Container>
                ) : (
                    <span style={{color:'red'}}>Sin documento</span>
                )}
                </Grid>

                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Años con banco:</Grid>
                <Grid size={4} style={{textAlign: 'left'}}>
                    <TextField
                        type="number"
                        value={clientDates.date / 12}
                        required
                        size="small"
                    />                         
                     años </Grid>
                <Grid size={4}></Grid>

                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Años trabajando:</Grid>
                <Grid size={4} style={{textAlign: 'left'}}>
                    <TextField
                        type="number"
                        value={clientDates.initialContract / 12}
                        required
                        size="small"
                    />                         
                     años </Grid>
                <Grid size={4}></Grid>

                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Esta en Dicom:</Grid>
                <Grid size={4} style={{textAlign: 'left'}}>
                    No <Switch checked={clientDates.dicom} onClick={(e) => setClientDates({...clientDates, dicom: e.target.checked})} /> Si
                </Grid>
                <Grid size={4}>
                { (findDocumentbyTitle('Certificado Dicom')) ? ( // 1 es el id del documento que se solicita tener
                    <Link>Ver documento</Link>
                ) : (
                    <span style={{color:'red'}}>Sin documento</span>
                )}
                </Grid>

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
                <Grid size={4}>
                    { (findDocumentbyTitle('Contrato laboral')) ? ( // 1 es el id del documento que se solicita tener
                        <Link>Ver documento</Link>
                    ) : (
                        <span style={{color:'red'}}>Sin documento</span>
                    )}
                </Grid>

                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Promedio de ingresos en ultimos 2 años:</Grid>
                <Grid size={4} style={{textAlign: 'left'}}>
                    <TextField
                        type="number"
                        value={clientDates.mediaSalary}
                        required
                        size="small"
                    />                         
                     CLP
                </Grid>
                <Grid size={4}>
                    { (findDocumentbyTitle('Comprobante de ingresos de 2 años')) ? ( // 1 es el id del documento que se solicita tener
                        <Link>Ver documento</Link>
                    ) : (
                        <span style={{color:'red'}}>Sin documento</span>
                    )}
                </Grid>

                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Deuda mensual:</Grid>
                <Grid size={4} style={{textAlign: 'left'}}>
                <TextField
                        type="number"
                        value={clientDates.monthlyDebt}
                        required
                        size="small"
                    />                         
                     CLP</Grid>
                <Grid size={4}></Grid>
            </Grid>
            <br/>

            <Typography variant="h5" gutterBottom>
                Capacidad de Ahorro
            </Typography>

            

            <Grid container rowSpacing={1} columnSpacing={2}>
                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Saldo en cuenta ahorro:</Grid>
                <Grid size={4} style={{textAlign: 'left'}}>
                    <TextField
                        type="number"
                        value={clientSavingCapacity.balance}
                        required
                        size="small"
                    />
                    CLP
                </Grid>
                <Grid size={4}>
                    { (findDocumentbyTitle('Certificado de Cuenta Ahorro')) ? ( // 1 es el id del documento que se solicita tener
                        <Link>Ver documento</Link>
                    ) : (
                        <span style={{color:'red'}}>Sin documento</span>
                    )}
                </Grid>

                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Suma de retiros en ultimos 12 meses:</Grid>
                <Grid size={4} style={{textAlign: 'left'}}>
                    <TextField
                        type="number"
                        value={clientSavingCapacity.withdrawals}
                        required
                        size="small"
                    />
                    CLP 
                </Grid>
                <Grid size={4}></Grid>

                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Historial de ahorro consistente:</Grid>
                <Grid size={4} style={{textAlign: 'left'}}>
                    No <Switch checked={clientSavingCapacity.withdrawal} /> Si
                </Grid>
                <Grid size={4}></Grid>

                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Suma de depositos mensuales de ultimos 12 meses:</Grid>
                <Grid size={4} style={{textAlign: 'left'}}>
                    <TextField
                        type="number"
                        value={clientSavingCapacity.deposits}
                        required
                        size="small"
                    />
                    CLP 
                </Grid>
                <Grid size={4}></Grid>

                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Años de antiguidad de la cuenta de ahorro:</Grid>
                <Grid size={4} style={{textAlign: 'left'}}>
                    <TextField
                        type="number"
                        value={clientSavingCapacity.yearsSavings}
                        required
                        size="small"
                    />
                    años
                </Grid>
                <Grid size={4}></Grid>

                <Grid size={4} style={{textAlign: 'left', fontWeight:'bold'}}>Suma de retiros en ultimos 6 meses:</Grid>
                <Grid size={4} style={{textAlign: 'left'}}>
                    <TextField
                        type="number"
                        value={clientSavingCapacity.recentWithdrawals}
                        required
                        size="small"
                    />
                    CLP
                </Grid>
                <Grid size={4}></Grid>
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