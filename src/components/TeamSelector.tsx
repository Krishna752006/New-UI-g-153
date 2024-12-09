import React from 'react';
import { Team } from '../types';
import { teams } from '../data/teams';

interface TeamSelectorProps {
  label: string;
  value: Team | null;
  onChange: (team: Team | null) => void;
  excludeTeam?: Team | null;
}

export function TeamSelector({ label, value, onChange, excludeTeam }: TeamSelectorProps) {
  const availableTeams = teams.filter(team => team.id !== excludeTeam?.id);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        value={value?.id || ''}
        onChange={(e) => {
          const selectedTeam = teams.find(team => team.id === e.target.value);
          onChange(selectedTeam || null);
        }}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 rounded-md"
      >
        <option value="">Select a team</option>
        {availableTeams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>
    </div>
  );
}