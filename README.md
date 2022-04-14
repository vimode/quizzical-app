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

```bash
https://opentdb.com/api.php?amount=5&encode=base64
https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple&encode=base64

const uri = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty={level}&type=multiple&encode=base64`

 categories
 general knowledge = 9
 books = 10
 films = 11
 music = 12
 musicals and theatre = 13
 television = 14
 video games = 15
 board games = 16
 science and nature = 17
 science computers = 18
 mathematic = 19
 mytholog = 20
 sports = 21
 geography =22
 history = 23
 politics = 24
 art = 25
 celebrities = 26
 animals = 27
 vehicles = 28
 comics = 29
 science gadgets = 30
 japanese anime and manga = 31
 cartoons and animations = 32

difficulty
easy medium hard
```

Styled components docs https://styled-components.com/docs/

Base64 - https://developer.mozilla.org/en-US/docs/Glossary/Base64

SubmitEvent - https://developer.mozilla.org/en-US/docs/Web/API/SubmitEvent/submitter // possibly a fix for handling two buttons/two seperate functions in one on onSubmit

### Todo

- [ ] Add an app diagram
- [ ] Add figma link and/or desktop screenshot
- [ ] Add favicon
- [ ] onSubmit highlight selected option as correct or incorrect accordinglly
- [ ] Disable options/radio buttons on submit
- [ ] Media Queries
- [ ] Style radio buttons and conditionally render label colors
- [ ] Fix loading icon appearly late
- [ ] Add other options(categories and difficulty) at start screen.
- [ ] Should the user be allowed to check without selecting any option? or just show correct answers even if nothing is selected on submit?

## Installation

Clone the repo

```bash
cd quizzical-app
npm install
npm run dev
```

Open http://localhost:3000 to view it in the browser

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

Nano ID - https://github.com/ai/nanoid

ViteJS - https://vitejs.dev/guide/#scaffolding-your-first-vite-project
