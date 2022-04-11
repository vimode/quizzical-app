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
`


function Quiz ({quizData}) {

  const [selectedAnswers, setSelectedAnswers] = useState([]); //user selected answers
  const [currentScore, setCurrentScore] = useState(); // score


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
  }

  //populate selected answers from radio buttons in any order
  function updateSelection(event, status, index) {
    const {value, name} = event.target;
    setSelectedAnswers({
      ...selectedAnswers,
      [name] : value
    })    
  }  

  
  return (
      <QuizLayout
        onSubmit = {handleSubmit}
      >
        {quizData && quizData.map((quizItem) =>
          <QuizQuestion
            key ={quizItem.id}
            QuestionData = {quizItem}
            updateSelection = {updateSelection}
          />
        )}
        {currentScore && <p>You got {currentScore}/{quizData.length} correct</p>}
        <button>Check Answers</button>
      </QuizLayout>
  )
};

export default Quiz;