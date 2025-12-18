

export interface Quiz {
  id: number;
  user_id?: number;
  title: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  questions_count: number;
  icon_url: string;
}

export interface QuizResult {
  full_name: string;
  correct: number;
  wrong: number;
  total: number;
  percentage: number;
}

export interface Attempt {
    id: number;
    quiz_id: number;
    full_name: string;
    score: number;
    total_questions: number;
    created_at: string;
    quiz: Quiz;
}