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

    
    setSelectedAnswers({

      ...selectedAnswers,
      [name] : value

      // if(prevSelectedAnswers.length <= 0) {
      //   return [{
      //     answerId: name,
      //     selectedItem: value,
      //     isCorrect: status
      //     }]
      // } else {
      //   console.log(prevSelectedAnswers)
      //   prevSelectedAnswers.map(itemObj => {
      //     if(itemObj.answerId === name) {
      //       (
      //         itemObj.answerId = name,
      //         itemObj.selectedItem = value,
      //         itemObj.isCorrect = status
      //       )
      //       return [prevSelectedAnswers]
      //     } else {
      //       return [...prevSelectedAnswers,  {
      //         answerId: name,
      //         selectedItem: value,
      //         isCorrect: status
      //         }]
            
      //     }
          
      //   })
      // }

      
      
      // return [...prevSelectedAnswers, {
      //   answerId : name,
      //   selectedItem: value,
      //   isCorrect:  status
      // }]
    })
    console.log(selectedAnswers)
 
    // if(selectedAnswers.length > 0) {
    //   updatedAnswers =  {
    //     answerId : name,
    //     selectedItem : value,
    //     isCorrect : status
    //   }
    // } 

    // if(setSelectedAnswers.includes(name)){
    //   console.log("okay")
    // }

    // if(selectedAnswers.length > 0) {
    //   selectedAnswers.forEach(item => {
    //     if(item.answerId === name) {
    //       item.answerId = name,
    //       item.selectedItem = value,
    //       item.isCorrect = status
    //     }
    //   })
    // }
    
    // selectedAnswers.forEach(item =>  {
    //      if(item.answerId === name) {
    //        item.answerId = name,
    //        item.selectedItem = value,
    //        item.isCorrect = status
    //        }
    //       updatedAnswers = {
    //         answerId : name,
    //         selectedItem : value,
    //         isCorrect:status
    //       }
    //    })
      
  
    // setSelectedAnswers(prevSelectedAnswers =>  [...prevSelectedAnswers, updatedAnswers]);
    
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