import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://192.168.1.186:8000/api';

// Funkcija za pridobivanje CSRF tokena
const getCsrfToken = (): string | null => {
  const name = 'csrftoken';
  let cookieValue: string | null = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

// Ustvarimo axios instanco s privzetimi nastavitvami
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor za dodajanje CSRF tokena
axiosInstance.interceptors.request.use((config) => {
  const csrfToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('csrftoken='))
    ?.split('=')[1];

  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
});

// Interceptor za obdelavo napak
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Inicializacija CSRF tokena
export const initializeCsrf = async (): Promise<void> => {
  await axiosInstance.get('/csrf/');
};

// Avtentikacija
export const getUser = async (): Promise<any> => {
  const response = await axiosInstance.get('/auth/user/');
  return response.data;
};

export const login = async (osebna_stevilka: string, password: string): Promise<any> => {
  const response = await axiosInstance.post('/auth/login/', { osebna_stevilka, password });
  return response.data;
};

export const logout = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout/');
};

export const register = async (userData: {
  osebna_stevilka: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
}): Promise<any> => {
  const response = await axiosInstance.post('/auth/register/', userData);
  return response.data;
};

// Tipi
export interface Tip {
  id: number;
  naziv: string;
}

export interface Nastavitve {
  export?: {
    format: string;
    lokacija: string;
  };
  system?: {
    jezik: string;
    tema: string;
  };
}

export interface Profil {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export const getTipi = async (): Promise<Tip[]> => {
  const response = await axiosInstance.get<Tip[]>('/tipi/');
  return response.data;
};

export const createTip = async (data: { naziv: string }): Promise<Tip> => {
  const response = await axiosInstance.post<Tip>('/tipi/', data);
  return response.data;
};

export const updateTip = async (id: number, data: { naziv: string }): Promise<Tip> => {
  const response = await axiosInstance.put<Tip>(`/tipi/${id}/`, data);
  return response.data;
};

export const deleteTip = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/tipi/${id}/`);
};

// Projekti
export interface ProjektTip {
  tip: number;
  stevilo_ponovitev: number;
}

export interface Projekt {
  id: string;
  osebna_stevilka: string;
  datum: string;
  projekt_tipi?: ProjektTip[];
}

export const getProjekti = async (): Promise<any[]> => {
  const response = await axiosInstance.get('/projekti/');
  return response.data;
};

export const getProjekt = async (projektId: string): Promise<Projekt> => {
  try {
    const response = await axiosInstance.get(`/projekti/${projektId}/`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      // Če projekt ne obstaja, ga ustvarimo
      const novProjekt = await createProjekt({
        id: projektId,
        osebna_stevilka: localStorage.getItem('osebna_stevilka') || '1',
        datum: new Date().toISOString().split('T')[0],
        projekt_tipi: [{
          tip: 1,
          stevilo_ponovitev: 1
        }]
      });
      return novProjekt;
    }
    throw error;
  }
};

export const createProjekt = async (data: Projekt): Promise<Projekt> => {
  // Najprej ustvarimo projekt
  const response = await axiosInstance.post('/projekti/', {
    id: data.id,
    osebna_stevilka: data.osebna_stevilka,
    datum: data.datum
  });

  // Nato dodamo še ProjektTip
  if (data.projekt_tipi?.[0]) {
    await axiosInstance.post('/projekt-tipi/', {
      projekt: data.id,
      tip: data.projekt_tipi[0].tip,
      stevilo_ponovitev: data.projekt_tipi[0].stevilo_ponovitev
    });
  }

  // Vrnemo celoten projekt
  const projektResponse = await axiosInstance.get(`/projekti/${data.id}/`);
  return projektResponse.data;
};

export const updateProjekt = async (id: number, data: any): Promise<any> => {
  const response = await axiosInstance.put(`/projekti/${id}/`, data);
  return response.data;
};

export const deleteProjekt = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/projekti/${id}/`);
};

// Vmesniki za segmente in vprašanja
export interface Vprasanje {
  id: number;
  vprasanje: string;
  tip: string;
  segment: number;
  repeatability: boolean;
  obvezno: boolean;
  moznosti: string;
}

export interface Segment {
  id: number;
  naziv: string;
  tip: number;
}

// Serijske številke
export interface SerijskaStevilka {
  id: number;
  projekt: string;
  stevilka: string;
  tip: number;
  projekt_tip: number;
}

