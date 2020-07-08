import React, {useEffect, useState, useContext} from 'react';
import {Question} from './views/Question/Question';
import {QuestionsContext} from './App';
const randItem = (items) => items[Math.floor(Math.random() * items.length)];
export const RandQ = () => {
  const {a: questionsContext, q} = useContext(QuestionsContext);
  const themes = Object.keys(questionsContext);
  // console.log(themes);

  const [qss] = useState(() => {
    return new Array(20).fill(null).map(() => {
      const theme = randItem(themes);
      const question = randItem(Object.keys(questionsContext[theme]));
      return [theme, question];
    });
  });
  const [questionIndex, setQuestionIndex] = useState(0);
  // const [showAnswers, setShowAnswers] = useState(false);
  const [clickedAnswers, setClickedAnswers] = useState({});
  const next = () => {
    const newIndex = (questionIndex + 1) % 20;
    // setShowAnswers(false);
    setQuestionIndex(newIndex);
  };
  const prev = () => {
    // setShowAnswers(false);
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
