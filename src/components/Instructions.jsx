import React, { useEffect } from 'react';
import {useQuizContext} from "../useQuiz";
import { useNavigate } from 'react-router-dom';

const Instructions = () => {
  const {startQuiz, state:{pages: {instruct}}} = useQuizContext();
  const navigate = useNavigate();

  const beginTest = () => {
    startQuiz();
    navigate("/quiz")
  }

  return <article className= 'inst_box'>
      <h2>Instructions</h2>
      <ul className='inst'>
        <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, praesentium!</li>
        <li>Lorem ipsum dolor sit, amet consectetur adipisicing.</li>
        <li>Lorem ipsum dolor sit amet.</li>
        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum.</li>
      </ul>
      <button className="btn start_btn" onClick={beginTest}>Start Quiz</button>
  </article>
}

export default Instructions;