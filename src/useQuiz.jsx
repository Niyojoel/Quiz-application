import React, {useReducer, useEffect, useRef, useContext, createContext} from 'react';
import {reducer} from './reducer';


const defaultState = {
  pages : {instruct: true, quizRun: false},
  quiz: {questions: [], questionsAttempted: 0},
  count: {currentIndex: 0, score: 0},
  choice: "",
  choiceObj: {}, 
  choiceAns: [], 
  time: 0,
  submit: {caution: false, test: false},
  remark: false,
  nextBtnSubmit: false,
  // showCorrAns: false,
}

const QuizContext = createContext();

export const QuizProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, JSON.parse(sessionStorage.getItem("quizState")) || defaultState);
  const inputsRef = useRef();
  
  const startQuiz = ()=> {
    dispatch({type: 'QUIZ_START'});
  }
  
  function onOptionClick (e, no) {
    let name;
    if(e.target.checked === true) {
      name = e.target.nextSibling.innerText;
    }
    dispatch({type:'INPUT_CHANGE', payload: {optChoice: name, id: no}});
  }
  
  const prevQuestion = ()=> {
    dispatch({type:'PREV_QUEST'})
  }

  const nextQuestion = ()=> {
    dispatch({type:'NEXT_QUEST'})
  }

  const syncResp=()=> {
    if(state.choiceObj.chosen) {dispatch({type:'CHECK_ANSWER'})};
    nextQuestion();
  }

  const syncPrevResp=()=> {
    if(state.choiceObj.chosen) {dispatch({type:'CHECK_ANSWER'})};
    prevQuestion();
  }

  const backToTest =()=> {
    dispatch({type:'BACKTOTEST'})
  }

  const submitQuiz = ()=>{
    dispatch({type:'SUBMIT_QUIZ'})
  }

  const removeRecord = ()=> {
    dispatch({type:"RESTART"})
  }

  useEffect(()=> {
    sessionStorage.setItem("quizState", JSON.stringify(state))
  }, [state])

  useEffect(()=> {
  let time = 5 * 60;
  const timeCount=()=> {
    let min = time/ 60;
    let sec = time % 60;
    time--;
    
  }
  setInterval(timeCount, 1000);
  sessionStorage.removeItem("quizState");
  }, [state.pages.instruct])

  return <QuizContext.Provider value = {{state, inputsRef, submitQuiz, backToTest, syncResp, syncPrevResp, onOptionClick, startQuiz, removeRecord}}>{children}</QuizContext.Provider>
}

export const useQuizContext = ()=> {
    return useContext(QuizContext);
};

