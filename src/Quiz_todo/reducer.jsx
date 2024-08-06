import data from './data';

export function reducer (state, action) {
    switch (action.type) {
        case 'QUIZ_START': 
            return {...state,  pages: {instruct: false, quizRun: true}, quiz: {...state.quiz, questions: data}};
            
        case 'PREV_QUEST':
                const prevSlide = state.count.currentIndex !== state.quiz.questions.length - 1;  
                return {...state, count: {...state.count, currentIndex: state.count.currentIndex - 1}, choiceObj: {id:'', chosen:''}, nextBtnSubmit : prevSlide && false}
        
        case 'NEXT_QUEST': return {...state, count: {...state.count, currentIndex: state.count.currentIndex + 1}, choiceObj: {id:'', chosen:''}}

        case 'SUBMIT_CAUTION': return {...state, pages: {...state.pages, quizRun: false}, submit: {...state.submit, caution:true}}
 
        case 'PROGRESS':
            // last question check
            let last = state.count.currentIndex === state.quiz.questions.length - 1;
            last ? action.payload.submitCaution() : action.payload.nextQuest();
        
            if(state.choice && state.choiceObj) {
                let choiceMatch = false;
                let initChoice = false;  

                // checking if each questions are answered initially or not
                const updateChoiceArr = state.choiceAns.map((choice)=> {
                    if(choice.id === state.choiceObj.id) {
                        initChoice = true;
                        if(choice.chosen !== state.choiceObj.chosen) {
                            choiceMatch = false;
                            return choice = {...choice, oldChoice: choice.chosen, chosen: state.choiceObj.chosen}
                        }else {
                            choiceMatch = true;
                            return choice;
                        }
                    }else {
                        initChoice = false;
                    }
                    return choice;
                })
                
                const initialChoice = state.choiceAns.find(choice=> choice.id === state.choiceObj.id)

                state.choiceAns = !initChoice ? [...new Set([...state.choiceAns, state.choiceObj])] : updateChoiceArr;
                

                const curr = state.count.currentIndex;

                const ansCorrect = state.choiceAns[curr].chosen === state.quiz.questions[curr].ans;
                
                //Write a return value for score since it has three values +, -, same
                console.log(initialChoice, choiceMatch)
                let scoreCount = 0;
                
                if(ansCorrect) {
                    scoreCount++
                }
                if (ansCorrect && initChoice && !choiceMatch){
                     scoreCount++;
                }
                if (!ansCorrect && !initChoice) {
                    scoreCount
                }
                if (ansCorrect && initChoice && choiceMatch) {
                    scoreCount
                }
                if (!ansCorrect && initChoice && choiceMatch) {
                    scoreCount
                }
                if (!ansCorrect && (state.choiceAns[curr].oldChoice === state.quiz.questions[state.count.currentIndex].ans)) {
                    scoreCount--
                }
                console.log(ansCorrect)
                
                return {...state, count: {...state.count, score: scoreCount}, quiz: {...state.quiz, questionsAttempted: state.quiz.questionsAttempted++}}
        
                {/*return {...state, count: {...state.count, score: ansCorrect ? state.count.score++ : state.count.score}, quiz: {...state.quiz, questionsAttempted: !initChoice ? state.quiz.questionsAttempted++ : state.quiz.questionsAttempted}}*/}
        

                {/*if (ansCorrect && !state.initChoice.status) {
                    return {...state, count: {...state.count, score: state.count.score++}, quiz: {...state.quiz, questionsAttempted: state.quiz.questionsAttempted++}}
                }   
                if (ansCorrect && state.initChoice.status &&!state.initChoice.choiceMatch) {
                    return {...state, count: {...state.count, score: state.count.score++}, quiz: {...state.quiz, questionsAttempted: state.quiz.questionsAttempted}}
                }   
                if ((!ansCorrect || ansCorrect) && state.initChoice.status && state.initChoice.choiceMatch) {
                    return {...state, count: {...state.count, score: state.count.score}, quiz: {...state.quiz, questionsAttempted: state.quiz.questionsAttempted}}
                }
                if (!ansCorrect && (!state.initChoice.status || (state.initChoice && !state.initChoice.choiceMatch))) {
                    return {...state, count: {...state.count, score: state.count.score}, quiz: {...state.quiz, questionsAttempted: state.quiz.questionsAttempted++}}
                }
                if (!ansCorrect && state.initChoice.status &&!state.initChoice.choiceMatch) {
                    return {...state, count: {...state.count, score: state.count.score--}, quiz: {...state.quiz, questionsAttempted: state.quiz.questionsAttempted}}
                }*/}

            }
            
        case 'INPUT_CHANGE': 
            const nextHide = state.count.currentIndex === state.quiz.questions.length - 1;
            
            return {...state, choice: action.payload.chos, choiceObj: {id: action.payload.id, chosen: action.payload.chos}, nextBtnSubmit : nextHide && true, submit: {...state.submit, test: false}}

        case 'BACKTOTEST':
            return {...state, choice :'', choiceObj: {id:'', chosen:''}, pages: {...state.pages, quizRun: true}, submit: {...state.submit, caution: false}, count: {...state.count, currentIndex: state.quiz.questions.length-1}}

        case 'SUBMIT_QUIZ': 
            return {...state, submit: {...state.submit, caution:false}, remark: true}
    }

    return state;
}