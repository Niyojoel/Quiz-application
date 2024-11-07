import React from 'react';
import "../app.css"
import {useQuizContext} from "../useQuiz"

const Remark = () => {
  const {state: {quiz, count}, removeRecord} = useQuizContext();

  return (
    <div className='submit_box'>
      <p> You <b>{count.score > quiz.questions.length/2 ? 'Successfully Passed': 'Failed to Pass'}</b> the Test with a Score of {(count.score /quiz.questions.length)*100}%</p>
      <button className='btn' onClick={removeRecord}>Start again</button>
    </div>
  )
}

export default Remark

