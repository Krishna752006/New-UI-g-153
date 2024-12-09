import React from 'react';

const teams = [
  {
    id: 'csk',
    name: 'Chennai Super Kings',
    shortName: 'CSK',
    logo: 'https://images.unsplash.com/photo-1631194758628-71ec7c35137e?w=100',
    captain: 'MS Dhoni',
    homeGround: 'M.A. Chidambaram Stadium',
    titles: 5,
  },
  {
    id: 'mi',
    name: 'Mumbai Indians',
    shortName: 'MI',
    logo: 'https://images.unsplash.com/photo-1631194758628-71ec7c35137e?w=100',
    captain: 'Hardik Pandya',
    homeGround: 'Wankhede Stadium',
    titles: 5,
  },
  // Add more teams here
];

export function Teams() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">IPL Teams</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div key={team.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={team.logo}
                  alt={`${team.name} logo`}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{team.name}</h2>
                  <p className="text-gray-500">{team.shortName}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-gray-700">
                  <span className="font-semibold">Captain:</span> {team.captain}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Home Ground:</span> {team.homeGround}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">IPL Titles:</span> {team.titles}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}