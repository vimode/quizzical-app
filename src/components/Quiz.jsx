import React, {useState, useReducer} from "react";
import QuizQuestion from "./QuizQuestion";
import { QuizLayout, Content, QuizButton } from './Quiz.styles.js';

function Quiz ({quizData,resetStart}) {

  const [selectedAnswers, setSelectedAnswers] = useState([]); 
  const [currentScore, setCurrentScore] = useState(); 
  const [ isQuizActive, setIsQuizActive ] = useState(true);

  function answerChecker() {
    let tempScore = 0;
    quizData.map(quizItem => {
        for (const [key, value] of Object.entries(selectedAnswers) ) {
          if( key === quizItem.id){
            if( value ===  quizItem.correct_answer) {
              tempScore++
            }
          }
        }
      })
      setCurrentScore(prevScore=>tempScore)
  }
  
  function handleSubmit (event) {
    event.preventDefault();
    answerChecker()
    setIsQuizActive(false)   
  }

  function updateSelection(event) {
    const {value, name} = event.target;
    setSelectedAnswers({
      ...selectedAnswers,
      [name] : value
    })    
  }  

  function resetQuiz (event) {
    event.preventDefault();
    setSelectedAnswers([])
    setCurrentScore()
    resetStart(event)
  }

  
  return (
      <QuizLayout
        // onSubmit = {handleSubmit}
      >
        {quizData && quizData.map((quizItem) =>
          <QuizQuestion
            key ={quizItem.id}
            QuestionData = {quizItem}
            updateSelection = {updateSelection}
            isQuizActive = {isQuizActive}
          />
        )}

        {!isQuizActive ? <Content>You got {currentScore}/{quizData.length} correct</Content> : <></>}
        
        {!isQuizActive ? <QuizButton name= "reset" onClick={resetQuiz}>Play Again</QuizButton> : 
        <QuizButton onClick={handleSubmit}>Check Answers</QuizButton>}
      </QuizLayout>
  )
};

export default Quiz;