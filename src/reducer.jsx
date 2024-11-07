import data from './data/data';

export function reducer (state, action) {
    switch (action.type) {
        case 'QUIZ_START': 
            return {...state,  pages: {instruct: false, quizRun: true}, quiz: {...state.quiz, questions: data}};
            
        case 'PREV_QUEST':
            state.choice = state.choiceAns.find(ans => ans.id === state.count.currentIndex) === undefined ? "" : state.choiceAns.find(ans => ans.id === state.count.currentIndex).chosen;

            const prevSlide = state.count.currentIndex !== state.quiz.questions.length - 1;  
            return {...state, count: {...state.count, currentIndex: state.count.currentIndex - 1}, choiceObj: {id:'', chosen:''}, nextBtnSubmit : prevSlide && false}
        
        case 'NEXT_QUEST': 
            state.choice = state.choiceAns.find(ans => ans.id === state.count.currentIndex + 2) === undefined ? "" : state.choiceAns.find(ans => ans.id === state.count.currentIndex + 2).chosen;

            return {...state, count: {...state.count, currentIndex: state.count.currentIndex > 9 ? state.count.currentIndex : state.count.currentIndex + 1}, choiceObj: {id:'', chosen:''}, submit: {...state.submit, caution:  state.count.currentIndex !== state.quiz.questions.length - 1 ? false : true}, pages: {...state.pages, quizRun: true}, nextBtnSubmit : state.count.currentIndex === state.quiz.questions.length - 1 ? true : false};  
        // pages: {...state.pages, quizRun: state.count.currentIndex !== state.quiz.questions.length - 1 ? true : false},
 
        case 'CHECK_ANSWER':
            const answeredQuestion = state.choiceAns.find(ans => ans.id === state.choiceObj.id);

            const choiceArr = state.choiceAns.map((ans)=> {
                if(ans.id === state.choiceObj.id) {
                    return ans = {...ans, chosen : state.choiceObj.chosen, correct: state.choiceObj.chosen === state.quiz.questions[state.count.currentIndex].ans ? true : false};
                }
                return ans;
            })

            state.choiceAns = answeredQuestion === undefined ? [...state.choiceAns, {...state.choiceObj, correct: state.choiceObj.chosen === state.quiz.questions[state.count.currentIndex].ans ? true : false}] : choiceArr;
            
            return {...state,  
                count: {...state.count,
                score: state.choiceAns.filter((ans)=> ans.correct === true).length}, quiz: {...state.quiz, questionsAttempted: answeredQuestion === undefined ? state.quiz.questionsAttempted + 1 : state.quiz.questionsAttempted}
            }
            
        case 'INPUT_CHANGE': 
            return {...state, choice: action.payload?.optChoice, choiceObj: {id: action.payload.id, chosen: action.payload?.optChoice}, nextBtnSubmit : state.count.currentIndex === state.quiz.questions.length - 1 ? true : false, submit: {...state.submit, test: false}}

        case 'BACKTOTEST':
            return {...state, choiceObj: {id:'', chosen:''}, pages: {...state.pages, quizRun: true}, submit: {...state.submit, caution: false}, count: {...state.count, currentIndex: state.quiz.questions.length - 1}
        }

        case 'SUBMIT_QUIZ': 
            return {...state, submit: {...state.submit, caution: false}, remark: true}

        case 'RESTART': 
            return { pages : {instruct: true, quizRun: false}, quiz: {questions: [], questionsAttempted: 0}, count: {currentIndex: 0, score: 0}, choice: "", choiceObj: {}, choiceAns: [],submit: {caution: false, test: false}, remark: false, nextBtnSubmit: false};
    }

    return state;
}