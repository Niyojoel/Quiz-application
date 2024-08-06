import React from 'react'

const Submitwarning = ({quiz, submitQuiz, backToTest}) => {
  return (
    <div>
        <h3> You are about to Submit your test... </h3>
        <p>You answered {quiz.questionsAttempted} of {quiz.questions.length} questions</p>
        <p>To Successfully Complete the Process Click on the Submit button</p>
        {/*<button className='go_back' onClick={backToTest}>Go Back</button>*/}
        <button className="submit_btn" onClick={submitQuiz}> SUBMIT TEST</button>
    </div>
  )
}

export default Submitwarning;