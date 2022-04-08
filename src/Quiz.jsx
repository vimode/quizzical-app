import React, {useState, useReducer} from "react";

import QuizQuestion from "./QuizQuestion";

function Quiz ({quizData}) {

  const [selectedAnswers, setSelectedAnswers] = useState([]);
    // const [state, dispatch]  = useReducer(reducer, initalState);

 
  function handleSubmit (event) {
    event.preventDefault();
    console.log("submitted");
  }

  function updateSelection(event, status, index) {
    const {value, name} = event.target;
    let updatedAnswers = {}


    if(selectedAnswers.length <= 0) {
      updatedAnswers =  {
        answerId : name,
        selectedItem : value,
        isCorrect : status
      }
    } else { 
       selectedAnswers.forEach(item =>  {
         if(item.answerId !== name) {
           updatedAnswers = {
             answerId: name,
             selectedItem: value,
             isCorrect: status
           }
         }else {
           console.log("tada")
         }
       })
      
    }
    setSelectedAnswers(prevSelectedAnswers =>  [...prevSelectedAnswers, updatedAnswers]);
  }
    
  

  
  return (
    
    <form
      onSubmit = {handleSubmit}
    >
      {quizData && quizData.map((quizItem) => 
        <QuizQuestion 
          key ={quizItem.id}
          QuestionData = {quizItem}
          updateSelection = {updateSelection}
        />
      )}

      <button>Check Answers</button>
    </form>
    
    
  )
};

export default Quiz;