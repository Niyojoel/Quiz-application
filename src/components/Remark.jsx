import React, { useEffect } from 'react';
import "../app.css"
import {useQuizContext} from "../useQuiz"
import { useNavigate } from 'react-router-dom';

const Remark = () => {
  const {state: {quiz, count, pages:{instruct}},  removeRecord} = useQuizContext();
  const navigate = useNavigate();

  const reset =() => {
    removeRecord();
    navigate("/")
  }

  useEffect(()=> {
    instruct && navigate("/")
  }, [])

  return (
    <div className='submit_box'>
      <p> You <b>{count.score > quiz.questions.length/2 ? 'Successfully Passed': 'Failed to Pass'}</b> the Test with a Score of {(count.score /quiz.questions.length)*100}%</p>
      <button className='btn' onClick={reset}>Start again</button>
    </div>
  )
}

export default Remark

