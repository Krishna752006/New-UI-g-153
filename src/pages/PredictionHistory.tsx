import React from 'react';
import { useAuthStore } from '../store/authStore';

const mockPredictions = [
  {
    id: '1',
    match: 'CSK vs MI',
    date: '2024-03-25',
    predictedWinner: 'CSK',
    result: 'correct',
  },
  {
    id: '2',
    match: 'RCB vs KKR',
    date: '2024-03-26',
    predictedWinner: 'RCB',
    result: 'incorrect',
  },
];

export function PredictionHistory() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Prediction History</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Match
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Your Prediction
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Result
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockPredictions.map((prediction) => (
              <tr key={prediction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {prediction.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {prediction.match}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {prediction.predictedWinner}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      prediction.result === 'correct'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {prediction.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}