import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { usePredictionStore } from '../store/predictionStore';
import { Button } from '../components/ui/Button';
import { TeamSelector } from '../components/TeamSelector';
import { Team } from '../types';

export function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const { selectedTeam1, selectedTeam2, predictedWinner, setTeams, setPredictedWinner, resetPrediction } = usePredictionStore();
  const [predictionResult, setPredictionResult] = useState<string | null>(null);

  const handlePrediction = async () => {
    if (!selectedTeam1 || !selectedTeam2) return;

    // Simulate prediction calculation
    setPredictionResult('Calculating prediction...');
    
    // In a real app, this would make an API call to a ML model
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate random prediction for demo
    const winner = Math.random() > 0.5 ? selectedTeam1 : selectedTeam2;
    setPredictedWinner(winner);
    
    const winProbability = (Math.random() * 30 + 70).toFixed(1);
    setPredictionResult(`${winner.name} is predicted to win with ${winProbability}% probability`);
  };

  const handleReset = () => {
    resetPrediction();
    setPredictionResult(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
          <p className="text-gray-600 mt-2">Select teams to predict the match outcome</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <TeamSelector
              label="Select Team 1"
              value={selectedTeam1}
              onChange={(team) => setTeams(team, selectedTeam2)}
              excludeTeam={selectedTeam2}
            />
            
            <TeamSelector
              label="Select Team 2"
              value={selectedTeam2}
              onChange={(team) => setTeams(selectedTeam1, team)}
              excludeTeam={selectedTeam1}
            />

            {selectedTeam1 && selectedTeam2 && (
              <Button
                onClick={handlePrediction}
                className="w-full"
              >
                Predict Winner
              </Button>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Prediction Result</h2>
            {predictionResult ? (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-900 font-medium">{predictionResult}</p>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="mt-4"
                >
                  Make Another Prediction
                </Button>
              </div>
            ) : (
              <p className="text-gray-500">
                Select two teams to get a match prediction
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}