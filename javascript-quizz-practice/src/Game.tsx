//import { IconButton, Stack } from '@mui/material'
import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import { useQuestionsStore } from './store/questions';
import { type Question as QuestionType } from './types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Footer } from './Footer';

//Si pusiera esta función dentro, se renderizaría cada vez
//También así es más fácil hacerle testing
const getBackGroundColor = (info: QuestionType, index: number) => {
  const { correctAnswer, userSelectedAnswer } = info
  if (userSelectedAnswer == null) return 'transparent'
  //answer incorrect and no selected by user
  if (index !== correctAnswer && index !== userSelectedAnswer ) return 'transparent'
  if (index === correctAnswer) return 'green'
  if (index === userSelectedAnswer) return 'red'
  //si no es ninguna de las anteriores
  return 'transparent'
}

//info es tipo info: QuestionType (types)
const Question = ({ info }: { info: QuestionType }) => {

    const selectAnswer = useQuestionsStore(state => state.selectAnswer)

    const createHandleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex )
    }

  return (
    <Card variant='outlined' sx={{ bgcolor: '#222', p: 2, textAlign: 'left', fontSize: 15, marginTop: 4}}>
        <Typography variant='h7'>
            {info.question}
        </Typography>
        <SyntaxHighlighter language='javascript' style={gradientDark}>
            {info.code}
        </SyntaxHighlighter>

        <List sx={{ bgcolor: '#333' }} disablePadding >
            {info.answers.map((answer, index) => (
                <ListItem key={index} disablePadding divider >
                    <ListItemButton onClick={createHandleClick(index)} sx={{ backgroundColor: getBackGroundColor(info, index) }} disabled={info.userSelectedAnswer != null} >
                        <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
                    </ListItemButton>
                </ListItem>
            ))} 
        </List>
    </Card>
  )
};

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPrevQuestion = useQuestionsStore((state) => state.goPrevQuestion);

  const questionInfo = questions[currentQuestion];
  return (
    <>
    <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
      <IconButton onClick={goPrevQuestion} disabled={currentQuestion === 0}>
        <ArrowBackIosNew />
      </IconButton>

    {currentQuestion + 1} / {questions.length}

      <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
        <ArrowForwardIos />
      </IconButton>
    </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  );
};
