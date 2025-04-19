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
  Alert,
  Container,
  Divider,
  Switch,
  FormControlLabel,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  DialogContentText,
  Checkbox,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Person as PersonIcon,
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
  downloadTemplate,
  uploadXlsxFile,
  downloadTemplateXlsx,
  getUsers,
  updateUser,
  deleteUser,
  Tip,
  Nastavitve,
  Profil,
  User as ApiUser,
  getProjekti,
  deleteProjekt,
  exportProjectsToJson,
  importProjectsFromJson,
  createProjekt,
} from '../api/api';
import FileUpload from '../components/FileUpload';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

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

interface User extends ApiUser {
  osebna_stevilka: string;
}

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { user, isModerator, isAdmin } = useAuth();
  const [value, setValue] = useState(0);
  const [tipi, setTipi] = useState<Tip[]>([]);
  const [exportSettings, setExportSettings] = useState<Required<NonNullable<Nastavitve['export']>>>({
    format: 'pdf',
    lokacija: './exports',
  });
  const [systemSettings, setSystemSettings] = useState<Required<NonNullable<Nastavitve['system']>>>({
    jezik: 'sl',
    tema: 'light',
  });
  const [profileSettings, setProfileSettings] = useState<Profil>({
    id: 1,
    first_name: '',
    last_name: '',
    email: '',
  });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTip, setSelectedTip] = useState<number | null>(null);
  const [newTipNaziv, setNewTipNaziv] = useState('');
  const [nastavitve, setNastavitve] = useState<Nastavitve>({});
  const [profili, setProfili] = useState<Profil[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [projekti, setProjekti] = useState<any[]>([]);
  const [newProjektId, setNewProjektId] = useState('');
  const [steviloPonovitev, setSteviloPonovitev] = useState(1);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchData = async () => {
    try {
      const [tipiData, nastavitveData, profiliData, usersData, projektiData] = await Promise.all([
        getTipi(),
        getNastavitve(),
        getProfili(),
        isAdmin() ? getUsers() : Promise.resolve([]),
        isAdmin() ? getProjekti() : Promise.resolve([])
      ]);
      setTipi(tipiData);
      setNastavitve(nastavitveData);
      setProfili(profiliData);
      setUsers(usersData.map(user => ({
        ...user,
        osebna_stevilka: user.username
      })));
      setProjekti(projektiData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Napaka pri pridobivanju podatkov');
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAdmin]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getUserRole = () => {
    if (isAdmin()) return 'admin';
    if (isModerator()) return 'moderator';
    return 'user';
  };

  const getAvailableTabs = () => {
    const role = getUserRole();
    switch (role) {
      case 'admin':
        return [
          { label: "Tipi", index: 0 },
          { label: "Izvozi", index: 1 },
          { label: "Sistem", index: 2 },
          { label: "Profil", index: 3 },
          { label: "Moderatorji", index: 4 },
          { label: "Uporabniki", index: 5 },
          { label: "Projekti", index: 6 }
        ];
      case 'moderator':
        return [
          { label: "Tipi", index: 0 },
          { label: "Izvozi", index: 1 },
          { label: "Sistem", index: 2 },
          { label: "Profil", index: 3 },
          { label: "Moderatorji", index: 4 }
        ];
      default:
        return [
          { label: "Profil", index: 0 }
        ];
    }
  };

  const getTabContent = () => {
    const role = getUserRole();
    
    if (role === 'admin' || role === 'moderator') {
      switch (value) {
        case 0: // Tipi
          return (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Tipi kontrolnih seznamov
              </Typography>
              <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nov tip"
                    value={newTipNaziv}
                    onChange={(e) => setNewTipNaziv(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateTip}
                    disabled={!newTipNaziv.trim()}
                    sx={{ height: '56px' }}
                  >
                    Dodaj tip
                  </Button>
                </Grid>
              </Grid>
              
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {tipi.map((tip) => (
                  <ListItem
                    key={tip.id}
                    secondaryAction={
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleDownloadTemplate(tip.id)}
                        >
                          Prenesi predlogo
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          component="label"
                        >
                          Naloži XLSX
                          <input
                            type="file"
                            hidden
                            accept=".xlsx"
                            onChange={(e) => handleFileUpload(tip.id, e.target.files ? e.target.files[0] : null)}
                          />
                        </Button>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => handleOpenEditDialog(tip)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteTip(tip.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={tip.naziv}
                      sx={{ mr: 2 }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          );
        case 1: // Izvozi
          return (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Nastavitve izvoza
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Format"
                    value={exportSettings.format}
                    onChange={(e) =>
                      setExportSettings({ ...exportSettings, format: e.target.value })
                    }
                  >
                    <MenuItem value="pdf">PDF</MenuItem>
                    <MenuItem value="xlsx">Excel</MenuItem>
                    <MenuItem value="json">JSON</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Lokacija"
                    value={exportSettings.lokacija}
                    onChange={(e) =>
                      setExportSettings({ ...exportSettings, lokacija: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateExportSettings}
                  >
                    Shrani nastavitve izvoza
                  </Button>
                </Grid>
              </Grid>
            </Box>
          );
        case 2: // Sistem
          return (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Sistemske nastavitve
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Jezik"
                    value={systemSettings.jezik}
                    onChange={(e) =>
                      setSystemSettings({ ...systemSettings, jezik: e.target.value })
                    }
                  >
                    <MenuItem value="sl">Slovenščina</MenuItem>
                    <MenuItem value="en">English</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Tema"
                    value={systemSettings.tema}
                    onChange={(e) =>
                      setSystemSettings({ ...systemSettings, tema: e.target.value })
                    }
                  >
                    <MenuItem value="light">Svetla</MenuItem>
                    <MenuItem value="dark">Temna</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateSystemSettings}
                  >
                    Shrani sistemske nastavitve
                  </Button>
                </Grid>
              </Grid>
            </Box>
          );
        case 3: // Profil
          return (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Profil
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Ime"
                    value={profileSettings.first_name}
                    onChange={(e) =>
                      setProfileSettings({ ...profileSettings, first_name: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Priimek"
                    value={profileSettings.last_name}
                    onChange={(e) =>
                      setProfileSettings({ ...profileSettings, last_name: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="E-pošta"
                    value={profileSettings.email}
                    onChange={(e) =>
                      setProfileSettings({ ...profileSettings, email: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateProfile}
                  >
                    Shrani profil
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Spremeni geslo
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Trenutno geslo"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Novo geslo"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Potrdi novo geslo"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleChangePassword}
                    disabled={!oldPassword || !newPassword || !confirmPassword}
                  >
                    Spremeni geslo
                  </Button>
                </Grid>
              </Grid>
            </Box>
          );
        case 4: // Moderatorji
          return (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Upravljanje moderatorjev
              </Typography>
              <List>
                {users.map((user) => (
                  <ListItem key={user.id}>
                    <ListItemText
                      primary={`${user.first_name} ${user.last_name}`}
                      secondary={`Osebna številka: ${user.osebna_stevilka}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenUserDialog(true);
                        }}
                      >
                        <PersonIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => {
                          setSelectedUser(user);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Box>
          );
        case 5: // Uporabniki (samo za admin)
          return role === 'admin' ? (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                Uporabniki
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Osebna številka</TableCell>
                      <TableCell>Ime</TableCell>
                      <TableCell>Priimek</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Akcije</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.osebna_stevilka}</TableCell>
                        <TableCell>{user.first_name}</TableCell>
                        <TableCell>{user.last_name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => {
                              setSelectedUser(user);
                              setOpenUserDialog(true);
                            }}
                          >
                            <PersonIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => {
                              setSelectedUser(user);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : null;
        case 6: // Projekti
          return renderProjectsTab();
        default:
          return null;
      }
    } else {
      // Za navadne uporabnike
      switch (value) {
        case 0: // Profil
          return (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Profil
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Ime"
                    value={profileSettings.first_name}
                    onChange={(e) =>
                      setProfileSettings({ ...profileSettings, first_name: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Priimek"
                    value={profileSettings.last_name}
                    onChange={(e) =>
                      setProfileSettings({ ...profileSettings, last_name: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="E-pošta"
                    value={profileSettings.email}
                    onChange={(e) =>
                      setProfileSettings({ ...profileSettings, email: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateProfile}
                  >
                    Shrani profil
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Spremeni geslo
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Trenutno geslo"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Novo geslo"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Potrdi novo geslo"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleChangePassword}
                    disabled={!oldPassword || !newPassword || !confirmPassword}
                  >
                    Spremeni geslo
                  </Button>
                </Grid>
              </Grid>
            </Box>
          );
        case 1: // Projekti
          return renderProjectsTab();
        default:
          return null;
      }
    }
  };

  const handleCreateTip = async () => {
    try {
      const response = await createTip({ naziv: newTipNaziv });
      setTipi([...tipi, response]);
      setSuccess('Tip uspešno ustvarjen');
      setNewTipNaziv('');
    } catch (error) {
      setError('Napaka pri ustvarjanju tipa');
    }
  };

  const handleUpdateTip = async () => {
    if (!selectedTip) return;
    try {
      const response = await updateTip(selectedTip, {
        naziv: tipi.find(t => t.id === selectedTip)?.naziv || '',
      });
      setTipi(tipi.map((t) => (t.id === selectedTip ? response : t)));
      setSuccess('Tip uspešno posodobljen');
      handleCloseEditDialog();
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
      await updateProfil(profileSettings.id, {
        first_name: profileSettings.first_name,
        last_name: profileSettings.last_name,
        email: profileSettings.email,
      });
      setSuccess('Profil uspešno posodobljen');
    } catch (error) {
      setError('Napaka pri posodabljanju profila');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Novo geslo in potrditev gesla se ne ujemata');
      return;
    }

    try {
      await changePassword(oldPassword, newPassword);
      setSuccess('Geslo uspešno spremenjeno');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError('Napaka pri spreminjanju gesla');
    }
  };

  const handleDownloadTemplate = async (tipId: number) => {
    try {
      await downloadTemplateXlsx(tipId);
      setSuccess('Predloga uspešno prenesena');
    } catch (error) {
      setError('Napaka pri prenosu predloge');
    }
  };

  const handleFileUpload = async (tipId: number, file: File | null) => {
    if (!file) return;
    try {
      await uploadXlsxFile(tipId, file);
      setSuccess('Datoteka uspešno naložena');
    } catch (error) {
      setError('Napaka pri nalaganju datoteke');
    }
  };

  const handleCloseEditDialog = () => {
    setOpenDialog(false);
    setSelectedTip(null);
  };

  const handleOpenEditDialog = (tip: Tip) => {
    setSelectedTip(tip.id);
    setOpenDialog(true);
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    try {
      await updateUser(selectedUser.id, {
        is_staff: selectedUser.is_staff,
        is_superuser: selectedUser.is_superuser,
      });
      setSnackbar({
        open: true,
        message: 'Pravice uporabnika uspešno posodobljene',
        severity: 'success',
      });
      setOpenUserDialog(false);
      fetchData();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Napaka pri posodabljanju pravic',
        severity: 'error',
      });
    }
  };

  const handleOpenUserDialog = (user: User) => {
    setSelectedUser(user);
    setOpenUserDialog(true);
  };

  const handleCloseUserDialog = () => {
    setSelectedUser(null);
    setOpenUserDialog(false);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    try {
      await deleteUser(selectedUser.id);
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Napaka pri brisanju uporabnika');
    }
  };

  const handleDeleteProjects = async () => {
    try {
      for (const projectId of selectedProjects) {
        await deleteProjekt(parseInt(projectId));
      }
      setDeleteDialogOpen(false);
      setSelectedProjects([]);
      const projektiData = await getProjekti();
      setProjekti(projektiData);
      toast.success('Projekti uspešno izbrisani');
    } catch (error) {
      console.error('Napaka pri brisanju projektov:', error);
      toast.error('Napaka pri brisanju projektov');
    }
  };

  const handleExportProjects = async () => {
    try {
      const blob = await exportProjectsToJson();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'projekti.json';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Projekti uspešno izvoženi');
    } catch (error) {
      console.error('Napaka pri izvozu projektov:', error);
      if (error instanceof Error) {
        toast.error(`Napaka pri izvozu projektov: ${error.message}`);
      } else {
        toast.error('Napaka pri izvozu projektov');
      }
    }
  };

  const handleImportProjects = async () => {
    if (!importFile) return;
    try {
      await importProjectsFromJson(importFile);
      setImportFile(null);
      toast.success('Projekti uspešno uvoženi');
    } catch (error) {
      toast.error('Napaka pri uvozu projektov');
    }
  };

  const handleCreateProjekt = async () => {
    try {
      if (!selectedTip) {
        toast.error('Izberite tip projekta');
        return;
      }

      const newProjekt = {
        id: newProjektId,
        osebna_stevilka: user?.osebna_stevilka || '',
        datum: new Date().toISOString().split('T')[0],
        projekt_tipi: [{
          tip: selectedTip,
          stevilo_ponovitev: steviloPonovitev
        }]
      };

      await createProjekt(newProjekt);
      toast.success('Projekt uspešno ustvarjen');
      
      // Osvežimo seznam projektov
      const updatedProjekti = await getProjekti();
      setProjekti(updatedProjekti);
      
      // Ponastavimo stanje
      setNewProjektId('');
      setSelectedTip(null);
      setSteviloPonovitev(1);
    } catch (error) {
      console.error('Napaka pri ustvarjanju projekta:', error);
      if (error instanceof Error) {
        toast.error(`Napaka pri ustvarjanju projekta: ${error.message}`);
      } else {
        toast.error('Napaka pri ustvarjanju projekta');
      }
    }
  };

  const renderProjectsTab = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Upravljanje projektov
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Izvoz projektov
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleExportProjects}
          startIcon={<DownloadIcon />}
        >
          Izvozi projekte v JSON
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Uvoz projektov
        </Typography>
        <input
          type="file"
          accept=".json"
          onChange={(e) => setImportFile(e.target.files?.[0] || null)}
          style={{ display: 'none' }}
          id="import-file"
        />
        <label htmlFor="import-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<UploadIcon />}
          >
            Izberi datoteko
          </Button>
        </label>
        {importFile && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2">
              Izbrana datoteka: {importFile.name}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleImportProjects}
              sx={{ mt: 1 }}
            >
              Uvozi projekte
            </Button>
          </Box>
        )}
      </Box>

      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Seznam projektov
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedProjects.length > 0 && selectedProjects.length < projekti.length}
                    checked={projekti.length > 0 && selectedProjects.length === projekti.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProjects(projekti.map(p => p.id.toString()));
                      } else {
                        setSelectedProjects([]);
                      }
                    }}
                  />
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Osebna številka</TableCell>
                <TableCell>Datum</TableCell>
                <TableCell>Tip</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projekti.map((projekt) => (
                <TableRow key={projekt.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedProjects.includes(projekt.id.toString())}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProjects([...selectedProjects, projekt.id.toString()]);
                        } else {
                          setSelectedProjects(selectedProjects.filter(id => id !== projekt.id.toString()));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{projekt.id}</TableCell>
                  <TableCell>{projekt.osebna_stevilka}</TableCell>
                  <TableCell>{new Date(projekt.datum).toLocaleDateString('sl-SI')}</TableCell>
                  <TableCell>{projekt.projekt_tipi?.[0]?.tip?.naziv || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => setDeleteDialogOpen(true)}
            disabled={selectedProjects.length === 0}
            startIcon={<DeleteIcon />}
          >
            Izbriši izbrane projekte
          </Button>
        </Box>
      </Box>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Potrditev brisanja</DialogTitle>
        <DialogContent>
          <Typography>
            Ali ste prepričani, da želite izbrisati {selectedProjects.length} {selectedProjects.length === 1 ? 'projekt' : selectedProjects.length < 5 ? 'projekte' : 'projektov'}? To dejanje ni mogoče razveljaviti.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Prekliči</Button>
          <Button onClick={handleDeleteProjects} color="error">
            Izbriši
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Box sx={{ 
        width: '100%',
        mb: 3,
        '.MuiTabs-root': {
          maxWidth: '100%',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: theme.palette.background.paper,
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.primary.main,
            borderRadius: '3px',
          },
        },
      }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={isMobile ? "auto" : "auto"}
          allowScrollButtonsMobile
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            mb: 2,
          }}
        >
          {getAvailableTabs().map((tab) => (
            <Tab
              key={tab.index}
              label={tab.label}
              sx={{
                minWidth: isMobile ? 'auto' : 120,
                px: isMobile ? 1 : 2,
              }}
            />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ 
        overflowX: 'auto',
        '& .MuiTableContainer-root': {
          overflow: 'auto',
        },
        '& .MuiTable-root': {
          minWidth: isMobile ? 300 : 650,
        },
        '& .MuiListItem-root': {
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          '& .MuiListItemSecondaryAction-root': {
            position: isMobile ? 'relative' : 'absolute',
            transform: 'none',
            top: isMobile ? 'auto' : '50%',
            right: isMobile ? 0 : 16,
            marginTop: isMobile ? 1 : 0,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            width: isMobile ? '100%' : 'auto',
            justifyContent: isMobile ? 'flex-start' : 'flex-end',
          },
        },
        '& .MuiGrid-container': {
          '& .MuiGrid-item': {
            width: '100%',
          },
        },
      }}>
        {getTabContent()}
      </Box>

      <Dialog open={openDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Uredi tip</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Naziv"
            fullWidth
            value={tipi.find(t => t.id === selectedTip)?.naziv || ''}
            onChange={(e) =>
              setSelectedTip(
                selectedTip ? parseInt(e.target.value) : null
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Prekliči</Button>
          <Button
            onClick={handleUpdateTip}
            color="primary"
          >
            Shrani
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openUserDialog} onClose={handleCloseUserDialog}>
        <DialogTitle>Urejanje pravic uporabnika</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedUser.first_name} {selectedUser.last_name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Osebna številka: {selectedUser.osebna_stevilka}
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={selectedUser.is_staff}
                    onChange={(e) => setSelectedUser({
                      ...selectedUser,
                      is_staff: e.target.checked
                    })}
                  />
                }
                label="Moderator"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={selectedUser.is_superuser}
                    onChange={(e) => setSelectedUser({
                      ...selectedUser,
                      is_superuser: e.target.checked
                    })}
                  />
                }
                label="Administrator"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUserDialog}>Prekliči</Button>
          <Button onClick={handleUpdateUser} color="primary">
            Shrani
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!error || !!success || snackbar.open}
        autoHideDuration={6000}
        onClose={() => {
          setError(null);
          setSuccess(null);
          setSnackbar({ ...snackbar, open: false });
        }}
      >
        <Alert
          onClose={() => {
            setError(null);
            setSuccess(null);
            setSnackbar({ ...snackbar, open: false });
          }}
          severity={error ? 'error' : success ? 'success' : snackbar.severity}
        >
          {error || success || snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Settings; 