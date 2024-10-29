import React, {useReducer, useEffect, useRef} from 'react';
import Instructions from './components/Instructions';
import Quiz from './components/Quiz';
import Remark from './components/Remark';
import Submitwarning from './components/Submitwarning';
import {reducer} from './reducer';
import './app.css'


//const url = 'https://the-trivia-api.com/v2/questions';


const defaultState = {
  pages : {instruct: true, quizRun: false},
  quiz: {questions: [], questionsAttempted: 0},
  count: {currentIndex: 0, score: ""},
  choice:'',
  choiceObj: {}, 
  choiceAns: [], 
  submit: {caution: false, test: false},
  remark: false,
  nextBtnSubmit: false,
  // showCorrAns: false,
}

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const timeRef = useRef();
  const inputsRef = useRef();

  let time = 5 * 60;
  const timeCount=()=> {
    let min = time/ 60;
    let sec = time % 60;
    time--;
    timeRef.innerText = time;
  }
  setInterval(timeCount, 1000);
  
  const startQuiz = ()=> {
    dispatch({type: 'QUIZ_START'});
  }
  
  function onOptionClick (e, no) {
    let name;
    if(e.target.checked === true) {
      name = e.target.nextSibling.innerText;
      console.log(name);
    }
    dispatch({type:'INPUT_CHANGE', payload: {optChoice: name, id: no}});
  }
  
  const prevQuestion = ()=> {
    dispatch({type:'PREV_QUEST'})
  }

  const nextQuest=()=> {
    dispatch({type:'NEXT_QUEST'})
  }
  
  const submitCaution = ()=> {
    dispatch({type:'SUBMIT_CAUTION'})
  }

  const syncResp=(e)=> {
    e.preventDefault();
    dispatch({type:'PROGRESS', payload:{nextQuest: nextQuest, submitCaution: submitCaution}})
  }


  const backToTest =()=> {
    dispatch({type:'BACKTOTEST'})
  }

  const submitQuiz = ()=>{
    dispatch({type:'SUBMIT_QUIZ'})
  }
  
  useEffect(()=> {
    setInterval(timeCount, 1000);
  }, [state.pages.quizRun])
  

  return (
    <main className='container'>
      {state.pages.quizRun && <p className='time'>Time remaining: <span ref={timeRef}>5 mins</span></p>}
      <h1 className='backdrop'>Test</h1>
      {state.pages.instruct && <Instructions startQuiz={startQuiz}/>}
      {state.pages.quizRun == true && <Quiz {...state} timeRef ={timeRef} prevQuestion={prevQuestion} syncResp={syncResp} onOptionClick={onOptionClick} inputsRef={inputsRef}/>}
      {state.submit.caution === true && <Submitwarning {...state}  submitQuiz={submitQuiz} backToTest = {backToTest}/>}
      {state.remark && <Remark {...state}/>}
    </main>
  )
}

export default App
