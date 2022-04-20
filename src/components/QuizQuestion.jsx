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
    width: max-content;   
    height: 1px;
    background: grey;
    bottom: 0px;
    opacity: 0.5;
  }
`

const AnswerWrapper = styled.div `
  display:flex;
  gap: 1em;
  flex-wrap: wrap;
  place-items: space-between;
  width: 100%;
  `

const AnswerOptions = styled.div `
  display:flex;
  gap: 4px;
`

const RadioInput = styled.input.attrs({
  type: "radio"
})`

`

const RadioLabel = styled.label `
  border: 1px solid black;
  padding: 5px 15px;
  border-radius: 10px;
  width: max-content;
  cursor: pointer;
  background: ${props => props.correctOption ? "yellow" : "transparent"};

  ${RadioInput}:checked + && {
    background: ${props => props.evalOption ? "var(--clr-highlight-tertiary)": "var(--clr-highlight-secondary)"};
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
              id={option} 
              value = {option}
              checked={selectedValue === option }
              onChange={()=> handleChange(event, index, option)}
              disabled = {isQuizActive ? false : true}
            />
            <RadioLabel 
                htmlFor={option}
                evalOption = {!isQuizActive && !isCorrect}
                correctOption = {!isQuizActive && (option === QuestionData.correct_answer)}
                >
            {option}</RadioLabel>
        </AnswerOptions>)
        )}
        </AnswerWrapper>  

      </QuestionCard>
  )
}

export default QuizQuestion;