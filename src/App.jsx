import React, { useState, useEffect } from 'react'

// packages
import { nanoid } from 'nanoid';
import styled, {keyframes} from 'styled-components';

// Components
import Quiz from "./components/Quiz"


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
  width: 100%;
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
`;

const StartButton = styled.button `

    &:hover,
    &:focus {
      background-color: var(--clr-highlight-secondary);
      color: var(--clr-button-bg);
    }
`;

    const rotate = keyframes` 
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
`;

const Loader = styled.div `
    display:block;
    width: 100px;
    height: 100px;

    &:after {
      content: "";
      display: block;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 5px solid var(--clr-highlight-secondary);
      border-color: var(--clr-highlight-secondary) transparent var(--clr-highlight-secondary) transparent;
      animation: ${rotate} 1.5s linear infinite;
    }
`;



function App() {

  // the decoded quiz data
  const [quizData, setQuizData] = useState([]);
  
  // toStart fetching data
  const [quizStart, setQuizStart] = useState(false);
  
  // A loading icon while data is being fetched.
  const [isLoading, setIsLoading] = useState(false)


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
    setIsLoading(false)
  }
  

  async function fetchQuizData () {
    
    setIsLoading(true)

    const fetchURI = "https://opentdb.com/api.php?amount=5&category=17&difficulty=easy&type=multiple&encode=base64"
    
    const response = await fetch(fetchURI);
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

  function resetStart() {
    setQuizStart(false)
    setQuizData('')
  }

  useEffect(()=> {
    if(quizStart) {
      fetchQuizData()
    }
  }, [quizStart])


  return (
    <>
    <Wrapper>
      
      {!isLoading && !quizStart  ? 
        ( <>
          <Title>Quizzical App</Title>
          <Content>In each quiz you'll be given five random quesitons to answer. Press the button below to play and see how many you can answer correctly! </Content>
          <StartButton onClick = {loadQuiz}>Start Quiz</StartButton> </> ) 
          :  isLoading && quizData.length < 4 ? (<Loader/>) 
        : !isLoading && quizData ? (<Quiz quizData = {quizData} resetStart= {resetStart}/>) : <></> }
    </Wrapper>
    </>
  )
}

export default App
