"use client";

import React, { useState } from 'react';
import { Flag } from '@/types';

interface FlagItemProps {
  flag: Flag;
  onUpdate: (flagId: number, name: string, enabled: boolean) => void;
  onDelete: (flagId: number) => void;
}

const FlagItem: React.FC<FlagItemProps> = ({ flag, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(flag.name);
  const [isEnabled, setIsEnabled] = useState(flag.enabled);

  const handleSave = () => {
    onUpdate(flag.id, name, isEnabled);
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
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={(e) => setIsEnabled(e.target.checked)}
            className="checkbox ml-2"
          />
          <button onClick={handleSave} className="btn btn-primary ml-2">Save</button>
          <button onClick={() => setIsEditing(false)} className="btn btn-secondary ml-2">Cancel</button>
        </div>
      ) : (
        <div>
          <span>{flag.name} (Enabled: {flag.enabled.toString()})</span>
          <button onClick={() => setIsEditing(true)} className="btn btn-primary ml-2">Edit</button>
          <button onClick={() => onDelete(flag.id)} className="btn btn-secondary ml-2">Delete</button>
        </div>
      )}
    </li>
  );
};

export default FlagItem;
