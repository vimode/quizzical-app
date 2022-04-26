# Quizzical App

This is the solo project for Scrimba Module 11.4

_This is a WIP project, README will be updated periodically_

## Overview

Build a Trivia App with React using the [OpenTriviaDatabase API](https://opentdb.com/) based on the provided Figma design.

Objectives of the Project

- 2 Screens: Start and Quiz
- Pull 5 questions from OTDB API
- Tally correct answers after 'Check answers' is clicked and display the correct and incorrect answers for each question and a tally at the bottom with an option to play again.

## Experience, Learning and Notes

_readme is currently being used as data/knowledge/resource dump while building the app_

This was a fun and challenging app to build. At surface it felt really simple to build. And the structure was very straightforward too. But the app logic was not that simple. Its easy to check user responses as soon as its selected but to delay it to when user submits required a different approach as the user was allowed to change their responses any number of times before submitting.

I relied heavily on JS objects and object methods for most of the app logic.

This was the first time I tried Styled Components for styling instead of regular CSS. And it was really fun using it especially the flexibility it provides with props, nesting and conditionals. The styled component docs were really helpful to start learning and implement everything in the project. The only thing that wasn't very clear about SC in the docs was the way to create and use GlobalStyles for the project.

The fetched data from the API had some HTML entities, so I changed the default encoding to Bas64 and used the `atob()` function from the Web API. It isn't recommended to use it in frontend apps and `encoreURIComponent()` is to be used.

It was fun to use `useReducer()` hook, was fun to watch chopping down a lot of states and consolidate a lot of logic it in a single function.

## TODO

_This list will be removed once everything is checked or project is considered as completed_

### Basic

- [x] Basic functionalty to fetch encoded data, decode it and save a new state object
- [x] Quiz and quizQ logic for each Q to have independent state
  - [x] Only check answers onSubmit
  - [x] Reset quiz to start over (go to start screen)
- [x] Seperate quiz and quizQ components
- [x] onSubmit highlight selected option as correct or incorrect accordinglly
- [x] Disable options/radio buttons on submit
- [x] Style radio buttons and conditionally render label colors
- [x] Add category and difficulty tag on Quiz page for each question (must for random)
- [x] Update intro text to accomodate the new random

### Styling

- [x] Initiate and establish Styled components
- [ ] Media Queries
- [x] Start screen styling
- [x] Conditional styling of radio buttons

### Extra

- [ ] Fix loading icon appearing late
- [x] Add other options(categories and difficulty) at start screen.
- [x] Add a random quiz option which pulls random questions at random difficulty and has tags/labels for each question to show the category.
- [x] Should the user be allowed to check without selecting any option? or just show correct answers even if nothing is selected on submit?

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
