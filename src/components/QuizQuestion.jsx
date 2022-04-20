import React, {useState} from "react";

//packages
import styled from 'styled-components';
import {nanoid} from 'nanoid';

//styled components
const QuestionCard = styled.div `
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  margin: 0.5em;
  gap: 1em;
  position:relative;
  padding: 1em;

  & > p {
    font-size: 1.2rem;
    max-width: 70ch;
  }
`

const AnswerWrapper = styled.div `
  display:flex;
  gap: 1em;
  flex-wrap: wrap;
  width: 100%;
  `

const AnswerOptions = styled.div `
  display:flex;
  gap: 4px;
`

const RadioInput = styled.input.attrs({
  type: "radio"
})`
  appearance:none;

`

const RadioLabel = styled.label `
  border: 1px solid ${props => props.correctOption ? "transparent" : "var(--clr-button-bg)"};
  padding: 10px;
  border-radius: 10px;
  min-width: 200px;
  max-width: max-content;
  cursor: pointer;
  background: ${props => props.correctOption  ?  "var(--clr-highlight-secondary)" : "transparent"};
  font-family : var(--ff-secondary);
  font-weight: var(--fw-med);
  font-size: 1rem;
  transition: background 100ms linear;
  flex-grow: 2;
  text-align:center;
  pointer-events: ${props => props.labelStatus && "none"};


  ${RadioInput}:checked + && {
    background: ${props => props.evalOption ? "var(--clr-highlight-tertiary)": "var(--clr-highlight-secondary)"};
    border: 1px solid transparent;
  }

    &:hover,
    &:focus  {
    background : var(--clr-highlight-primary);
  }
  
`

function QuizQuestion ({QuestionData, updateSelection, isQuizActive}) { 

  const [ selectedValue, setSelectedValue ] = useState('');
  const [ isCorrect, setIsCorrect ] = useState('');

  function handleChange (event,index, option) {
    const {value, name, checked} = event.target
    setSelectedValue((prevSelected) => value) 
    setIsCorrect((prevState) => { return value === QuestionData.correct_answer}) 
    updateSelection(event, isCorrect,  QuestionData.id, index)
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
              onChange={()=> handleChange(event, index, option)}
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