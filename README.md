# Quizzical App

This is the solo project for Scrimba Module 12.4

## Overview

Build a Trivia App with React using the [OpenTriviaDatabase API](https://opentdb.com/) based on the provided Figma design.

Objectives of the Project

- 2 Screens: Start and Quiz
- Pull 5 questions from OTDB API
- Tally correct answers after 'Check answers' is clicked and display the correct and incorrect answers for each question and a tally at the bottom with an option to play again.

## Experience, Learning and Notes

This was a fun and challenging app to build. At surface, it felt really simple to build. And the structure was very straightforward too. But the app logic was not that simple. It's easy to check user responses as soon as its selected but to delay it to when user submits required a different approach as the user was allowed to change their responses any number of times before submitting.

I relied heavily on JS objects and object methods for most of the app logic.

This was the first time I tried Styled Components for styling instead of regular CSS. And it was really fun using it especially the flexibility it provides with props, nesting and conditionals. The styled component docs were really helpful to start learning and implement everything in the project. The only thing that wasn't very clear about SC in the docs was the way to create and use GlobalStyles for the project.

The fetched data from the API had some HTML entities, so I changed the default encoding to Bas64 and used the `atob()` function from the Web API. It isn't recommended using it in frontend apps and `encoreURIComponent()` is to be used.

It was fun to use `useReducer()` hook, was fun to watch chopping down a lot of states and consolidate a lot of logic it in a single function.

## TODO

 
### Extra

- [ ] Fix loading icon appearing late


### Repo

- [ ] Add an app diagram
- [ ] Add figma link and/or desktop screenshot
- [ ] Add favicon

## Installation

Clone the repo

```bash
cd quizzical-app
npm install
npm run dev

Open http://localhost:3000 to view it in the browser
```

**Available Scripts**

```bash
# Run the app in development mode
npm run dev

# Build the app for production to the `dist` folder
npm run build

# Preview the production build from the `dist` folder
npm run preview

```

## Resources

OTDB API - https://opentdb.com/api_config.php

Styled-Components docs https://styled-components.com/docs/

useReducer() - https://reactjs.org/docs/hooks-reference.html#usereducer

Base64 - https://developer.mozilla.org/en-US/docs/Glossary/Base64

encoreURIComponent() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent

SubmitEvent - https://developer.mozilla.org/en-US/docs/Web/API/SubmitEvent/submitter

Nano ID - https://github.com/ai/nanoid

ViteJS - https://vitejs.dev/guide/#scaffolding-your-first-vite-project
