import React, { useState, useEffect, useReducer } from 'react'

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

  // categories
  const [quizCategories, setQuizCategories] = useState([]);

  // intial URL parameters
  const fetchURLParameters = {
    selectedCategory: "",
    selectedDifficulty: "",
    fetchURL : `https://opentdb.com/api.php?amount=5&encode=base64`
  };

  //udpating URL parameters
  const [state, dispatch] = useReducer(reducer, fetchURLParameters )

  // fetch quizCategories
  useEffect(()=> {
    const fetchCategories = async () => {
      const categoriesData = await fetch('https://opentdb.com/api_category.php');
      const jsonCategoriesData = await categoriesData.json()
      setQuizCategories(jsonCategoriesData.trivia_categories)
    }

    fetchCategories()
    .catch(console.error);
  }, [])


  //handle URL paramter changes
  const handleParameterUpdate = (event) => {  
  const { value, name } = event.target;
    if (name === "category") {
      return ( dispatch ( {type : 'category', payload : value}));
    }
    dispatch ( {type: 'difficulty', payload : value});
  }

// reducer function
  function reducer(state, action) {
    switch(action.type) {
      case 'category' : 
        return {...state,
        selectedCategory : action.payload,
        fetchURL : `https://opentdb.com/api.php?amount=5&category=${action.payload}&difficulty=${state.selectedDifficulty}&type=multiple&encode=base64`};
      case 'difficulty' :
        return {...state,
        selectedDifficulty :action.payload,
        fetchURL : `https://opentdb.com/api.php?amount=5&category=${state.selectedCategory}&difficulty=${action.payload}&type=multiple&encode=base64`};
      default:
        throw new Error();
    }
  }
  
  // fetch base64 encoded data from API
  async function fetchQuizData () {
    
    setIsLoading(true)

    let fetchURI = ""
    if(fetchURLParameters.selectedCategory && fetchURLParameters.selectedDifficulty) {
      fetchURI = fetchURLParameters.fetchURL
    } else {
      fetchURI = 'https://opentdb.com/api.php?amount=5&encode=base64'
    }

    const response = await fetch(fetchURI);
    try {
      const fetchedData = await response.json()
      console.log(fetchedData.results)
      dataSplit(fetchedData.results)
    } catch(e) {
      console.log(`Error ${response.status}`)
    }
  }

  // split base64 encoded data to convert to utf-8 and store in a state variable.
  function dataSplit(encodedData) {
    
    let decodedData = []
    
    encodedData.map((questionObj, index) => {
      
      let combined_options = [...questionObj.incorrect_answers, questionObj.correct_answer]
      
      decodedData.push({
        id : nanoid(),
        question : atob(questionObj.question),
        correct_answer : atob(questionObj.correct_answer),
        category: atob(questionObj.category),
        difficulty: atob(questionObj.difficulty),
        answer_options : combined_options.sort().map((option) => 
          atob(option)
        )
      })
      return decodedData;
    })
    setQuizData(decodedData)
    setIsLoading(false)
  }

  // start quiz
  function loadQuiz () {
    setQuizStart(true)
  }

    // triggers when user clicks to start quiz
  useEffect(()=> {
    if(quizStart) {
      fetchQuizData()
    }
  }, [quizStart])


  // reset quiz
  function resetStart() {
    setQuizStart(false)
    setQuizData('')
  }


  return (
    <Wrapper>
      
      {!isLoading && !quizStart  ? 
        ( <>
          <Title>Quizzical App</Title>

         {quizCategories.length > 1 ? 
         <>
          <label htmlFor='category_select'>Choose a Category: 
          <select name="category" id="category_select" onChange={(event)=> handleParameterUpdate(event)}>
            <option value ="">Select a Category</option>
            {quizCategories.map((categoryName) => 
             <option 
              key = {categoryName.id} 
              value={categoryName.id}>
              {categoryName.name}
            </option>
          )} 
          </select>
          </label>

          <label htmlFor = 'difficulty_select'
          onChange={(event)=> handleParameterUpdate(event)}>
            Choose a difficulty: 
          <select name = "difficulty" id="difficulty_select">
            <option value="">Select Quiz Difficulty</option>
            <option value ="easy">Easy</option>
            <option value ="medium">Medium</option>
            <option value ="hard">Hard</option>
          </select>
          </label>

         </> : <p>Loading Options...</p>}

          <Content>
            In each quiz you'll be given five questions to answers.
            <br/>
            Select a category and difficulty level of your choice. Feeling adventourous? Click the button below for a random quiz.</Content>
          <StartButton onClick = {loadQuiz}>Start Quiz</StartButton> </> ) 
          :  isLoading && quizData.length < 4 ? (<Loader/>) 
        : !isLoading && quizData ? (<Quiz quizData = {quizData} resetStart= {resetStart}/>) : <></> }
    </Wrapper>
  )
}

export default App
