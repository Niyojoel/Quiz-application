import data from './data/data';

export function reducer (state, action) {
    switch (action.type) {
        case 'QUIZ_START': 
            return {...state,  pages: {instruct: false, quizRun: true}};
            
        case 'PREV_QUEST':
            const prevSlide = state.count.currentIndex !== state.quiz.questions.length - 1;  
            return {...state, count: {...state.count, currentIndex: state.count.currentIndex - 1}, choiceObj: {id:'', chosen:''}, choice: '', nextBtnSubmit : prevSlide && false}
        
        case 'NEXT_QUEST': 
            state.choice = state.choiceAns.find(ans => ans.id === state.count.currentIndex + 2) === undefined ? "" : state.choiceAns.find(ans => ans.id === state.count.currentIndex + 2).chosen;

            return {...state, count: {...state.count, currentIndex: state.count.currentIndex + 1}, choiceObj: {id:'', chosen:''}, nextBtnSubmit : state.count.currentIndex === state.quiz.questions.length - 1 ? true : false};  
 
        case 'CHECK_ANSWER':
            const answeredQuestion = state.choiceAns.find(ans => ans.id === state.choiceObj.id);

            const answer = state.quiz.questions[state.count.currentIndex].ans;
            const question = state.quiz.questions[state.count.currentIndex].quest;

            const choiceArr = state.choiceAns.map((ans)=> {
                if(ans.id === state.choiceObj.id) {
                    return ans = {...ans, choice : state.choiceObj.chosen, correct:  state.choiceObj.chosen === answer ? true : false};
                }
                return ans;
            })

            state.choiceAns = answeredQuestion === undefined ? [...state.choiceAns, {
                id: state.choiceObj.id, 
                question: question, 
                ans: answer,
                choice: state.choiceObj.chosen,
                correct: state.choiceObj.chosen === answer ? true : false}] : choiceArr;
            
            return {...state,  
                count: {...state.count,
                score: state.choiceAns.filter((ans)=> ans.correct === true).length}, quiz: {...state.quiz, questionsAttempted: answeredQuestion === undefined ? state.quiz.questionsAttempted++ : state.quiz.questionsAttempted}, }
            
            
        case 'INPUT_CHANGE': 
            const nextHide = state.count.currentIndex === state.quiz.questions.length - 1;
            
            return {...state, choice: action.payload.optChoice, choiceObj: {id: action.payload.id, chosen: action.payload.optChoice}, nextBtnSubmit : nextHide && true, submit: {...state.submit, test: false}}

        case 'BACKTOTEST':
            return {...state, choiceObj: {id:'', chosen:''}, pages: {...state.pages, quizRun: true}, submit: {...state.submit, caution: false}, count: {...state.count, currentIndex: state.quiz.questions.length - 1}
        }

        case "SUBMIT_CAUTION":
            return {...state, count: {...state.count, currentIndex: state.quiz.questions.length}, pages: {...state.pages, quizRun: false},
        }

        case 'SUBMIT_QUIZ': 
            return {...state, submit: {...state.submit, caution: false}, remark: true, pages: {...state.pages, quizRun: false}}

        case 'RESTART': 
            return { pages : {instruct: true, quizRun: false}, quiz: {questions: data, questionsAttempted: 0}, count: {currentIndex: 0, score: 0}, choice: "", choiceObj: {}, choiceAns: [],submit: {caution: false, test: false}, remark: false, nextBtnSubmit: false};
    }

    return state;
}