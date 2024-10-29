import React, {useRef, useEffect} from 'react';
import {FaAngleDoubleLeft, FaAngleDoubleRight} from 'react-icons/fa';

const Quiz = ({quiz, count, choice, choiceObj, choiceAns, nextBtnSubmit, timeRef, prevQuestion, onOptionClick, syncResp, submit, inputsRef}) => {
  const {no, quest, opt}= quiz.questions[count.currentIndex];
  const nextBtnRef = useRef();
  let notlastQuestion = count.currentIndex <= quiz.questions.length;
    
 console.log(choice, choiceAns, quiz.questionsAttempted, count.score, choiceObj, count.currentIndex, submit.caution, quiz?.questions[count.currentIndex])

  useEffect(()=> {
    if (notlastQuestion) {
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
    <section className='quiz_box'>
      <header>
        <p className='quest_read'> {count?.currentIndex + 1}/ {quiz?.questions?.length}</p>
      </header>
      <article className="quiz_body">
        <h3 className="question"><span>{no}.</span> {quest}</h3>
        <form>
          <ul className="options" ref={inputsRef}> 
          {/* irreversible check of an option choice upon initial check of an option  */}
            {opt.map((choice, index)=> {
              return <li key={index}>
                  <input type='radio' id={index} name='option' onChange={(e)=> onOptionClick(e, no)} defaultChecked = {false} />
                  <label htmlFor={index}>{choice}</label>
              </li>
            })}
          </ul>

          <div className="nav">
            {count.currentIndex !== 0 && <button className ='btn prev_btn' type='button' onClick={prevQuestion}><span><FaAngleDoubleLeft/></span> Prev.</button>}
            {<button type='submit' className={`btn next_btn ${nextBtnSubmit && 'submit'} ${choiceObj.id && 'choice'} ${choice && 'next_signal'}`} onClick={syncResp} ref={nextBtnRef}> {nextBtnSubmit ? 'SUBMIT TEST' : 'Next'} <span><FaAngleDoubleRight/></span></button>}
          </div>
        </form>
      </article>
    </section>
  )
}

export default Quiz