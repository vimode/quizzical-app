import React, { useState, useEffect } from 'react'

// packages
import { nanoid } from 'nanoid';
import styled from 'styled-components';

// Components
import Quiz from "./components/Quiz"

// GlobalStyle
import { GlobalStyle } from './GlobalStyle';

const Wrapper = styled.section`
  padding: 4em 8em;
  max-width: 1440px;
  background: var(--clr - body - bg);
  height: 100%;
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
  gap: 1.5em;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
`;

const Content = styled.p`
  max-width: 50ch;
  text-align: center;
  font-family: var(--ff-secondary);
  font-weight: var(--fw-reg);
`

const TestButton = styled.button `

    &:hover,
    &:focus {
      background-color: var(--clr-highlight-secondary);
      color: var(--clr-button-bg);
    }
`

function App() {

  // the decoded quiz data
  const [quizData, setQuizData] = useState('');
  
  // toStart fetching data
  const [quizStart, setQuizStart] = useState(false);
  
  // TODO : A loader while data is being fetched.


  function dataSplit(encodedData) {
    
    let decodedData = []
    
    encodedData.map((questionObj, index) => {
      
      let combined_options = [...questionObj.incorrect_answers, questionObj.correct_answer]
      
      decodedData.push({
        id : nanoid(),
        question : atob(questionObj.question),
        correct_answer : atob(questionObj.correct_answer),
        answer_options : combined_options.sort().map((option) => 
          atob(option)
        )
      })
      return decodedData;
    })
    setQuizData(decodedData)
    // loader false
  }
  

  async function fetchQuizData () {
  
    const fetchURI = "https://opentdb.com/api.php?amount=5&category=17&difficulty=easy&type=multiple&encode=base64"
    
    const response = await fetch(fetchURI);
    // loader true
    try {
      const quizData = await response.json()
      dataSplit(quizData.results)
    } catch(e) {
      console.log(`Error ${response.status}`)
    }
  }

  function loadQuiz () {
    setQuizStart(true)
  }

  useEffect(()=> {
    if(quizStart) {
      fetchQuizData()
    }
  }, [quizStart])


  return (
    <>
      <GlobalStyle/>
    <Wrapper>
      {!quizStart  ? 
        ( <>
          <Title>Quizzical App</Title>
          <Content>In each quiz you'll be given five random quesitons to answer. Press the button below to play and see how many you can answer correctly! </Content>
          <TestButton onClick = {loadQuiz}>Start Quiz</TestButton> </> )
        :  <Quiz quizData = {quizData}/> }
           {/* loader when fetching data */}
    </Wrapper>
    </>
  )
}

export default App
