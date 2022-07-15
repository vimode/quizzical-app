import styled from 'styled-components';

export const QuizLayout = styled.form`
  display:flex;
  flex-direction: column;
  place-items: center;
  place-content: center;
  height: 100%;
  gap: 1.5em;
`

export const Content = styled.p` 
  padding: 1em;
`

export const QuizButton = styled.button`
    &:hover,
    &:focus {
      background-color: var(--clr-highlight-primary);
      color: var(--clr-button-bg);
      border: 1px solid var(--clr-button-bg);
    }
`