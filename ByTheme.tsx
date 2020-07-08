import React, {useState, useContext, Dispatch, SetStateAction} from 'react';
import {Question} from './views/Question/Question';
import {QuestionsContext} from './App';
export const ByTheme = ({theme}: {theme: string}) => {
  const {questionsContext} = useContext(QuestionsContext);
  const themeQuestions = questionsContext[theme];
  const themeQuestionsKeys = Object.keys(themeQuestions);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [clickedAnswers, setClickedAnswers]: [
    {[key in number]: boolean},
    Dispatch<SetStateAction<{}>>,
  ] = useState({});
  const next = () => {
    const newIndex = (questionIndex + 1) % themeQuestionsKeys.length;
    setQuestionIndex(newIndex);
  };
  const prev = () => {
    setQuestionIndex(
      (i) =>
        (i === 0 ? themeQuestionsKeys.length - 1 : i - 1) %
        themeQuestionsKeys.length,
    );
  };

  const clickedAnswer = () =>
    setClickedAnswers((obj) => ({
      ...obj,
      [questionIndex]: true,
    }));
  return (
    <Question
      showAnswers={clickedAnswers[questionIndex]}
      clickedAnswer={clickedAnswer}
      theme={theme}
      number={questionIndex + 1}
      next={next}
      prev={prev}
      displayingQuestionIndex={questionIndex + 1}
      totalDisplayingQuestions={themeQuestionsKeys.length}
    />
  );
};
export default ByTheme;
