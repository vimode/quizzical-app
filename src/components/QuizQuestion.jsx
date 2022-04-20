import React, {useState} from "react";

//styled components
 import { QuestionCard, AnswerWrapper, AnswerOptions, RadioInput, RadioLabel} from './QuizQuestion.styles.js';

function QuizQuestion ({QuestionData, updateSelection, isQuizActive}) { 

  const [ selectedValue, setSelectedValue ] = useState('');
  const [ isCorrect, setIsCorrect ] = useState('');

  function handleChange (event,index) {
    const {value} = event.target
    setSelectedValue((prevSelected) => value) 
    setIsCorrect((prevState) => { return value === QuestionData.correct_answer}) 
    updateSelection(event)
  }

  return (
    <QuestionCard
    key ={QuestionData.id}
    >
        <p>{QuestionData.question}</p>
      <AnswerWrapper>
        {QuestionData.answer_options.map((option, index) => 
          (<AnswerOptions
            key = {option}>
            <RadioInput 
              type="radio" 
              name={QuestionData.id} 
              id={`${QuestionData.id.concat(option)}`} 
              value = {option}
              checked={selectedValue === option }
              onChange={()=> handleChange(event, index)}
              disabled = {isQuizActive ? false : true}
            />
            <RadioLabel 
                htmlFor={`${QuestionData.id.concat(option)}`} 
                evalOption = {!isQuizActive && !isCorrect}
                correctOption = {!isQuizActive && (option === QuestionData.correct_answer)}
                labelStatus = {!isQuizActive}
                >
            {option}</RadioLabel>
        </AnswerOptions>)
        )}
        </AnswerWrapper>  

      </QuestionCard>
  )
}

export default QuizQuestion;