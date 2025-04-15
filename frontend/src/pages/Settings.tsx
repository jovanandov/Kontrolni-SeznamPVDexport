import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import {
  getTipi,
  createTip,
  updateTip,
  deleteTip,
  getNastavitve,
  updateNastavitve,
  getProfili,
  updateProfil,
  changePassword,
} from '../api/api';

interface Tip {
  id: number;
  naziv: string;
  segmenti: number;
}

interface ExportSettings {
  format: string;
  lokacija: string;
}

interface SystemSettings {
  jezik: string;
  tema: string;
}

interface ProfileSettings {
  ime: string;
  priimek: string;
  email: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [tipi, setTipi] = useState<Tip[]>([]);
  const [exportSettings, setExportSettings] = useState<ExportSettings>({
    format: 'pdf',
    lokacija: './exports',
  });
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    jezik: 'sl',
    tema: 'light',
  });
  const [profileSettings, setProfileSettings] = useState<ProfileSettings>({
    ime: '',
    priimek: '',
    email: '',
  });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tipiData, nastavitveData, profilData] = await Promise.all([
          getTipi(),
          getNastavitve(),
          getProfili(),
        ]);
        setTipi(tipiData.data);
        setExportSettings(nastavitveData.data.export);
        setSystemSettings(nastavitveData.data.system);
        setProfileSettings(profilData.data);
      } catch (error) {
        setError('Napaka pri pridobivanju podatkov');
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleCreateTip = async () => {
    try {
      const response = await createTip({
        naziv: 'Nov tip',
        segmenti: 0,
      });
      setTipi([...tipi, response.data]);
      setSuccess('Tip uspešno ustvarjen');
    } catch (error) {
      setError('Napaka pri ustvarjanju tipa');
    }
  };

  const handleUpdateTip = async (id: number, data: Partial<Tip>) => {
    try {
      const response = await updateTip(id, data);
      setTipi(tipi.map((tip) => (tip.id === id ? response.data : tip)));
      setSuccess('Tip uspešno posodobljen');
    } catch (error) {
      setError('Napaka pri posodabljanju tipa');
    }
  };

  const handleDeleteTip = async (id: number) => {
    try {
      await deleteTip(id);
      setTipi(tipi.filter((tip) => tip.id !== id));
      setSuccess('Tip uspešno izbrisan');
    } catch (error) {
      setError('Napaka pri brisanju tipa');
    }
  };

  const handleUpdateExportSettings = async () => {
    try {
      await updateNastavitve({
        export: exportSettings,
      });
      setSuccess('Nastavitve izvoza uspešno posodobljene');
    } catch (error) {
      setError('Napaka pri posodabljanju nastavitev izvoza');
    }
  };

  const handleUpdateSystemSettings = async () => {
    try {
      await updateNastavitve({
        system: systemSettings,
      });
      setSuccess('Sistemske nastavitve uspešno posodobljene');
    } catch (error) {
      setError('Napaka pri posodabljanju sistemskih nastavitev');
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateProfil(profileSettings);
      setSuccess('Profil uspešno posodobljen');
    } catch (error) {
      setError('Napaka pri posodabljanju profila');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Gesli se ne ujemata');
      return;
    }

    try {
      await changePassword({ password: newPassword });
      setSuccess('Geslo uspešno spremenjeno');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError('Napaka pri spreminjanju gesla');
    }
  };

  const handleLogout = () => {
    // Tukaj bomo dodali logiko za odjavo
    navigate('/');
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <Paper elevation={3}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="nastavitve"
            variant="fullWidth"
          >
            <Tab label="Tipi" />
            <Tab label="Izvozi" />
            <Tab label="Sistem" />
            <Tab label="Profil" />
          </Tabs>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <TabPanel value={activeTab} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5">
              Nastavitve Tipov
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateTip}
            >
              DODAJ NOV TIP
            </Button>
          </Box>

          <List>
            {tipi.map((tip) => (
              <ListItem key={tip.id}>
                <ListItemText
                  primary={tip.naziv}
                  secondary={`Število segmentov: ${tip.segmenti}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="izbriši" onClick={() => handleDeleteTip(tip.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Typography variant="h5" gutterBottom>
            Nastavitve Izvozov
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Nastavitve Izvozov
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Format"
                      value={exportSettings.format}
                      onChange={(e) =>
                        setExportSettings({ ...exportSettings, format: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Lokacija"
                      value={exportSettings.lokacija}
                      onChange={(e) =>
                        setExportSettings({ ...exportSettings, lokacija: e.target.value })
                      }
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  onClick={handleUpdateExportSettings}
                  sx={{ mt: 2 }}
                >
                  Shrani
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Typography variant="h5" gutterBottom>
            Sistemske Nastavitve
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Osnovne nastavitve
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Jezik"
                      value={systemSettings.jezik}
                      onChange={(e) =>
                        setSystemSettings({ ...systemSettings, jezik: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Tema"
                      value={systemSettings.tema}
                      onChange={(e) =>
                        setSystemSettings({ ...systemSettings, tema: e.target.value })
                      }
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  onClick={handleUpdateSystemSettings}
                  sx={{ mt: 2 }}
                >
                  Shrani
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <Typography variant="h5" gutterBottom>
            Profilne Nastavitve
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Osebni podatki
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Ime"
                      value={profileSettings.ime}
                      onChange={(e) =>
                        setProfileSettings({ ...profileSettings, ime: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Priimek"
                      value={profileSettings.priimek}
                      onChange={(e) =>
                        setProfileSettings({ ...profileSettings, priimek: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={profileSettings.email}
                      onChange={(e) =>
                        setProfileSettings({ ...profileSettings, email: e.target.value })
                      }
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  onClick={handleUpdateProfile}
                  sx={{ mt: 2 }}
                >
                  Shrani
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  Spremeni geslo
                </Typography>
                <TextField
                  label="Novo geslo"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Potrdi geslo"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <Button
                  variant="contained"
                  onClick={handleChangePassword}
                  sx={{ mt: 2 }}
                >
                  Spremeni geslo
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
          >
            Odjava
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings; 