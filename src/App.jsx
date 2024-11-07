import { useEffect } from 'react';
import Instructions from './components/Instructions';
import Quiz from './components/Quiz';
import Remark from './components/Remark';
import Submitwarning from './components/Submitwarning';
import './app.css';
import {useQuizContext} from "./useQuiz";


//const url = 'https://the-trivia-api.com/v2/questions';

function App() { 
  const {state: {pages, count, submit, remark}, timeRef} = useQuizContext();

  console.log(count);

  return (
    <main className='container'>
      {pages.quizRun && <p className='time'>Time remaining: <span ref={timeRef}>5 mins</span></p>}
      <h1 className='backdrop'>Test</h1>
      {pages.instruct && <Instructions/>}
      {pages.quizRun && <Quiz/>}
      {submit.caution && <Submitwarning/>}
      {remark && <Remark/>}
    </main>
  )
}

export default App
