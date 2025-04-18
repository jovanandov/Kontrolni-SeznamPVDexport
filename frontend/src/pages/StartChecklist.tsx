import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { getTipi, createProjekt, getProjekti, Projekt } from '../api/api';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface Tip {
  id: number;
  naziv: string;
}

const StartChecklist: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tipi, setTipi] = useState<Tip[]>([]);
  const [projekti, setProjekti] = useState<Projekt[]>([]);
  const [formData, setFormData] = useState({
    osebna_stevilka: user?.osebna_stevilka || '',
    stevilka_projekta: '',
    stevilka_ponovitve: '',
    tip: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showProjekti, setShowProjekti] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tipiData, projektiData] = await Promise.all([
          getTipi(),
          getProjekti()
        ]);
        setTipi(tipiData);
        setProjekti(projektiData);
      } catch (err) {
        setError('Napaka pri nalaganju podatkov');
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.stevilka_projekta || !formData.stevilka_ponovitve || !formData.tip) {
      setError('Vsa polja so obvezna');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Ustvarimo nov projekt
      const projekt = await createProjekt({
        id: formData.stevilka_projekta,
        osebna_stevilka: formData.osebna_stevilka,
        datum: new Date().toISOString().split('T')[0],
        projekt_tipi: [{
          tip: Number(formData.tip),
          stevilo_ponovitev: Number(formData.stevilka_ponovitve)
        }]
      });

      // Preusmerimo na kontrolni seznam z ustreznim številom ponovitev
      const projektTip = projekt.projekt_tipi?.[0];
      if (projektTip) {
        navigate(`/checklist/${projektTip.tip}/${projekt.id}/${projektTip.stevilo_ponovitev}`);
      }
    } catch (err: any) {
      console.error('Napaka pri ustvarjanju projekta:', err);
      if (err.response?.status === 400) {
        setError('Projekt s to številko že obstaja. Lahko ga odprete iz seznama obstoječih projektov.');
        setShowProjekti(true);
      } else {
        setError('Napaka pri ustvarjanju projekta. Prosim, poskusite ponovno.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenProjekt = (projekt: Projekt) => {
    const projektTip = projekt.projekt_tipi?.[0];
    if (projektTip) {
      navigate(`/checklist/${projektTip.tip}/${projekt.id}/${projektTip.stevilo_ponovitev}`);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Nov kontrolni seznam
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Osebna številka"
                name="osebna_stevilka"
                value={formData.osebna_stevilka}
                onChange={handleChange}
                disabled
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Št. projekta"
                name="stevilka_projekta"
                value={formData.stevilka_projekta}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Št. ponovitve"
                name="stevilka_ponovitve"
                type="number"
                value={formData.stevilka_ponovitve}
                onChange={handleChange}
                inputProps={{ min: 1 }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                select
                label="Tip"
                name="tip"
                value={formData.tip}
                onChange={handleChange}
              >
                {tipi.map((tip) => (
                  <MenuItem key={tip.id} value={tip.id}>
                    {tip.naziv}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                disabled={loading}
              >
                {loading ? 'Ustvarjam...' : 'Začni nov kontrolni seznam'}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setShowProjekti(true)}
              >
                Odpri obstoječ projekt
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Dialog 
        open={showProjekti} 
        onClose={() => setShowProjekti(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Obstoječi projekti</DialogTitle>
        <DialogContent>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {projekti.map((projekt) => (
                <ListItem key={projekt.id}>
                  <ListItemText
                    primary={`Projekt: ${projekt.id}`}
                    secondary={`Datum: ${new Date(projekt.datum).toLocaleDateString('sl-SI')} - Tip: ${
                      tipi.find(t => t.id === projekt.projekt_tipi?.[0]?.tip)?.naziv || 'Neznan'
                    }`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      onClick={() => handleOpenProjekt(projekt)}
                      color="primary"
                    >
                      <OpenInNewIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowProjekti(false)}>Zapri</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StartChecklist; 