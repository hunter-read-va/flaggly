"use client";

import React, { useEffect, useState } from 'react';
import { Project } from '@/types';
import { fetchProjects, createProject, updateProject, deleteProject } from '@/lib/project';
import ProjectItem from '@/components/ProjectItem';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const data = await fetchProjects();
    setProjects(data);
  };

  const handleCreateProject = async () => {
    if (newProjectName.trim()) {
      const newProject = await createProject({ name: newProjectName });
      setProjects([...projects, newProject]);
      setNewProjectName('');
    }
  };

  const handleUpdateProject = async (id: number, name: string) => {
    const updatedProject = await updateProject(id, { name });
    setProjects(projects.map(project => project.id === id ? updatedProject : project));
  };

  const handleDeleteProject = async (id: number) => {
    await deleteProject(id);
    setProjects(projects.filter(project => project.id !== id));
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="New Project Name"
          className="input input-bordered w-full max-w-xs"
        />
        <button onClick={handleCreateProject} className="btn btn-primary ml-2">Add Project</button>
      </div>
      <ul>
        {projects.map(project => (
          <ProjectItem
            key={project.id}
            project={project}
            onUpdate={handleUpdateProject}
            onDelete={handleDeleteProject}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
