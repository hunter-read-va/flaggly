"use client";

import React, { useEffect, useState } from 'react';
import { Flag } from '@/types';
import { fetchFlags, createFlag, updateFlag, deleteFlag } from '@/lib/project';
import FlagItem from '@/components/FlagItem';

interface FlagListProps {
  projectId: number;
}

const FlagList: React.FC<FlagListProps> = ({ projectId }) => {
  const [flags, setFlags] = useState<Flag[]>([]);
  const [newFlagName, setNewFlagName] = useState('');

  useEffect(() => {
    loadFlags();
  }, []);

  const loadFlags = async () => {
    const data = await fetchFlags(projectId);
    setFlags(data);
  };

  const handleCreateFlag = async () => {
    if (newFlagName.trim()) {
      const newFlag = await createFlag(projectId, { name: newFlagName, enabled: false });
      setFlags([...flags, newFlag]);
      setNewFlagName('');
    }
  };

  const handleUpdateFlag = async (flagId: number, name: string, enabled: boolean) => {
    const updatedFlag = await updateFlag(projectId, flagId, { name, enabled });
    setFlags(flags.map(flag => flag.id === flagId ? updatedFlag : flag));
  };

  const handleDeleteFlag = async (flagId: number) => {
    await deleteFlag(projectId, flagId);
    setFlags(flags.filter(flag => flag.id !== flagId));
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={newFlagName}
          onChange={(e) => setNewFlagName(e.target.value)}
          placeholder="New Flag Name"
          className="input input-bordered w-full max-w-xs"
        />
        <button onClick={handleCreateFlag} className="btn btn-primary ml-2">Add Flag</button>
      </div>
      <ul>
        {flags.map(flag => (
          <FlagItem
            key={flag.id}
            flag={flag}
            onUpdate={handleUpdateFlag}
            onDelete={handleDeleteFlag}
          />
        ))}
      </ul>
    </div>
  );
};

export default FlagList;
