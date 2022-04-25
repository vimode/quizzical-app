import React, {useState, useReducer} from "react";

// components
import QuizQuestion from "./QuizQuestion";

//styled components
import { QuizLayout, Content, QuizButton } from './Quiz.styles.js';

function Quiz ({quizData,resetStart}) {

  const [selectedAnswers, setSelectedAnswers] = useState([]); //user selected answers
  const [currentScore, setCurrentScore] = useState(); // score
  const [ isQuizActive, setIsQuizActive ] = useState(true);

  // validate user selected formData entries with quizData.correct_answers and update the score
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
  
  //handle form submission 
  function handleSubmit (event) {
    event.preventDefault();
    answerChecker()
    setIsQuizActive(false)   
  }

  //populate selected answers from radio buttons in any order
  function updateSelection(event) {
    const {value, name} = event.target;
    setSelectedAnswers({
      ...selectedAnswers,
      [name] : value
    })    
  }  

  //reset quiz
  function resetQuiz (event) {
    event.preventDefault();
    setSelectedAnswers([])
    setCurrentScore()
    resetStart()
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
        
        {!isQuizActive ? <QuizButton onClick={resetQuiz}>Play Again</QuizButton> : 
        <QuizButton onClick={handleSubmit}>Check Answers</QuizButton>}
      </QuizLayout>
  )
};

export default Quiz;