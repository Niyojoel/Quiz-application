import data from './data/data';

export function reducer (state, action) {
    switch (action.type) {
        case 'QUIZ_START': 
            return {...state,  pages: {instruct: false, quizRun: true}, quiz: {...state.quiz, questions: data}};
            
        case 'PREV_QUEST':
            const prevSlide = state.count.currentIndex !== state.quiz.questions.length - 1;  
            return {...state, count: {...state.count, currentIndex: state.count.currentIndex - 1}, choiceObj: {id:'', chosen:''}, choice: '', nextBtnSubmit : prevSlide && false}
        
        case 'NEXT_QUEST': 
        return {...state, count: {...state.count, currentIndex: state.count.currentIndex + 1}, choiceObj: {id:'', chosen:''}, choice: ''};

        case 'SUBMIT_CAUTION': return {...state, submit: {...state.submit, caution: true}, pages: {...state.pages, quizRun: false}}
 
        case 'PROGRESS':
            // last question check
            let last = state.count.currentIndex > state.quiz.questions.length - 1;
            console.log(last);
            last === false ? action.payload.nextQuest() : action.payload.submitCaution(); 
 
            if(state.choiceObj.id) {

            const answeredQuestion = state.choiceAns.find(ans => ans.id === state.choiceObj.id)

            const choiceArr = state.choiceAns.map((ans)=> {
                if(ans.id === state.choiceObj.id) {
                    return ans = {...ans, chosen : state.choiceObj.chosen, correct: state.choiceObj.chosen === state.quiz.questions[state.count.currentIndex].ans ? true : false};
                }
                return ans;
            })

            state.choiceAns = answeredQuestion === undefined ? [...state.choiceAns, {...state.choiceObj, correct: state.choiceObj.chosen === state.quiz.questions[state.count.currentIndex].ans ? true : false}] : choiceArr;
            
            return {...state,  
                count: {...state.count,
                score: state.choiceAns.filter((ans)=> ans.correct === true).length}, quiz: {...state.quiz, questionsAttempted: answeredQuestion === undefined ? state.quiz.questionsAttempted++ : state.quiz.questionsAttempted}, }
            }
            
        case 'INPUT_CHANGE': 
            const nextHide = state.count.currentIndex === state.quiz.questions.length - 1;
            
            return {...state, choice: action.payload.optChoice, choiceObj: {id: action.payload.id, chosen: action.payload.optChoice}, nextBtnSubmit : nextHide && true, submit: {...state.submit, test: false}}

        case 'BACKTOTEST':
            return {...state, choice :'', choiceObj: {id:'', chosen:''}, pages: {...state.pages, quizRun: true}, submit: {...state.submit, caution: false}, count: {...state.count, currentIndex: state.quiz.questions.length - 1}}

        case 'SUBMIT_QUIZ': 
            return {...state, submit: {...state.submit, caution: false}, remark: true}
    }

    return state;
}