export const getSerijskeStevilke = async (projektId: string): Promise<SerijskaStevilka[]> => {
  const response = await axiosInstance.get<SerijskaStevilka[]>(`/serijske-stevilke/?projekt=${projektId}`);
  return response.data;
};

export const createSerijskaStevilka = async (projektId: string, tipId: number, index: number): Promise<SerijskaStevilka> => {
  const stevilka = `${projektId}-${tipId}-${index + 1}`;
  const response = await axiosInstance.post<SerijskaStevilka>('/serijske-stevilke/', {
    projekt: projektId,
    stevilka: stevilka,
    tip: tipId,
    projekt_tip: tipId
  });
  return response.data;
};

// Posodobljen vmesnik za odgovor
export interface Odgovor {
  vprasanje: number;
  odgovor: string;
  opomba?: string;
  serijska_stevilka: SerijskaStevilka['id'];
}

// Segmenti in vprašanja
export const getSegmenti = async (tipId: number): Promise<Segment[]> => {
  const response = await axiosInstance.get(`/segmenti/?tip_id=${tipId}`);
  return response.data;
};

export const getSegment = async (id: number): Promise<Segment> => {
  const response = await axiosInstance.get(`/segmenti/${id}/`);
  return response.data;
};

export const getVprasanja = async (tipId: number): Promise<Vprasanje[]> => {
  const response = await axiosInstance.get(`/vprasanja/?tip_id=${tipId}`);
  return response.data;
};

// Odgovori
export const saveOdgovor = async (odgovor: Odgovor): Promise<any> => {
  try {
    const response = await axiosInstance.post('/odgovori/', odgovor);
    return response.data;
  } catch (error) {
    console.error('Napaka pri shranjevanju odgovora:', error);
    throw error;
  }
};

export const getOdgovori = async (serijskaStevilkaId: number): Promise<Odgovor[]> => {
  const response = await axiosInstance.get<Odgovor[]>(`/odgovori/?serijska_stevilka=${serijskaStevilkaId}`);
  return response.data;
};

// Nastavitve
export const getNastavitve = async (): Promise<Nastavitve> => {
  const response = await axiosInstance.get<Nastavitve>('/nastavitve/');
  return response.data;
};

export const updateNastavitve = async (data: Nastavitve): Promise<Nastavitve> => {
  const response = await axiosInstance.put<Nastavitve>('/nastavitve/', data);
  return response.data;
};

// Profili
export const getProfili = async (): Promise<Profil[]> => {
  const response = await axiosInstance.get<Profil[]>('/profili/');
  return response.data;
};

export const updateProfil = async (id: number, data: Partial<Profil>): Promise<Profil> => {
  const response = await axiosInstance.put<Profil>(`/profili/${id}/`, data);
  return response.data;
};

// Backups
export const createBackup = async (): Promise<any> => {
  const response = await axiosInstance.post('/backup/');
  return response.data;
};

export const restoreBackup = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axiosInstance.post('/restore/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// XLSX nalaganje
export const uploadXlsxFile = async (tipId: number, file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axiosInstance.post(`/tipi/${tipId}/upload-xlsx/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Predloge
export const downloadTemplate = async (tipId: number): Promise<Blob> => {
  const response = await axiosInstance.get(`/tipi/${tipId}/download-template/`, {
    responseType: 'blob',
  });
  return response.data;
};

export const changePassword = async (oldPassword: string, newPassword: string): Promise<void> => {
  await axiosInstance.post('/auth/change-password/', {
    old_password: oldPassword,
    new_password: newPassword
  });
};

export const downloadTemplateXlsx = async (tipId: number) => {
  const response = await axiosInstance.get(`/api/tipi/${tipId}/download-template/`, {
    responseType: 'blob'
  });
  
  // Ustvarimo URL za prenos
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `template_${tipId}.xlsx`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
  
  return response.data;
};

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get('/auth/users/');
  return response.data;
};

export const updateUser = async (id: number, data: Partial<User>): Promise<User> => {
  const response = await axiosInstance.patch(`/auth/users/${id}/`, data);
  return response.data;
};

export const deleteUser = async (userId: number): Promise<void> => {
  await axiosInstance.delete(`/auth/users/${userId}/`);
};

export default axiosInstance; 