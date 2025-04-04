import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Grid } from '@mui/material';
import { registerLostPet } from '../services/api';
import { useNavigate } from 'react-router-dom';

const RegisterLostPetPage: React.FC = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setPhoto(selectedFile);
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location || !photo) {
      setError('Por favor, preencha a localização e selecione uma foto.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('location', location);
      formData.append('photo', photo);
      
      await registerLostPet(formData);
      
      // Redirecionar para a página inicial após o registro bem-sucedido
      navigate('/');
    } catch (err) {
      console.error('Erro ao registrar pet perdido:', err);
      setError('Ocorreu um erro ao registrar o pet perdido. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Registrar Pet Encontrado
      </Typography>
      
      <Typography variant="body1" paragraph align="center">
        Encontrou um pet perdido? Registre aqui para ajudar a encontrar o dono.
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Localização onde o pet foi encontrado"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              variant="outlined"
              placeholder="Ex: São Paulo, Rio de Janeiro"
            />
          </Grid>
          
          <Grid item xs={12}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ p: 1.5, border: '1px dashed' }}
            >
              {photoPreview ? 'Alterar Foto' : 'Selecionar Foto do Pet'}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handlePhotoChange}
              />
            </Button>
          </Grid>
          
          {photoPreview && (
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Box
                component="img"
                src={photoPreview}
                alt="Preview da foto do pet"
                sx={{
                  maxWidth: '100%',
                  maxHeight: 300,
                  objectFit: 'contain',
                  mt: 2,
                  borderRadius: 2
                }}
              />
            </Grid>
          )}
          
          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
          
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? 'Registrando...' : 'Registrar Pet Encontrado'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default RegisterLostPetPage;
