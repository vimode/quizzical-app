import React, {useState} from "react";

//packages
import styled from 'styled-components';

//styled components
const QuestionCard = styled.div `
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  margin: 1em;
  gap: 0.5em;
  position:relative;
  padding: 1em;

  &::after {
    content: "";
    position: absolute;
    min-width: 600px;
    height: 1px;
    background: grey;
    bottom: 0px;
    opacity: 0.5;
  }
`

const AnswerWrapper = styled.div `
  display:flex;
  gap: 1em;

  `

const AnswerOptions = styled.div `
  display:flex;
  
`

const RadioInput = styled.input.attrs(props => ({
  type: "radio"
}))`
  

  &:checked +  {RadioLabel} {
    background: green;

  }
`

const RadioLabel = styled.label `
  border: 1px solid black;
  padding: 5px 15px;
  border-radius: 10px;
  width: 100%;
`

function QuizQuestion ({QuestionData, updateSelection}) { 

  const [ selectedValue, setSelectedValue ] = useState('')

  function handleChange (event,index) {
    const {value, name} = event.target
    setSelectedValue((prevSelected) => value)  
    updateSelection(event, (value === QuestionData.correct_answer),  QuestionData.id, index)
  }

  return(
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
              id={option} 
              value = {option}
              checked={selectedValue === option }
              onChange={()=> handleChange(event, index)}
            />
            <RadioLabel htmlFor={option}>{option}</RadioLabel>
        </AnswerOptions>)
        )}
        </AnswerWrapper>  

      </QuestionCard>
  )
}

export default QuizQuestion;