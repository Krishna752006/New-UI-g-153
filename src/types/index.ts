export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Prediction {
  id: string;
  userId: string;
  match: string;
  predictedWinner: string;
  date: string;
  result?: 'correct' | 'incorrect';
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  captain: string;
  homeGround: string;
  titles: number;
}