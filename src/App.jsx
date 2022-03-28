import React from 'react'
import './App.css'

// 
//
// https://opentdb.com/api.php?amount=5&encode=base64
// https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple&encode=base64
//  const uri = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty={level}&type=multiple&encode=base64`

// categories 
//  general knowledge  = 9  
//  books = 10 
//  films =  11
//  music  = 12  
//  musicals and theatre = 13
//  television = 14
//  video games = 15
//  board games = 16
//  science and nature = 17
//  science computers = 18
//  mathematic = 19
//  mytholog = 20
//  sports = 21
//  geography =22 
//  history =  23
//  politics = 24 
//  art = 25 
//  celebrities = 26
//  animals = 27
//  vehicles = 28
//  comics = 29
//  science gadgets = 30
//  japanese anime and manga = 31
//  cartoons and animations = 32 

//difficulty
//easy  medium hard


// quiz question fetch f()
// choose a category, assign the number of that category to a variable
// option for random category assign that the variable
// choose a difficulty, assign the difficulty to a variable
// build a URI for fetch
// use the URI to fetch 5 questions, pass each question through the decoder f() 
// https://developer.mozilla.org/en-US/docs/Glossary/Base64 
// a f() to sort answers (random sort or just sort())
// save these to a questionData state

// componet start page
// title,  categories, difficulty and a start button
// start button should pass the URI to quiz fetch f() 
// when questionData state is updated, load the quizpage component

//quiz page component
// map questionData to display 5 questions(quizQuestion component) in DOM
  // quizQuestion component 
  // load question & answer data
  // save and highlight selection in green
  // know the correct answer
// on submit compare selection to correct answer
// display correct answer as green and selected incorrect answer as red
// tally correct answer and show score
// check answer submit button updates to play again to reset the game
// reset f() - reset the state, reset the score, reset the fetch URI show start page again





function App() {

  return (
    <div className="App">
       <p>Hello!</p>
    </div>
  )
}

export default App
