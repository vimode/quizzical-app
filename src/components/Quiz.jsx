import React, {useState, useReducer} from "react";

// packages
import styled from 'styled-components';

// components
import QuizQuestion from "./QuizQuestion";

//styled components

const QuizLayout = styled.form`
  display:flex;
  flex-direction: column;
  place-items: center;
  place-content: center;
  height: 100%;
`

const Content = styled.p` 
  padding: 1em;
`


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
    setIsQuizActive(true)   
  }

  //populate selected answers from radio buttons in any order
  function updateSelection(event, status, index) {
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
    setIsQuizActive(false)
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

        {currentScore ? <Content>You got {currentScore}/{quizData.length} correct</Content> : <></>}
        
        {currentScore ? <button onClick={resetQuiz}>Play Again</button> : 
        <button onClick={handleSubmit}>Check Answers</button>}
      </QuizLayout>
  )
};

export default Quiz;