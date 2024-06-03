"use client";

import React, { useState } from 'react';
import { Project } from '@/types';
import FlagList from '@/components/FlagList';

interface ProjectItemProps {
  project: Project;
  onUpdate: (id: number, name: string) => void;
  onDelete: (id: number) => void;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(project.name);

  const handleSave = () => {
    onUpdate(project.id, name);
    setIsEditing(false);
  };

  return (
    <li className="mb-4">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
          <button onClick={handleSave} className="btn btn-primary ml-2">Save</button>
          <button onClick={() => setIsEditing(false)} className="btn btn-secondary ml-2">Cancel</button>
        </div>
      ) : (
        <div>
          <span>{project.name}</span>
          <button onClick={() => setIsEditing(true)} className="btn btn-primary ml-2">Edit</button>
          <button onClick={() => onDelete(project.id)} className="btn btn-secondary ml-2">Delete</button>
        </div>
      )}
      <FlagList projectId={project.id} />
    </li>
  );
};

export default ProjectItem;
