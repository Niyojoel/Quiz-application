import React from 'react';

const Instructions = ({startQuiz}) => {
  return <article className= 'inst_box'>
      <h2>Instructions</h2>
      <ul className='inst'>
        <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, praesentium!</li>
        <li>Lorem ipsum dolor sit, amet consectetur adipisicing.</li>
        <li>Lorem ipsum dolor sit amet.</li>
        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum.</li>
      </ul>
      <button className="btn start_btn" onClick={startQuiz}> Start Quiz</button>
  </article>
}

export default Instructions;