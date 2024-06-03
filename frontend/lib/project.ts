"use server";

import { Project, Flag } from '@/types';

const API_BASE_URL = 'http://localhost:8080'; // Change this to your API base URL

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  const data = await response.json();
  return data;
};

export const createProject = async (project: Partial<Project>): Promise<Project> => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
  const data = await response.json();
  return data;
};

export const updateProject = async (id: number, project: Partial<Project>): Promise<Project> => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
  const data = await response.json();
  return data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'DELETE',
  });
};

export const fetchFlags = async (projectId: number): Promise<Flag[]> => {
  const response = await fetch(`${API_BASE_URL}/projects/${projectId}/flags`);
  const data = await response.json();
  return data;
};

export const createFlag = async (projectId: number, flag: Partial<Flag>): Promise<Flag> => {
  const response = await fetch(`${API_BASE_URL}/flags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...flag,
      projectId
    }),
  });
  const data = await response.json();
  return data;
};

export const updateFlag = async (projectId: number, flagId: number, flag: Partial<Flag>): Promise<Flag> => {
  const response = await fetch(`${API_BASE_URL}/flags/${flagId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(flag),
  });
  const data = await response.json();
  return data;
};

export const deleteFlag = async (projectId: number, flagId: number): Promise<void> => {
  await fetch(`${API_BASE_URL}/projects/${projectId}/flags/${flagId}`, {
    method: 'DELETE',
  });
};
