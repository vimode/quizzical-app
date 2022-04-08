import React, {useState} from "react";

function QuizQuestion ({QuestionData, updateSelection}) { 

  const [ selectedValue, setSelectedValue ] = useState('')

  function handleChange (event,index) {
    const {value, name} = event.target
    setSelectedValue((prevSelected) => value)  
    updateSelection(event, (value === QuestionData.correct_answer),  QuestionData.id, index)
  }

  return(
    <div
    key ={QuestionData.id}
    >
        <p>{QuestionData.question}</p>

        {QuestionData.answer_options.map((option, index) => 
          (<div
            key = {option}>
            <input 
              type="radio" 
              name={QuestionData.id} 
              id={option} 
              value = {option}
              checked={selectedValue === option }
              onChange={()=> handleChange(event, index)}
            />
            <label htmlFor={option}>{option}</label>
        </div>)
        )}  

      </div>
  )
}

export default QuizQuestion;