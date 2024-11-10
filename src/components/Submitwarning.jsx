import React, { useEffect } from 'react';
import {useQuizContext} from '../useQuiz';
import "../app.css";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Submitwarning = () => {
  const {state: {quiz, pages: {instruct}, time}, submitQuiz, backToTest } = useQuizContext();

  const navigate = useNavigate();

  const checkTest = ()=> {
    backToTest()
    navigate("/quiz")
  }

  const submit = ()=> {
    submitQuiz();
    navigate("/remark")
  }

  useEffect(()=> {
    instruct && navigate("/")
  }, [])

  return (
    <div className='submit_box'>
        {time === 0 && <h3 className='timeup'> TIME UP !!!</h3>}
        <h3 className='submitnote'> You are about to Submit your test... </h3>
        <div>
          <p>You answered {quiz?.questionsAttempted} of {quiz?.questions?.length} questions</p>
          <p>To Successfully Complete this Process Click on the Submit button</p>
        </div>
        <div className='submitBtns'>
           {time !== 0 &&<button className='btn go_back' onClick={checkTest}><FaAngleLeft/> Go Back</button>}
          <button className="btn submit_btn" onClick={submit}> SUBMIT TEST <FaAngleRight/> </button>
        </div>
    </div>
  )
}

export default Submitwarning;