import React from 'react';

interface Team {
  id: string;
  name: string;
}

interface TeamSelectorProps {
  label: string;
  teams: Team[];
  value: Team | null;
  onChange: (team: Team) => void;
  excludeTeam?: Team | null;
}

export const TeamSelector: React.FC<TeamSelectorProps> = ({ label, teams, value, onChange, excludeTeam }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        value={value?.id || ''}
        onChange={(e) => {
          const selectedTeam = teams.find(team => team.id === e.target.value);
          if (selectedTeam && selectedTeam.id !== excludeTeam?.id) {
            onChange(selectedTeam);
          }
        }}
      >
        <option value="">Select a team</option>
        {teams
          .filter(team => team.id !== excludeTeam?.id)
          .map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
      </select>
    </div>
  );
};
