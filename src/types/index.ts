export interface Word {
  text: string
  meaning: string
}

export type Quiz = {
  index: number
  text: string
  answer: string
  selections: string[]
}

export type QuizResult = {
  quizIndex: number
  createdAt: Date
  answer: string
  selected: string
  isCorrect: boolean
}

export type State = {
  isCompleted: boolean // computed
  correctCount: number // computed
  inCorrectCount: number // computed
  currentIndex: number // computed
  quizList: Quiz[]
  quizResults: QuizResult[]
  payload: number
}