import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
  notes: string;
}

export interface Checklist {
  id: number;
  title: string;
  items: ChecklistItem[];
  created_at: string;
  updated_at: string;
}

interface ChecklistContextType {
  checklists: Checklist[];
  loading: boolean;
  error: string | null;
  fetchChecklists: () => Promise<void>;
  addChecklist: (checklist: Omit<Checklist, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateChecklist: (id: number, checklist: Partial<Checklist>) => Promise<void>;
  deleteChecklist: (id: number) => Promise<void>;
}

const ChecklistContext = createContext<ChecklistContextType | undefined>(undefined);

export const useChecklist = () => {
  const context = useContext(ChecklistContext);
  if (!context) {
    throw new Error('useChecklist must be used within a ChecklistProvider');
  }
  return context;
};

export const ChecklistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChecklists = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Checklist[]>('http://localhost:8000/api/projekti/');
      setChecklists(response.data);
      setError(null);
    } catch (err) {
      setError('Napaka pri pridobivanju seznamov');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addChecklist = async (checklist: Omit<Checklist, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await axios.post<Checklist>('http://localhost:8000/api/projekti/', checklist);
      setChecklists(prev => [...prev, response.data]);
      setError(null);
    } catch (err) {
      setError('Napaka pri dodajanju seznama');
      console.error(err);
    }
  };

  const updateChecklist = async (id: number, checklist: Partial<Checklist>) => {
    try {
      const response = await axios.put<Checklist>(`http://localhost:8000/api/projekti/${id}/`, checklist);
      setChecklists(prev => prev.map(c => c.id === id ? response.data : c));
      setError(null);
    } catch (err) {
      setError('Napaka pri posodabljanju seznama');
      console.error(err);
    }
  };

  const deleteChecklist = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/projekti/${id}/`);
      setChecklists(prev => prev.filter(c => c.id !== id));
      setError(null);
    } catch (err) {
      setError('Napaka pri brisanju seznama');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchChecklists();
  }, []);

  const value = {
    checklists,
    loading,
    error,
    fetchChecklists,
    addChecklist,
    updateChecklist,
    deleteChecklist,
  };

  return (
    <ChecklistContext.Provider value={value}>
      {children}
    </ChecklistContext.Provider>
  );
}; 