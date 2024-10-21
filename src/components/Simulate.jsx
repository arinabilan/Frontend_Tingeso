import React, { useEffect, useState } from "react";
import loanService from "../services/loan.service";
import { TextField, Button, Typography, Container, MenuItem } from '@mui/material';

const Simulate = () => {
    const [loanTypes, setLoanTypes] = useState([]);
    const [loanRequirements, setLoanRequirements] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [amount, setAmount] = useState(0);
    const [months, setMonths] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(null);

    useEffect(() => {
        loadLoanTypes();
        loadLoanRequirements();
    }, []);

    const loadLoanTypes = async () => {
        const response = await loanService.getLoanTypes();
        setLoanTypes(response.data);
    };

    const loadLoanRequirements = async () => {
        const response = await loanService.getLoanRequirements();
        setLoanRequirements(response.data);
    };

    const calculateMonthlyPayment = () => {
        const requirement = loanRequirements.find(req => req.typeLoan.id === selectedType);
        if (!requirement) {
            alert("Por favor selecciona un tipo de préstamo válido.");
            return;
        }
        const interestRate = requirement.interestRate;
        const monthlyRate = interestRate / 100 / 12;
        const payment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
        setMonthlyPayment(payment.toFixed(2));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Simulador de Crédito Hipotecario</Typography>
            <TextField
                select
                label="Tipo de Préstamo"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                fullWidth
                margin="normal"
            >
                {loanTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                        {type.type}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="Monto"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Meses"
                type="number"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button 
                variant="contained" 
                color="primary" 
                onClick={calculateMonthlyPayment}
                style={{ marginTop: '20px' }}
            >
                Calcular
            </Button>
            {monthlyPayment && (
                <Typography variant="h6" style={{ marginTop: '20px' }}>
                    Pago Mensual: ${monthlyPayment}
                </Typography>
            )}
        </Container>
    );
};

export default Simulate;
