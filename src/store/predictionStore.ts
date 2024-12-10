import { create } from 'zustand';

interface PredictionState {
  selectedTeam1: Team | null;
  selectedTeam2: Team | null;
  setTeams: (team1: Team | null, team2: Team | null) => void;
  resetPrediction: () => void;
}

export const usePredictionStore = create<PredictionState>((set) => ({
  selectedTeam1: null,
  selectedTeam2: null,
  setTeams: (team1, team2) => {
    console.log('Setting teams:', { team1, team2 });
    set(() => ({
      selectedTeam1: team1,
      selectedTeam2: team2,
    }));
  },
  resetPrediction: () => {
    console.log('Resetting teams');
    set(() => ({
      selectedTeam1: null,
      selectedTeam2: null,
    }));
  },
}));
