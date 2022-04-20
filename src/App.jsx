import React, { useState, useEffect } from 'react'

// packages
import { nanoid } from 'nanoid';

//Styles
import { Wrapper, Title, Content, StartButton, Loader } from './App.styles';

// Components
import Quiz from "./components/Quiz"

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

    const fetchURI = "https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple&encode=base64"
    
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
