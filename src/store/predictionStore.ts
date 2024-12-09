import { create } from 'zustand';
import { Team } from '../types';

interface PredictionState {
  selectedTeam1: Team | null;
  selectedTeam2: Team | null;
  predictedWinner: Team | null;
  setTeams: (team1: Team | null, team2: Team | null) => void;
  setPredictedWinner: (team: Team | null) => void;
  resetPrediction: () => void;
}

export const usePredictionStore = create<PredictionState>((set) => ({
  selectedTeam1: null,
  selectedTeam2: null,
  predictedWinner: null,
  setTeams: (team1, team2) => set({ selectedTeam1: team1, selectedTeam2: team2 }),
  setPredictedWinner: (team) => set({ predictedWinner: team }),
  resetPrediction: () => set({ selectedTeam1: null, selectedTeam2: null, predictedWinner: null }),
}));