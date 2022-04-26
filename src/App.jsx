import React, { useState, useEffect, useReducer } from 'react'

// packages
import { nanoid } from 'nanoid';

//Styles
import { Wrapper, Title, Content, StartButton, Loader, DropdownWrapper, SelectLabel, SelectOptions } from './App.styles';

// Components
import Quiz from "./components/Quiz";


  // intial reducer statet (bad variable name for now)
  const fetchURLParameters = {
    selectedCategory: "",
    selectedDifficulty: "",
    fetchURL : `https://opentdb.com/api.php?amount=5&type=multiple&encode=base64`,
    quizStart : false
  };

  
// reducer function which updates categories + starts/end/rest quiz 
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
    case 'start' :
      return {
        ...state,
        quizStart: true,
      }
      case 'reset' :
        return {
          ...state,
          quizStart: false,
        }
    default:
      throw new Error();
  }
}


function App() {

  // the decoded quiz data
  const [quizData, setQuizData] = useState([]);
  
  // A loading icon while data is being fetched.
  const [isLoading, setIsLoading] = useState(false)

  // categories
  const [quizCategories, setQuizCategories] = useState([]);

   //udpating URL parameters
  const [state, dispatch] = useReducer(reducer, fetchURLParameters )

   // statesss that useReducer handles
  const {selectedCategory,  selectedDifficulty,  fetchURL,  quizStart } = state;
  

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


  //dispatch action based on the event name
  const handleParameterUpdate = (event) => {  
  const { value, name } = event.target;
    if (name === "category") {
      return ( dispatch ( {type : 'category', payload : value}));
    } else if (name === "start") {
      return (dispatch ({type : 'start'}))
    } else if (name === "reset" ) {
      return (dispatch ({type: 'reset'}))
    }
    dispatch ( {type: 'difficulty', payload : value});
  }

  
  // fetch base64 encoded data from API
  async function fetchQuizData () {
    
    setIsLoading(true)

    let fetchURI = ""
    if(state.selectedCategory && state.selectedDifficulty) {
      fetchURI = state.fetchURL
    } else {
      fetchURI = 'https://opentdb.com/api.php?amount=5&type=multiple&encode=base64'
    }

    const response = await fetch(fetchURI);
    try {
      const fetchedData = await response.json()
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


    // triggers when user clicks to start quiz
  useEffect(()=> {
    if(state.quizStart) {
      fetchQuizData()
    }
  }, [state.quizStart])


  // reset quiz
  function resetStart(event) {
    handleParameterUpdate(event)
    setQuizData('')
  }


  return (
    <Wrapper>
      
      {!isLoading && !state.quizStart  ? 
        ( <>
          <Title>Quizzical App</Title>

          <Content>
            In each quiz you'll be given five questions to answers.
            <br/>
            Select a category and difficulty level of your choice or just click the button below for a random quiz.</Content>

         {quizCategories.length > 1 ? 
         <DropdownWrapper>
          <SelectLabel htmlFor='category_select'>Category: 
          <SelectOptions name="category" id="category_select" onChange={(event)=> handleParameterUpdate(event)}>
            <option value ="">Select a Category</option>
            {quizCategories.map((categoryName) => 
             <option 
              key = {categoryName.id} 
              value={categoryName.id}>
              {categoryName.name}
            </option>
          )} 
          </SelectOptions>
          </SelectLabel>

          <SelectLabel htmlFor = 'difficulty_select'
          onChange={(event)=> handleParameterUpdate(event)}>
            Difficulty: 
          <SelectOptions name = "difficulty" id="difficulty_select">
            <option value="">Select Difficulty</option>
            <option value ="easy">Easy</option>
            <option value ="medium">Medium</option>
            <option value ="hard">Hard</option>
          </SelectOptions>
          </SelectLabel>

         </DropdownWrapper> : <p>Loading Options...</p>}

          <StartButton name="start" onClick = {(event)=> handleParameterUpdate(event)}>Start Quiz</StartButton> </> ) 
          :  isLoading && quizData.length < 4 ? (<Loader/>) 
        : !isLoading && quizData ? (<Quiz quizData = {quizData} resetStart= {resetStart}/>) : <></> }
    </Wrapper>
  )
}

export default App
