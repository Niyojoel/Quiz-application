import React, {useRef, useEffect} from 'react';
import {useQuizContext} from "../useQuiz";
import {FaAngleDoubleLeft, FaAngleDoubleRight} from 'react-icons/fa';

const Quiz = () => {
  const {state, onOptionClick, syncResp, syncPrevResp, inputsRef} = useQuizContext();
  const {quiz, pages, count, choice, choiceObj, choiceAns, nextBtnSubmit, submit} = state;
  const {no, quest, opt}= count.currentIndex <= 9 && quiz.questions[count.currentIndex];
  const nextBtnRef = useRef();
  
  // console.log(count.currentIndex, quiz.questions.length)
  useEffect(()=> {
    console.log({choice: choice, choiceAns : choiceAns, questAttempt: quiz.questionsAttempted, score: count.score, choiceObj: choiceObj, currentIndex: count.currentIndex, caution: submit.caution})
  }, [state])

  useEffect(()=> {
    if (count.currentIndex <= 9) {
      const currAns = choiceAns.find((ans)=> ans?.id === count.currentIndex + 1)
      if(currAns !== undefined){
        const ansQuestions = () => {
          [...inputsRef.current?.children].map((item)=> {
            if(item.children[1].innerText === currAns.chosen) {
              nextBtnRef.current.classList.add("choice");
              nextBtnRef.current.classList.remove("next_signal");
              return item.children[0].checked = true;
            }else item.children[0].checked = false;
          })
        };
        ansQuestions();
      } 
      return () => {
        [...inputsRef.current?.children].map((item)=> {item.children[0].checked = false})
        nextBtnRef.current.classList.remove("choice"); 
      };
    }
  }, [count.currentIndex])

  return (
    <section className={ count.currentIndex !== quiz.questions.length ? `quiz_box` : `quiz_box quiz_end`}>
      <header>
        <p className='quest_read'> {count?.currentIndex + 1}/ {quiz?.questions?.length} </p>
      </header>
      <article className="quiz_body">
        <h3 className="question"><span>{quiz.questions[count?.currentIndex]?.no}.</span> {quest}</h3>
        <article className='option_box'>
          <ul className="options" ref={inputsRef}> 
          {/* irreversible check of an option choice upon initial check of an option  */}
            {opt?.map((choice, index)=> {
              return <li key={index}>
                  <input type='radio' id={index} name='option' onChange={(e)=> onOptionClick(e, no)} defaultChecked = {false} />
                  <label htmlFor={index}>{choice}</label>
              </li>
            })}
          </ul>

          <div className="nav">
            {count.currentIndex !== 0 && <button className ='btn prev_btn' type='button' onClick={syncPrevResp}><span><FaAngleDoubleLeft/></span> Prev.</button>}
            {<button className={`btn next_btn ${nextBtnSubmit && 'submit'} ${choice && "choice"} ${choiceObj.id && 'next_signal'}`} onClick={syncResp} ref={nextBtnRef}> {nextBtnSubmit ? 'SUBMIT TEST' : 'Next'} <span><FaAngleDoubleRight/></span></button>}
          </div>
        </article>
      </article>
    </section>
  )
}

export default Quiz