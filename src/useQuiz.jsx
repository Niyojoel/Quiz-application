import React, {useReducer, useEffect, useRef, useContext, createContext, useState} from 'react';
import {reducer} from './reducer';
import data from './data/data';
import { getTimeRemaining} from './time';

const defaultState = {
  pages : {instruct: true, quizRun: false},
  quiz: {questions: data, questionsAttempted: 0},
  count: {currentIndex: 0, score: 0},
  choice: "",
  choiceObj: {}, 
  choiceAns: [], 
  time: 0.3,
  submit: {caution: false, test: false},
  remark: false,
  nextBtnSubmit: false,
}

const QuizContext = createContext();

export const QuizProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem("quizState")) || defaultState);
  const inputsRef = useRef();
    const [timeCount, setTimeCount] = useState(state.time < 1 ? `${60 * state.time} sec` : `${state.time} mins`)
  
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

  const submitQuiz =()=> {
    dispatch({type:'SUBMIT_QUIZ'})
  }

  const endTest =()=> {
    dispatch({type:'SUBMIT_CAUTION'})
  }

  const removeRecord = ()=> {
    dispatch({type:"RESTART"})
  }

  useEffect(()=> {
    localStorage.setItem("quizState", JSON.stringify(state))
  }, [state])

  useEffect(()=> {
    // removeRecord();
    localStorage.removeItem("quizState");
  }, [state.pages.instruct])

  useEffect(()=> {
      if(state.pages.quizRun === true) {
        let remainingTime = state.time * 60
        const timeInterval = setInterval(() => {
          remainingTime--;
          setTimeCount(getTimeRemaining(remainingTime));
        }, 1000);
        return ()=> clearInterval(timeInterval)
      }
  }, [state.pages.quizRun])

  useEffect(()=> {
    timeCount === "00:00" && endTest();
  }, [timeCount])

  return <QuizContext.Provider value = {{
    state, 
    timeCount,
    inputsRef, 
    backToTest, 
    syncResp, 
    syncPrevResp, 
    onOptionClick, 
    startQuiz, 
    submitQuiz,
    removeRecord}}>
      {children}
    </QuizContext.Provider>
}

export const useQuizContext = ()=> {
    return useContext(QuizContext);
};

