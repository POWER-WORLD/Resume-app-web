import api from './api';

export const getAllProjects = async () => {
    try {
        const response = await api.get(`/projects`);
        console.log("Fetched projects:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching projects from database:', error);
        throw error;
    }
};

export const addProject = async (projectData) => {
    try {
        const response = await api.post(`/projects`, projectData);
        return response.data;
    } catch (error) {
        console.error('Error adding project to database:', error);
        throw error;
    }
};

export const updateProject = async (id, projectData) => {
  try {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (id) => {
    try {
        const response = await api.delete(`/projects/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting project from database:', error);
        throw error;
    }
};