export interface UserProfile {
  goal: string;
  experience: string;
  days_per_week: number;
  session_length: number;
  equipment: string;
  injuries?: string | null;
  preffered_split: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  rpe: number;
  notes?: string;
  alternative?: string[];
}

export interface PlanOverview {
  goal: string;
  frequency: string;
  split: string;
  notes: string;
}
export interface DaySchedule {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface TrainingPlan {
  id: string;
  userId: string;
  overview: PlanOverview;
  weeklySchedule: DaySchedule[];
  progression: string;
  version: number;
  createdAt: string;
}
