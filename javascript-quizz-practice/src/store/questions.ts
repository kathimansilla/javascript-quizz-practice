import { create } from 'zustand';
import { type Question } from '../types';
import confetti from 'canvas-confetti'
import { persist } from 'zustand/middleware';
//persist sincroniza los cambios con localstorage o lo que quiera

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPrevQuestion: () => void;
}

export const useQuestionsStore = create<State>()(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    
    fetchQuestions: async (limit: number) => {
      const res = await fetch('http://localhost:5173/data.json');
      const json = await res.json();
      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);
      set({ questions });
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get();
      // structuredClone para una actualización profunda del state
      const newQuestions = structuredClone(questions);
      const questionIndex = newQuestions.findIndex((q) => q.id === questionId);
      const questionInfo = newQuestions[questionIndex];
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex; //boolean
      if (isCorrectUserAnswer) confetti()
      //cambiar esta información en la copia de la pregunta
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex,
      },
        set({ questions: newQuestions });
    },

    goNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextQuestion = currentQuestion + 1

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion  })
      }
    },

    goPrevQuestion: () => {
      const { currentQuestion } = get()
      const previousQuestion = currentQuestion - 1

      if (previousQuestion >= 0) {
        set({ currentQuestion: previousQuestion  })
      }
    },

    reset: () => {
      set({
        currentQuestion: 0, questions: []
      })
    }

  }
}, {
  name: 'questions',
  //por default lo guarda en localStorage 
}));
