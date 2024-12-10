import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { usePredictionStore } from '../store/predictionStore';
import { Button } from '../components/ui/Button';
import { TeamSelector } from '../components/TeamSelector';
import { Contact } from './Contact'; // Import the Contact component

interface Venue {
  id: string;
  name: string;
}

export function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const { selectedTeam1, selectedTeam2, setTeams, resetPrediction } = usePredictionStore();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [predictionResult, setPredictionResult] = useState<string | null>(null);
  const [teamAScore, setTeamAScore] = useState<string | null>(null);
  const [teamBScore, setTeamBScore] = useState<string | null>(null);
  const [teamAWickets, setTeamAWickets] = useState<string | null>(null);
  const [teamBWickets, setTeamBWickets] = useState<string | null>(null);
  const [teamARunRate, setTeamARunRate] = useState<string | null>(null);
  const [teamBRunRate, setTeamBRunRate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Define the teams array
  const teams = [
    { id: '1', name: 'Chennai Super Kings' },
    { id: '2', name: 'Delhi Capitals' },
    { id: '3', name: 'Gujarat Titans' },
    { id: '5', name: 'Kolkata Knight Riders' },
    { id: '6', name: 'Lucknow Super Giants' },
    { id: '7', name: 'Mumbai Indians' },
    { id: '9', name: 'Punjab Kings' },
    { id: '10', name: 'Rajasthan Royals' },
    { id: '12', name: 'Royal Challengers Bengaluru' },
    { id: '13', name: 'Sunrisers Hyderabad' },
  ];

  // State for showing contact form
  const [showContact, setShowContact] = useState(false);

  const handlePrediction = async () => {
    if (!selectedTeam1 || !selectedTeam2 || !venue) {
      setError('Please select both teams and a venue.');
      return;
    }

    setError(null);
    setLoading(true);
    setPredictionResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamA: selectedTeam1.id, // Match backend field name
          teamB: selectedTeam2.id, // Match backend field name
          venue: venue.id,         // Match backend field name
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch prediction. Please try again.');

      const data = await response.json();
      console.log("Response Data: ", data); // Log the full response data

      // Store the prediction result and team details in the state
      setPredictionResult(data?.teamB?.match_result || 'Prediction result unavailable.');
      setTeamAScore(data?.teamA?.score || 'N/A');
      setTeamBScore(data?.teamB?.score || 'N/A');
      setTeamAWickets(data?.teamA?.wickets || 'N/A');
      setTeamBWickets(data?.teamB?.wickets || 'N/A');
      setTeamARunRate(data?.teamA?.run_rate || 'N/A');
      setTeamBRunRate(data?.teamB?.run_rate || 'N/A');
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    resetPrediction();
    setPredictionResult(null);
    setTeamAScore(null);
    setTeamBScore(null);
    setTeamAWickets(null);
    setTeamBWickets(null);
    setTeamARunRate(null);
    setTeamBRunRate(null);
    setVenue(null);
    setError(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Navbar with Contact Us link */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name || 'Guest'}!</h1>
          <Button onClick={() => setShowContact(!showContact)} className="bg-blue-500 text-white">
            {showContact ? 'Close Contact Form' : 'Contact Us'}
          </Button>
        </div>

        {/* Render Contact Us form if visible */}
        {showContact && <Contact />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="space-y-6">
            <TeamSelector
              label="* Select Team 1 (Batting)"
              teams={teams}
              value={selectedTeam1}
              onChange={(team) => setTeams(team, selectedTeam2)}
              excludeTeam={selectedTeam2}
            />
            <TeamSelector
              label="Select Team 2 (Bowling)"
              teams={teams}
              value={selectedTeam2}
              onChange={(team) => setTeams(selectedTeam1, team)}
              excludeTeam={selectedTeam1}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Venue</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={venue?.id || ''}
                onChange={(e) =>
                  setVenue({
                    id: e.target.value,
                    name: e.target.options[e.target.selectedIndex]?.text,
                  })
                }
              >
                <option value="">Select a venue</option>
                <option value="1">Arun Jaitley Stadium</option>
                <option value="3">Barsapara Cricket Stadium</option>
                <option value="1">Arun Jaitley Stadium</option>
          <option value="3">Barsapara Cricket Stadium</option>
          <option value="7">Dr DY Patil Sports Academy</option>
          <option value="10">Eden Gardens</option>
          <option value="11">Ekana Cricket Stadium</option>
          <option value="12">Feroz Shah Kotla</option>
          <option value="18">M Chinnaswamy Stadium</option>
          <option value="19">MA Chidambaram Stadium</option>
          <option value="20">Maharaja Yadavindra Singh International Cricket Stadium</option>
          <option value="22">Narendra Modi Stadium</option>
          <option value="27">Punjab Cricket Association IS Bindra Stadium</option>
          <option value="28">Punjab Cricket Association Stadium</option>
          <option value="29">Rajiv Gandhi International Stadium</option>
          <option value="30">Sardar Patel Stadium</option>
          <option value="31">Saurashtra Cricket Association Stadium</option>
          <option value="32">Sawai Mansingh Stadium</option>
          <option value="35">Sheikh Zayed Stadium</option>
          <option value="37">Subrata Roy Sahara Stadium</option>
          <option value="39">Vidarbha Cricket Association Stadium</option>
          <option value="40">Wankhede Stadium</option>
              </select>
            </div>
            {selectedTeam1 && selectedTeam2 && venue && (
              <Button onClick={handlePrediction} className="w-full" disabled={loading}>
                {loading ? 'Predicting...' : 'Predict Winner'}
              </Button>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Prediction Result</h2>
            {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4">{error}</div>}
            {predictionResult && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-900 font-medium">{predictionResult}</p>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-800">{selectedTeam1?.name} Score: {teamAScore} | Wickets: {teamAWickets} | Run Rate: {teamARunRate}</p>
                  <p className="text-sm font-medium text-gray-800">{selectedTeam2?.name} Score: {teamBScore} | Wickets: {teamBWickets} | Run Rate: {teamBRunRate}</p>
                </div>
                <Button variant="outline" onClick={handleReset} className="mt-4">
                  Make Another Prediction
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
