//import { IconButton, Stack } from '@mui/material'
import { Card, Typography } from '@mui/material';
import { useQuestionsStore } from './store/questions';
import { type Question as QuestionType } from './types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';



//info es tipo info: QuestionType (types)
const Question = ({ info }: { info: QuestionType }) => {
  return (
    <Card variant='outlined'>
        <Typography variant='h6'>
            {info.question}
        </Typography>
        <SyntaxHighlighter language='javascript' style={gradientDark}>
            {info.code}
        </SyntaxHighlighter>
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
