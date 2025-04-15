import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const [osebna_stevilka, setOsebnaStevilka] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [ime, setIme] = useState('');
  const [priimek, setPriimek] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const success = await register({
        osebna_stevilka,
        password,
        email,
        first_name: ime,
        last_name: priimek
      });
      if (success) {
        navigate('/login');
      }
    } catch (err) {
      setError('Prišlo je do napake pri registraciji');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Registracija
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Osebna številka"
                value={osebna_stevilka}
                onChange={(e) => setOsebnaStevilka(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Geslo"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="E-pošta"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ime"
                value={ime}
                onChange={(e) => setIme(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Priimek"
                value={priimek}
                onChange={(e) => setPriimek(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                size="large"
              >
                Registracija
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center">
                Že imate račun?{' '}
                <Link to="/login">
                  <Button variant="text">Prijava</Button>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default Register; 