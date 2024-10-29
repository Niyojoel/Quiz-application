import React from 'react'

const Remark = ({quiz, count}) => {
  return (
    <div>
      <p> You <b>{count.score > quiz.questions.length/2 ? 'Successfully Passed': 'Failed to Pass'}</b> the Test with a Score of {(count.score /quiz.questions.length)*100}%</p>
    </div>
  )
}

export default Remark

