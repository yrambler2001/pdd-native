import React, {useState, useContext, Dispatch, SetStateAction} from 'react';
import {Question} from './views/Question/Question';
import {QuestionsContext} from './App';
const randItem = (items: string[]): string =>
  items[Math.floor(Math.random() * items.length)];
export const RandQ = () => {
  const {questionsContext} = useContext(QuestionsContext);
  const themes = Object.keys(questionsContext);

  const [qss] = useState(() => {
    return new Array(20).fill(null).map(() => {
      const theme = randItem(themes);
      const question = randItem(Object.keys(questionsContext[theme]));
      return [theme, question];
    });
  });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [clickedAnswers, setClickedAnswers]: [
    {[key in number]: boolean},
    Dispatch<SetStateAction<{}>>,
  ] = useState({});
  const next = () => {
    const newIndex = (questionIndex + 1) % 20;
    setQuestionIndex(newIndex);
  };
  const prev = () => {
    setQuestionIndex((i) => (i === 0 ? 19 : i - 1) % 20);
  };
  const [theme, number] = qss[questionIndex];
  const clickedAnswer = () =>
    setClickedAnswers((obj) => ({
      ...obj,
      [questionIndex]: true,
    }));
  console.log(clickedAnswers[questionIndex]);
  return (
    <Question
      showAnswers={clickedAnswers[questionIndex]}
      clickedAnswer={clickedAnswer}
      theme={theme}
      number={number}
      next={next}
      prev={prev}
      displayingQuestionIndex={questionIndex + 1}
      totalDisplayingQuestions={20}
    />
  );
};
export default RandQ;
