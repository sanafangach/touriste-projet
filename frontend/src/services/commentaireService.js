// src/services/commentaireService.js

import { API_BASE_URL } from './config';

const getToken = () => localStorage.getItem('token');

export const getCommentaires = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/commentaires`);
    if (!response.ok) throw new Error('Erreur de chargement');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const createCommentaire = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/commentaires`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
      body: formData,
    });

    if (response.status === 401) {
      throw new Error('Veuillez vous connecter pour publier un commentaire');
    }

    if (response.status === 422) {
      const error = await response.json();
      throw new Error(Object.values(error.errors).flat().join(', '));
    }

    if (!response.ok) {
      throw new Error('Erreur lors de la publication');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const deleteCommentaire = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/commentaires/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });

    if (response.status === 403) {
      throw new Error('Vous ne pouvez pas supprimer ce commentaire');
    }

    if (!response.ok) throw new Error('Erreur de suppression');

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
