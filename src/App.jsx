import {Instructions, Quiz, Remark, Submitwarning} from './components';
import './app.css';
import {useQuizContext} from "./useQuiz";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() { 
  const {state: {pages : {instruct, quizRun}, submit: {caution}, remark}, timeCount} = useQuizContext();
  
  return (
    <main className='container'>
      <Router>
      {!instruct && <p className='time'>Time remaining: <span>{timeCount}</span></p>}
      <h1 className='backdrop'>Test</h1>
        <Routes>
          <Route path="/" element={instruct && <Instructions/>}/>
          <Route path="/quiz" element={<Quiz/>}/>
          <Route path="/submitwarning" element={<Submitwarning/>}/>
          <Route path="/remark" element={ remark && <Remark/>}/>
        </Routes>
      </Router>
    </main>
  )
}

export default App