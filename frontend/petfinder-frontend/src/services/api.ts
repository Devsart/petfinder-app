import axios from 'axios';
import { RegisteredPet, LostPet } from '../types';

const API_URL = 'http://localhost:8000/api';

export const fetchRegisteredPets = async (): Promise<RegisteredPet[]> => {
  const response = await axios.get(`${API_URL}/registered-pets/`);
  return response.data;
};

export const fetchLostPets = async (): Promise<LostPet[]> => {
  const response = await axios.get(`${API_URL}/lost-pets/`);
  return response.data;
};

export const registerPet = async (formData: FormData): Promise<RegisteredPet> => {
  const response = await axios.post(`${API_URL}/registered-pets/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const registerLostPet = async (formData: FormData): Promise<LostPet> => {
  const response = await axios.post(`${API_URL}/lost-pets/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updatePetLostStatus = async (petId: number, isLost: boolean): Promise<RegisteredPet> => {
  const formData = new FormData();
  formData.append('is_lost', isLost.toString());
  
  const response = await axios.put(`${API_URL}/registered-pets/${petId}/lost-status`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
