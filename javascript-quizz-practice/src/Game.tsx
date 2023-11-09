//import { IconButton, Stack } from '@mui/material'
import { Card, Typography } from '@mui/material';
import { useQuestionsStore } from './store/questions';
import { type Question as QuestionType } from './types';

//info es tipo info: QuestionType (types)
const Question = ({ info }: { info: QuestionType }) => {
  return (
    <Card variant='outlined'>
        <Typography variant='h6'>
            {info.question}
        </Typography>
    </Card>
  )
};

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);

  const questionInfo = questions[currentQuestion];
  return (
    <>
      <Question info={questionInfo} />
    </>
  );
};
