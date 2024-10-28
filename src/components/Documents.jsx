import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Typography, MenuItem } from '@mui/material';
import documentService from '../services/document.service';
import { useNavigate } from 'react-router-dom';

const Documents = () => {
    const [file, setFile] = useState(null);
    const [documentType, setDocumentType] = useState('');
    const [documents, setDocuments] = useState([]);
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {
        loadDocumentTypes();
    }, []);

    const loadDocumentTypes = async () => {
        const response = await documentService.getAllDocuments();
        setDocuments(response.data);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        documentService.uploadDocument(userData.id, documentType, formData)
            .then(() => {
                alert("Documento subido exitosamente");
                navigate("/profile"); // Redirige al perfil después de subir
            })
            .catch((error) => {
                console.error('Error al subir documento:', error);
                alert("Error al subir documento");
            });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Subir Documentos
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    select
                    label="Tipo de documento"
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    fullWidth
                    margin="normal"
                >
                    {documents.map((t) => (
                        <MenuItem key={t.id} value={t.id}>
                        {t.title}
                        </MenuItem>
                    ))}
                </TextField>
                <input type="file" onChange={handleFileChange} required />
                <Button type="submit" variant="contained" color="primary">
                    Subir Documento
                </Button>
                <Button onClick={() => navigate("/profile")} variant="outlined" color="secondary">
                    Cancelar
                </Button>
            </form>
        </Container>
    );
};

export default Documents;