import React from 'react';
import {useQuizContext} from '../useQuiz';
import "../app.css";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Submitwarning = () => {
  const {state: {quiz}, submitQuiz, backToTest} = useQuizContext();
  
  return (
    <div className='submit_box'>
        <h3> You are about to Submit your test... </h3>
        <div>
          <p>You answered {quiz?.questionsAttempted} of {quiz?.questions?.length} questions</p>
          <p>To Successfully Complete this Process Click on the Submit button</p>
        </div>
        <div className='submitBtns'>
          <button className='btn go_back' onClick={backToTest}><FaAngleLeft/> Go Back</button>
          <button className="btn submit_btn" onClick={submitQuiz}> SUBMIT TEST <FaAngleRight/> </button>
        </div>
    </div>
  )
}

export default Submitwarning;