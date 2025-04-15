import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor za dodajanje CSRF tokena
api.interceptors.request.use((config) => {
  const csrfToken = document.cookie.split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
});

// Interceptor za obravnavo napak
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Avtentikacijski API klice
export const login = (credentials: { username: string; password: string }) =>
  api.post('/auth/login/', credentials);

export const logout = () => api.post('/auth/logout/');

// Tipi API klice
export const getTipi = () => api.get('/tipi/');
export const createTip = (data: { naziv: string; segmenti: number }) => api.post('/tipi/', data);
export const updateTip = (id: number, data: { naziv: string; segmenti: number }) =>
  api.put(`/tipi/${id}/`, data);
export const deleteTip = (id: number) => api.delete(`/tipi/${id}/`);

// Projekti API klice
export const getProjekti = () => api.get('/projekti/');
export const createProjekt = (data: any) => api.post('/projekti/', data);
export const updateProjekt = (id: number, data: any) => api.put(`/projekti/${id}/`, data);
export const deleteProjekt = (id: number) => api.delete(`/projekti/${id}/`);

// Segmenti API klice
export const getSegmenti = () => api.get('/segmenti/');
export const createSegment = (data: any) => api.post('/segmenti/', data);
export const updateSegment = (id: number, data: any) => api.put(`/segmenti/${id}/`, data);
export const deleteSegment = (id: number) => api.delete(`/segmenti/${id}/`);

// Vprašanja API klice
export const getVprasanja = () => api.get('/vprasanja/');
export const createVprasanje = (data: any) => api.post('/vprasanja/', data);
export const updateVprasanje = (id: number, data: any) => api.put(`/vprasanja/${id}/`, data);
export const deleteVprasanje = (id: number) => api.delete(`/vprasanja/${id}/`);

// Odgovori API klice
export const getOdgovori = () => api.get('/odgovori/');
export const createOdgovor = (data: any) => api.post('/odgovori/', data);
export const updateOdgovor = (id: number, data: any) => api.put(`/odgovori/${id}/`, data);
export const deleteOdgovor = (id: number) => api.delete(`/odgovori/${id}/`);

// Nastavitve API klice
export const getNastavitve = () => api.get('/nastavitve/');
export const updateNastavitve = (data: any) => api.put('/nastavitve/', data);

// Profili API klice
export const getProfili = () => api.get('/profili/');
export const updateProfil = (data: any) => api.put('/profili/', data);
export const changePassword = (data: { password: string }) => api.post('/change-password/', data);

// Log sprememb API klice
export const getLogSprememb = () => api.get('/log-sprememb/');

// Varnostne kopije API klice
export const createBackup = () => api.post('/backups/');
export const restoreBackup = (id: number) => api.post(`/backups/${id}/restore/`);
export const deleteBackup = (id: number) => api.delete(`/backups/${id}/`);

export default api; 