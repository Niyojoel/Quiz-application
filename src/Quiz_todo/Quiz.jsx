import React, {useState, useRef, useEffect} from 'react';
import {FaTimes, FaTrademark, FaAngleDoubleLeft, FaAngleDoubleRight} from 'react-icons/fa';

const Quiz = ({quiz, count, choice, choiceObj, choiceAns, initChoice, nextBtnSubmit, timeRef, prevQuestion, onOptionClick, syncResp, submit, inputsRef}) => {
  const {no, quest, opt}= quiz.questions[count.currentIndex];
  const nextBtnRef = useRef();
  let last = count.currentIndex === quiz.questions.length - 1;
  
  useEffect(()=> {
    const list = inputsRef.current.children;
    const lis = [...list];
    lis.map((li)=> {
      li.firstChild.checked = false;
    })
    // nextBtnRef.current.classList.remove('next_signal');
  },[count.currentIndex])
  
  {useEffect(()=> {
    if(choice) {
      nextBtnRef.current.classList.add('next_signal');
    }
  },[choice])

  /*useEffect(()=> {
    nextBtnRef.current.classList.remove('next_signal');
  },[])*/}
    
 console.log(choice, choiceAns, quiz.questionsAttempted, count.score, choiceObj)

  return (
    <section className='quiz_box'>
      <header>
        <p className='quest_read'> {count.currentIndex + 1}/ {quiz.questions.length}</p>
      </header>
      <article className="quiz_body">
        <h3 className="question"><span>{no}.</span>{quest}</h3>
        <form>
          <ul className="options" ref={inputsRef}> 
          {/* irreversible check of an option choice upon initial check of an option  */}
            {opt.map((choice, index)=> {
              return <li key={index}>
                <input type='radio' id={index} name='option' onChange={(e)=> onOptionClick(e, no)} />
                <label htmlFor={index}>{choice}</label>
              </li>
            })}
          </ul>

          <div className="nav">
            {count.currentIndex !== 0 && <button className ='btn prev_btn' type='button' onClick={prevQuestion}><span><FaAngleDoubleLeft/></span> Prev.</button>}
            {<button type='submit' className={`btn next_btn ${nextBtnSubmit && 'submit'} ${choiceObj.id && 'choice'}`} onClick={syncResp} ref={nextBtnRef}> {nextBtnSubmit ? 'SUBMIT TEST' : 'Next'} <span><FaAngleDoubleRight/></span></button>}
          </div>
        </form>
      </article>
    </section>
  )
}

export default Quiz