import styled from 'styled-components';

export const QuestionCard = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 1em;
  position:relative;
  padding: 1em;

  & > p {
    font-size: 1.2rem;
    max-width: 80ch;
  }
`

export const AnswerWrapper = styled.div`
  display:flex;
  gap: 1em;
  flex-wrap: wrap;
  width: 100%;
  justify-content:space-evenly;
  `

export const AnswerOptions = styled.div`
  display:flex;
  gap: 4px;
  place-items:center;
`

export const RadioInput = styled.input.attrs({
  type: "radio"
})`
  appearance:none;
`

export const RadioLabel = styled.label`
  border: 1px solid ${props => props.correctOption ? "transparent" : "var(--clr-button-bg)"};
  padding: 10px;
  border-radius: 10px;
  min-width: 200px;
  max-width: max-content;
  cursor: pointer;
  background: ${props => props.correctOption ? "var(--clr-highlight-secondary)" : "transparent"};
  font-family : var(--ff-secondary);
  font-weight: var(--fw-med);
  font-size: 1rem;
  transition: background 100ms linear;
  flex-grow: 2;
  text-align:center;
  pointer-events: ${props => props.labelStatus && "none"};


  ${RadioInput}:checked + && {
    background: ${props => props.evalOption ? "var(--clr-highlight-tertiary)" : "var(--clr-highlight-secondary)"};
    border: ${props => props.labelStatus ? "2px solid blue" : "2px solid transparent"};
  }

    &:hover,
    &:focus  {
    background : var(--clr-highlight-primary);
  }
`

export const DetailsWrapper = styled.div`
  display:flex;
  gap: 1em;
`;

export const Content = styled.p`
  font-family: var(--ff-secondary);
  font-weight: var(--fw-med);
  font-size: 0.75rem;
  padding: 3px 8px;
  border-radius: 5px;
`;


export const ContentDifficulty = styled(Content)`
  background-color: ${props => props.difficulty === "easy" ? "gold" : props.difficulty === "medium" ? "limegreen" : "red"};
  color: ${props => props.difficulty === "hard" ? "white" : 'black'};
`;

export const ContentCategory = styled(Content)`
  background-color: PeachPuff;
  `;